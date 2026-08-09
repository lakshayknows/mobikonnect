import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { isDbConfigured } from "@/lib/db";
import { ForgotPasswordForm } from "@/components/admin/ForgotPasswordForm";
import { Monogram } from "@/components/ui/Logo";

export const metadata: Metadata = { title: "Forgot password" };
export const dynamic = "force-dynamic";

export default async function ForgotPasswordPage() {
  if (await getSessionUser()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <Monogram className="mx-auto h-12 w-auto" />
          <p className="eyebrow mt-6 text-cream-dim">Mobikonnect</p>
          <h1 className="display mt-2 text-2xl text-cream">Forgot password</h1>
          <p className="mt-3 text-sm text-cream-dim">
            Enter your admin email and we&apos;ll send you a code to reset it.
          </p>
        </div>

        {isDbConfigured() ? (
          <ForgotPasswordForm />
        ) : (
          <div className="rounded-card border border-coral/40 bg-coral/10 p-6 text-sm text-coral">
            Password reset is unavailable — the database is not configured.
          </div>
        )}
      </div>
    </div>
  );
}
