import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { listUsers } from "@/lib/db/queries";
import { UsersManager } from "@/components/admin/UsersManager";

export const metadata = { title: "Users" };
export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const actor = await requireSession("/admin/users");
  // Editors have no business here; the actions re-check this independently.
  if (actor.role !== "admin") redirect("/admin");

  const users = await listUsers().catch(() => []);

  return (
    <>
      <div className="mb-8">
        <p className="eyebrow text-cream-dim">Team</p>
        <h1 className="display mt-2 text-3xl text-cream">Users</h1>
        <p className="mt-2 text-sm text-cream-dim">
          Admins manage users and taxonomy. Editors can write and publish posts.
        </p>
      </div>

      <UsersManager
        currentUserId={actor.id}
        users={users.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          isActive: u.isActive,
          lastLoginAt: u.lastLoginAt ? u.lastLoginAt.toISOString() : null,
        }))}
      />
    </>
  );
}
