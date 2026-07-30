import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Lazy DB handle.
 *
 * `neon()` throws when DATABASE_URL is unset, and Next evaluates top-level
 * module code at build time — so creating the client eagerly would break
 * `next build` on any machine without the env var. Deliberately a plain
 * function rather than a Proxy: Proxy wrappers break libraries that introspect
 * the client object.
 */
function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Run `vercel env pull .env.local --yes` after provisioning Neon.",
    );
  }
  return drizzle(neon(url), { schema });
}

let cached: ReturnType<typeof createDb> | null = null;

export function getDb() {
  if (!cached) cached = createDb();
  return cached;
}

/** True when the database has been provisioned — lets pages degrade instead of crashing. */
export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export { schema };
