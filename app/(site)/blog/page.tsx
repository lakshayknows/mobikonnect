import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { BlogCard } from "@/components/ui/Cards";
import { Reveal } from "@/components/ui/Reveal";
import { getFeaturedPost, listCategoriesWithCounts, listPublishedPosts } from "@/lib/db/queries";
import { isDbConfigured } from "@/lib/db";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Points of view on experiential marketing, consumer promotions, loyalty and engagement technology — from the team running the campaigns.",
};

type SearchParams = { page?: string; category?: string; tag?: string };

export default async function BlogIndexPage({ searchParams }: { searchParams: SearchParams }) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const { category, tag } = searchParams;

  // The blog degrades to an empty state rather than crashing before the
  // database is provisioned, so the rest of the site keeps building.
  let result = { posts: [] as Awaited<ReturnType<typeof listPublishedPosts>>["posts"], total: 0, page, perPage: 9, totalPages: 0 };
  let categories: Awaited<ReturnType<typeof listCategoriesWithCounts>> = [];
  let featured: Awaited<ReturnType<typeof getFeaturedPost>> = undefined;

  if (isDbConfigured()) {
    try {
      [result, categories, featured] = await Promise.all([
        listPublishedPosts({ page, categorySlug: category, tagSlug: tag }),
        listCategoriesWithCounts(),
        page === 1 && !category && !tag ? getFeaturedPost() : Promise.resolve(undefined),
      ]);
    } catch (error) {
      console.error("[blog] failed to load posts:", error);
    }
  }

  // The featured post gets its own panel, so don't repeat it in the grid.
  const gridPosts = featured ? result.posts.filter((p) => p.id !== featured!.id) : result.posts;
  const activeCategory = categories.find((c) => c.slug === category);
  const hasPosts = result.posts.length > 0;

  const buildHref = (next: { page?: number; category?: string }) => {
    const params = new URLSearchParams();
    const cat = next.category ?? category;
    if (cat) params.set("category", cat);
    if (tag) params.set("tag", tag);
    if (next.page && next.page > 1) params.set("page", String(next.page));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Ideas that move brands."
        highlight={["move", "brands."]}
        intro="Points of view on experiential marketing, promotions, loyalty and engagement technology — written by the people who run the campaigns."
      />

      {/* Category filter */}
      {categories.length > 0 && (
        <section className="gutter pb-10">
          <Reveal>
            <div className="flex flex-wrap gap-3">
              <Link
                href={buildHref({ category: "", page: 1 })}
                data-cursor="hover"
                className={cn(
                  "rounded-pill border px-5 py-2.5 text-sm transition-colors duration-300",
                  !category
                    ? "border-coral bg-coral/10 text-cream"
                    : "border-cream-line bg-ink-soft/40 text-cream/80 hover:border-coral hover:bg-coral/10 hover:text-cream",
                )}
              >
                All
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={buildHref({ category: c.slug, page: 1 })}
                  data-cursor="hover"
                  className={cn(
                    "rounded-pill border px-5 py-2.5 text-sm transition-colors duration-300",
                    category === c.slug
                      ? "border-coral bg-coral/10 text-cream"
                      : "border-cream-line bg-ink-soft/40 text-cream/80 hover:border-coral hover:bg-coral/10 hover:text-cream",
                  )}
                >
                  {c.name}
                  <span className="ml-2 text-cream-faint">{c.postCount}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* Featured post */}
      {featured && (
        <section className="gutter pb-6">
          <Reveal>
            <p className="eyebrow mb-5 text-coral">Featured</p>
          </Reveal>
          <BlogCard post={featured} featured />
        </section>
      )}

      {/* Post grid */}
      <section className="gutter pb-24 sm:pb-32">
        {hasPosts ? (
          <>
            {activeCategory && (
              <Reveal>
                <p className="mb-8 text-sm text-cream-dim">
                  {result.total} post{result.total === 1 ? "" : "s"} in{" "}
                  <span className="text-cream">{activeCategory.name}</span>
                </p>
              </Reveal>
            )}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>

            {result.totalPages > 1 && (
              <Reveal className="mt-14 flex items-center justify-center gap-4">
                <PagerLink href={buildHref({ page: page - 1 })} disabled={page <= 1} direction="prev" />
                <span className="text-sm text-cream-dim">
                  Page {page} of {result.totalPages}
                </span>
                <PagerLink
                  href={buildHref({ page: page + 1 })}
                  disabled={page >= result.totalPages}
                  direction="next"
                />
              </Reveal>
            )}
          </>
        ) : (
          <Reveal>
            <div
              className="frame relative flex min-h-[280px] items-center justify-center px-8 text-center"
              style={{ backgroundImage: "linear-gradient(135deg, #0999D5 0%, #06547a 100%)" }}
            >
              <div className="noise pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
              <div className="relative">
                <p className="display text-xl text-cream sm:text-2xl">
                  {category ? "Nothing published in this category yet." : "The first posts are on their way."}
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm text-cream/70">
                  {category ? (
                    <Link href="/blog" className="link-underline" data-cursor="hover">
                      Browse all posts
                    </Link>
                  ) : (
                    "We're writing up what we've learned running engagement campaigns for India's biggest brands."
                  )}
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </section>

      {/* No closing CTA here: the shared Footer already ends every page with the
          "Let's talk" block, and /CaseStudies (the sibling index) omits it too. */}
    </>
  );
}

function PagerLink({
  href,
  disabled,
  direction,
}: {
  href: string;
  disabled: boolean;
  direction: "prev" | "next";
}) {
  const label = direction === "prev" ? "Previous" : "Next";
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  const className =
    "group inline-flex items-center gap-2 rounded-pill border px-6 py-3 text-sm transition-colors duration-300";

  if (disabled) {
    return (
      <span className={cn(className, "cursor-not-allowed border-cream-line text-cream-faint")}>
        {direction === "prev" && <Icon className="h-4 w-4" />}
        {label}
        {direction === "next" && <Icon className="h-4 w-4" />}
      </span>
    );
  }

  return (
    <Link href={href} data-cursor="hover" className={cn(className, "border-cream/40 text-cream hover:border-cream")}>
      {direction === "prev" && <Icon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />}
      {label}
      {direction === "next" && <Icon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
    </Link>
  );
}
