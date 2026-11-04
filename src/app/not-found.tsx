import Button from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[85vh] items-end pb-24 pt-40">
      <div className="wrap w-full">
        <p className="tag">Error 404</p>
        <h1 className="display-xl mt-6">
          Lost in the <span className="text-red">hive.</span>
        </h1>
        <div className="mt-14 grid gap-8 border-t border-line pt-8 md:grid-cols-12">
          <p className="lead text-muted md:col-span-5">The page you’re looking for has moved or never existed.</p>
          <div className="flex flex-wrap items-center gap-6 md:col-span-7 md:justify-end">
            <Button href="/">Back home</Button>
            <ArrowLink href="/services">Services</ArrowLink>
            <ArrowLink href="/work">Work</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
