"use client";

import { useState } from "react";
import { govLevels, usStates } from "@/data/government";

const projectTypes = ["Resident portal", "Permitting / licensing", "311 / service requests", "Payments", "Case management", "Legacy modernization", "Accessibility (ADA / 508)", "Mobile app", "Data dashboard", "Other"];

export default function GovForm({ email, compact = false }: { email: string; compact?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const body = {
      source: "government",
      name: f.name,
      email: f.email,
      phone: f.phone,
      company: f.agency,
      budget: f.budget,
      message: f.message || `${f.projectType} project`,
      website: f.website,
      extra: { Title: f.title, "Government level": f.level, State: f.state, "Project type": f.projectType, "Solicitation #": f.solicitation, "Response due": f.due },
    };
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

  if (state === "ok")
    return (
      <div className="flex min-h-[380px] flex-col justify-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-red text-xl text-white">✓</span>
        <p className="display-sm mt-6">Thank you. We’ve received your request.</p>
        <p className="mt-3 text-muted">A project lead will contact you within one business day. If you sent a solicitation, we’ll confirm fit and next steps before the Q&amp;A deadline.</p>
      </div>
    );

  const input = "h-12 w-full border border-line bg-bg px-4 text-[0.95rem] outline-none transition-colors focus:border-red";
  const label = "mb-1.5 block text-sm font-medium";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="g-name" className={label}>Full name *</label>
        <input id="g-name" name="name" required autoComplete="name" className={input} />
      </div>
      <div>
        <label htmlFor="g-title" className={label}>Job title</label>
        <input id="g-title" name="title" autoComplete="organization-title" className={input} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="g-agency" className={label}>Agency / organization *</label>
        <input id="g-agency" name="agency" required autoComplete="organization" placeholder="e.g. City of Springfield, Public Works" className={input} />
      </div>
      <div>
        <label htmlFor="g-level" className={label}>Government level *</label>
        <select id="g-level" name="level" required defaultValue="" className={input}>
          <option value="" disabled>Select…</option>
          {govLevels.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="g-state" className={label}>State *</label>
        <select id="g-state" name="state" required defaultValue="" className={input}>
          <option value="" disabled>Select…</option>
          {usStates.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="g-email" className={label}>Work email *</label>
        <input id="g-email" name="email" type="email" required autoComplete="email" placeholder="name@agency.gov" className={input} />
      </div>
      <div>
        <label htmlFor="g-phone" className={label}>Phone</label>
        <input id="g-phone" name="phone" type="tel" autoComplete="tel" className={input} />
      </div>
      <div>
        <label htmlFor="g-type" className={label}>Project type *</label>
        <select id="g-type" name="projectType" required defaultValue="" className={input}>
          <option value="" disabled>Select…</option>
          {projectTypes.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="g-budget" className={label}>Estimated budget</label>
        <select id="g-budget" name="budget" defaultValue="" className={input}>
          <option value="">Not sure yet</option>
          {["Under $25k", "$25k – $100k", "$100k – $250k", "$250k – $1M", "$1M+"].map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>
      {!compact && (
        <>
          <div>
            <label htmlFor="g-sol" className={label}>Solicitation / RFP number</label>
            <input id="g-sol" name="solicitation" placeholder="Optional" className={input} />
          </div>
          <div>
            <label htmlFor="g-due" className={label}>Response due date</label>
            <input id="g-due" name="due" type="date" className={input} />
          </div>
        </>
      )}
      <div className="sm:col-span-2">
        <label htmlFor="g-msg" className={label}>What do you need?</label>
        <textarea id="g-msg" name="message" rows={compact ? 3 : 4} className="w-full resize-none border border-line bg-bg p-4 text-[0.95rem] outline-none focus:border-red" placeholder="Scope, timeline, current system, link to the solicitation…" />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {state === "error" && (
        <p role="alert" className="border-l-2 border-red pl-4 text-sm sm:col-span-2">
          {error} You can also email <a className="underline" href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={state === "sending"} className="cut inline-flex h-14 items-center bg-red px-8 font-semibold text-white transition-colors hover:bg-navy disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Request a proposal"}
        </button>
        <p className="text-sm text-muted">Reply within one business day. NDA on request.</p>
      </div>
    </form>
  );
}
