"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { Button, Input } from "@/components/admin/ui";

/**
 * Rows of inputs that post as repeated form fields — `techUsed`, `results` and
 * the paired `metricValue`/`metricLabel`. The action reassembles them with
 * `formData.getAll(name)`, so order in the DOM is order in the array.
 *
 * Empty rows are kept in the UI (so you can tab through them) and dropped
 * server-side, which keeps the component free of validation logic.
 */

function move<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length) return items;
  const next = [...items];
  const [row] = next.splice(from, 1);
  next.splice(to, 0, row);
  return next;
}

function RowControls({
  index,
  count,
  onUp,
  onDown,
  onRemove,
  label,
}: {
  index: number;
  count: number;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  label: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <button
        type="button"
        onClick={onUp}
        disabled={index === 0}
        aria-label={`Move ${label} up`}
        className="rounded p-1.5 text-cream-faint transition-colors hover:bg-ink-soft hover:text-cream disabled:cursor-not-allowed disabled:opacity-25"
      >
        <ChevronUp className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={onDown}
        disabled={index === count - 1}
        aria-label={`Move ${label} down`}
        className="rounded p-1.5 text-cream-faint transition-colors hover:bg-ink-soft hover:text-cream disabled:cursor-not-allowed disabled:opacity-25"
      >
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="rounded p-1.5 text-cream-faint transition-colors hover:bg-coral/10 hover:text-coral"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/** A reorderable list of single strings. */
export function StringListField({
  name,
  label,
  initial,
  placeholder,
  hint,
  max = 12,
  addLabel = "Add row",
}: {
  name: string;
  label: string;
  initial: string[];
  placeholder?: string;
  hint?: string;
  max?: number;
  addLabel?: string;
}) {
  const [rows, setRows] = useState<string[]>(initial.length > 0 ? initial : [""]);

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="eyebrow text-[0.7rem] text-cream-dim">{label}</span>
        <span className="text-[0.68rem] text-cream-faint">
          {rows.filter(Boolean).length}/{max}
        </span>
      </div>

      <div className="space-y-2">
        {rows.map((value, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <Input
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={(e) =>
                setRows((prev) => prev.map((r, idx) => (idx === i ? e.target.value : r)))
              }
            />
            <RowControls
              index={i}
              count={rows.length}
              label={label}
              onUp={() => setRows((prev) => move(prev, i, i - 1))}
              onDown={() => setRows((prev) => move(prev, i, i + 1))}
              onRemove={() =>
                setRows((prev) => (prev.length === 1 ? [""] : prev.filter((_, idx) => idx !== i)))
              }
            />
          </div>
        ))}
      </div>

      {hint && <p className="text-xs text-cream-faint">{hint}</p>}

      {rows.length < max && (
        <Button type="button" variant="ghost" size="sm" onClick={() => setRows((p) => [...p, ""])}>
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </Button>
      )}
    </div>
  );
}

/** Paired value/label rows — the metrics shown on the card and detail page. */
export function MetricListField({
  initial,
  max = 4,
}: {
  initial: { value: string; label: string }[];
  max?: number;
}) {
  const [rows, setRows] = useState(initial.length > 0 ? initial : [{ value: "", label: "" }]);

  const update = (i: number, patch: Partial<{ value: string; label: string }>) =>
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="eyebrow text-[0.7rem] text-cream-dim">Metrics</span>
        <span className="text-[0.68rem] text-cream-faint">
          {rows.filter((r) => r.value && r.label).length}/{max}
        </span>
      </div>

      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <Input
              name="metricValue"
              value={row.value}
              placeholder="₹10 lakh"
              aria-label={`Metric ${i + 1} value`}
              onChange={(e) => update(i, { value: e.target.value })}
              className="flex-1"
            />
            <Input
              name="metricLabel"
              value={row.label}
              placeholder="Mega prize"
              aria-label={`Metric ${i + 1} label`}
              onChange={(e) => update(i, { label: e.target.value })}
              className="flex-1"
            />
            <RowControls
              index={i}
              count={rows.length}
              label="metric"
              onUp={() => setRows((prev) => move(prev, i, i - 1))}
              onDown={() => setRows((prev) => move(prev, i, i + 1))}
              onRemove={() =>
                setRows((prev) =>
                  prev.length === 1 ? [{ value: "", label: "" }] : prev.filter((_, idx) => idx !== i),
                )
              }
            />
          </div>
        ))}
      </div>

      <p className="text-xs text-cream-faint">
        Big number then its caption. The card shows the first two; the detail page shows all.
        A row needs both halves to be saved.
      </p>

      {rows.length < max && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setRows((p) => [...p, { value: "", label: "" }])}
        >
          <Plus className="h-3.5 w-3.5" />
          Add metric
        </Button>
      )}
    </div>
  );
}
