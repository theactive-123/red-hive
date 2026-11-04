"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navIndustries, navServices, navTechGroups } from "@/data/nav";
import { site } from "@/data/site";
import { useLenis } from "@/components/motion/SmoothScroll";
import { gsap } from "@/lib/gsap";
import Magnetic from "@/components/motion/Magnetic";
import Illustration from "@/components/illustrations/Illustration";

type MenuKey = "services" | "technologies" | "industries" | null;

const links = [
  { key: "services" as const, label: "Services", href: "/services" },
  { key: "technologies" as const, label: "Technologies", href: "/technologies" },
  { key: "industries" as const, label: "Industries", href: "/industries" },
  { key: null, label: "Work", href: "/work" },
  { key: null, label: "About", href: "/about" },
  { key: null, label: "Insights", href: "/insights" },
];

export default function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const [dark, setDark] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [preview, setPreview] = useState<string>(navServices[0].slug);
  const headerRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  // Match the header to the section underneath it, hide on scroll down.
  useEffect(() => {
    let last = scrollY;
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = scrollY;
      const under = document
        .elementsFromPoint(24, y > 40 ? 40 : 76)
        .find((el) => !headerRef.current?.contains(el) && !el.closest(".rh-preloader"))
        ?.closest(".theme-dark, .theme-light");
      setDark(!!under?.classList.contains("theme-dark"));
      setSolid(y > 40);
      if (y > 400 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y < 400) setHidden(false);
      last = y;
    };
    const onScroll = () => (raf ||= requestAnimationFrame(check));
    check();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("rh:intro-done", check);
    const t = setTimeout(check, 300);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("rh:intro-done", check);
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    if (mobile) lenis?.stop();
    else if (window.__rhIntroDone !== false) lenis?.start();
    if (mobile && mobileRef.current) {
      gsap.fromTo(mobileRef.current.querySelectorAll("[data-m]"), { yPercent: 100 }, { yPercent: 0, stagger: 0.05, duration: 1, ease: "expo.out", delay: 0.2 });
    }
  }, [mobile, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(null), setMobile(false));
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  const enter = (k: MenuKey) => {
    if (timer.current) clearTimeout(timer.current);
    if (k && k !== open) setPreview(k === "industries" ? navIndustries[0][0] : navServices[0].slug);
    setOpen(k);
  };
  const leave = () => (timer.current = setTimeout(() => setOpen(null), 150));
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const onDark = (dark && !open) || mobile;
  const theme = onDark ? "theme-dark" : "theme-light";

  const previewText =
    open === "industries"
      ? navIndustries.find(([s]) => s === preview)?.[1]
      : navServices.find((s) => s.slug === preview)?.desc;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-red focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <header
        ref={headerRef}
        onMouseLeave={leave}
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-out-expo ${hidden && !open && !mobile ? "-translate-y-full" : ""}`}
      >
        {/* Announcement bar */}
        <div
          className={`overflow-hidden bg-red text-white transition-[max-height] duration-500 ease-out-expo ${solid || mobile ? "max-h-0" : "max-h-10"}`}
        >
          <div className="wrap flex h-9 items-center justify-center gap-3 text-[0.82rem] font-medium md:justify-between">
            <p className="hidden md:block">Custom web, mobile and SaaS development</p>
            <Link href="/contact" className="inline-flex items-center gap-2 hover:underline">
              Book a free 30-minute call with an engineer
              <span className="tri bg-white text-[0.55rem]" />
            </Link>
          </div>
        </div>

        <div
          className={`${theme} transition-[background-color,border-color,color] duration-500 ${
            solid || open ? "border-b border-line" : "border-b border-transparent !bg-transparent"
          } ${mobile ? "border-transparent !bg-transparent" : ""}`}
        >
          <div className="wrap flex h-[4.5rem] items-center justify-between gap-8">
            <Link href="/" aria-label={`${site.name} home`} className="relative z-10 shrink-0">
              <Image src={onDark ? "/logo.png" : "/logo-dark.png"} alt={site.name} width={257} height={58} priority className="h-9 w-auto md:h-10" />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {links.map((l) => {
                  const on = active(l.href) || (l.key && open === l.key);
                  return (
                    <li key={l.label} onMouseEnter={() => enter(l.key)}>
                      <Link
                        href={l.href}
                        onFocus={() => enter(l.key)}
                        aria-expanded={l.key ? open === l.key : undefined}
                        className={`relative flex items-center gap-1.5 px-3.5 py-2 text-[0.95rem] font-medium transition-colors ${on ? "text-red" : "hover:text-red"}`}
                      >
                        {l.label}
                        {l.key && (
                          <svg viewBox="0 0 10 10" className={`h-2 w-2 transition-transform duration-300 ${open === l.key ? "rotate-180" : ""}`} aria-hidden>
                            <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                          </svg>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <a href={site.phones[0].href} className="hidden text-sm font-medium transition-colors hover:text-red xl:block">
                {site.phones[0].display}
              </a>
              <Magnetic strength={0.25} className="hidden sm:inline-block">
                <Link
                  href="/contact"
                  className="cut group relative inline-flex h-11 items-center overflow-hidden bg-red px-5 text-sm font-semibold text-white [--cut:10px]"
                >
                  <span className="absolute inset-0 -translate-x-[101%] bg-fg transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
                  <span className="relative transition-colors duration-300 group-hover:text-bg">Start a project</span>
                </Link>
              </Magnetic>
              <button
                type="button"
                onClick={() => setMobile((m) => !m)}
                aria-label={mobile ? "Close menu" : "Open menu"}
                aria-expanded={mobile}
                className="relative z-10 grid h-11 w-11 place-items-center bg-fg text-bg lg:hidden"
              >
                <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-500 ${mobile ? "rotate-45" : "-translate-y-[4px]"}`} />
                <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-500 ${mobile ? "-rotate-45" : "translate-y-[4px]"}`} />
              </button>
            </div>
          </div>

          {/* Mega menu */}
          <div
            onMouseEnter={() => open && enter(open)}
            className={`hidden overflow-hidden transition-[max-height] duration-700 ease-out-expo lg:block ${open ? "max-h-[560px]" : "max-h-0"}`}
          >
            <div className={`wrap grid grid-cols-12 gap-10 pb-10 pt-6 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}>
              {open === "services" && (
                <>
                  <ul className="col-span-7 grid grid-cols-2 gap-x-8">
                    {navServices.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          onMouseEnter={() => setPreview(s.slug)}
                          onFocus={() => setPreview(s.slug)}
                          className={`group flex items-center justify-between gap-4 border-b border-line py-3 transition-colors ${preview === s.slug ? "text-red" : ""}`}
                        >
                          <span className="text-[1.02rem] font-semibold">{s.name}</span>
                          <span className={`tri text-[0.6rem] transition-opacity ${preview === s.slug ? "opacity-100" : "opacity-0"}`} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <MenuPreview name={preview} text={previewText} href={`/services/${preview}`} />
                </>
              )}
              {open === "technologies" && (
                <div className="col-span-12 grid grid-cols-6 gap-8">
                  {navTechGroups.map((g) => (
                    <div key={g.label}>
                      <p className="mb-4 border-b-2 border-fg pb-3 font-display text-lg font-bold">{g.label}</p>
                      <ul className="space-y-2">
                        {g.items.map(([slug, name]) => (
                          <li key={slug}>
                            <Link href={`/technologies/${slug}`} className="text-[0.95rem] text-muted transition-colors hover:text-red">
                              {name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {open === "industries" && (
                <>
                  <ul className="col-span-7 grid grid-cols-2 gap-x-8">
                    {navIndustries.map(([slug, name]) => (
                      <li key={slug}>
                        <Link
                          href={`/industries/${slug}`}
                          onMouseEnter={() => setPreview(slug)}
                          onFocus={() => setPreview(slug)}
                          className={`flex items-center justify-between border-b border-line py-3.5 transition-colors ${preview === slug ? "text-red" : ""}`}
                        >
                          <span className="text-[1.05rem] font-semibold">{name}</span>
                          <span className={`tri text-[0.6rem] transition-opacity ${preview === slug ? "opacity-100" : "opacity-0"}`} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <MenuPreview name={preview} text={previewText} href={`/industries/${preview}`} />
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        ref={mobileRef}
        data-lenis-prevent
        aria-hidden={!mobile}
        className={`theme-dark fixed inset-0 z-40 overflow-y-auto transition-[clip-path] duration-[900ms] ease-in-out-quart lg:hidden ${
          mobile ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="wrap flex min-h-full flex-col justify-between pb-10 pt-28">
          <ul>
            {[...links.map((l) => [l.href, l.label] as const), ["/process", "Process"] as const, ["/contact", "Contact"] as const].map(([href, label], i) => (
              <li key={href} className="overflow-hidden border-b border-line">
                <Link data-m href={href} className="flex items-baseline justify-between py-3">
                  <span className="font-display text-[2.4rem] font-extrabold leading-tight tracking-tight">{label}</span>
                  <span className="text-sm text-white/40">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-white/50">Email</p>
              <a href={`mailto:${site.email}`} className="text-lg">
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-sm text-white/50">Call</p>
              <a href={site.phones[0].href} className="text-lg">
                {site.phones[0].display}
              </a>
            </div>
          </div>
          <Link href="/contact" className="cut mt-8 flex h-14 items-center justify-center bg-red font-semibold">
            Start a project
          </Link>
        </div>
      </div>
    </>
  );
}

function MenuPreview({ name, text, href }: { name: string; text?: string; href: string }) {
  return (
    <Link href={href} className="cut-tl group col-span-5 flex flex-col bg-card p-6 [--cut:28px]">
      <div className="relative aspect-[4/3] w-full">
        <Illustration key={name} name={name} className="absolute inset-0 h-full w-full" />
      </div>
      <div className="mt-4 flex items-end justify-between gap-6">
        <p className="max-w-xs text-sm text-muted">{text}</p>
        <span className="shrink-0 text-sm font-semibold underline decoration-red decoration-2 underline-offset-4">Learn more</span>
      </div>
    </Link>
  );
}
