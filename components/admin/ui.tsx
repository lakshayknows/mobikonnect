"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Admin UI kit.
 *
 * Same tokens as the marketing site (ink / cream / coral, Montserrat + Karla,
 * rounded-card, cream-line hairlines) but a denser scale and no motion chrome —
 * this is a data-entry surface, not a landing page. See design_constraint.md §7.
 */

/* ─────────────────────────────── Buttons ──────────────────────────────────── */

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-coral text-cream hover:bg-coral-deep disabled:hover:bg-coral",
  secondary: "border border-cream-line bg-ink-soft/60 text-cream hover:border-cream/40 hover:bg-ink-soft",
  ghost: "text-cream-dim hover:bg-ink-soft/60 hover:text-cream",
  danger: "border border-coral/40 text-coral hover:bg-coral/10 hover:border-coral",
};

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: "sm" | "md" }
>(function Button({ className, variant = "primary", size = "md", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm",
        buttonStyles[variant],
        className,
      )}
      {...props}
    />
  );
});

/** Submit button wired to the enclosing form's pending state. */
export function SubmitButton({
  children,
  pendingLabel,
  className,
  variant = "primary",
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  pendingLabel?: string;
  variant?: ButtonVariant;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={variant}
      className={className}
      disabled={pending || disabled}
      {...props}
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? (pendingLabel ?? "Saving…") : children}
    </Button>
  );
}

/* ──────────────────────────────── Surfaces ────────────────────────────────── */

export function AdminCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-card border border-cream-line bg-ink-soft/30 p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <h2 className="display text-lg text-cream">{children}</h2>
      {action}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-dashed border-cream-line bg-ink-soft/20 px-6 py-16 text-center">
      <p className="display text-base text-cream">{title}</p>
      {description && <p className="mx-auto mt-2 max-w-sm text-sm text-cream-faint">{description}</p>}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

/* ──────────────────────────────── Form fields ─────────────────────────────── */

export function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  className,
}: {
  label: string;
  hint?: React.ReactNode;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={htmlFor} className="eyebrow block text-[0.7rem] text-cream-dim">
        {label}
        {required && <span className="ml-1 text-coral">*</span>}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-coral">{error}</p>
      ) : (
        hint && <p className="text-xs text-cream-faint">{hint}</p>
      )}
    </div>
  );
}

const inputBase =
  "w-full rounded-lg border border-cream-line bg-ink-deep px-3.5 py-2.5 text-sm text-cream placeholder:text-cream-faint transition-colors duration-200 focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral/40 disabled:opacity-50";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(inputBase, className)} {...props} />;
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(inputBase, "resize-y leading-relaxed", className)} {...props} />;
});

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(inputBase, "cursor-pointer appearance-none pr-8", className)} {...props}>
      {children}
    </select>
  );
});

export function Checkbox({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-2.5 text-sm text-cream-dim", className)}>
      <input
        type="checkbox"
        className="h-4 w-4 shrink-0 cursor-pointer rounded border-cream-line bg-ink-deep text-coral accent-coral focus:ring-1 focus:ring-coral/40"
        {...props}
      />
      {label}
    </label>
  );
}

/* ──────────────────────────────── Indicators ──────────────────────────────── */

export function StatusBadge({ status }: { status: "draft" | "scheduled" | "published" }) {
  const styles = {
    draft: "border-cream-line bg-ink-soft/60 text-cream-dim",
    scheduled: "border-blue/40 bg-blue/10 text-blue",
    published: "border-coral/40 bg-coral/10 text-coral",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-2.5 py-0.5 text-[0.68rem] uppercase tracking-label",
        styles[status],
      )}
    >
      {status}
    </span>
  );
}

export function RoleBadge({ role }: { role: "admin" | "editor" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-2.5 py-0.5 text-[0.68rem] uppercase tracking-label",
        role === "admin" ? "border-coral/40 bg-coral/10 text-coral" : "border-cream-line text-cream-dim",
      )}
    >
      {role}
    </span>
  );
}

export function FormError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <div className="rounded-lg border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-coral" role="alert">
      {children}
    </div>
  );
}

export function FormSuccess({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <div className="rounded-lg border border-blue/40 bg-blue/10 px-4 py-3 text-sm text-blue" role="status">
      {children}
    </div>
  );
}
