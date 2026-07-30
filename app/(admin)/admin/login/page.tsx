import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { isDbConfigured } from "@/lib/db";
import { LoginForm } from "@/components/admin/LoginForm";
import { Monogram } from "@/components/ui/Logo";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  if (await getSessionUser()) redirect(searchParams.next || "/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <Monogram className="mx-auto h-12 w-auto" />
          <p className="eyebrow mt-6 text-cream-dim">Mobikonnect</p>
          <h1 className="display mt-2 text-2xl text-cream">Blog admin</h1>
        </div>

        {isDbConfigured() ? (
          <LoginForm next={searchParams.next} />
        ) : (
          <div className="rounded-card border border-coral/40 bg-coral/10 p-6 text-sm text-coral">
            <p className="font-medium">Database not configured</p>
            <p className="mt-2 text-coral/80">
              Run <code className="rounded bg-ink-deep px-1.5 py-0.5">vercel integration add neon</code>{" "}
              then <code className="rounded bg-ink-deep px-1.5 py-0.5">vercel env pull .env.local</code>{" "}
              and restart the dev server.
            </p>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-cream-faint">
          Authorised users only. All sessions are logged.
        </p>
      </div>
    </div>
  );
}
