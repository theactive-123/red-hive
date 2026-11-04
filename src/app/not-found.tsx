import Link from "next/link";
import Button from "@/components/ui/Button";
import HexField from "@/components/ui/HexField";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-28">
      <HexField className="pointer-events-none absolute inset-0 m-auto w-[min(900px,100%)] opacity-60" />
      <div className="container-x relative text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-6 font-display text-[clamp(6rem,22vw,16rem)] font-bold leading-none text-gradient-red">404</h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-muted">This cell of the hive is empty. The page you’re looking for may have moved.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/">Back home</Button>
          <Button href="/contact" variant="ghost">
            Contact us
          </Button>
        </div>
        <p className="mt-10 text-sm text-dim">
          Popular: <Link href="/services" className="text-white/70 hover:text-white">Services</Link> ·{" "}
          <Link href="/technologies" className="text-white/70 hover:text-white">Technologies</Link> ·{" "}
          <Link href="/work" className="text-white/70 hover:text-white">Work</Link>
        </p>
      </div>
    </section>
  );
}
