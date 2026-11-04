import Breadcrumbs from "./Breadcrumbs";

/** Inner-page opener: breadcrumb, large headline, intro on the right, optional media below. */
export default function PageHero({
  crumbs,
  title,
  text,
  children,
  media,
  dark = false,
}: {
  crumbs: { name: string; path: string }[];
  label?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  children?: React.ReactNode;
  media?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={`${dark ? "theme-dark" : "theme-light"} pt-32 md:pt-44`}>
      <div className="wrap">
        <Breadcrumbs items={crumbs} />
        <h1 data-split="hero" className="display-lg mt-12 max-w-[16ch]">
          {title}
        </h1>
        {(text || children) && (
          <div className="mt-12 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6 md:col-start-7">
              {text && (
                <p data-reveal className="lead text-fg/80">
                  {text}
                </p>
              )}
              {children && (
                <div data-reveal className="mt-8 flex flex-wrap gap-3">
                  {children}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {media ? <div className="wrap pb-6 pt-16">{media}</div> : <div className="pb-20 md:pb-28" />}
    </section>
  );
}
