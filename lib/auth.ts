import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { and, eq, lt, ne } from "drizzle-orm";
import { getDb, isDbConfigured } from "./db";
import { adminUsers, sessions, type AdminUser, type UserRole } from "./db/schema";

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

  if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
    const mins = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60_000);
    return { ok: false, error: `Too many attempts. Try again in ${mins} minute${mins === 1 ? "" : "s"}.`, retryAfterMinutes: mins };
  }

  if (!(await verifyPassword(password, user.passwordHash))) {
    const attempts = user.failedAttempts + 1;
    await db
      .update(adminUsers)
      .set({
        failedAttempts: attempts,
        lockedUntil:
          attempts >= MAX_FAILED_ATTEMPTS
            ? new Date(Date.now() + LOCKOUT_MINUTES * 60_000)
            : null,
      })
      .where(eq(adminUsers.id, user.id));

    if (attempts >= MAX_FAILED_ATTEMPTS) {
      return {
        ok: false,
        error: `Too many attempts. Try again in ${LOCKOUT_MINUTES} minutes.`,
        retryAfterMinutes: LOCKOUT_MINUTES,
      };
    }
    return generic;
  }

  await db
    .update(adminUsers)
    .set({ failedAttempts: 0, lockedUntil: null, lastLoginAt: new Date() })
    .where(eq(adminUsers.id, user.id));

  await createSession(user.id, userAgent);
  void pruneExpiredSessions();

  return { ok: true, user };
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
