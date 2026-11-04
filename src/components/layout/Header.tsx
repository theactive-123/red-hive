"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navCompany, navIndustries, navServices, navTechGroups } from "@/data/nav";
import { site } from "@/data/site";
import { useLenis } from "@/components/motion/SmoothScroll";
import { gsap } from "@/lib/gsap";
import Magnetic from "@/components/motion/Magnetic";

type MenuKey = "services" | "technologies" | "industries" | "company" | null;

export default function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Close menus on navigation (adjusting state during render, per React docs).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 300 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobile) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = mobile ? "hidden" : "";
    if (mobile && mobileRef.current) {
      gsap.fromTo(
        mobileRef.current.querySelectorAll("[data-m]"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.8, delay: 0.15 },
      );
    }
  }, [mobile, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enter = (k: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(k);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  const items: { key: Exclude<MenuKey, null>; label: string; href: string }[] = [
    { key: "services", label: "Services", href: "/services" },
    { key: "technologies", label: "Technologies", href: "/technologies" },
    { key: "industries", label: "Industries", href: "/industries" },
    { key: "company", label: "Company", href: "/about" },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-red focus:px-4 focus:py-2">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo ${
          hidden && !open && !mobile ? "-translate-y-full" : "translate-y-0"
        }`}
        onMouseLeave={leave}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled || open ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
          }`}
        >
          <div className="container-x flex h-[76px] items-center justify-between gap-6">
            <Link href="/" aria-label={`${site.name} home`} className="relative z-10 shrink-0">
              <Image src="/logo.png" alt={site.name} width={257} height={58} priority className="h-9 w-auto sm:h-10" />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {items.map((it) => (
                  <li key={it.key} onMouseEnter={() => enter(it.key)}>
                    <Link
                      href={it.href}
                      aria-expanded={open === it.key}
                      onFocus={() => enter(it.key)}
                      className={`group flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors ${
                        open === it.key || isActive(it.href) ? "text-white" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {it.label}
                      <svg viewBox="0 0 12 12" className={`h-2.5 w-2.5 transition-transform duration-300 ${open === it.key ? "rotate-180 text-red-hot" : ""}`} aria-hidden>
                        <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    </Link>
                  </li>
                ))}
                <li onMouseEnter={() => setOpen(null)}>
                  <Link href="/work" className={`rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors ${isActive("/work") ? "text-white" : "text-white/70 hover:text-white"}`}>
                    Work
                  </Link>
                </li>
                <li onMouseEnter={() => setOpen(null)}>
                  <Link href="/insights" className={`rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors ${isActive("/insights") ? "text-white" : "text-white/70 hover:text-white"}`}>
                    Insights
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <a href={site.phones[0].href} className="hidden font-mono text-xs tracking-wider text-white/60 transition-colors hover:text-white xl:block">
                {site.phones[0].display}
              </a>
              <Magnetic strength={0.3} className="hidden sm:inline-block">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-hot"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-red" />
                  Get a quote
                </Link>
              </Magnetic>
              <button
                type="button"
                onClick={() => setMobile((m) => !m)}
                aria-label={mobile ? "Close menu" : "Open menu"}
                aria-expanded={mobile}
                className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-line-strong lg:hidden"
              >
                <span className={`absolute h-[1.5px] w-5 bg-white transition-transform duration-500 ${mobile ? "rotate-45" : "-translate-y-[4px]"}`} />
                <span className={`absolute h-[1.5px] w-5 bg-white transition-transform duration-500 ${mobile ? "-rotate-45" : "translate-y-[4px]"}`} />
              </button>
            </div>
          </div>

          {/* Mega menu */}
          <div
            className={`hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out-expo lg:block ${
              open ? "max-h-[640px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
            }`}
            onMouseEnter={() => open && enter(open)}
          >
            <div className="container-x pb-10 pt-4">
              {open === "services" && (
                <div className="grid grid-cols-[1fr_300px] gap-10">
                  <ul className="grid grid-cols-3 gap-x-6 gap-y-1">
                    {navServices.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="group block rounded-xl p-3 transition-colors hover:bg-white/[0.04]">
                          <span className="flex items-center gap-2 font-medium text-white">
                            <span className="h-1.5 w-1.5 scale-0 bg-red clip-hex transition-transform group-hover:scale-100" />
                            {s.name}
                          </span>
                          <span className="mt-0.5 block text-sm text-muted">{s.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <MenuPromo
                    title="Not sure where to start?"
                    text="Book a free 30-minute consultation and get a scoped plan with estimates."
                    href="/contact"
                    cta="Talk to an engineer"
                  />
                </div>
              )}
              {open === "technologies" && (
                <div className="grid grid-cols-6 gap-6">
                  {navTechGroups.map((g) => (
                    <div key={g.label}>
                      <p className="eyebrow mb-3 !text-[0.65rem]">{g.label}</p>
                      <ul className="space-y-1">
                        {g.items.map(([slug, name]) => (
                          <li key={slug}>
                            <Link href={`/technologies/${slug}`} className="block py-1 text-sm text-white/75 transition-colors hover:text-white">
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
                <div className="grid grid-cols-[1fr_300px] gap-10">
                  <ul className="grid grid-cols-4 gap-2">
                    {navIndustries.map(([slug, name]) => (
                      <li key={slug}>
                        <Link href={`/industries/${slug}`} className="block rounded-xl border border-line p-4 text-sm font-medium text-white/85 transition-colors hover:border-red/60 hover:text-white">
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <MenuPromo title="Industry-ready" text="Compliance-aware builds for healthcare, fintech and more." href="/industries" cta="All industries" />
                </div>
              )}
              {open === "company" && (
                <div className="grid grid-cols-[1fr_300px] gap-10">
                  <ul className="grid grid-cols-3 gap-2">
                    {navCompany.map(([href, name]) => (
                      <li key={href}>
                        <Link href={href} className="block rounded-xl p-4 text-lg font-medium text-white/80 transition-colors hover:bg-white/[0.04] hover:text-white">
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <MenuPromo title="We're hiring" text="Engineers and designers who care about craft." href="/careers" cta="Open roles" />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        ref={mobileRef}
        data-lenis-prevent
        className={`fixed inset-0 z-40 overflow-y-auto bg-ink/95 backdrop-blur-xl transition-[clip-path] duration-700 ease-out-expo lg:hidden ${
          mobile ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]"
        }`}
        aria-hidden={!mobile}
      >
        <div className="container-x pb-16 pt-28">
          <MobileGroup title="Services" links={navServices.map((s) => [`/services/${s.slug}`, s.name])} />
          <MobileGroup title="Technologies" links={navTechGroups.flatMap((g) => g.items.map(([s, n]) => [`/technologies/${s}`, n] as const))} />
          <MobileGroup title="Industries" links={navIndustries.map(([s, n]) => [`/industries/${s}`, n])} />
          <MobileGroup title="Company" links={navCompany.map(([h, n]) => [h, n])} />
          <div data-m className="mt-10 space-y-3">
            <Link href="/contact" className="block rounded-full bg-red py-4 text-center font-semibold">
              Get a free quote
            </Link>
            <a href={`mailto:${site.email}`} className="block text-center text-sm text-muted">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function MenuPromo({ title, text, href, cta }: { title: string; text: string; href: string; cta: string }) {
  return (
    <Link href={href} className="group relative block overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-red/25 via-red-deep/10 to-transparent p-6">
      <div className="bg-hex absolute inset-0 opacity-60" />
      <p className="relative font-display text-xl font-semibold text-white">{title}</p>
      <p className="relative mt-2 text-sm text-white/70">{text}</p>
      <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
        {cta}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

function MobileGroup({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <details data-m className="group border-b border-line py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between font-display text-3xl font-semibold">
        {title}
        <span className="text-red-hot transition-transform duration-300 group-open:rotate-45">+</span>
      </summary>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
        {links.map(([href, name]) => (
          <li key={href}>
            <Link href={href} className="text-[0.95rem] text-white/70">
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
