import { listMediaAction } from "@/app/(admin)/admin/actions";
import { MediaLibrary } from "@/components/admin/MediaLibrary";

export const metadata = { title: "Media" };
export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const { blobs } = await listMediaAction();
  const configured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <>
      <div className="mb-8">
        <p className="eyebrow text-cream-dim">Assets</p>
        <h1 className="display mt-2 text-3xl text-cream">Media</h1>
      </div>

      {!configured && (
        <div className="mb-6 rounded-card border border-coral/40 bg-coral/10 p-5 text-sm text-coral">
          <p className="font-medium">Blob storage is not configured</p>
          <p className="mt-2 text-coral/80">
            Run <code className="rounded bg-ink-deep px-1.5 py-0.5">vercel integration add blob</code>{" "}
            then <code className="rounded bg-ink-deep px-1.5 py-0.5">vercel env pull .env.local</code>.
          </p>
        </div>
      )}

      <MediaLibrary blobs={blobs} />
    </>
  );
}
