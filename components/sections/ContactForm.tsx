"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/content";

const inputBase =
  "w-full rounded-card border border-cream-line bg-ink-soft/40 px-5 py-4 text-cream placeholder:text-cream-faint outline-none transition-colors focus:border-coral";

const goals = [
  "Repeat purchase",
  "Product launch",
  "Channel / dealer rewards",
  "Loyalty program",
  "Employee engagement",
  "Something else",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    goal: goals[0],
    message: "",
  });

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend yet — hand off to the user's mail client so the form is real.
    const subject = `New enquiry from ${form.name || "website"} — ${form.goal}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Goal: ${form.goal}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="gutter pb-24 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        {sent ? (
          <Reveal>
            <div className="frame flex flex-col items-center gap-5 border border-cream-line bg-ink-soft/40 px-8 py-20 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-coral">
                <Check className="h-7 w-7 text-cream" />
              </span>
              <h2 className="display text-big uppercase">Thank you</h2>
              <p className="max-w-md text-cream-dim">
                Your email app should have opened with your enquiry ready to
                send. Prefer to reach us directly?{" "}
                <a
                  href={`mailto:${site.email}`}
                  data-cursor="hover"
                  className="text-coral link-underline"
                >
                  {site.email}
                </a>
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="eyebrow">
                    Your name
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Jane Doe"
                    className={`mt-3 ${inputBase}`}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="jane@brand.com"
                    className={`mt-3 ${inputBase}`}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className="eyebrow">
                    Company
                  </label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={update("company")}
                    placeholder="Brand name"
                    className={`mt-3 ${inputBase}`}
                  />
                </div>
                <div>
                  <label htmlFor="goal" className="eyebrow">
                    What do you want to achieve?
                  </label>
                  <select
                    id="goal"
                    value={form.goal}
                    onChange={update("goal")}
                    className={`mt-3 ${inputBase} appearance-none`}
                  >
                    {goals.map((g) => (
                      <option key={g} value={g} className="bg-ink text-cream">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="eyebrow">
                  Tell us about it
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="What do you want your audience to feel?"
                  className={`mt-3 resize-none ${inputBase}`}
                />
              </div>

              <button
                type="submit"
                data-cursor="hover"
                className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-pill bg-coral px-8 py-5 text-base font-medium text-cream transition-colors duration-300 hover:bg-coral-deep sm:w-auto sm:self-start"
              >
                Send enquiry
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
