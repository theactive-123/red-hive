import type { CaseStudy } from "@/data/work";

type Screen = { title: string; subtitle: string; metric: { label: string; value: string }; rows: { name: string; meta: string; value: string }[] };
type Props = { project: Pick<CaseStudy, "accent" | "name" | "category"> & { screen?: Screen }; className?: string };

const fallback: Screen = {
  title: "Overview",
  subtitle: "Updated just now",
  metric: { label: "This week", value: "1,284" },
  rows: [
    { name: "New sign-ups", meta: "Today", value: "+86" },
    { name: "Active users", meta: "Last 7 days", value: "4.2k" },
    { name: "Open tickets", meta: "Support", value: "12" },
  ],
};

/** Product shot drawn in code with real interface copy: phone for mobile apps, browser for everything else. */
export default function ProjectVisual({ project, className = "" }: Props) {
  const a = project.accent;
  const s = project.screen ?? fallback;
  const mobile = project.category === "Mobile App";

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: a }}>
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),transparent_45%,rgba(0,0,0,0.22))]" />
      {mobile ? <Phones s={s} a={a} name={project.name} /> : <Browser s={s} a={a} name={project.name} />}
    </div>
  );
}

function Phones({ s, a, name }: { s: Screen; a: string; name: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[4%] [container-type:size]">
      <PhoneFrame h={84} className="-translate-y-[3%]">
        <div className="flex items-center justify-between text-[0.6em] font-semibold text-black">
          <span>9:41</span>
          <span className="h-[0.9em] w-[2.2em] rounded-[3px] border border-black/60" />
        </div>
        <p className="mt-[1.4em] text-[0.62em] text-black/50">{name}</p>
        <p className="text-[1.05em] font-bold leading-tight text-black">{s.title}</p>
        <p className="mt-[0.2em] text-[0.62em] text-black/55">{s.subtitle}</p>
        <div className="mt-[1em] rounded-[0.9em] p-[0.9em] text-white" style={{ background: a }}>
          <p className="text-[0.58em] opacity-80">{s.metric.label}</p>
          <p className="text-[1.5em] font-bold leading-none">{s.metric.value}</p>
        </div>
        <ul className="mt-[0.9em] space-y-[0.55em]">
          {s.rows.map((r) => (
            <li key={r.name} className="flex items-center gap-[0.6em] rounded-[0.7em] bg-white px-[0.6em] py-[0.55em] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
              <span className="h-[1.8em] w-[1.8em] shrink-0 rounded-full" style={{ background: `${a}22` }} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.66em] font-semibold text-black">{r.name}</span>
                <span className="block truncate text-[0.55em] text-black/50">{r.meta}</span>
              </span>
              <span className="text-[0.6em] font-semibold" style={{ color: a }}>
                {r.value}
              </span>
            </li>
          ))}
        </ul>
      </PhoneFrame>
      <PhoneFrame h={74} className="translate-y-[9%]">
        <div className="flex items-center justify-between text-[0.6em] font-semibold text-black">
          <span>9:41</span>
          <span className="h-[0.9em] w-[2.2em] rounded-[3px] border border-black/60" />
        </div>
        <p className="mt-[1.4em] text-[1em] font-bold text-black">{s.rows[0]?.name}</p>
        <p className="text-[0.6em] text-black/55">{s.rows[0]?.meta}</p>
        <div className="mt-[1em] aspect-[4/3] rounded-[0.9em] bg-[#e9e9ee]" style={{ backgroundImage: `radial-gradient(circle at 70% 30%, ${a}55, transparent 60%)` }} />
        <div className="mt-[0.9em] grid grid-cols-3 gap-[0.4em]">
          {["Mon", "Tue", "Wed"].map((d, i) => (
            <span key={d} className={`rounded-[0.5em] py-[0.45em] text-center text-[0.55em] font-semibold ${i === 1 ? "text-white" : "bg-white text-black/70"}`} style={i === 1 ? { background: a } : undefined}>
              {d}
            </span>
          ))}
        </div>
        <div className="mt-[1em] rounded-full py-[0.7em] text-center text-[0.62em] font-semibold text-white" style={{ background: "#00020a" }}>
          {s.rows[0]?.value || "Continue"}
        </div>
      </PhoneFrame>
    </div>
  );
}

/** Sized by the frame's height (cqh) so it fits any aspect ratio. */
function PhoneFrame({ children, h, className = "" }: { children: React.ReactNode; h: number; className?: string }) {
  const u = h / 84; // scale factor relative to the main phone
  return (
    <div
      className={`shrink-0 bg-[#0b0b0f] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] ${className}`}
      style={{ height: `${h}cqh`, aspectRatio: "9 / 19.5", padding: `${0.9 * u}cqh`, borderRadius: `${6.5 * u}cqh` }}
    >
      <div
        className="h-full overflow-hidden bg-[#f4f4f7] leading-snug"
        style={{ borderRadius: `${5.8 * u}cqh`, padding: `${3.2 * u}cqh ${2.4 * u}cqh 0`, fontSize: `${2.35 * u}cqh` }}
      >
        {children}
      </div>
    </div>
  );
}

function Browser({ s, a, name }: { s: Screen; a: string; name: string }) {
  return (
    <div className="absolute inset-x-[7%] bottom-0 top-[11%] [container-type:inline-size]">
      <div className="flex h-full flex-col overflow-hidden rounded-t-[1.2cqw] bg-white text-[1.35cqw] leading-snug text-black shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-[0.6cqw] border-b border-black/[0.07] bg-[#f6f6f8] px-[1.6cqw] py-[1cqw]">
          <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-[#ff5f57]" />
          <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-[#febc2e]" />
          <span className="h-[0.9cqw] w-[0.9cqw] rounded-full bg-[#28c840]" />
          <span className="ml-[2cqw] rounded-[0.5cqw] bg-white px-[1.4cqw] py-[0.3cqw] text-[0.85em] text-black/45">app.{name.toLowerCase()}.com</span>
        </div>
        <div className="grid flex-1 grid-cols-[21%_1fr]">
          <aside className="border-r border-black/[0.07] bg-[#fafafb] p-[1.6cqw]">
            <p className="flex items-center gap-[0.6cqw] font-bold">
              <span className="h-[1.4cqw] w-[1.4cqw] rounded-[0.35cqw]" style={{ background: a }} />
              {name}
            </p>
            <ul className="mt-[2cqw] space-y-[0.9cqw] text-[0.92em] text-black/55">
              {["Overview", "Customers", "Reports", "Integrations", "Settings"].map((n, i) => (
                <li key={n} className={i === 0 ? "font-semibold text-black" : ""}>
                  {n}
                </li>
              ))}
            </ul>
          </aside>
          <main className="p-[2cqw]">
            <p className="text-[1.45em] font-bold tracking-tight">{s.title}</p>
            <p className="text-[0.9em] text-black/50">{s.subtitle}</p>
            <div className="mt-[1.6cqw] grid grid-cols-3 gap-[1.2cqw]">
              <div className="rounded-[0.8cqw] p-[1.2cqw] text-white" style={{ background: a }}>
                <p className="text-[0.82em] opacity-80">{s.metric.label}</p>
                <p className="text-[1.6em] font-bold leading-tight">{s.metric.value}</p>
              </div>
              {s.rows.slice(0, 2).map((r) => (
                <div key={r.name} className="rounded-[0.8cqw] border border-black/[0.08] p-[1.2cqw]">
                  <p className="truncate text-[0.82em] text-black/50">{r.name}</p>
                  <p className="text-[1.6em] font-bold leading-tight">{r.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-[1.4cqw] rounded-[0.8cqw] border border-black/[0.08] p-[1.2cqw]">
              <svg viewBox="0 0 300 70" className="w-full" preserveAspectRatio="none" aria-hidden>
                <path d="M0 58 C25 52 45 60 70 44 S115 30 140 36 S190 12 215 20 S270 10 300 4 V70 H0Z" fill={a} opacity="0.12" />
                <path d="M0 58 C25 52 45 60 70 44 S115 30 140 36 S190 12 215 20 S270 10 300 4" fill="none" stroke={a} strokeWidth="2.5" />
              </svg>
            </div>
            <table className="mt-[1.2cqw] w-full text-left text-[0.88em]">
              <tbody>
                {s.rows.map((r) => (
                  <tr key={r.name} className="border-b border-black/[0.06]">
                    <td className="py-[0.7cqw] font-semibold">{r.name}</td>
                    <td className="py-[0.7cqw] text-black/50">{r.meta}</td>
                    <td className="py-[0.7cqw] text-right font-semibold">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </div>
  );
}
