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
        .elementsFromPoint(24, 36)
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
    setOpen(k);
  };
  const leave = () => (timer.current = setTimeout(() => setOpen(null), 150));
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const onDark = (dark && !open) || mobile;
  const theme = onDark ? "theme-dark" : "theme-light";

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
        <div
          className={`${theme} transition-[background-color,border-color,color] duration-500 ${
            solid || open ? "border-b border-line" : "border-b border-transparent !bg-transparent"
          } ${mobile ? "!bg-transparent border-transparent" : ""}`}
        >
          <div className="wrap flex h-[4.5rem] items-center justify-between gap-8">
            <Link href="/" aria-label={`${site.name} home`} className="relative z-10 shrink-0">
              <Image src={onDark ? "/logo.png" : "/logo-dark.png"} alt={site.name} width={257} height={58} priority className="h-8 w-auto md:h-9" />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {links.map((l) => (
                  <li key={l.label} onMouseEnter={() => enter(l.key)}>
                    <Link
                      href={l.href}
                      onFocus={() => enter(l.key)}
                      aria-expanded={l.key ? open === l.key : undefined}
                      className={`relative py-2 text-[0.95rem] font-medium transition-opacity hover:opacity-100 ${active(l.href) || (l.key && open === l.key) ? "opacity-100" : "opacity-70"}`}
                    >
                      {l.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-out-expo ${
                          active(l.href) || (l.key && open === l.key) ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
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
                className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
              >
                <span className={`absolute h-px w-4.5 bg-current transition-transform duration-500 ${mobile ? "rotate-45" : "-translate-y-[3px]"}`} />
                <span className={`absolute h-px w-4.5 bg-current transition-transform duration-500 ${mobile ? "-rotate-45" : "translate-y-[3px]"}`} />
              </button>
            </div>
          </div>

          {/* Mega menu */}
          <div
            onMouseEnter={() => open && enter(open)}
            className={`hidden overflow-hidden transition-[max-height] duration-700 ease-out-expo lg:block ${open ? "max-h-[520px]" : "max-h-0"}`}
          >
            <div className={`wrap grid grid-cols-12 gap-8 pb-12 pt-6 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}>
              {open === "services" && (
                <>
                  <MenuIntro title="Services" text="Strategy, design and engineering for web, mobile and SaaS products." href="/services" />
                  <ul className="col-span-9 grid grid-cols-3 gap-x-8">
                    {navServices.map((s) => (
                      <li key={s.slug} className="border-t border-line">
                        <Link href={`/services/${s.slug}`} className="group flex items-baseline justify-between gap-4 py-3.5">
                          <span>
                            <span className="block text-[0.95rem] font-medium">{s.name}</span>
                            <span className="block text-sm text-muted">{s.desc}</span>
                          </span>
                          <span className="tri text-[0.8rem] opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {open === "technologies" && (
                <>
                  <MenuIntro title="Technologies" text="The frameworks, languages and platforms our engineers use every day." href="/technologies" />
                  <div className="col-span-9 grid grid-cols-6 gap-6">
                    {navTechGroups.map((g) => (
                      <div key={g.label}>
                        <p className="mb-3 border-b border-line pb-3 text-sm text-muted">{g.label}</p>
                        <ul className="space-y-1.5">
                          {g.items.map(([slug, name]) => (
                            <li key={slug}>
                              <Link href={`/technologies/${slug}`} className="link-line text-[0.92rem]">
                                {name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {open === "industries" && (
                <>
                  <MenuIntro title="Industries" text="Domain experience that shortens the path from idea to launch." href="/industries" />
                  <ul className="col-span-9 grid grid-cols-2 gap-x-8">
                    {navIndustries.map(([slug, name]) => (
                      <li key={slug} className="border-t border-line">
                        <Link href={`/industries/${slug}`} className="group flex items-center justify-between py-3.5 text-lg">
                          {name}
                          <span className="tri text-[0.8rem] opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
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
            {[...links.map((l) => [l.href, l.label] as const), ["/process", "Process"] as const, ["/contact", "Contact"] as const].map(([href, label]) => (
              <li key={href} className="overflow-hidden border-b border-line">
                <Link data-m href={href} className="block py-3 font-display text-[2.5rem] font-extrabold leading-tight tracking-tight">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-1 text-muted">
            <a href={`mailto:${site.email}`} className="block text-fg">
              {site.email}
            </a>
            <a href={site.phones[0].href} className="block">
              {site.phones[0].display}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function MenuIntro({ title, text, href }: { title: string; text: string; href: string }) {
  return (
    <div className="col-span-3 pr-8">
      <p className="display-sm">{title}</p>
      <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-muted">{text}</p>
      <Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
        <span className="underline decoration-red decoration-2 underline-offset-4">View all</span>
      </Link>
    </div>
  );
}
