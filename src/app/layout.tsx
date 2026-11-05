import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Motion from "@/components/motion/Motion";
import Cursor from "@/components/motion/Cursor";
import Preloader from "@/components/motion/Preloader";
import PageShell from "@/components/motion/PageShell";
import JsonLd from "@/components/seo/JsonLd";
import { organizationLd, websiteLd } from "@/lib/seo";
import { site } from "@/data/site";
import "./globals.css";

// Cabinet Grotesk + General Sans by Indian Type Foundry (ITF Free Font License, see ./fonts)
const display = localFont({ src: "./fonts/CabinetGrotesk-Variable.woff2", variable: "--ff-display", weight: "100 900", display: "swap" });
const sans = localFont({ src: "./fonts/GeneralSans-Variable.woff2", variable: "--ff-body", weight: "200 700", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Custom Web App, Mobile App & SaaS Development Company`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Hide reveal targets before first paint only when JS runs and motion is allowed,
// so content is never hidden for no-JS visitors or crawlers.
// Also decides whether the first-visit preloader plays (once per session).
const motionFlag = `(function(){var d=document.documentElement;try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r)d.classList.add('js-motion');var seen=sessionStorage.getItem('rh-intro');if(seen||r){d.classList.add('intro-done');window.__rhIntroDone=true}else{d.classList.add('is-loading');window.__rhIntroDone=false}}catch(e){d.classList.add('intro-done');window.__rhIntroDone=true}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
        <style>{`html.intro-done .rh-preloader{display:none}`}</style>
        <noscript>
          <style>{`.rh-preloader{display:none}`}</style>
        </noscript>
      </head>
      <body className="theme-light min-h-screen">
        <Preloader />
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <SmoothScroll>
          <Header />
          <main id="main">
            <PageShell>{children}</PageShell>
          </main>
          <Footer />
        </SmoothScroll>
        <Motion />
        <Cursor />
      </body>
    </html>
  );
}
