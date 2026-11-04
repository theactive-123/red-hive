import type { CaseStudy } from "@/data/work";

/** Product shot drawn in code: flat brand-colour backdrop with a light-UI device mock. */
export default function ProjectVisual({ project, className = "" }: { project: Pick<CaseStudy, "accent" | "name" | "category">; className?: string }) {
  const a = project.accent;
  const mobile = project.category === "Mobile App";
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: a }}>
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(0,0,0,0.28),transparent_60%)]" />
      {mobile ? (
        <div className="absolute inset-0 flex items-center justify-center gap-[5%]">
          {[0, 1].map((p) => (
            <div key={p} className={`w-[27%] max-w-[230px] rounded-[2.1rem] bg-[#0e0e10] p-[0.45rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] ${p ? "translate-y-[12%]" : "-translate-y-[6%]"}`}>
              <div className="aspect-[9/19.5] overflow-hidden rounded-[1.75rem] bg-[#f6f5f2] px-[9%] pt-[12%]">
                <div className="flex items-center justify-between">
                  <div className="h-2 w-[40%] rounded-full bg-[#0e0e10]" />
                  <div className="h-5 w-5 rounded-full" style={{ background: a }} />
                </div>
                {p === 0 ? (
                  <>
                    <div className="mt-[14%] rounded-xl p-[9%] text-white" style={{ background: a }}>
                      <div className="h-1.5 w-1/3 rounded-full bg-white/60" />
                      <div className="mt-3 h-3 w-2/3 rounded-full bg-white" />
                      <div className="mt-6 h-6 w-1/2 rounded-full bg-white/25" />
                    </div>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="mt-[9%] flex items-center gap-2.5">
                        <div className="h-7 w-7 shrink-0 rounded-full bg-[#e3e1db]" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-1.5 w-3/4 rounded-full bg-[#0e0e10]/80" />
                          <div className="h-1.5 w-1/2 rounded-full bg-[#0e0e10]/20" />
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="mt-[14%] aspect-square rounded-xl bg-[#e3e1db]" />
                    <div className="mt-[9%] h-2 w-2/3 rounded-full bg-[#0e0e10]/80" />
                    <div className="mt-2 h-1.5 w-1/2 rounded-full bg-[#0e0e10]/25" />
                    <div className="mt-[12%] h-8 rounded-full" style={{ background: a }} />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute inset-x-[9%] bottom-0 top-[13%] overflow-hidden rounded-t-xl bg-[#f6f5f2] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-1.5 border-b border-black/[0.07] px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-black/15" />
            <span className="h-2 w-2 rounded-full bg-black/15" />
            <span className="h-2 w-2 rounded-full bg-black/15" />
          </div>
          <div className="grid h-full grid-cols-[20%_1fr]">
            <div className="space-y-3 border-r border-black/[0.07] p-[8%]">
              <div className="mb-5 h-4 w-4 rounded" style={{ background: a }} />
              {[70, 55, 62, 48, 58].map((w, i) => (
                <div key={i} className="h-1.5 rounded-full" style={{ width: `${w}%`, background: i === 1 ? "#0e0e10" : "rgba(14,14,16,.18)" }} />
              ))}
            </div>
            <div className="p-[4%]">
              <div className="h-2.5 w-1/4 rounded-full bg-[#0e0e10]" />
              <div className="mt-[4%] grid grid-cols-3 gap-[3%]">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-lg border border-black/[0.07] bg-white p-[8%]">
                    <div className="h-1.5 w-1/2 rounded-full bg-black/20" />
                    <div className="mt-2.5 h-3 w-2/3 rounded-full" style={{ background: i === 0 ? a : "#0e0e10" }} />
                  </div>
                ))}
              </div>
              <div className="mt-[4%] rounded-lg border border-black/[0.07] bg-white p-[4%]">
                <svg viewBox="0 0 300 80" className="w-full" preserveAspectRatio="none" aria-hidden>
                  <path d="M0 64 C30 58 50 66 80 46 S130 28 160 38 S220 10 250 20 S290 8 300 6" fill="none" stroke={a} strokeWidth="2.5" />
                  <path d="M0 70 C40 68 70 60 100 62 S170 50 200 54 S260 40 300 42" fill="none" stroke="rgba(14,14,16,.2)" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
