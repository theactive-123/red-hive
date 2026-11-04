import HiveLazy from "@/components/three/HiveLazy";
import Button from "@/components/ui/Button";

export default function HomeHero() {
  return (
    <section className="theme-dark relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0">
        <HiveLazy className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/50" />
      </div>

      <div className="wrap pointer-events-none relative flex flex-1 flex-col justify-end pb-10 pt-32">
        <h1 data-split="hero" className="display-xl max-w-[11ch]">
          Ideas in. Products out.
        </h1>

        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-12">
          <p data-reveal data-delay="0.5" className="lead text-fg/80 md:col-span-6 lg:col-span-5">
            Red Hive Digital is a design and engineering studio. We build web applications, mobile apps and SaaS platforms for startups and growing
            companies.
          </p>
          <div data-reveal data-delay="0.6" className="pointer-events-auto flex flex-wrap items-start gap-3 md:col-span-6 md:justify-end lg:col-span-7">
            <Button href="/contact" variant="red">
              Start a project
            </Button>
            <Button href="/work" variant="outline">
              Selected work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
