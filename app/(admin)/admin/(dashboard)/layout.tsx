import { requireSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

/**
 * Authenticated area. `requireSession` runs on every render of every page in
 * this group — and each server action re-checks independently, because a layout
 * guard alone does not protect an action.
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireSession();

  return (
    <div className="lg:flex">
      <AdminSidebar user={{ name: user.name, email: user.email, role: user.role }} />
      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
