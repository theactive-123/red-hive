import Breadcrumbs from "@/components/sections/Breadcrumbs";

export default function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <section className="pb-24 pt-36 sm:pt-44">
      <div className="container-x max-w-4xl">
        <Breadcrumbs items={[{ name: title, path }]} />
        <h1 data-split="hero" className="mt-10 text-[clamp(2.6rem,6vw,4.8rem)] font-semibold text-white">
          {title}
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">Last updated {updated}</p>
        <div className="prose-rh mt-12">{children}</div>
      </div>
    </section>
  );
}
