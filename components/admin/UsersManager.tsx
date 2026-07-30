"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import {
  deleteUserAction,
  saveUserAction,
  toggleUserActiveAction,
} from "@/app/(admin)/admin/actions";
import {
  AdminCard,
  Button,
  Field,
  FormError,
  FormSuccess,
  Input,
  RoleBadge,
  Select,
  SubmitButton,
} from "@/components/admin/ui";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  isActive: boolean;
  lastLoginAt: string | null;
};

export function UsersManager({
  users,
  currentUserId,
}: {
  users: User[];
  currentUserId: string;
}) {
  const [state, formAction] = useFormState(saveUserAction, undefined);
  const [editing, setEditing] = useState<User | null>(null);
  const formKey = editing?.id ?? "new";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="overflow-hidden rounded-card border border-cream-line">
        {users.map((user, i) => {
          const isSelf = user.id === currentUserId;
          return (
            <div
              key={user.id}
              className={`flex flex-wrap items-center justify-between gap-3 bg-ink-soft/20 px-5 py-4 ${
                i > 0 ? "border-t border-cream-line" : ""
              } ${editing?.id === user.id ? "bg-coral/[0.06]" : ""}`}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-medium text-cream">{user.name}</p>
                  <RoleBadge role={user.role} />
                  {isSelf && <span className="text-[0.68rem] text-cream-faint">(you)</span>}
                  {!user.isActive && (
                    <span className="rounded-pill border border-cream-line px-2 py-0.5 text-[0.68rem] uppercase tracking-label text-cream-faint">
                      disabled
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-xs text-cream-faint">
                  {user.email}
                  {user.lastLoginAt
                    ? ` · last signed in ${new Date(user.lastLoginAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}`
                    : " · never signed in"}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label={`Edit ${user.name}`}
                  onClick={() => setEditing(user)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>

                {!isSelf && (
                  <>
                    <form action={toggleUserActiveAction}>
                      <input type="hidden" name="id" value={user.id} />
                      <Button type="submit" variant="ghost" size="sm">
                        {user.isActive ? "Disable" : "Enable"}
                      </Button>
                    </form>

                    <form
                      action={deleteUserAction}
                      onSubmit={(e) => {
                        if (!window.confirm(`Delete ${user.name}? Their posts will remain but lose the author.`)) {
                          e.preventDefault();
                        } else if (editing?.id === user.id) {
                          setEditing(null);
                        }
                      }}
                    >
                      <input type="hidden" name="id" value={user.id} />
                      <Button type="submit" variant="ghost" size="sm" aria-label={`Delete ${user.name}`}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <AdminCard className="h-fit space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="display text-base text-cream">{editing ? "Edit user" : "New user"}</h2>
          {editing && (
            <button
              type="button"
              onClick={() => setEditing(null)}
              aria-label="Cancel editing"
              className="rounded p-1 text-cream-dim transition-colors hover:text-cream"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <form key={formKey} action={formAction} className="space-y-4">
          {editing && <input type="hidden" name="id" value={editing.id} />}

          <FormError>{state?.error}</FormError>
          <FormSuccess>{state?.success}</FormSuccess>

          <Field label="Name" htmlFor={`${formKey}-name`} required>
            <Input id={`${formKey}-name`} name="name" defaultValue={editing?.name ?? ""} required />
          </Field>

          <Field
            label="Email"
            htmlFor={`${formKey}-email`}
            required
            hint={editing ? "Email cannot be changed after creation." : undefined}
          >
            <Input
              id={`${formKey}-email`}
              name="email"
              type="email"
              defaultValue={editing?.email ?? ""}
              readOnly={Boolean(editing)}
              required
            />
          </Field>

          <Field label="Role" htmlFor={`${formKey}-role`}>
            <Select id={`${formKey}-role`} name="role" defaultValue={editing?.role ?? "editor"}>
              <option value="editor">Editor — write and publish posts</option>
              <option value="admin">Admin — full access including users</option>
            </Select>
          </Field>

          <Field
            label={editing ? "New password" : "Password"}
            htmlFor={`${formKey}-password`}
            required={!editing}
            hint={
              editing
                ? "Leave blank to keep the current password. Changing it signs them out everywhere."
                : "At least 10 characters."
            }
          >
            <Input
              id={`${formKey}-password`}
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={editing ? undefined : 10}
              required={!editing}
            />
          </Field>

          <SubmitButton className="w-full">
            {editing ? (
              "Save changes"
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Create user
              </>
            )}
          </SubmitButton>
        </form>
      </AdminCard>
    </div>
  );
}
