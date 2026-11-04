import Link from "next/link";
import HiveLazy from "@/components/three/HiveLazy";
import RotatingWords from "@/components/motion/RotatingWords";
import Button from "@/components/ui/Button";

export default function HomeHero() {
  return (
    <section className="noise relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-32">
      {/* 3D hive */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(225,1,59,0.22),transparent_60%)]" />
        <HiveLazy className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/5 to-ink/30" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
      </div>

      <div className="container-x pointer-events-none relative">
        <p data-reveal="fade" className="eyebrow mb-7 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-red-hot opacity-70" />
            <span className="relative h-2 w-2 rounded-full bg-red-hot" />
          </span>
          Custom software development company
        </p>
        <h1 className="max-w-[15ch] text-[clamp(2.9rem,8.4vw,8rem)] font-semibold leading-[0.95] text-white">
          <span data-split="hero" className="block">
            We engineer digital products that
          </span>
          <RotatingWords words={["scale.", "convert.", "delight.", "last."]} className="text-gradient-red" />
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <p data-reveal="up" data-delay="0.4" className="max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
            Web applications, iOS &amp; Android apps and SaaS platforms — designed, built and scaled by a senior team that treats your
            product like its own.
          </p>
          <div data-reveal="up" data-delay="0.5" className="pointer-events-auto flex flex-wrap items-center gap-4">
            <Button href="/contact">Start your project</Button>
            <Button href="/work" variant="ghost">
              See our work
            </Button>
          </div>
        </div>

        <div className="pointer-events-auto mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/45">
          <span>Web · iOS · Android · SaaS · AI</span>
          <Link href="#intro" className="group flex items-center gap-3 transition-colors hover:text-white">
            Scroll to explore
            <span className="relative block h-8 w-5 rounded-full border border-white/30">
              <span className="absolute left-1/2 top-1.5 h-1.5 w-[2px] -translate-x-1/2 animate-bounce rounded-full bg-red-hot" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
