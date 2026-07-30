import { listTags } from "@/lib/db/queries";
import { deleteTagAction, saveTagAction } from "@/app/(admin)/admin/actions";
import { TaxonomyManager } from "@/components/admin/TaxonomyManager";

export const metadata = { title: "Tags" };
export const dynamic = "force-dynamic";

export default async function TagsPage() {
  const tags = await listTags().catch(() => []);

  return (
    <>
      <div className="mb-8">
        <p className="eyebrow text-cream-dim">Taxonomy</p>
        <h1 className="display mt-2 text-3xl text-cream">Tags</h1>
        <p className="mt-2 text-sm text-cream-dim">
          A post can carry many tags. Each tag gets its own filtered view on the blog.
        </p>
      </div>

      <TaxonomyManager
        items={tags.map((t) => ({ id: t.id, name: t.name, slug: t.slug }))}
        singular="Tag"
        plural="Tags"
        saveAction={saveTagAction}
        deleteAction={deleteTagAction}
      />
    </>
  );
}
