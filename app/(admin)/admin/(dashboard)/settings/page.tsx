import { requireSession } from "@/lib/auth";
import { AdminCard, RoleBadge } from "@/components/admin/ui";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export const metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await requireSession("/admin/settings");

  return (
    <>
      <div className="mb-8">
        <p className="eyebrow text-cream-dim">Account</p>
        <h1 className="display mt-2 text-3xl text-cream">Settings</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard className="space-y-4">
          <h2 className="display text-base text-cream">Your account</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-cream-line pb-3">
              <dt className="text-cream-faint">Name</dt>
              <dd className="text-cream">{user.name}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-cream-line pb-3">
              <dt className="text-cream-faint">Email</dt>
              <dd className="truncate text-cream">{user.email}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-cream-faint">Role</dt>
              <dd>
                <RoleBadge role={user.role} />
              </dd>
            </div>
          </dl>
        </AdminCard>

        <AdminCard className="space-y-5">
          <div>
            <h2 className="display text-base text-cream">Change password</h2>
            <p className="mt-1.5 text-xs text-cream-faint">
              Changing your password signs you out on every other device.
            </p>
          </div>
          <ChangePasswordForm />
        </AdminCard>
      </div>
    </>
  );
}
