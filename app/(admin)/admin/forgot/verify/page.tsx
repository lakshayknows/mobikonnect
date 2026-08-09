import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { VerifyOtpForm } from "@/components/admin/VerifyOtpForm";
import { Monogram } from "@/components/ui/Logo";

export const metadata: Metadata = { title: "Enter your reset code" };
export const dynamic = "force-dynamic";

export default async function VerifyResetCodePage({
  searchParams,
}: {
  searchParams: { email?: string; sent?: string };
}) {
  if (await getSessionUser()) redirect("/admin");

  const email = (searchParams.email ?? "").trim();
  // Without an address there is nothing to verify against.
  if (!email) redirect("/admin/forgot");

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Monogram className="mx-auto h-12 w-auto" />
          <p className="eyebrow mt-6 text-cream-dim">Mobikonnect</p>
          <h1 className="display mt-2 text-2xl text-cream">Enter your code</h1>
        </div>

        <VerifyOtpForm email={email} sent={searchParams.sent === "1"} />

        <p className="mt-8 text-center text-xs text-cream-faint">
          Check your spam folder if it hasn&apos;t arrived within a minute.
        </p>
      </div>
    </div>
  );
}
