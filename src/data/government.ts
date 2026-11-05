// Government contracting details. Fill these in once registered; empty values are hidden on the site.
export const govProfile = {
  uei: "", // SAM.gov Unique Entity ID
  cage: "", // CAGE code
  // e.g. ["Small Business"]; only list designations you actually hold.
  designations: [] as string[],
  naics: [
    { code: "541511", label: "Custom Computer Programming Services" },
    { code: "541512", label: "Computer Systems Design Services" },
    { code: "541519", label: "Other Computer Related Services" },
    { code: "518210", label: "Computing Infrastructure Providers, Data Processing & Web Hosting" },
    { code: "541430", label: "Graphic Design Services" },
  ],
};

export const govLevels = ["State agency", "County", "City / municipality", "School district / higher ed", "Special district / utility / transit", "Tribal government", "Federal", "Other public entity"];

export const usStates = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

export const govServices = [
  { title: "Resident service portals", text: "One login for residents to apply, pay, track requests and get updates, on any device." },
  { title: "Permitting and licensing", text: "Online applications, document upload, review workflows, inspections and fee payment in one system." },
  { title: "311 and service requests", text: "Report a pothole or missed pickup with a photo and location, routed to the right department automatically." },
  { title: "Online payments", text: "Utility bills, fines, fees and taxes with PCI-compliant payment providers and clean reconciliation exports." },
  { title: "Case management", text: "Internal tools for caseworkers and inspectors with role-based access, audit trails and reporting." },
  { title: "Legacy system modernization", text: "Move off aging mainframe, Access or on-premise systems in phases, without stopping day-to-day work." },
  { title: "Accessibility remediation", text: "Audit and fix websites, PDFs and apps against WCAG 2.1 AA and Section 508, with a written conformance report." },
  { title: "Data dashboards and open data", text: "Public-facing dashboards and internal reporting from the data you already collect." },
  { title: "Mobile apps for residents", text: "iOS and Android apps for alerts, transit, parks, events and service requests." },
];

export const govFaqs = [
  { q: "Can you respond to our RFP, RFQ or RFI?", a: "Yes. Send us the solicitation and we will confirm fit within two business days, ask clarifying questions before the Q&A deadline and submit a complete technical and price proposal in the format you require." },
  { q: "Do you build to Section 508 and WCAG 2.1 AA?", a: "Yes. Accessibility is part of design and development from the first sprint, tested with screen readers and automated checks, and documented in a conformance report (VPAT/ACR) for the delivered product." },
  { q: "What does the ADA Title II rule mean for our website?", a: "The U.S. Department of Justice rule published in April 2024 requires state and local government web content and mobile apps to meet WCAG 2.1 Level AA. Entities serving 50,000 people or more must comply by April 24, 2026; smaller entities and special districts by April 26, 2027. We can audit, prioritize and fix what you have." },
  { q: "Can you work as a subcontractor to a prime contractor?", a: "Yes. We regularly team with primes and can take on a defined scope such as design, front-end development, mobile apps or accessibility remediation under your contract." },
  { q: "What contract types do you accept?", a: "Firm fixed price for well-defined scopes, time and materials for evolving work, and task orders under existing agreements. We can also start with a small paid discovery to de-risk a larger procurement." },
  { q: "How do you handle security and data?", a: "Least-privilege access, encryption in transit and at rest, audit logging, U.S.-hosted infrastructure (including AWS GovCloud or Azure Government when required) and security controls mapped to NIST SP 800-53. We follow your agency's IT security policies and sign any required data agreements." },
  { q: "Do you work with small towns and special districts?", a: "Yes. Smaller agencies often have the tightest budgets and deadlines. We scope work to fit small-purchase thresholds where possible and phase larger projects so each phase delivers something usable." },
];
