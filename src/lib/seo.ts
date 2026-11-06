import type { Metadata } from "next";
import { site } from "@/data/site";
import type { FAQ } from "@/data/types";

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${site.url}${path}`;
  // Keep titles within ~60 characters: drop the brand suffix when it would push past that.
  const suffixed = `${title} | ${site.name}`;
  const useAbsolute = absoluteTitle || suffixed.length > 60;
  const fullTitle = useAbsolute ? title : suffixed;
  return {
    title: useAbsolute ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/og.png"] },
  };
}

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${site.url}${it.path}`,
  })),
});

export const faqLd = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceLd = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: `${site.url}${path}`,
  serviceType: name,
  areaServed: "Worldwide",
  provider: { "@type": "Organization", name: site.name, url: site.url },
});

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/logo.png`,
  email: site.email,
  description: site.description,
  contactPoint: site.phones.map((p) => ({
    "@type": "ContactPoint",
    telephone: p.href.replace("tel:", ""),
    contactType: p.label === "Sales" ? "sales" : "customer support",
    availableLanguage: ["English"],
  })),
  ...(Object.values(site.social).some(Boolean) ? { sameAs: Object.values(site.social).filter(Boolean) } : {}),
  ...(site.foundingDate ? { foundingDate: site.foundingDate } : {}),
  ...(site.address.street
    ? {
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
      }
    : {}),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { "@id": `${site.url}/#organization` },
});
