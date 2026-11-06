import Link from "next/link";
import Breadcrumbs from "@/components/sections/Breadcrumbs";
import GovForm from "@/components/sections/GovForm";
import FAQ from "@/components/sections/FAQ";
import ProjectCard from "@/components/sections/ProjectCard";
import StickyStory from "@/components/sections/StickyStory";
import JsonLd from "@/components/seo/JsonLd";
import { govFaqs, govProfile, govServices } from "@/data/government";
import { caseStudies } from "@/data/work";
import { site } from "@/data/site";
import { pageMetadata, serviceLd } from "@/lib/seo";

const DESC =
  "Software, web portals and mobile apps for state, county and city government. Section 508 and WCAG 2.1 AA accessible, U.S.-hosted. Request a proposal.";

export const metadata = pageMetadata({
  title: "Government Software Development for State & Local Agencies",
  description: DESC,
  path: "/government-contracts",
  keywords: [
    "government software development company",
    "state and local government software development",
    "municipal software development",
    "county government software",
    "GovTech software development",
    "public sector web development",
    "government web portal development",
    "ADA Title II website compliance",
    "WCAG 2.1 AA government websites",
    "Section 508 compliant software development",
    "government IT contractor",
    "SLED IT services",
    "permitting software development",
    "311 app development",
  ],
});

const who = [
  ["State agencies", "Departments, boards and commissions running statewide programs."],
  ["Counties", "Clerk, assessor, courts, health and human services, public works."],
  ["Cities and towns", "Resident services, permits, utilities, parks and public safety."],
  ["School districts and higher ed", "Enrollment, family portals, transportation and student services."],
  ["Special districts", "Water, utility, transit, port, library and fire districts."],
  ["Tribal governments", "Member services, enrollment and program management systems."],
];

const assurances = [
  { title: "Accessibility built in", text: "Designed and tested to WCAG 2.1 AA and Section 508 from the first sprint, delivered with a VPAT / Accessibility Conformance Report." },
  { title: "Security mapped to NIST", text: "Encryption, least-privilege roles, audit logging and controls mapped to NIST SP 800-53. We follow your IT security policy and data agreements." },
  { title: "U.S.-hosted infrastructure", text: "AWS, Azure or Google Cloud in U.S. regions, including AWS GovCloud or Azure Government when your data requires it." },
  { title: "Procurement-ready proposals", text: "Complete technical and price volumes in your format, compliance matrices, references and on-time submission." },
  { title: "Transparent delivery", text: "Fixed milestones, two-week demos, a staging site your team can review and plain-language status reports for leadership." },
  { title: "You own everything", text: "Source code, documentation and data stay with the agency. No proprietary lock-in, with a clean handover at the end." },
];

const steps = [
  { title: "Share the requirement", text: "Send the RFP, RFQ, RFI or a short description. We confirm fit within two business days." },
  { title: "Clarify and scope", text: "We submit questions before the Q&A deadline or run a short discovery call with your team." },
  { title: "Proposal", text: "Technical approach, staffing, timeline, accessibility and security plan, and pricing in your required format." },
  { title: "Deliver in phases", text: "Each phase ships something usable, with demos, user testing and acceptance against agreed criteria." },
  { title: "Support and maintain", text: "Hosting, monitoring, security updates and enhancements under an SLA that fits your budget cycle." },
];

export default function GovernmentPage() {
  const relevant = caseStudies.filter((c) => ["sbh-ehr-portal", "stockflow-pro", "printgraphi", "chat-portal-ai"].includes(c.slug));
  return (
    <>
      <JsonLd
        data={[
          serviceLd("Government Software Development", DESC, "/government-contracts"),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "State and Local Government Software Development",
            serviceType: "Government software development",
            areaServed: { "@type": "Country", name: "United States" },
            audience: { "@type": "Audience", audienceType: "State, county and municipal government agencies" },
            provider: { "@type": "Organization", name: site.name, url: site.url },
          },
        ]}
      />

      {/* Hero with the form above the fold */}
      <section className="theme-dark relative overflow-hidden pb-20 pt-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6 lg:pt-6">
            <Breadcrumbs items={[{ name: "Government", path: "/government-contracts" }]} />
            <p data-reveal className="mt-10 inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 text-sm font-semibold">
              <span className="tri text-[0.6rem]" /> For state, county and municipal agencies
            </p>
            <h1 data-split="hero" className="display-lg mt-6">
              Government software development for state and local agencies
            </h1>
            <p data-reveal className="lead mt-8 max-w-xl text-white/80">
              Resident portals, permitting, payments, case management and accessible websites, built to Section 508 and WCAG 2.1 AA and delivered on a fixed,
              transparent plan.
            </p>
            <ul data-reveal className="mt-10 grid gap-3 text-white/85 sm:grid-cols-2">
              {["Section 508 & WCAG 2.1 AA", "NIST 800-53 aligned security", "U.S.-hosted, GovCloud ready", "RFP, RFQ and RFI responses", "Prime or subcontractor", "Fixed price or T&M"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center bg-red text-xs">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="theme-light cut-tl p-6 shadow-2xl [--cut:36px] md:p-9 lg:col-span-6">
            <p className="display-sm">Request a proposal</p>
            <p className="mb-6 mt-2 text-sm text-muted">Tell us about your project or solicitation. A project lead replies within one business day.</p>
            <GovForm email={site.email} compact />
          </div>
        </div>
      </section>

      {/* ADA Title II deadline callout */}
      <section className="bg-red text-white">
        <div className="wrap grid gap-6 py-10 md:grid-cols-12 md:items-center">
          <p className="display-sm md:col-span-5">ADA Title II: your website and apps must meet WCAG 2.1 AA.</p>
          <p className="text-white/90 md:col-span-5">
            Under the U.S. Department of Justice rule, governments serving 50,000+ people must comply by <strong>April 24, 2026</strong>; smaller entities and
            special districts by <strong>April 26, 2027</strong>.
          </p>
          <div className="md:col-span-2 md:text-right">
            <a href="#proposal" className="cut inline-flex h-12 items-center bg-navy px-6 text-sm font-semibold [--cut:10px] hover:bg-white hover:text-navy">
              Get an audit
            </a>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="wrap py-24 md:py-32">
        <h2 data-split className="display-md max-w-[18ch]">
          Built for every level of public service
        </h2>
        <ul className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {who.map(([t, d]) => (
            <li key={t} data-reveal className="bg-bg p-8 transition-colors duration-500 hover:bg-card">
              <h3 className="text-xl font-bold">{t}</h3>
              <p className="mt-3 text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* What we build */}
      <section className="theme-light bg-card py-24 md:py-32">
        <div className="wrap">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <h2 data-split className="display-md md:col-span-7">
              Software we build for government
            </h2>
            <p data-reveal className="text-lg text-muted md:col-span-5">
              Modern, accessible systems that residents can use on a phone and staff can run without a vendor on call.
            </p>
          </div>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {govServices.map((s, i) => (
              <li key={s.title} data-reveal className="cut bg-white p-8 [--cut:16px]">
                <span className="text-sm font-semibold text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StickyStory title="Why agencies work with us" intro="What you can hold us to, in writing, in the contract." items={assurances} dark />

      {/* Procurement */}
      <section className="wrap py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 data-split className="display-md">
              Easy to procure
            </h2>
            <p data-reveal className="mt-6 text-lg leading-relaxed text-muted">
              We bid directly on solicitations, work under small-purchase thresholds and task orders, and team with prime contractors as a subcontractor.
            </p>
            <dl data-reveal className="mt-10 space-y-4">
              {govProfile.uei && (
                <div className="flex gap-4"><dt className="w-28 text-muted">SAM UEI</dt><dd className="font-semibold">{govProfile.uei}</dd></div>
              )}
              {govProfile.cage && (
                <div className="flex gap-4"><dt className="w-28 text-muted">CAGE code</dt><dd className="font-semibold">{govProfile.cage}</dd></div>
              )}
              {govProfile.designations.length > 0 && (
                <div className="flex gap-4"><dt className="w-28 text-muted">Designations</dt><dd className="font-semibold">{govProfile.designations.join(", ")}</dd></div>
              )}
              <div className="flex gap-4"><dt className="w-28 shrink-0 text-muted">Contract types</dt><dd className="font-semibold">Firm fixed price, time and materials, task orders</dd></div>
              <div className="flex gap-4"><dt className="w-28 shrink-0 text-muted">Capability statement</dt><dd><a className="font-semibold underline decoration-red decoration-2 underline-offset-4" href={`mailto:${site.email}?subject=${encodeURIComponent("Capability statement request")}`}>Request a copy</a></dd></div>
            </dl>
          </div>
          <div className="lg:col-span-7">
            <p data-reveal className="mb-4 font-semibold">NAICS codes</p>
            <ul className="divide-y divide-line border-y border-line">
              {govProfile.naics.map((n) => (
                <li key={n.code} data-reveal className="flex items-baseline gap-6 py-4">
                  <span className="font-display text-2xl font-extrabold text-red">{n.code}</span>
                  <span>{n.label}</span>
                </li>
              ))}
            </ul>
            <ol className="mt-14 space-y-6">
              {steps.map((s, i) => (
                <li key={s.title} data-reveal className="flex gap-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center bg-navy text-sm font-bold text-white">{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-bold">{s.title}</h3>
                    <p className="mt-1 text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Relevant work */}
      <section className="theme-light bg-card py-24 md:py-32">
        <div className="wrap">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 data-split className="display-md max-w-[16ch]">
              Relevant work
            </h2>
            <p data-reveal className="max-w-md text-muted">
              Regulated, multi-role systems with audit logs, permissions and payments: the same building blocks government projects need.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
            {relevant.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      <FAQ faqs={govFaqs} title="Government contracting FAQs" />

      {/* Full form */}
      <section id="proposal" className="theme-dark scroll-mt-24 py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 data-split className="display-md">
              Have a solicitation or a project in mind?
            </h2>
            <p data-reveal className="mt-6 text-lg text-white/75">
              Share the details, including an RFP number and due date if you have one. We’ll confirm fit and next steps within one business day.
            </p>
            <div data-reveal className="mt-10 space-y-3 text-white/80">
              <p>
                Email: <a className="font-semibold text-white hover:text-red" href={`mailto:${site.email}`}>{site.email}</a>
              </p>
              <p>
                Phone: <a className="font-semibold text-white hover:text-red" href={site.phones[0].href}>{site.phones[0].display}</a>
              </p>
              <p className="pt-4 text-sm text-white/55">
                Looking for commercial work instead? <Link href="/contact" className="underline">Use our main contact form</Link>.
              </p>
            </div>
          </div>
          <div className="theme-light cut-tl p-6 [--cut:36px] md:p-10 lg:col-span-7">
            <GovForm email={site.email} />
          </div>
        </div>
      </section>
    </>
  );
}
