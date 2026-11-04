import Breadcrumbs from "./Breadcrumbs";
import HexField from "@/components/ui/HexField";

export default function PageHero({
  crumbs,
  eyebrow,
  title,
  text,
  children,
  aside,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="noise relative overflow-hidden pb-20 pt-36 sm:pt-44">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-red/20 blur-[140px]" />
      <HexField className="pointer-events-none absolute right-0 top-24 hidden w-[46%] opacity-70 lg:block" />
      <div className="container-x relative">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-10 grid gap-12 ${aside ? "lg:grid-cols-[1.25fr_0.75fr] lg:items-end" : ""}`}>
          <div>
            {eyebrow && (
              <p data-reveal="fade" className="eyebrow mb-6 flex items-center gap-3">
                <span className="inline-block h-2 w-2 bg-red clip-hex" />
                {eyebrow}
              </p>
            )}
            <h1 data-split="hero" className="max-w-5xl text-[clamp(2.6rem,6.4vw,5.6rem)] font-semibold text-white">
              {title}
            </h1>
            {text && (
              <p data-reveal="up" className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                {text}
              </p>
            )}
            {children && (
              <div data-reveal="up" className="mt-10 flex flex-wrap items-center gap-4">
                {children}
              </div>
            )}
          </div>
          {aside && <div data-reveal="right">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
