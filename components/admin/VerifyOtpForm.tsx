"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { ArrowLeft } from "lucide-react";
import {
  resendPasswordResetAction,
  verifyPasswordResetAction,
} from "@/app/(admin)/admin/actions";
import {
  Field,
  FormError,
  FormSuccess,
  Input,
  SubmitButton,
} from "@/components/admin/ui";

const PASSWORD_MIN_LENGTH = 10;

export function VerifyOtpForm({ email, sent }: { email: string; sent?: boolean }) {
  const [state, formAction] = useFormState(verifyPasswordResetAction, undefined);
  const [resendState, resendAction] = useFormState(resendPasswordResetAction, undefined);
  const [code, setCode] = useState("");

  return (
    <div className="space-y-5">
      {sent && !state?.error && !resendState?.success && (
        <FormSuccess>
          If that account exists, a code is on its way to {email}.
        </FormSuccess>
      )}
      <FormSuccess>{resendState?.success}</FormSuccess>
      <FormError>{state?.error ?? resendState?.error}</FormError>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="email" value={email} />

        <Field
          label="6-digit code"
          htmlFor="code"
          required
          hint={`Sent to ${email}. It expires in 10 minutes.`}
        >
          <Input
            id="code"
            name="code"
            // Digits only, but text + inputMode so the grouped "123 456" from the
            // email can be pasted without the browser rejecting the space.
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            autoFocus
            maxLength={7}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^\d\s]/g, ""))}
            placeholder="123 456"
            className="text-center text-lg tracking-[0.3em]"
          />
        </Field>

        <Field
          label="New password"
          htmlFor="password"
          required
          hint={`At least ${PASSWORD_MIN_LENGTH} characters.`}
        >
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={PASSWORD_MIN_LENGTH}
            required
          />
        </Field>

        <Field label="Confirm new password" htmlFor="confirmPassword" required>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={PASSWORD_MIN_LENGTH}
            required
          />
        </Field>

        <SubmitButton className="w-full" pendingLabel="Verifying…">
          Set new password
        </SubmitButton>
      </form>

      <div className="flex items-center justify-between gap-4 border-t border-cream-line pt-4">
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 text-sm text-cream-dim transition-colors hover:text-cream"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>

        <form action={resendAction}>
          <input type="hidden" name="email" value={email} />
          <SubmitButton variant="ghost" pendingLabel="Sending…">
            Resend code
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
