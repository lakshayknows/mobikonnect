"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { loginAction } from "@/app/(admin)/admin/actions";
import { Field, FormError, FormSuccess, Input, SubmitButton } from "@/components/admin/ui";

export function LoginForm({ next, justReset }: { next?: string; justReset?: boolean }) {
  const [state, formAction] = useFormState(loginAction, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next ?? "/admin"} />

      {justReset && !state?.error && (
        <FormSuccess>Password updated. Sign in with your new password.</FormSuccess>
      )}
      <FormError>{state?.error}</FormError>

      <Field label="Email" htmlFor="email" required>
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

      <Field label="Password" htmlFor="password" required>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••••"
        />
      </Field>

      <SubmitButton className="w-full" pendingLabel="Signing in…">
        Sign in
      </SubmitButton>

      <Link
        href="/admin/forgot"
        className="block text-center text-sm text-cream-dim transition-colors hover:text-cream"
      >
        Forgot password?
      </Link>
    </form>
  );
}
