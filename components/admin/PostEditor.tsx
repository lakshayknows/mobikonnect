"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { ArrowLeft, Check, ExternalLink, History, Loader2, Trash2, Upload, X } from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { MediaPicker } from "@/components/admin/MediaPicker";
import {
  AdminCard,
  Button,
  Checkbox,
  Field,
  FormError,
  FormSuccess,
  Input,
  Select,
  SubmitButton,
  Textarea,
} from "@/components/admin/ui";
import {
  checkSlugAction,
  deletePostAction,
  restoreRevisionAction,
  savePostAction,
} from "@/app/(admin)/admin/actions";
import { excerptFrom, readingMinutes, slugify, toDateTimeLocal } from "@/lib/blog";
import { cn } from "@/lib/cn";

type Category = { id: string; name: string };
type Tag = { id: string; name: string };
type Revision = {
  id: string;
  title: string;
  createdAt: Date | string;
  author?: { name: string } | null;
};

export type EditorPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  bodyJson: unknown;
  bodyHtml: string;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  status: "draft" | "scheduled" | "published";
  publishedAt: Date | string | null;
  categoryId: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImageUrl: string | null;
  featured: boolean;
  accent: "blue" | "coral";
  tagIds: string[];
};

export function PostEditor({
  post,
  categories,
  tags,
  revisions = [],
  notice,
}: {
  post?: EditorPost;
  categories: Category[];
  tags: Tag[];
  revisions?: Revision[];
  notice?: string;
}) {
  const [state, formAction] = useFormState(savePostAction, undefined);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "ok" | "taken">("idle");

  const [body, setBody] = useState<{ html: string; json: unknown }>({
    html: post?.bodyHtml ?? "",
    json: post?.bodyJson ?? null,
  });
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [status, setStatus] = useState(post?.status ?? "draft");
  const [publishedAt, setPublishedAt] = useState(toDateTimeLocal(post?.publishedAt));
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl ?? "");
  const [coverImageAlt, setCoverImageAlt] = useState(post?.coverImageAlt ?? "");
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(post?.seoDescription ?? "");
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tagIds ?? []);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<"cover" | "inline">("cover");
  const inlineResolver = useRef<((url: string | null) => void) | null>(null);
  const [, startTransition] = useTransition();

  // Slug follows the title until an author edits it by hand.
  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  // Debounced uniqueness check.
  useEffect(() => {
    if (!slug) return setSlugStatus("idle");
    setSlugStatus("checking");
    const timer = setTimeout(() => {
      startTransition(async () => {
        try {
          const result = await checkSlugAction(slug, post?.id);
          setSlugStatus(result.available ? "ok" : "taken");
        } catch {
          setSlugStatus("idle");
        }
      });
    }, 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, post?.id]);

  const minutes = useMemo(() => readingMinutes(body.html), [body.html]);
  const autoExcerpt = useMemo(() => excerptFrom(body.html), [body.html]);
  const effectiveExcerpt = excerpt || autoExcerpt;
  const serpTitle = seoTitle || title || "Untitled post";
  const serpDescription = seoDescription || effectiveExcerpt;

  const requestInlineImage = () =>
    new Promise<string | null>((resolve) => {
      inlineResolver.current = resolve;
      setPickerTarget("inline");
      setPickerOpen(true);
    });

  const handlePicked = (url: string | null) => {
    setPickerOpen(false);
    if (pickerTarget === "cover") {
      if (url) setCoverImageUrl(url);
    } else {
      inlineResolver.current?.(url);
      inlineResolver.current = null;
    }
  };

  return (
    <>
      <form action={formAction} className="pb-16">
        {post && <input type="hidden" name="id" value={post.id} />}
        <input type="hidden" name="bodyHtml" value={body.html} />
        <input type="hidden" name="bodyJson" value={JSON.stringify(body.json ?? null)} />
        <input type="hidden" name="coverImageUrl" value={coverImageUrl} />
        {selectedTags.map((id) => (
          <input key={id} type="hidden" name="tagIds" value={id} />
        ))}

        {/* Header */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-2 text-sm text-cream-dim transition-colors hover:text-cream"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {post && status === "published" && (
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-cream-dim transition-colors hover:text-cream"
              >
                <ExternalLink className="h-4 w-4" />
                View live
              </a>
            )}
            <SubmitButton pendingLabel="Saving…">
              {post ? "Save changes" : "Create post"}
            </SubmitButton>
          </div>
        </div>

        <div className="space-y-4">
          <FormError>{state?.error}</FormError>
          <FormSuccess>{state?.success ?? notice}</FormSuccess>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main column */}
          <div className="space-y-6">
            <AdminCard className="space-y-5">
              <Field label="Title" htmlFor="title" required>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="The state of experiential marketing in India"
                  required
                  maxLength={200}
                />
              </Field>

              <Field
                label="Slug"
                htmlFor="slug"
                hint={
                  <span className="flex items-center gap-1.5">
                    <span className="text-cream-faint">/blog/{slug || "…"}</span>
                    {slugStatus === "checking" && <Loader2 className="h-3 w-3 animate-spin" />}
                    {slugStatus === "ok" && <Check className="h-3 w-3 text-blue" />}
                  </span>
                }
                error={slugStatus === "taken" ? "That slug is taken — it will be given a suffix on save." : undefined}
              >
                <Input
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setSlug(e.target.value);
                  }}
                  placeholder="auto-generated-from-title"
                />
              </Field>

              <Field
                label="Excerpt"
                htmlFor="excerpt"
                hint={
                  excerpt
                    ? `${excerpt.length}/400 characters`
                    : "Leave blank to use the opening of the post."
                }
              >
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder={autoExcerpt || "A one- or two-sentence summary shown on cards and in search results."}
                  maxLength={400}
                />
              </Field>
            </AdminCard>

            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <span className="eyebrow text-[0.7rem] text-cream-dim">Body</span>
                <span className="text-xs text-cream-faint">{minutes} min read</span>
              </div>
              <RichTextEditor
                initialContent={post?.bodyJson ?? post?.bodyHtml ?? ""}
                onChange={setBody}
                onRequestImage={requestInlineImage}
              />
            </div>

            {/* SEO */}
            <AdminCard className="space-y-5">
              <h3 className="display text-base text-cream">Search appearance</h3>

              <div className="rounded-lg border border-cream-line bg-ink-deep p-4">
                <p className="truncate text-xs text-cream-faint">
                  mobikonnect.com › blog › {slug || "…"}
                </p>
                <p className="mt-1 truncate text-base text-blue">{serpTitle}</p>
                <p className="mt-1 line-clamp-2 text-sm text-cream-dim">
                  {serpDescription || "No description yet."}
                </p>
              </div>

              <Field
                label="Meta title"
                htmlFor="seoTitle"
                hint={`${serpTitle.length}/60 — Google usually truncates past 60 characters.`}
              >
                <Input
                  id="seoTitle"
                  name="seoTitle"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={title || "Defaults to the post title"}
                  maxLength={200}
                />
              </Field>

              <Field
                label="Meta description"
                htmlFor="seoDescription"
                hint={`${serpDescription.length}/160 — aim for 140–160 characters.`}
              >
                <Textarea
                  id="seoDescription"
                  name="seoDescription"
                  rows={3}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder={effectiveExcerpt || "Defaults to the excerpt"}
                  maxLength={400}
                />
              </Field>

              <Field label="Social share image URL" htmlFor="ogImageUrl" hint="Defaults to the cover image.">
                <Input
                  id="ogImageUrl"
                  name="ogImageUrl"
                  defaultValue={post?.ogImageUrl ?? ""}
                  placeholder="https://…"
                />
              </Field>
            </AdminCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AdminCard className="space-y-5">
              <h3 className="display text-base text-cream">Publishing</h3>

              <Field label="Status" htmlFor="status">
                <Select
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as typeof status)}
                >
                  <option value="draft">Draft — only visible here</option>
                  <option value="scheduled">Scheduled — goes live automatically</option>
                  <option value="published">Published — live now</option>
                </Select>
              </Field>

              {(status === "scheduled" || status === "published") && (
                <Field
                  label={status === "scheduled" ? "Publish at" : "Publish date"}
                  htmlFor="publishedAt"
                  hint={status === "published" && !publishedAt ? "Leave blank to publish now." : undefined}
                  required={status === "scheduled"}
                >
                  <Input
                    id="publishedAt"
                    name="publishedAt"
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                  />
                </Field>
              )}

              <Field label="Category" htmlFor="categoryId">
                <Select id="categoryId" name="categoryId" defaultValue={post?.categoryId ?? ""}>
                  <option value="">Uncategorised</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Card accent" htmlFor="accent" hint="Blue or coral tint on the blog card.">
                <Select id="accent" name="accent" defaultValue={post?.accent ?? "blue"}>
                  <option value="blue">Blue</option>
                  <option value="coral">Coral</option>
                </Select>
              </Field>

              <Checkbox
                name="featured"
                label="Feature at the top of the blog"
                defaultChecked={post?.featured ?? false}
              />
            </AdminCard>

            {/* Cover image */}
            <AdminCard className="space-y-4">
              <h3 className="display text-base text-cream">Cover image</h3>

              {coverImageUrl ? (
                <div className="space-y-3">
                  <div className="relative overflow-hidden rounded-lg border border-cream-line">
                    {/* eslint-disable-next-line @next/next/no-img-element -- remote Blob URL preview */}
                    <img src={coverImageUrl} alt="" className="aspect-[16/9] w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setCoverImageUrl("")}
                      aria-label="Remove cover image"
                      className="absolute right-2 top-2 rounded-full bg-ink/80 p-1.5 text-cream transition-colors hover:bg-coral"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Field label="Alt text" htmlFor="coverImageAlt" hint="Describe the image for screen readers.">
                    <Input
                      id="coverImageAlt"
                      name="coverImageAlt"
                      value={coverImageAlt}
                      onChange={(e) => setCoverImageAlt(e.target.value)}
                      placeholder="What the image shows"
                    />
                  </Field>
                </div>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      setPickerTarget("cover");
                      setPickerOpen(true);
                    }}
                  >
                    <Upload className="h-4 w-4" />
                    Choose image
                  </Button>
                  <input type="hidden" name="coverImageAlt" value="" />
                </>
              )}
            </AdminCard>

            {/* Tags */}
            <AdminCard className="space-y-4">
              <h3 className="display text-base text-cream">Tags</h3>
              {tags.length === 0 ? (
                <p className="text-xs text-cream-faint">
                  No tags yet —{" "}
                  <Link href="/admin/tags" className="text-coral hover:underline">
                    create some
                  </Link>
                  .
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const on = selectedTags.includes(tag.id);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() =>
                          setSelectedTags((prev) =>
                            on ? prev.filter((t) => t !== tag.id) : [...prev, tag.id],
                          )
                        }
                        className={cn(
                          "rounded-pill border px-3 py-1.5 text-xs transition-colors duration-200",
                          on
                            ? "border-coral bg-coral/10 text-coral"
                            : "border-cream-line text-cream-dim hover:border-cream/40 hover:text-cream",
                        )}
                      >
                        {tag.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </AdminCard>

            {/* Revisions */}
            {post && revisions.length > 0 && (
              <AdminCard className="space-y-4">
                <h3 className="display flex items-center gap-2 text-base text-cream">
                  <History className="h-4 w-4" />
                  History
                </h3>
                <ul className="space-y-2.5">
                  {revisions.slice(0, 8).map((rev) => (
                    <li
                      key={rev.id}
                      className="flex items-center justify-between gap-3 border-b border-cream-line pb-2.5 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs text-cream">{rev.title}</p>
                        <p className="mt-0.5 text-[0.68rem] text-cream-faint">
                          {new Date(rev.createdAt).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {rev.author?.name ? ` · ${rev.author.name}` : ""}
                        </p>
                      </div>
                      <RestoreButton postId={post.id} revisionId={rev.id} />
                    </li>
                  ))}
                </ul>
              </AdminCard>
            )}
          </div>
        </div>
      </form>

      {/* Danger zone — a separate form so it can't submit the editor */}
      {post && <DeletePost postId={post.id} title={post.title} />}

      {pickerOpen && (
        <MediaPicker onSelect={handlePicked} onClose={() => handlePicked(null)} />
      )}
    </>
  );
}

function RestoreButton({ postId, revisionId }: { postId: string; revisionId: string }) {
  return (
    <form action={restoreRevisionAction}>
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="revisionId" value={revisionId} />
      <Button type="submit" variant="ghost" size="sm">
        Restore
      </Button>
    </form>
  );
}

function DeletePost({ postId, title }: { postId: string; title: string }) {
  const [confirming, setConfirming] = useState(false);
  const [typed, setTyped] = useState("");

  return (
    <AdminCard className="mt-2 border-coral/30">
      <h3 className="display text-base text-coral">Delete post</h3>
      <p className="mt-2 text-sm text-cream-dim">
        This removes the post and its history permanently. It cannot be undone.
      </p>

      {confirming ? (
        <form action={deletePostAction} className="mt-4 space-y-3">
          <input type="hidden" name="id" value={postId} />
          <Field label={`Type the title to confirm: ${title}`} htmlFor="confirm-delete">
            <Input
              id="confirm-delete"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder={title}
              autoComplete="off"
            />
          </Field>
          <div className="flex gap-3">
            <SubmitButton variant="danger" disabled={typed !== title} pendingLabel="Deleting…">
              <Trash2 className="h-4 w-4" />
              Delete permanently
            </SubmitButton>
            <Button type="button" variant="ghost" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button type="button" variant="danger" className="mt-4" onClick={() => setConfirming(true)}>
          <Trash2 className="h-4 w-4" />
          Delete this post
        </Button>
      )}
    </AdminCard>
  );
}
