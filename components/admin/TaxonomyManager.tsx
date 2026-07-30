"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import {
  AdminCard,
  Button,
  EmptyState,
  Field,
  FormError,
  FormSuccess,
  Input,
  SubmitButton,
  Textarea,
} from "@/components/admin/ui";
import type { ActionState } from "@/app/(admin)/admin/actions";

export type TaxonomyItem = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  postCount?: number;
};

/** Shared CRUD screen for categories and tags — they differ only by the description field. */
export function TaxonomyManager({
  items,
  singular,
  plural,
  withDescription = false,
  saveAction,
  deleteAction,
}: {
  items: TaxonomyItem[];
  singular: string;
  plural: string;
  withDescription?: boolean;
  saveAction: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  deleteAction: (formData: FormData) => void | Promise<void>;
}) {
  const [state, formAction] = useFormState(saveAction, undefined);
  const [editing, setEditing] = useState<TaxonomyItem | null>(null);

  // Remount the form when the edit target changes so defaultValues refresh.
  const formKey = editing?.id ?? "new";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div>
        {items.length === 0 ? (
          <EmptyState
            title={`No ${plural.toLowerCase()} yet`}
            description={`Create your first ${singular.toLowerCase()} using the form.`}
          />
        ) : (
          <div className="overflow-hidden rounded-card border border-cream-line">
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-center justify-between gap-4 bg-ink-soft/20 px-5 py-4 ${
                  i > 0 ? "border-t border-cream-line" : ""
                } ${editing?.id === item.id ? "bg-coral/[0.06]" : ""}`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-cream">{item.name}</p>
                  <p className="mt-0.5 truncate text-xs text-cream-faint">
                    /{item.slug}
                    {item.description ? ` · ${item.description}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label={`Edit ${item.name}`}
                    onClick={() => setEditing(item)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <form
                    action={deleteAction}
                    onSubmit={(e) => {
                      if (
                        !window.confirm(
                          `Delete "${item.name}"? Posts using it will simply lose the ${singular.toLowerCase()}.`,
                        )
                      ) {
                        e.preventDefault();
                      } else if (editing?.id === item.id) {
                        setEditing(null);
                      }
                    }}
                  >
                    <input type="hidden" name="id" value={item.id} />
                    <Button type="submit" variant="ghost" size="sm" aria-label={`Delete ${item.name}`}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AdminCard className="h-fit space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="display text-base text-cream">
            {editing ? `Edit ${singular.toLowerCase()}` : `New ${singular.toLowerCase()}`}
          </h2>
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
            <Input
              id={`${formKey}-name`}
              name="name"
              defaultValue={editing?.name ?? ""}
              placeholder={singular === "Category" ? "Insights" : "loyalty"}
              required
            />
          </Field>

          <Field label="Slug" htmlFor={`${formKey}-slug`} hint="Leave blank to generate from the name.">
            <Input
              id={`${formKey}-slug`}
              name="slug"
              defaultValue={editing?.slug ?? ""}
              placeholder="auto-generated"
            />
          </Field>

          {withDescription && (
            <Field label="Description" htmlFor={`${formKey}-description`}>
              <Textarea
                id={`${formKey}-description`}
                name="description"
                rows={3}
                defaultValue={editing?.description ?? ""}
                placeholder="What this category covers"
              />
            </Field>
          )}

          <SubmitButton className="w-full">
            {editing ? (
              "Save changes"
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Create {singular.toLowerCase()}
              </>
            )}
          </SubmitButton>
        </form>
      </AdminCard>
    </div>
  );
}
