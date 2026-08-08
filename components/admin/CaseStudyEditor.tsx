"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { ArrowLeft, Check, ExternalLink, History, Loader2, Trash2, Upload, X } from "lucide-react";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { MetricListField, StringListField } from "@/components/admin/RepeatableField";
import {
  AdminCard,
  Button,
  Field,
  FormError,
  FormSuccess,
  Input,
  Select,
  SubmitButton,
  Textarea,
} from "@/components/admin/ui";
import {
  checkCaseStudySlugAction,
  deleteCaseStudyAction,
  restoreCaseStudyRevisionAction,
  saveCaseStudyAction,
} from "@/app/(admin)/admin/actions";
import { slugify } from "@/lib/blog";

type Revision = {
  id: string;
  title: string;
  createdAt: Date | string;
  author?: { name: string } | null;
};

export type EditorCaseStudy = {
  id: string;
  slug: string;
  brand: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  objective: string;
  solution: string;
  techUsed: string[];
  results: string[];
  metrics: { value: string; label: string }[];
  accent: "blue" | "coral";
  mediaUrl: string | null;
  mediaKind: "image" | "video" | null;
  status: "draft" | "published";
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  ogImageUrl: string | null;
};

export function CaseStudyEditor({
  study,
  categories,
  revisions = [],
  notice,
  nextSortOrder,
}: {
  study?: EditorCaseStudy;
  /** Existing category strings, offered as a datalist so spelling stays consistent. */
  categories: string[];
  revisions?: Revision[];
  notice?: string;
  nextSortOrder?: number;
}) {
  const [state, formAction] = useFormState(saveCaseStudyAction, undefined);

  const [brand, setBrand] = useState(study?.brand ?? "");
  const [title, setTitle] = useState(study?.title ?? "");
  const [slug, setSlug] = useState(study?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(study?.slug));
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "ok" | "taken">("idle");

  const [summary, setSummary] = useState(study?.summary ?? "");
  const [seoTitle, setSeoTitle] = useState(study?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(study?.seoDescription ?? "");

  const [mediaUrl, setMediaUrl] = useState(study?.mediaUrl ?? "");
  const [mediaKind, setMediaKind] = useState<"image" | "video" | "">(study?.mediaKind ?? "");
  const [pickerOpen, setPickerOpen] = useState(false);

  const [, startTransition] = useTransition();

  // Slug follows the title until an author edits it by hand.
  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  useEffect(() => {
    if (!slug) return setSlugStatus("idle");
    setSlugStatus("checking");
    const timer = setTimeout(() => {
      startTransition(async () => {
        try {
          const result = await checkCaseStudySlugAction(slug, study?.id);
          setSlugStatus(result.available ? "ok" : "taken");
        } catch {
          setSlugStatus("idle");
        }
      });
    }, 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, study?.id]);

  const serpTitle = seoTitle || (brand && title ? `${brand} — ${title}` : title || "Untitled");
  const serpDescription = seoDescription || summary;

  return (
    <>
      <form action={formAction} className="pb-16">
        {study && <input type="hidden" name="id" value={study.id} />}
        <input type="hidden" name="mediaUrl" value={mediaUrl} />
        <input type="hidden" name="mediaKind" value={mediaUrl ? mediaKind : ""} />

        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/admin/case-studies"
            className="inline-flex items-center gap-2 text-sm text-cream-dim transition-colors hover:text-cream"
          >
            <ArrowLeft className="h-4 w-4" />
            All case studies
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {study && study.status === "published" && (
              <a
                href={`/CaseStudies/${study.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-cream-dim transition-colors hover:text-cream"
              >
                <ExternalLink className="h-4 w-4" />
                View live
              </a>
            )}
            <SubmitButton pendingLabel="Saving…">
              {study ? "Save changes" : "Create case study"}
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
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Brand" htmlFor="brand" required>
                  <Input
                    id="brand"
                    name="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Cadbury Perk"
                    required
                  />
                </Field>

                <Field label="Category" htmlFor="category" required hint="Shown on the card pill.">
                  <Input
                    id="category"
                    name="category"
                    defaultValue={study?.category ?? ""}
                    placeholder="Gamified Consumer Promotion"
                    list="case-study-categories"
                    required
                  />
                  <datalist id="case-study-categories">
                    {categories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </Field>
              </div>

              <Field label="Campaign title" htmlFor="title" required>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Play & Win"
                  required
                />
              </Field>

              <Field
                label="Slug"
                htmlFor="slug"
                hint={
                  <span className="flex items-center gap-1.5">
                    <span className="text-cream-faint">/CaseStudies/{slug || "…"}</span>
                    {slugStatus === "checking" && <Loader2 className="h-3 w-3 animate-spin" />}
                    {slugStatus === "ok" && <Check className="h-3 w-3 text-blue" />}
                  </span>
                }
                error={
                  slugStatus === "taken"
                    ? "That slug is taken — it will be given a suffix on save."
                    : undefined
                }
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
                label="Summary"
                htmlFor="summary"
                required
                hint="The paragraph on the card. One or two sentences."
              >
                <Textarea
                  id="summary"
                  name="summary"
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="A 90-day obstacle-dodging game joined by missed call or microsite…"
                  required
                  maxLength={600}
                />
              </Field>
            </AdminCard>

            {/* The three columns on the detail page */}
            <AdminCard className="space-y-5">
              <div>
                <h3 className="display text-base text-cream">Challenge · Objective · Solution</h3>
                <p className="mt-1.5 text-xs text-cream-faint">
                  The three-column band on the detail page. Plain text — no formatting.
                </p>
              </div>

              <Field label="Challenge" htmlFor="challenge">
                <Textarea
                  id="challenge"
                  name="challenge"
                  rows={3}
                  defaultValue={study?.challenge ?? ""}
                  placeholder="What the brand needed to solve."
                  maxLength={1200}
                />
              </Field>

              <Field label="Objective" htmlFor="objective">
                <Textarea
                  id="objective"
                  name="objective"
                  rows={2}
                  defaultValue={study?.objective ?? ""}
                  placeholder="What success looked like."
                  maxLength={1200}
                />
              </Field>

              <Field label="Solution" htmlFor="solution">
                <Textarea
                  id="solution"
                  name="solution"
                  rows={3}
                  defaultValue={study?.solution ?? ""}
                  placeholder="The mechanic we built and ran."
                  maxLength={1200}
                />
              </Field>
            </AdminCard>

            <AdminCard className="space-y-6">
              <MetricListField initial={study?.metrics ?? []} />

              <StringListField
                name="techUsed"
                label="Technology used"
                initial={study?.techUsed ?? []}
                placeholder="Missed-call platform"
                hint="Rendered as pill chips on the detail page."
                addLabel="Add technology"
              />

              <StringListField
                name="results"
                label="Results"
                initial={study?.results ?? []}
                placeholder="1,200 voucher winners"
                hint="Rendered as a ticked list on the detail page."
                addLabel="Add result"
              />
            </AdminCard>

            {/* SEO */}
            <AdminCard className="space-y-5">
              <h3 className="display text-base text-cream">Search appearance</h3>

              <div className="rounded-lg border border-cream-line bg-ink-deep p-4">
                <p className="truncate text-xs text-cream-faint">
                  mobikonnect.com › CaseStudies › {slug || "…"}
                </p>
                <p className="mt-1 truncate text-base text-blue">{serpTitle}</p>
                <p className="mt-1 line-clamp-2 text-sm text-cream-dim">
                  {serpDescription || "No description yet."}
                </p>
              </div>

              <Field
                label="Meta title"
                htmlFor="seoTitle"
                hint={`${serpTitle.length}/60 — blank uses "Brand — Title".`}
              >
                <Input
                  id="seoTitle"
                  name="seoTitle"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={brand && title ? `${brand} — ${title}` : "Defaults to Brand — Title"}
                  maxLength={200}
                />
              </Field>

              <Field
                label="Meta description"
                htmlFor="seoDescription"
                hint={`${serpDescription.length}/160 — blank uses the summary.`}
              >
                <Textarea
                  id="seoDescription"
                  name="seoDescription"
                  rows={3}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder={summary || "Defaults to the summary"}
                  maxLength={400}
                />
              </Field>

              <Field label="Meta keywords" htmlFor="seoKeywords" hint="Comma separated. Optional.">
                <Input
                  id="seoKeywords"
                  name="seoKeywords"
                  defaultValue={study?.seoKeywords ?? ""}
                  placeholder="consumer promotion, gamification"
                  maxLength={300}
                />
              </Field>

              <Field label="Social share image URL" htmlFor="ogImageUrl">
                <Input
                  id="ogImageUrl"
                  name="ogImageUrl"
                  defaultValue={study?.ogImageUrl ?? ""}
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
                <Select id="status" name="status" defaultValue={study?.status ?? "draft"}>
                  <option value="draft">Draft — only visible here</option>
                  <option value="published">Published — live on the site</option>
                </Select>
              </Field>

              <Field
                label="Display order"
                htmlFor="sortOrder"
                hint="Ascending. The homepage shows the first six."
              >
                <Input
                  id="sortOrder"
                  name="sortOrder"
                  type="number"
                  step={10}
                  defaultValue={study?.sortOrder ?? nextSortOrder ?? 0}
                />
              </Field>

              <Field label="Card accent" htmlFor="accent" hint="Blue or coral tint on the card.">
                <Select id="accent" name="accent" defaultValue={study?.accent ?? "blue"}>
                  <option value="blue">Blue</option>
                  <option value="coral">Coral</option>
                </Select>
              </Field>
            </AdminCard>

            {/* Hero media */}
            <AdminCard className="space-y-4">
              <div>
                <h3 className="display text-base text-cream">Hero media</h3>
                <p className="mt-1.5 text-xs text-cream-faint">
                  Leave empty for the brand gradient placeholder.
                </p>
              </div>

              {mediaUrl ? (
                <div className="space-y-3">
                  <div className="relative overflow-hidden rounded-lg border border-cream-line">
                    {mediaKind === "video" ? (
                      <video
                        src={mediaUrl}
                        muted
                        loop
                        autoPlay
                        playsInline
                        className="aspect-[16/7] w-full object-cover"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element -- remote Blob URL preview
                      <img src={mediaUrl} alt="" className="aspect-[16/7] w-full object-cover" />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setMediaUrl("");
                        setMediaKind("");
                      }}
                      aria-label="Remove hero media"
                      className="absolute right-2 top-2 rounded-full bg-ink/80 p-1.5 text-cream transition-colors hover:bg-coral"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="truncate text-[0.68rem] text-cream-faint">
                    {mediaKind === "video" ? "Video" : "Image"} · {mediaUrl}
                  </p>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={() => setPickerOpen(true)}
                >
                  <Upload className="h-4 w-4" />
                  Choose media
                </Button>
              )}
            </AdminCard>

            {/* Revisions */}
            {study && revisions.length > 0 && (
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
                      <RestoreButton caseStudyId={study.id} revisionId={rev.id} />
                    </li>
                  ))}
                </ul>
              </AdminCard>
            )}
          </div>
        </div>
      </form>

      {study && <DeleteCaseStudy id={study.id} title={study.title} />}

      {pickerOpen && (
        <MediaPicker
          allowVideo
          folder="case-studies"
          onClose={() => setPickerOpen(false)}
          onSelect={(url, kind) => {
            setPickerOpen(false);
            if (url) {
              setMediaUrl(url);
              setMediaKind(kind ?? "image");
            }
          }}
        />
      )}
    </>
  );
}

function RestoreButton({ caseStudyId, revisionId }: { caseStudyId: string; revisionId: string }) {
  return (
    <form action={restoreCaseStudyRevisionAction}>
      <input type="hidden" name="caseStudyId" value={caseStudyId} />
      <input type="hidden" name="revisionId" value={revisionId} />
      <Button type="submit" variant="ghost" size="sm">
        Restore
      </Button>
    </form>
  );
}

function DeleteCaseStudy({ id, title }: { id: string; title: string }) {
  const [confirming, setConfirming] = useState(false);
  const [typed, setTyped] = useState("");

  return (
    <AdminCard className="mt-2 border-coral/30">
      <h3 className="display text-base text-coral">Delete case study</h3>
      <p className="mt-2 text-sm text-cream-dim">
        This removes the case study and its history permanently. It cannot be undone.
      </p>

      {confirming ? (
        <form action={deleteCaseStudyAction} className="mt-4 space-y-3">
          <input type="hidden" name="id" value={id} />
          <Field label={`Type the title to confirm: ${title}`} htmlFor="confirm-delete-cs">
            <Input
              id="confirm-delete-cs"
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
          Delete this case study
        </Button>
      )}
    </AdminCard>
  );
}
