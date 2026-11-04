"use client";

import { useState } from "react";
import { navServices } from "@/data/nav";

const budgets = ["< $10k", "$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+", "Not sure yet"];

export default function ContactForm({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [budget, setBudget] = useState("");

  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const body = { ...Object.fromEntries(fd.entries()), services: picked, budget };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center border-t border-line pt-10">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-red text-xl text-white">✓</span>
        <h2 className="display-md mt-8">Thanks — we’re on it.</h2>
        <p className="mt-4 max-w-md text-lg text-muted">Someone from the team will review your project and reply within one business day.</p>
      </div>
    );
  }

  const field =
    "peer w-full border-0 border-b border-line bg-transparent px-0 pb-3 pt-7 text-lg outline-none transition-colors placeholder:text-transparent focus:border-fg focus-visible:outline-none";
  const label =
    "pointer-events-none absolute left-0 top-7 origin-left text-lg text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-sm peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm";

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate={false}>
      <fieldset>
        <legend className="mb-4 text-sm text-muted">I’m interested in</legend>
        <div className="flex flex-wrap gap-2">
          {navServices.map((s) => (
            <button
              type="button"
              key={s.slug}
              aria-pressed={picked.includes(s.name)}
              onClick={() => toggle(s.name)}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${picked.includes(s.name) ? "border-fg bg-fg text-bg" : "border-line hover:border-fg"}`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {[
          ["name", "Your name *", "text", true, "name"],
          ["email", "Work email *", "email", true, "email"],
          ["phone", "Phone", "tel", false, "tel"],
          ["company", "Company", "text", false, "organization"],
        ].map(([n, l, t, req, ac]) => (
          <div key={n as string} className="relative">
            <input id={`f-${n}`} name={n as string} type={t as string} required={req as boolean} autoComplete={ac as string} placeholder={l as string} className={field} />
            <label htmlFor={`f-${n}`} className={label}>
              {l as string}
            </label>
          </div>
        ))}
      </div>

      <fieldset>
        <legend className="mb-4 text-sm text-muted">Estimated budget</legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => (
            <button
              type="button"
              key={b}
              aria-pressed={budget === b}
              onClick={() => setBudget(b)}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${budget === b ? "border-fg bg-fg text-bg" : "border-line hover:border-fg"}`}
            >
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="relative">
        <textarea id="f-message" name="message" required rows={5} placeholder="Tell us about your project" className={`${field} resize-none`} data-lenis-prevent />
        <label htmlFor="f-message" className={label}>
          Tell us about your project *
        </label>
      </div>

      {/* Honeypot for bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {state === "error" && (
        <p role="alert" className="border-l-2 border-red pl-4 text-sm">
          {error} You can also email us directly at{" "}
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex h-14 items-center gap-3 rounded-full bg-red px-8 font-medium text-white transition-colors hover:bg-ink disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send project brief"}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
        <p className="text-sm text-muted">We’ll never share your details. NDA available on request.</p>
      </div>
    </form>
  );
}
