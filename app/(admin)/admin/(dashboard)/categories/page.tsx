import { listCategories } from "@/lib/db/queries";
import { deleteCategoryAction, saveCategoryAction } from "@/app/(admin)/admin/actions";
import { TaxonomyManager } from "@/components/admin/TaxonomyManager";

export const metadata = { title: "Categories" };
export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await listCategories().catch(() => []);

  return (
    <>
      <div className="mb-8">
        <p className="eyebrow text-cream-dim">Taxonomy</p>
        <h1 className="display mt-2 text-3xl text-cream">Categories</h1>
        <p className="mt-2 text-sm text-cream-dim">
          A post belongs to one category. Categories become filter pills on the blog.
        </p>
      </div>

      <TaxonomyManager
        items={categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
        }))}
        singular="Category"
        plural="Categories"
        withDescription
        saveAction={saveCategoryAction}
        deleteAction={deleteCategoryAction}
      />
    </>
  );
}
