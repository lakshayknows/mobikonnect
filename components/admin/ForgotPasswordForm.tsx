"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { ArrowLeft } from "lucide-react";
import { requestPasswordResetAction } from "@/app/(admin)/admin/actions";
import { Field, FormError, Input, SubmitButton } from "@/components/admin/ui";

export function ForgotPasswordForm() {
  const [state, formAction] = useFormState(requestPasswordResetAction, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <FormError>{state?.error}</FormError>

      <Field
        label="Email"
        htmlFor="email"
        required
        hint="We'll send a 6-digit code to this address."
      >
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          autoFocus
          placeholder="you@mobikonnect.com"
        />
      </Field>

      <SubmitButton className="w-full" pendingLabel="Sending…">
        Send code
      </SubmitButton>

      <Link
        href="/admin/login"
        className="flex items-center justify-center gap-2 text-sm text-cream-dim transition-colors hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>
    </form>
  );
}
