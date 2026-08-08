/**
 * Moves the 20 hardcoded case studies from lib/content.ts into the database,
 * so the team can edit them in the admin portal.
 *
 *   npm run db:seed:case-studies
 *
 * Idempotent — any slug that already exists is skipped, never overwritten. That
 * makes it safe to re-run after adding a new entry to the array, and it will
 * never clobber an edit made in the admin.
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { inArray } from "drizzle-orm";
import * as schema from "../lib/db/schema";
import { caseStudies as seedData } from "../lib/content";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set. Run `vercel env pull .env.local --yes` first.");
    process.exit(1);
  }

  const db = drizzle(neon(url), { schema });

  const slugs = seedData.map((c) => c.slug);
  const existing = await db
    .select({ slug: schema.caseStudies.slug })
    .from(schema.caseStudies)
    .where(inArray(schema.caseStudies.slug, slugs));
  const taken = new Set(existing.map((r) => r.slug));

  const rows = seedData
    .map((study, index) => ({ study, index }))
    .filter(({ study }) => !taken.has(study.slug))
    .map(({ study, index }) => ({
      slug: study.slug,
      brand: study.brand,
      title: study.title,
      category: study.category,
      summary: study.summary,
      challenge: study.challenge,
      objective: study.objective,
      solution: study.solution,
      techUsed: [...study.techUsed],
      results: [...study.results],
      metrics: study.metrics.map((m) => ({ value: m.value, label: m.label })),
      accent: study.accent,
      mediaUrl: study.media ?? null,
      // Every seeded asset is an mp4; uploads set this explicitly from the MIME type.
      mediaKind: study.media ? ("video" as const) : null,
      status: "published" as const,
      // Tens preserve the current order and leave room to slot entries between.
      sortOrder: (index + 1) * 10,
    }));

  if (rows.length === 0) {
    console.log(`✓ Nothing to do — all ${seedData.length} case studies are already in the database.`);
  } else {
    await db.insert(schema.caseStudies).values(rows);
    console.log(`✓ Inserted ${rows.length} case ${rows.length === 1 ? "study" : "studies"}:`);
    for (const r of rows) console.log(`    ${String(r.sortOrder).padStart(4)}  ${r.slug}`);
  }

  if (taken.size > 0) {
    console.log(`  Skipped ${taken.size} already present.`);
  }

  const all = await db.select().from(schema.caseStudies);
  const published = all.filter((c) => c.status === "published").length;
  const blue = all.filter((c) => c.accent === "blue").length;
  const withMedia = all.filter((c) => c.mediaUrl).length;
  console.log(
    `\nDatabase now holds ${all.length} case studies — ${published} published, ` +
      `${blue} blue / ${all.length - blue} coral, ${withMedia} with media.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
