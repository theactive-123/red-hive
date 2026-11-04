import TechIcon from "./TechIcon";

/** Tech logo in a glowing hex with its toolkit orbiting around it (pure CSS). */
export default function TechOrbit({ icon, name, color, toolkit }: { icon?: string; name: string; color: string; toolkit: string[] }) {
  const items = toolkit.slice(0, 8);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] [container-type:inline-size]">
      <div className="absolute inset-[18%] rounded-full blur-[70px]" style={{ background: color, opacity: 0.35 }} />
      <div className="absolute inset-0 rounded-full border border-line" />
      <div className="absolute inset-[16%] rounded-full border border-dashed border-white/10" />
      <div className="absolute inset-0 animate-spin-slow [animation-duration:40s]">
        {items.map((t, i) => {
          const a = (i / items.length) * Math.PI * 2;
          return (
            <span
              key={t}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(-50%,-50%) translate(${Math.cos(a) * 50}cqw, ${Math.sin(a) * 50}cqw)` }}
            >
              <span className="block animate-spin-slow whitespace-nowrap rounded-full border border-line-strong bg-ink/90 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-white/75 [animation-direction:reverse] [animation-duration:40s]">
                {t}
              </span>
            </span>
          );
        })}
      </div>
      <div className="absolute inset-[30%] grid place-items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/[0.02] clip-hex" />
        <div className="absolute inset-[2px] bg-ink-2 clip-hex" />
        <div className="absolute inset-[2px] opacity-40 clip-hex" style={{ background: `radial-gradient(circle at 30% 20%, ${color}, transparent 70%)` }} />
        <TechIcon icon={icon} name={name} className="relative h-[42%] w-[42%] text-white" />
      </div>
    </div>
  );
}
