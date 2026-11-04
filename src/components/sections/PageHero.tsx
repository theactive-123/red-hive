import Breadcrumbs from "./Breadcrumbs";

/** Inner-page opener. With `visual`, it becomes a split hero (copy left, visual right). */
export default function PageHero({
  crumbs,
  title,
  text,
  children,
  media,
  visual,
  bare = false,
}: {
  crumbs: { name: string; path: string }[];
  label?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  children?: React.ReactNode;
  media?: React.ReactNode;
  visual?: React.ReactNode;
  bare?: boolean;
  dark?: boolean;
}) {
  if (visual) {
    return (
      <section className="theme-light pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Breadcrumbs items={crumbs} />
            <h1 data-split="hero" className="display-lg mt-10">
              {title}
            </h1>
            {text && (
              <p data-reveal className="lead mt-8 max-w-xl text-fg/80">
                {text}
              </p>
            )}
            {children && (
              <div data-reveal className="mt-10 flex flex-wrap gap-3">
                {children}
              </div>
            )}
          </div>
          <div className="lg:col-span-6">
            {bare ? (
              visual
            ) : (
              <div data-clip className="cut-tl relative bg-card p-6 [--cut:48px] md:p-10">
                <div data-clip-inner>{visual}</div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="theme-light pt-32 md:pt-44">
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
