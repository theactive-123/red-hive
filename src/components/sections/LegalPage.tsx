import Breadcrumbs from "@/components/sections/Breadcrumbs";

export default function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <section className="pb-28 pt-32 md:pt-44">
      <div className="wrap">
        <Breadcrumbs items={[{ name: title, path }]} />
        <h1 data-split="hero" className="display-lg mt-12">
          {title}
        </h1>
        <div className="mt-14 grid gap-10 border-t border-line pt-12 md:grid-cols-12">
          <p className="tag md:col-span-3">Last updated {updated}</p>
          <div className="prose-rh md:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
