/**
 * Resets an admin password, clears any lockout, and signs the account out
 * everywhere. Use this when someone is locked out or has forgotten their
 * password — there is no self-service reset flow.
 *
 *   npm run admin:reset -- sales@mobikonnect.com
 *   ADMIN_PASSWORD='my-own-password' npm run admin:reset -- sales@mobikonnect.com
 *
 * Without ADMIN_PASSWORD a strong one is generated and printed once.
 * Creates the account if the email does not exist yet.
 */

import { randomBytes, scrypt as scryptCb } from "node:crypto";
import { promisify } from "node:util";
import { neon } from "@neondatabase/serverless";

const scrypt = promisify(scryptCb) as (p: string, s: Buffer, l: number) => Promise<Buffer>;

async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const key = await scrypt(password.normalize("NFKC"), salt, 64);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

/** Readable but strong: 4 chunks of 5 url-safe chars, ~120 bits. */
function generatePassword() {
  const raw = randomBytes(24).toString("base64url").replace(/[-_]/g, "");
  return (raw.match(/.{1,5}/g) ?? []).slice(0, 4).join("-");
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set. Run `vercel env pull .env.local --yes` first.");
    process.exit(1);
  }

  const email = (process.argv[2] ?? process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  if (!email) {
    console.error("Usage: npm run admin:reset -- <email>");
    process.exit(1);
  }

  const generated = !process.env.ADMIN_PASSWORD;
  const password = process.env.ADMIN_PASSWORD ?? generatePassword();
  if (password.length < 10) {
    console.error("Password must be at least 10 characters.");
    process.exit(1);
  }

  const sql = neon(url);
  const hash = await hashPassword(password);

  const [existing] = await sql`select id, name, role from admin_users where email = ${email}`;

  if (existing) {
    await sql`update admin_users
                 set password_hash = ${hash},
                     failed_attempts = 0,
                     locked_until = null,
                     is_active = true
               where id = ${existing.id}`;
    // Any session opened with the old password is no longer trusted.
    await sql`delete from sessions where user_id = ${existing.id}`;
    console.log(`✓ Reset ${email} (${existing.role}) — lockout cleared, other sessions signed out.`);
  } else {
    const name = process.env.ADMIN_NAME ?? email.split("@")[0];
    await sql`insert into admin_users (email, name, role, password_hash)
              values (${email}, ${name}, 'admin', ${hash})`;
    console.log(`✓ Created ${email} as an admin.`);
  }

  if (generated) {
    console.log(`\n  Password (shown once — save it now):\n\n      ${password}\n`);
    console.log("  Change it after signing in, at /admin/settings.\n");
  } else {
    console.log("\n  Password set from ADMIN_PASSWORD.\n");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
