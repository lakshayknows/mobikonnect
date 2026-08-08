"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Play, Upload, X } from "lucide-react";
import { listMediaAction, uploadMediaAction } from "@/app/(admin)/admin/actions";
import { Button, FormError } from "@/components/admin/ui";

type MediaKind = "image" | "video";
type Blob = { url: string; pathname: string; size: number; uploadedAt: string; kind: MediaKind };

const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif,image/avif";
const VIDEO_ACCEPT = "video/mp4,video/webm";

/** Modal for picking an existing upload or adding a new one. */
export function MediaPicker({
  onSelect,
  onClose,
  allowVideo = false,
  folder = "blog",
}: {
  onSelect: (url: string | null, kind?: MediaKind) => void;
  onClose: () => void;
  /** Case-study heroes can be campaign films; post images cannot. */
  allowVideo?: boolean;
  folder?: string;
}) {
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>();
  const fileInput = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { blobs: rows } = await listMediaAction();
      setBlobs(allowVideo ? rows : rows.filter((b) => b.kind === "image"));
    } catch {
      setError("Could not load the media library.");
    } finally {
      setLoading(false);
    }
  }, [allowVideo]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function handleUpload(file: File) {
    setError(undefined);
    setUploading(true);
    try {
      const data = new FormData();
      data.set("file", file);
      data.set("folder", folder);
      const result = await uploadMediaAction(data);
      if (result.error) setError(result.error);
      else if (result.url) onSelect(result.url, result.kind);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-deep/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={allowVideo ? "Choose an image or video" : "Choose an image"}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-card border border-cream-line bg-ink">
        <div className="flex items-center justify-between border-b border-cream-line px-6 py-4">
          <h2 className="display text-base text-cream">
            {allowVideo ? "Choose an image or video" : "Choose an image"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-cream-dim transition-colors hover:bg-ink-soft hover:text-cream"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-cream-line px-6 py-4">
          {error && (
            <div className="mb-3">
              <FormError>{error}</FormError>
            </div>
          )}
          <input
            ref={fileInput}
            type="file"
            accept={allowVideo ? `${IMAGE_ACCEPT},${VIDEO_ACCEPT}` : IMAGE_ACCEPT}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleUpload(file);
              e.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="secondary"
            disabled={uploading}
            onClick={() => fileInput.current?.click()}
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Uploading…" : allowVideo ? "Upload image or video" : "Upload new image"}
          </Button>
          <p className="mt-2 text-xs text-cream-faint">
            JPEG, PNG, WebP, GIF or AVIF up to 10 MB
            {allowVideo && " · MP4 or WebM up to 50 MB"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-14 text-cream-faint">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : blobs.length === 0 ? (
            <p className="py-14 text-center text-sm text-cream-faint">
              Nothing uploaded yet. Add your first file above.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {blobs.map((b) => (
                <button
                  key={b.url}
                  type="button"
                  onClick={() => onSelect(b.url, b.kind)}
                  className="group relative overflow-hidden rounded-lg border border-cream-line transition-colors hover:border-coral"
                >
                  {b.kind === "video" ? (
                    <>
                      <video
                        src={b.url}
                        muted
                        playsInline
                        preload="metadata"
                        className="aspect-square w-full bg-ink-soft object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-ink/40">
                        <Play className="h-6 w-6 text-cream" />
                      </span>
                    </>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element -- remote Blob URL thumbnail
                    <img
                      src={b.url}
                      alt={b.pathname}
                      loading="lazy"
                      className="aspect-square w-full bg-ink-soft object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
