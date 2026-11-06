import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Allows every crawler (Googlebot included) and lists the sitemap.
// Note: Hostinger's edge replaces robots.txt on temporary *.hostingersite.com domains
// with a Googlebot block; that override does not apply on the real domain.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/"] },
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
