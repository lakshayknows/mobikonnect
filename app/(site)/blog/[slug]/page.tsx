import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/ui/Cards";
import { PostBody } from "@/components/blog/PostBody";
import {
  getAdjacentPosts,
  getPostBySlug,
  listPublishedSlugs,
  listRelatedPosts,
} from "@/lib/db/queries";
import { isDbConfigured } from "@/lib/db";
import { formatPostDate, isoDate } from "@/lib/blog";
import { site } from "@/lib/content";

/** Rebuild a post at most once a minute; scheduled posts go live on the same tick. */
export const revalidate = 60;
/** Slugs published after the last build still render on first request. */
export const dynamicParams = true;

export async function generateStaticParams() {
  if (!isDbConfigured()) return [];
  try {
    const rows = await listPublishedSlugs();
    return rows.map((r) => ({ slug: r.slug }));
  } catch {
    return [];
  }
}

async function loadPost(slug: string) {
  if (!isDbConfigured()) return undefined;
  try {
    return await getPostBySlug(slug);
  } catch (error) {
    console.error("[blog] failed to load post:", error);
    return undefined;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await loadPost(params.slug);
  if (!post) return { title: "Blog" };

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const image = post.ogImageUrl || post.coverImageUrl || undefined;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: isoDate(post.publishedAt) || undefined,
      modifiedTime: isoDate(post.updatedAt) || undefined,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await loadPost(params.slug);
  if (!post) notFound();

  const [related, adjacent] = await Promise.all([
    listRelatedPosts(post.id, post.categoryId).catch(() => []),
    post.publishedAt
      ? getAdjacentPosts(post.publishedAt).catch(() => ({ previous: undefined, next: undefined }))
      : Promise.resolve({ previous: undefined, next: undefined }),
  ]);

  const postTags = post.postTags?.map((pt) => pt.tag).filter(Boolean) ?? [];
  const isCoral = post.accent === "coral";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.ogImageUrl || post.coverImageUrl || undefined,
    datePublished: isoDate(post.publishedAt) || undefined,
    dateModified: isoDate(post.updatedAt) || undefined,
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `https://${site.domain}/icon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://${site.domain}/blog/${post.slug}` },
    articleSection: post.category?.name,
    keywords: postTags.map((t) => t.name).join(", ") || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Structured data built from our own DB fields, not user-pasted markup.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="gutter pt-36 pb-12 sm:pt-44">
        <Reveal>
          <Link
            href="/blog"
            data-cursor="hover"
            className="inline-flex items-center gap-2 text-sm text-cream-dim transition-colors hover:text-cream"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>
        </Reveal>

        {post.category && <p className="eyebrow mt-8">{post.category.name}</p>}

        <h1 className="display mt-4 max-w-[18ch] break-words text-[clamp(2rem,6.5vw,6rem)] leading-[1.02] tracking-[-0.02em]">
          <RevealText text={post.title} />
        </h1>

        <Reveal delay={0.15}>
          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-cream-dim">
            {post.author?.name && <span className="text-cream">{post.author.name}</span>}
            {post.author?.name && <span aria-hidden>·</span>}
            {post.publishedAt && (
              <time dateTime={isoDate(post.publishedAt)}>{formatPostDate(post.publishedAt)}</time>
            )}
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </Reveal>
      </header>

      {/* Cover — real asset when supplied, brand gradient otherwise */}
      <section className="gutter pb-14">
        {post.coverImageUrl ? (
          <div className="frame relative aspect-[16/7] overflow-hidden bg-ink-soft">
            {/* eslint-disable-next-line @next/next/no-img-element -- remote Blob URL */}
            <img
              src={post.coverImageUrl}
              alt={post.coverImageAlt ?? post.title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div
            className="frame relative flex aspect-[16/7] items-center justify-center"
            style={{
              backgroundImage: isCoral
                ? "linear-gradient(135deg, #D05E62 0%, #b84a4e 100%)"
                : "linear-gradient(135deg, #0999D5 0%, #0a7bac 100%)",
            }}
          >
            <div className="noise pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
            <span className="display text-sm uppercase tracking-label text-cream/80">
              {site.name}
            </span>
          </div>
        )}
      </section>

      {/* Article */}
      <section className="gutter pb-16">
        <div className="mx-auto max-w-3xl">
          {post.excerpt && (
            <p className="mb-10 border-l-2 border-coral pl-6 text-lg leading-relaxed text-cream sm:text-xl">
              {post.excerpt}
            </p>
          )}
          <PostBody html={post.bodyHtml} />

          {postTags.length > 0 && (
            <div className="mt-14 flex flex-wrap gap-3 border-t border-cream-line pt-8">
              {postTags.map((t) => (
                <Link
                  key={t!.id}
                  href={`/blog?tag=${t!.slug}`}
                  data-cursor="hover"
                  className="rounded-pill border border-cream-line bg-ink-soft/40 px-5 py-2.5 text-sm text-cream/80 transition-colors duration-300 hover:border-coral hover:bg-coral/10 hover:text-cream"
                >
                  {t!.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Prev / next */}
      {(adjacent.previous || adjacent.next) && (
        <section className="gutter pb-16">
          <div className="mx-auto grid max-w-3xl gap-px overflow-hidden rounded-frame border border-cream-line bg-cream-line sm:grid-cols-2">
            {adjacent.previous ? (
              <Link
                href={`/blog/${adjacent.previous.slug}`}
                data-cursor="hover"
                className="group bg-ink p-7 transition-colors duration-500 hover:bg-ink-soft sm:p-8"
              >
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-label text-cream-faint">
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  Previous
                </span>
                <p className="display mt-3 text-lg leading-tight">{adjacent.previous.title}</p>
              </Link>
            ) : (
              <span className="bg-ink" />
            )}
            {adjacent.next ? (
              <Link
                href={`/blog/${adjacent.next.slug}`}
                data-cursor="hover"
                className="group bg-ink p-7 text-right transition-colors duration-500 hover:bg-ink-soft sm:p-8"
              >
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-label text-cream-faint">
                  Next
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
                <p className="display mt-3 text-lg leading-tight">{adjacent.next.title}</p>
              </Link>
            ) : (
              <span className="bg-ink" />
            )}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="gutter pb-20">
          <Reveal>
            <p className="eyebrow mb-8">Keep reading</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {related.map((p, i) => (
              <BlogCard key={p.id} post={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* No closing CTA: the shared Footer already ends every page with the
          "Let's talk" block, matching /CaseStudies/[slug]. */}
      <div className="pb-8" />
    </>
  );
}
