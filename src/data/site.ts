export const site = {
  name: "Red Hive Digital",
  shortName: "Red Hive",
  legalName: "Red Hive Digital Inc",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://redhivedigital.com").replace(/\/$/, ""),
  tagline: "Custom web apps, mobile apps and SaaS products.",
  description:
    "Red Hive Digital is a custom software development company building web applications, iOS & Android apps and SaaS products with React, Next.js, Flutter, React Native, Node.js and the cloud.",
  email: "redhivedigital@gmail.com",
  phones: [
    { label: "Sales", display: "(713) 581-8459", href: "tel:+17135818459" },
    { label: "Support", display: "(713) 837-7684", href: "tel:+17138377684" },
  ],
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
  // PLACEHOLDER figures (not shown on the site yet): replace with your real numbers before launch.
  stats: [
    { value: 150, suffix: "+", label: "Products shipped" },
    { value: 98, suffix: "%", label: "Client satisfaction" },
    { value: 8, suffix: "+", label: "Years building software" },
    { value: 40, suffix: "+", label: "Engineers & designers" },
  ],
} as const;
