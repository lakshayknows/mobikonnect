import { listCategories, listTags } from "@/lib/db/queries";
import { PostEditor } from "@/components/admin/PostEditor";

export const metadata = { title: "New post" };
export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const [categories, tags] = await Promise.all([
    listCategories().catch(() => []),
    listTags().catch(() => []),
  ]);

  return (
    <PostEditor
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      tags={tags.map((t) => ({ id: t.id, name: t.name }))}
    />
  );
}
