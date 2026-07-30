"use client";

import { useFormState } from "react-dom";
import { changeOwnPasswordAction } from "@/app/(admin)/admin/actions";
import { Field, FormError, FormSuccess, Input, SubmitButton } from "@/components/admin/ui";

export function ChangePasswordForm() {
  const [state, formAction] = useFormState(changeOwnPasswordAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <FormError>{state?.error}</FormError>
      <FormSuccess>{state?.success}</FormSuccess>

      <Field label="Current password" htmlFor="currentPassword" required>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
        />
      </Field>

      <Field label="New password" htmlFor="newPassword" required hint="At least 10 characters.">
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          minLength={10}
          required
        />
      </Field>

      <SubmitButton pendingLabel="Updating…">Update password</SubmitButton>
    </form>
  );
}
