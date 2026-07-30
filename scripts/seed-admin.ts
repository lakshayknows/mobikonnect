/**
 * Creates the first admin user and seeds starter blog categories.
 *
 *   npx dotenv -e .env.local -- npx tsx scripts/seed-admin.ts
 *
 * Credentials come from ADMIN_EMAIL / ADMIN_PASSWORD, or fall back to a
 * generated password that is printed once. Re-running is safe.
 */

import { randomBytes, scrypt as scryptCb } from "node:crypto";
import { promisify } from "node:util";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../lib/db/schema";
import { slugify } from "../lib/blog";

const scrypt = promisify(scryptCb) as (p: string, s: Buffer, l: number) => Promise<Buffer>;

async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const key = await scrypt(password.normalize("NFKC"), salt, 64);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

const STARTER_CATEGORIES = [
  { name: "Insights", description: "Points of view on engagement, loyalty and martech." },
  { name: "Case Notes", description: "What we learned running real campaigns." },
  { name: "Playbooks", description: "Practical how-tos for marketers." },
  { name: "Company", description: "News from Mobikonnect." },
];

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set. Run `vercel env pull .env.local --yes` first.");
    process.exit(1);
  }

  const db = drizzle(neon(url), { schema });

  const email = (process.env.ADMIN_EMAIL ?? "sales@mobikonnect.com").toLowerCase();
  const name = process.env.ADMIN_NAME ?? "Mobikonnect Admin";
  const generated = !process.env.ADMIN_PASSWORD;
  const password = process.env.ADMIN_PASSWORD ?? randomBytes(12).toString("base64url");

  const existing = await db.query.adminUsers.findFirst({
    where: eq(schema.adminUsers.email, email),
  });

  if (existing) {
    console.log(`✓ Admin user already exists: ${email} (role: ${existing.role})`);
  } else {
    await db.insert(schema.adminUsers).values({
      email,
      name,
      role: "admin",
      passwordHash: await hashPassword(password),
    });
    console.log(`✓ Created admin user: ${email}`);
    if (generated) {
      console.log(`\n  Password (shown once — save it now): ${password}\n`);
    }
  }

  for (const c of STARTER_CATEGORIES) {
    const slug = slugify(c.name);
    const found = await db.query.categories.findFirst({
      where: eq(schema.categories.slug, slug),
    });
    if (!found) {
      await db.insert(schema.categories).values({ name: c.name, slug, description: c.description });
      console.log(`✓ Category: ${c.name}`);
    }
  }

  console.log("\nDone. Sign in at https://admin.mobikonnect.com (or http://localhost:3000/admin in dev).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
