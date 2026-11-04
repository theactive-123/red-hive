import type { CaseStudy } from "@/data/work";

/** Code-drawn product mock (no stock imagery): a browser or phone frame with an abstract UI in the project's accent. */
export default function ProjectVisual({ project, className = "" }: { project: Pick<CaseStudy, "accent" | "name" | "category">; className?: string }) {
  const a = project.accent;
  const mobile = project.category === "Mobile App";
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: `radial-gradient(120% 90% at 80% 10%, ${a}55 0%, transparent 55%), radial-gradient(90% 70% at 0% 100%, ${a}30 0%, transparent 60%), #070912` }}>
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      {mobile ? (
        <div className="absolute inset-0 flex items-center justify-center gap-6">
          {[0, 1].map((p) => (
            <div key={p} className={`relative w-[34%] max-w-[210px] rounded-[2rem] border border-white/15 bg-[#0b0d16] p-2 shadow-2xl ${p ? "translate-y-10 rotate-[6deg]" : "-translate-y-4 -rotate-[4deg]"}`}>
              <div className="aspect-[9/19] overflow-hidden rounded-[1.6rem] bg-[#10131f] p-3">
                <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/15" />
                <div className="h-[28%] rounded-xl" style={{ background: `linear-gradient(135deg, ${a}, ${a}55)` }} />
                <div className="mt-3 space-y-2">
                  {[80, 60, 70].map((w, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-white/5 p-2">
                      <div className="h-5 w-5 rounded-md" style={{ background: i === 0 ? a : "rgba(255,255,255,.15)" }} />
                      <div className="h-1.5 rounded bg-white/20" style={{ width: `${w}%` }} />
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="aspect-square rounded-lg bg-white/5" />
                  <div className="aspect-square rounded-lg" style={{ background: `${a}33` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute inset-x-[8%] top-[14%] bottom-[-6%] rounded-t-2xl border border-white/15 bg-[#0b0d16] shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: a }} />
            <span className="ml-4 h-4 w-1/3 rounded-full bg-white/5" />
          </div>
          <div className="grid h-full grid-cols-[22%_1fr] gap-4 p-4">
            <div className="space-y-2.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-3 rounded" style={{ background: i === 1 ? a : "rgba(255,255,255,.08)", width: `${90 - i * 8}%` }} />
              ))}
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-lg bg-white/5 p-3">
                    <div className="h-1.5 w-1/2 rounded bg-white/20" />
                    <div className="mt-2 h-3 w-3/4 rounded" style={{ background: i === 0 ? a : "rgba(255,255,255,.25)" }} />
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 300 90" className="w-full" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id={`g-${project.name}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor={a} stopOpacity="0.5" />
                    <stop offset="1" stopColor={a} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 70 C30 60 50 72 80 50 S130 30 160 42 S220 10 250 22 S290 8 300 6 V90 H0Z" fill={`url(#g-${project.name})`} />
                <path d="M0 70 C30 60 50 72 80 50 S130 30 160 42 S220 10 250 22 S290 8 300 6" fill="none" stroke={a} strokeWidth="2" />
              </svg>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 rounded-lg bg-white/5" />
                <div className="h-16 rounded-lg bg-white/5" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
