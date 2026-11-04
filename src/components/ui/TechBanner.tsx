import TechIcon from "./TechIcon";
import VelocityMarquee from "@/components/motion/VelocityMarquee";

/** Flat brand-colour panel with the tech mark and its toolkit sliding past. */
export default function TechBanner({ icon, name, color, toolkit }: { icon?: string; name: string; color: string; toolkit: string[] }) {
  return (
    <div data-clip className="relative overflow-hidden rounded-xl" style={{ background: color }}>
      <div data-clip-inner className="relative flex aspect-[16/10] flex-col justify-between md:aspect-[21/8]">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_120%,rgba(0,0,0,0.3),transparent_60%)]" />
        <div className="relative flex flex-1 items-center justify-center">
          <TechIcon icon={icon} name={name} className="h-24 w-24 text-white md:h-36 md:w-36" color="#fff" />
        </div>
        <VelocityMarquee speed={35} className="relative border-t border-white/25 py-4 text-white">
          {toolkit.map((t) => (
            <span key={t} className="flex items-center whitespace-nowrap px-6 text-sm font-medium md:text-base">
              {t}
              <span className="ml-12 h-1 w-1 rounded-full bg-white/70" />
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </div>
  );
}
