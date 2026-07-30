"use client";

import { useFormState } from "react-dom";
import { loginAction } from "@/app/(admin)/admin/actions";
import { Field, FormError, Input, SubmitButton } from "@/components/admin/ui";

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useFormState(loginAction, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next ?? "/admin"} />

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
    </form>
  );
}
