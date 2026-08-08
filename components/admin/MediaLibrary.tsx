"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, Loader2, Trash2, Upload } from "lucide-react";
import { deleteMediaAction, uploadMediaAction } from "@/app/(admin)/admin/actions";
import { Button, EmptyState, FormError } from "@/components/admin/ui";

type Blob = {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  kind: "image" | "video";
};

const formatSize = (bytes: number) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} kB`;

export function MediaLibrary({ blobs }: { blobs: Blob[] }) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>();
  const [copied, setCopied] = useState<string>();

  async function handleUpload(file: File) {
    setError(undefined);
    setUploading(true);
    try {
      const data = new FormData();
      data.set("file", file);
      const result = await uploadMediaAction(data);
      if (result.error) setError(result.error);
      else router.refresh();
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(undefined), 1800);
    } catch {
      setError("Could not copy to clipboard.");
    }
  }

  return (
    <>
      <div className="mb-6 space-y-3">
        {error && <FormError>{error}</FormError>}
        <input
          ref={fileInput}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleUpload(file);
            e.target.value = "";
          }}
        />
        <Button type="button" disabled={uploading} onClick={() => fileInput.current?.click()}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Uploading…" : "Upload media"}
        </Button>
        <p className="text-xs text-cream-faint">
          JPEG, PNG, WebP, GIF or AVIF up to 10 MB · MP4 or WebM up to 50 MB
        </p>
      </div>

      {blobs.length === 0 ? (
        <EmptyState
          title="No images yet"
          description="Uploads appear here and can be reused as cover images or inside posts."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blobs.map((b) => (
            <div key={b.url} className="overflow-hidden rounded-card border border-cream-line bg-ink-soft/30">
              {b.kind === "video" ? (
                <video
                  src={b.url}
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  className="aspect-[16/10] w-full bg-ink-deep object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- remote Blob URL
                <img
                  src={b.url}
                  alt={b.pathname}
                  loading="lazy"
                  className="aspect-[16/10] w-full bg-ink-deep object-cover"
                />
              )}
              <div className="p-4">
                <p className="truncate text-xs text-cream" title={b.pathname}>
                  {b.pathname.replace(/^blog\//, "")}
                </p>
                <p className="mt-1 text-[0.68rem] text-cream-faint">
                  {formatSize(b.size)} ·{" "}
                  {new Date(b.uploadedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button type="button" variant="secondary" size="sm" onClick={() => copyUrl(b.url)}>
                    {copied === b.url ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied === b.url ? "Copied" : "Copy URL"}
                  </Button>
                  <form
                    action={deleteMediaAction}
                    onSubmit={(e) => {
                      if (!window.confirm("Delete this image? Posts using it will show a broken image.")) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="url" value={b.url} />
                    <Button type="submit" variant="danger" size="sm" aria-label="Delete image">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
