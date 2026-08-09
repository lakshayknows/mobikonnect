import {
  createHash,
  randomBytes,
  randomInt,
  scrypt as scryptCb,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { and, desc, eq, gt, isNull, lt, ne, sql } from "drizzle-orm";
import { getDb, isDbConfigured } from "./db";
import {
  adminUsers,
  passwordResetOtps,
  sessions,
  type AdminUser,
  type UserRole,
} from "./db/schema";
import { isMailConfigured, sendOtpEmail } from "./mailer";

const scrypt = promisify(scryptCb) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
) => Promise<Buffer>;

export const SESSION_COOKIE = "mk_admin_session";
const SESSION_TTL_DAYS = 7;
const KEY_LEN = 64;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

/* ─────────────────────────────── Passwords ────────────────────────────────── */

/** `scrypt$<saltHex>$<keyHex>` — no external hashing dependency. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(password.normalize("NFKC"), salt, KEY_LEN);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltHex, keyHex] = (stored ?? "").split("$");
  if (scheme !== "scrypt" || !saltHex || !keyHex) return false;

  const expected = Buffer.from(keyHex, "hex");
  const actual = await scrypt(password.normalize("NFKC"), Buffer.from(saltHex, "hex"), expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

/* ──────────────────────────────── Sessions ────────────────────────────────── */

/** The raw token only ever leaves in the cookie; the DB holds its SHA-256. */
const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export async function createSession(userId: string, userAgent?: string | null) {
  const db = getDb();
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

  await db.insert(sessions).values({
    id: hashToken(token),
    userId,
    expiresAt,
    userAgent: userAgent?.slice(0, 255) ?? null,
  });

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return { token, expiresAt };
}

export async function destroySession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) {
    try {
      await getDb().delete(sessions).where(eq(sessions.id, hashToken(token)));
    } catch {
      // The cookie is cleared regardless — a stale row expires on its own.
    }
  }
  cookies().delete(SESSION_COOKIE);
}

/** Best-effort cleanup of rows past their expiry. */
export async function pruneExpiredSessions() {
  try {
    await getDb().delete(sessions).where(lt(sessions.expiresAt, new Date()));
  } catch {
    /* non-critical */
  }
}

/**
 * Resolves the signed-in user, or null. This is the single authorization
 * chokepoint — every admin page and route handler calls it (directly or via
 * requireSession). Authorization deliberately does NOT live in middleware.
 */
export async function getSessionUser(): Promise<AdminUser | null> {
  if (!isDbConfigured()) return null;

  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const row = await getDb().query.sessions.findFirst({
      where: eq(sessions.id, hashToken(token)),
      with: { user: true },
    });

    if (!row) return null;
    if (row.expiresAt.getTime() < Date.now()) {
      await getDb().delete(sessions).where(eq(sessions.id, row.id));
      return null;
    }
    if (!row.user || !row.user.isActive) return null;

    return row.user;
  } catch {
    return null;
  }
}

/** For server components: bounce to the login screen when signed out. */
export async function requireSession(returnTo?: string): Promise<AdminUser> {
  const user = await getSessionUser();
  if (!user) {
    redirect(returnTo ? `/admin/login?next=${encodeURIComponent(returnTo)}` : "/admin/login");
  }
  return user;
}

export async function requireRole(role: UserRole, returnTo?: string): Promise<AdminUser> {
  const user = await requireSession(returnTo);
  if (user.role !== role) redirect("/admin");
  return user;
}

/* ───────────────────────── Route-handler guards ───────────────────────────── */

export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

/** For route handlers: throws a 401 rather than redirecting. */
export async function requireApiUser(): Promise<AdminUser> {
  const user = await getSessionUser();
  if (!user) throw new HttpError(401, "Not signed in");
  return user;
}

export async function requireApiRole(role: UserRole): Promise<AdminUser> {
  const user = await requireApiUser();
  if (user.role !== role) throw new HttpError(403, "Insufficient permissions");
  return user;
}

/* ────────────────────────── Login with lockout ────────────────────────────── */

export type LoginResult =
  | { ok: true; user: AdminUser }
  | { ok: false; error: string; retryAfterMinutes?: number };

export async function attemptLogin(
  email: string,
  password: string,
  userAgent?: string | null,
): Promise<LoginResult> {
  const db = getDb();
  const generic = { ok: false as const, error: "Incorrect email or password." };

  const user = await db.query.adminUsers.findFirst({
    where: eq(adminUsers.email, email.trim().toLowerCase()),
  });

  // Same generic message whether the account is missing, disabled or the
  // password is wrong — don't let the form enumerate accounts.
  if (!user || !user.isActive) return generic;

  const lockedUntilMs = user.lockedUntil?.getTime() ?? 0;

  if (lockedUntilMs > Date.now()) {
    const mins = Math.ceil((lockedUntilMs - Date.now()) / 60_000);
    return {
      ok: false,
      error: `Too many attempts. Try again in ${mins} minute${mins === 1 ? "" : "s"}.`,
      retryAfterMinutes: mins,
    };
  }

  // Serving the lockout clears the debt. Without this the counter stays at
  // MAX_FAILED_ATTEMPTS forever, so the first wrong password after a lockout
  // expires trips the limit again immediately — a permanent lockout after one
  // attempt.
  const priorFailures = lockedUntilMs > 0 ? 0 : user.failedAttempts;

  if (!(await verifyPassword(password, user.passwordHash))) {
    const attempts = priorFailures + 1;
    const locked = attempts >= MAX_FAILED_ATTEMPTS;
    await db
      .update(adminUsers)
      .set({
        // Reset the counter as the lock is applied, so the next window starts clean.
        failedAttempts: locked ? 0 : attempts,
        lockedUntil: locked ? new Date(Date.now() + LOCKOUT_MINUTES * 60_000) : null,
      })
      .where(eq(adminUsers.id, user.id));

    if (locked) {
      return {
        ok: false,
        error: `Too many attempts. Try again in ${LOCKOUT_MINUTES} minutes.`,
        retryAfterMinutes: LOCKOUT_MINUTES,
      };
    }
    return {
      ok: false,
      error: `Incorrect email or password. ${MAX_FAILED_ATTEMPTS - attempts} attempt${
        MAX_FAILED_ATTEMPTS - attempts === 1 ? "" : "s"
      } left before a ${LOCKOUT_MINUTES}-minute lockout.`,
    };
  }

  await db
    .update(adminUsers)
    .set({ failedAttempts: 0, lockedUntil: null, lastLoginAt: new Date() })
    .where(eq(adminUsers.id, user.id));

  await createSession(user.id, userAgent);
  void pruneExpiredSessions();

  return { ok: true, user };
}

/* ──────────────────── Forgot password — one-time codes ────────────────────── */

const OTP_LENGTH = 6;
const OTP_TTL_MINUTES = 10;
const OTP_MAX_ATTEMPTS = 5;
/** Minimum gap between sends for one account. */
const OTP_RESEND_COOLDOWN_SECONDS = 60;
/** Ceiling on sends per account within the window below. */
const OTP_MAX_PER_WINDOW = 3;
const OTP_WINDOW_MINUTES = 15;

export const PASSWORD_MIN_LENGTH = 10;
export const OTP_EXPIRY_MINUTES = OTP_TTL_MINUTES;

/**
 * Cryptographically secure 6-digit code. `randomInt` (not `Math.random`) and
 * zero-padded, so "007431" stays six characters.
 */
function generateOtp(): string {
  return String(randomInt(0, 10 ** OTP_LENGTH)).padStart(OTP_LENGTH, "0");
}

const hashOtp = (code: string) => createHash("sha256").update(code).digest("hex");

/** Digits only — strips the spaces people paste in from the email. */
export const normaliseOtp = (input: string) => (input ?? "").replace(/\D/g, "");

/**
 * Sends a reset code.
 *
 * Always resolves the same way regardless of whether the account exists, is
 * disabled, or is being throttled — the caller shows one fixed message, so the
 * form cannot be used to discover which addresses are real.
 */
export async function requestPasswordReset(email: string, requestIp?: string | null) {
  if (!isDbConfigured()) return;

  const db = getDb();
  const user = await db.query.adminUsers.findFirst({
    where: eq(adminUsers.email, email.trim().toLowerCase()),
  });
  if (!user || !user.isActive) return;

  const now = Date.now();

  // Throttle: a short cooldown between sends, plus a ceiling per window. Both
  // are silent — a throttled request looks identical to a delivered one.
  const [recent] = await db
    .select({ lastAt: sql<Date | null>`max(${passwordResetOtps.createdAt})`, count: sql<number>`count(*)::int` })
    .from(passwordResetOtps)
    .where(
      and(
        eq(passwordResetOtps.userId, user.id),
        gt(passwordResetOtps.createdAt, new Date(now - OTP_WINDOW_MINUTES * 60_000)),
      ),
    );

  if (recent?.lastAt && now - new Date(recent.lastAt).getTime() < OTP_RESEND_COOLDOWN_SECONDS * 1000) {
    return;
  }
  if ((recent?.count ?? 0) >= OTP_MAX_PER_WINDOW) return;

  // Only the newest code should ever work.
  await db
    .update(passwordResetOtps)
    .set({ consumedAt: new Date() })
    .where(and(eq(passwordResetOtps.userId, user.id), isNull(passwordResetOtps.consumedAt)));

  const code = generateOtp();
  await db.insert(passwordResetOtps).values({
    userId: user.id,
    codeHash: hashOtp(code),
    expiresAt: new Date(now + OTP_TTL_MINUTES * 60_000),
    requestIp: requestIp?.slice(0, 64) ?? null,
  });

  if (!isMailConfigured()) {
    // Loud in the server log, silent to the caller — still no enumeration.
    console.error("[auth] password reset requested but SMTP is not configured");
    return;
  }

  try {
    await sendOtpEmail({ to: user.email, code, expiresMinutes: OTP_TTL_MINUTES });
  } catch (error) {
    // Never surface transport detail to the form.
    console.error("[auth] failed to send reset code:", error);
  }
}

export type VerifyResetResult = { ok: true } | { ok: false; error: string };

/**
 * Checks a code and, if it holds, sets the new password.
 *
 * Also clears any lockout — someone recovering by email should not still be
 * shut out by failed password attempts — and revokes every existing session.
 */
export async function verifyPasswordResetAndSet(
  email: string,
  code: string,
  newPassword: string,
): Promise<VerifyResetResult> {
  if (!isDbConfigured()) return { ok: false, error: "Password reset is unavailable right now." };

  const db = getDb();
  const invalid = { ok: false as const, error: "That code is incorrect or has expired." };

  if (newPassword.length < PASSWORD_MIN_LENGTH) {
    return { ok: false, error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.` };
  }

  const user = await db.query.adminUsers.findFirst({
    where: eq(adminUsers.email, email.trim().toLowerCase()),
  });
  if (!user || !user.isActive) return invalid;

  const otp = await db.query.passwordResetOtps.findFirst({
    where: and(
      eq(passwordResetOtps.userId, user.id),
      isNull(passwordResetOtps.consumedAt),
      gt(passwordResetOtps.expiresAt, new Date()),
    ),
    orderBy: [desc(passwordResetOtps.createdAt)],
  });
  if (!otp) return invalid;

  // Count the attempt before comparing, so a wrong guess always costs something.
  const attempts = otp.attempts + 1;
  if (attempts >= OTP_MAX_ATTEMPTS) {
    await db
      .update(passwordResetOtps)
      .set({ attempts, consumedAt: new Date() })
      .where(eq(passwordResetOtps.id, otp.id));
    return { ok: false, error: "Too many incorrect codes. Request a new one." };
  }
  await db
    .update(passwordResetOtps)
    .set({ attempts })
    .where(eq(passwordResetOtps.id, otp.id));

  const expected = Buffer.from(otp.codeHash, "hex");
  const actual = Buffer.from(hashOtp(normaliseOtp(code)), "hex");
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return invalid;

  await db
    .update(adminUsers)
    .set({
      passwordHash: await hashPassword(newPassword),
      failedAttempts: 0,
      lockedUntil: null,
    })
    .where(eq(adminUsers.id, user.id));

  await db
    .update(passwordResetOtps)
    .set({ consumedAt: new Date() })
    .where(eq(passwordResetOtps.id, otp.id));

  // A password change invalidates every session, including any the attacker holds.
  await db.delete(sessions).where(eq(sessions.userId, user.id));

  return { ok: true };
}

/** Sign a user's devices out — used after a password change or role revocation. */
export async function revokeUserSessions(userId: string, keepCurrent = false) {
  const db = getDb();
  const current = keepCurrent ? cookies().get(SESSION_COOKIE)?.value : undefined;

  await db
    .delete(sessions)
    .where(
      current
        ? and(eq(sessions.userId, userId), ne(sessions.id, hashToken(current)))
        : eq(sessions.userId, userId),
    );
}
