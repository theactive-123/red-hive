/** @type {import('next').NextConfig} */

// Old WordPress URLs on redhivedigital.com -> their new equivalents (301), so existing rankings carry over.
const legacy = [
  ["/contact-us", "/contact"],
  ["/portfolio", "/work"],
  ["/web-development", "/services/web-application-development"],
  ["/logo-design", "/services/ui-ux-design"],
  ["/illustration-design", "/services/ui-ux-design"],
  ["/animation-design", "/services/ui-ux-design"],
  ["/packages", "/services"],
  ["/web-packages", "/services/web-application-development"],
  ["/logo-packages", "/services/ui-ux-design"],
  ["/illustration-packages", "/services/ui-ux-design"],
  ["/animation-packages", "/services/ui-ux-design"],
  ["/2024/04/30/hello-world", "/insights"],
  ["/feed", "/insights"],
  ["/comments/feed", "/insights"],
];

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig = {
  // Hostinger's shared Node hosting can't run sharp's native binary,
  // so serve images as-is (they are already optimized WebP).
  images: { unoptimized: true },
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    return legacy.flatMap(([from, to]) => [
      { source: from, destination: to, permanent: true },
      { source: `${from}/`, destination: to, permanent: true },
    ]);
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
