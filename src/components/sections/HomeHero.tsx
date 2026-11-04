import HiveLazy from "@/components/three/HiveLazy";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";

export default function HomeHero() {
  return (
    <section className="theme-dark relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0">
        <HiveLazy className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#00020a_0%,rgba(0,2,10,0.85)_35%,rgba(0,2,10,0.1)_75%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent" />
      </div>

      <div className="wrap pointer-events-none relative flex flex-1 flex-col justify-center pb-28 pt-36">
        <h1 data-split="hero" className="display-xl max-w-[12ch]">
          We build web apps, mobile apps and SaaS products.
        </h1>
        <p data-reveal className="lead mt-8 max-w-xl text-white/75">
          Red Hive Digital is a small team of designers and engineers. We take products from a rough idea to launch, then keep improving them with
          you.
        </p>
        <div data-reveal className="pointer-events-auto mt-10 flex flex-wrap gap-3">
          <Button href="/contact" variant="red">
            Start a project
          </Button>
          <Button href="/work" variant="outline">
            See our work
          </Button>
        </div>
      </div>

      <div className="wrap relative flex flex-wrap items-center justify-between gap-4 border-t border-line py-5 text-sm text-white/60">
        <p>
          Call us: <a href={site.phones[0].href} className="text-white hover:text-red">{site.phones[0].display}</a>
        </p>
        <p>
          Email: <a href={`mailto:${site.email}`} className="text-white hover:text-red">{site.email}</a>
        </p>
      </div>
    </section>
  );
}
