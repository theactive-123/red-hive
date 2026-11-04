// PLACEHOLDER CASE STUDIES — sample projects that illustrate the kind of work Red Hive Digital does. Replace with real, client-approved case studies before launch.

export type CaseStudy = {
  slug: string;
  name: string;
  /** Generic descriptor, e.g. "Telehealth startup, USA" — no real company names. */
  client: string;
  category: "Web App" | "Mobile App" | "SaaS" | "AI";
  /** Industry slug from industries.ts */
  industry: string;
  /** Service slug from services.ts */
  service: string;
  year: string;
  accent: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  challenge: string[];
  solution: string[];
  features: { title: string; text: string }[];
  results: { value: string; label: string }[];
  /** Tech slugs from tech-slugs.ts */
  tech: string[];
  platforms: string[];
  duration: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "pulsecare-telehealth-app",
    name: "Pulsecare",
    client: "Telehealth startup, USA",
    category: "Mobile App",
    industry: "healthcare",
    service: "mobile-app-development",
    year: "2025",
    accent: "#E1013B",
    summary:
      "A cross-platform telehealth app that lets patients book, join and follow up on video consultations from a single Flutter codebase.",
    seoTitle: "Pulsecare: Flutter Telehealth App Case Study",
    seoDescription:
      "How Red Hive Digital built Pulsecare, a Flutter telehealth app for iOS and Android with video visits, secure messaging and appointment scheduling.",
    challenge: [
      "The founding team had validated demand with a web prototype, but patients wanted a mobile-first experience: booking on the go, joining calls with one tap and getting reminders that actually arrived. Building separate native apps would have doubled the budget and the release cadence.",
      "Healthcare data added a second layer of complexity. Messages, visit notes and attachments had to be encrypted in transit and at rest, access had to be auditable, and the video experience had to hold up on patchy mobile connections.",
    ],
    solution: [
      "We built a single Flutter app for iOS and Android with a shared design system, so every feature shipped to both stores at once. A clean architecture with BLoC state management kept the booking, video and messaging modules independent and testable.",
      "On the backend, a Node.js API on AWS handles scheduling, notifications and role-based access, with PostgreSQL for records and audit logs. Video runs over a WebRTC provider with adaptive bitrate and automatic reconnects, and the whole stack was designed to support HIPAA requirements.",
    ],
    features: [
      { title: "One-tap video visits", text: "WebRTC calls with adaptive quality, reconnect handling and an in-call chat for links and files." },
      { title: "Smart scheduling", text: "Real-time provider availability, time-zone aware slots and automatic reminders by push, SMS and email." },
      { title: "Secure messaging", text: "End-to-end encrypted threads between patients and care teams, with attachment scanning." },
      { title: "Visit summaries", text: "Providers publish notes and care plans that patients can review and download after each visit." },
      { title: "Provider dashboard", text: "A companion web view for clinicians to manage queues, availability and patient history." },
      { title: "Audit trail", text: "Every access to protected data is logged and reviewable for compliance checks." },
    ],
    results: [
      { value: "2x", label: "faster release cadence vs. two native codebases" },
      { value: "4.7★", label: "average app store rating after launch" },
      { value: "-35%", label: "no-show rate with automated reminders" },
    ],
    tech: ["flutter", "firebase", "nodejs", "postgresql", "aws", "docker"],
    platforms: ["iOS", "Android", "Web"],
    duration: "18 weeks",
  },
  {
    slug: "ledgerly-fintech-saas",
    name: "Ledgerly",
    client: "B2B fintech company, UK",
    category: "SaaS",
    industry: "fintech",
    service: "saas-development",
    year: "2025",
    accent: "#7C5CFF",
    summary:
      "A multi-tenant cash-flow and invoicing dashboard that gives finance teams a real-time view of receivables, payables and forecasts.",
    seoTitle: "Ledgerly: Fintech SaaS Dashboard Case Study",
    seoDescription:
      "How Red Hive Digital built Ledgerly, a multi-tenant fintech SaaS dashboard with Next.js and NestJS for real-time cash-flow forecasting and invoicing.",
    challenge: [
      "Finance teams at small and mid-sized businesses were juggling spreadsheets, bank exports and accounting software to answer a simple question: how much cash will we have next month? The client wanted a SaaS product that pulled it all together.",
      "The product had to serve many companies from one platform without ever leaking data between them, sync reliably with bank and accounting APIs, and stay fast with years of transaction history loaded into charts.",
    ],
    solution: [
      "We designed a multi-tenant architecture with tenant isolation enforced at the database layer using PostgreSQL row-level security. A NestJS API exposes typed, versioned endpoints, and background workers handle bank and accounting syncs with retries and idempotency.",
      "The Next.js frontend uses server rendering for fast first loads and streams heavy reports progressively. Redis caches aggregates so dashboards stay responsive, and Stripe-based subscription billing with usage limits was built in from day one.",
    ],
    features: [
      { title: "Cash-flow forecasting", text: "Rolling 13-week forecasts built from open invoices, recurring bills and historical patterns." },
      { title: "Bank & ledger sync", text: "Scheduled, idempotent imports from bank feeds and accounting platforms with conflict resolution." },
      { title: "Invoice automation", text: "Create, send and chase invoices with templated reminders and payment links." },
      { title: "Role-based access", text: "Granular permissions for owners, accountants and approvers, with SSO for larger teams." },
      { title: "Subscription billing", text: "Self-serve plans, trials, seat limits and usage-based upgrades." },
      { title: "Exportable reports", text: "Board-ready PDF and CSV exports for P&L, aged receivables and forecasts." },
    ],
    results: [
      { value: "<1s", label: "dashboard load for typical tenants" },
      { value: "-60%", label: "time spent on month-end reconciliation" },
      { value: "99.9%", label: "uptime since launch" },
    ],
    tech: ["nextjs", "typescript", "nestjs", "postgresql", "redis", "aws", "docker"],
    platforms: ["Web"],
    duration: "22 weeks",
  },
  {
    slug: "dashly-delivery-marketplace",
    name: "Dashly",
    client: "Local delivery startup, UAE",
    category: "Mobile App",
    industry: "on-demand",
    service: "mobile-app-development",
    year: "2024",
    accent: "#FF6B35",
    summary:
      "A three-sided on-demand delivery marketplace with customer, courier and merchant apps plus a live operations console.",
    seoTitle: "Dashly: On-Demand Delivery App Case Study",
    seoDescription:
      "How Red Hive Digital built Dashly, an on-demand delivery marketplace with React Native customer and courier apps, a Node.js backend and real-time tracking.",
    challenge: [
      "The client wanted to launch a local delivery marketplace in a crowded market. That meant three different user groups, each with their own app, all depending on accurate real-time location and order state.",
      "Dispatch had to be fast and fair, payments had to split cleanly between merchants, couriers and the platform, and the whole system needed to cope with lunch- and dinner-time spikes without slowing down.",
    ],
    solution: [
      "We built customer and courier apps in React Native, sharing most of their UI components and business logic, and a React web portal for merchants. A Node.js backend with WebSockets streams courier locations and order updates in real time.",
      "A dispatch service scores nearby couriers by distance, load and rating, and MongoDB with geospatial indexes keeps location queries fast. Redis queues absorb traffic spikes, and payment splitting is handled through marketplace payouts.",
    ],
    features: [
      { title: "Live order tracking", text: "Real-time courier location and ETA updates on a map, from pickup to doorstep." },
      { title: "Smart dispatch", text: "Automatic courier assignment based on proximity, current load and acceptance rate." },
      { title: "Courier app", text: "Shift management, turn-by-turn navigation handoff, proof of delivery and earnings." },
      { title: "Merchant portal", text: "Menu and inventory management, order queues and payout reports." },
      { title: "Split payments", text: "Card and wallet payments with automatic merchant and courier payouts." },
      { title: "Ops console", text: "A live map of active orders, couriers and exceptions for the support team." },
    ],
    results: [
      { value: "3", label: "apps shipped from one shared codebase" },
      { value: "-25%", label: "average delivery time after dispatch tuning" },
      { value: "10x", label: "peak-hour order volume handled in load tests" },
    ],
    tech: ["react-native", "react", "nodejs", "mongodb", "redis", "google-cloud"],
    platforms: ["iOS", "Android", "Web"],
    duration: "20 weeks",
  },
  {
    slug: "routewise-fleet-platform",
    name: "Routewise",
    client: "Regional logistics operator, USA",
    category: "Web App",
    industry: "logistics",
    service: "web-application-development",
    year: "2024",
    accent: "#00C2A8",
    summary:
      "A fleet management web platform that replaced spreadsheets and phone calls with live vehicle tracking, route planning and maintenance alerts.",
    seoTitle: "Routewise: Fleet Management Platform Case Study",
    seoDescription:
      "How Red Hive Digital built Routewise, a fleet management web app with React, Go and AWS for live GPS tracking, route planning and maintenance scheduling.",
    challenge: [
      "The operator was running a growing fleet with spreadsheets, a legacy GPS portal and a lot of phone calls. Dispatchers had no single view of where vehicles were, which loads were late or which trucks were due for service.",
      "Telematics devices send a constant stream of position and sensor data. The new platform had to ingest that stream reliably, keep the map live for dozens of dispatchers at once and still be cost-effective to run.",
    ],
    solution: [
      "We built a high-throughput ingestion service in Go that receives telematics events, validates them and writes them to PostgreSQL with time-partitioned tables. The service runs on AWS with autoscaling containers and a managed message queue between stages.",
      "The React frontend gives dispatchers a live map, route planner and exception feed, with WebSocket updates instead of polling. Maintenance rules trigger alerts from mileage and engine data, and reports export straight into the operator's existing tools.",
    ],
    features: [
      { title: "Live fleet map", text: "Every vehicle's position, speed and status on one map, updated in seconds." },
      { title: "Route planning", text: "Multi-stop route optimisation with time windows and driver hours constraints." },
      { title: "Exception alerts", text: "Automatic flags for late deliveries, route deviations and long idle times." },
      { title: "Maintenance scheduling", text: "Service reminders based on mileage, engine hours and fault codes." },
      { title: "Driver performance", text: "Scorecards for harsh braking, speeding and on-time performance." },
      { title: "Data exports", text: "Scheduled CSV and API exports for billing, payroll and BI tools." },
    ],
    results: [
      { value: "-18%", label: "fuel cost from optimised routes" },
      { value: "2.5x", label: "more vehicles managed per dispatcher" },
      { value: "-40%", label: "unplanned vehicle downtime" },
    ],
    tech: ["react", "typescript", "golang", "postgresql", "aws", "docker", "kubernetes"],
    platforms: ["Web"],
    duration: "24 weeks",
  },
  {
    slug: "learnloop-elearning-saas",
    name: "LearnLoop",
    client: "EdTech company, Canada",
    category: "SaaS",
    industry: "education",
    service: "saas-development",
    year: "2025",
    accent: "#F5B700",
    summary:
      "A white-label e-learning SaaS that lets training companies launch branded academies with courses, cohorts, quizzes and certificates.",
    seoTitle: "LearnLoop: E-learning SaaS Platform Case Study",
    seoDescription:
      "How Red Hive Digital built LearnLoop, a white-label e-learning SaaS with Next.js and Django for courses, live cohorts, assessments and certificates.",
    challenge: [
      "The client served training providers who were stitching together video hosting, forms and payment links to sell courses. They wanted a single platform each provider could brand as their own academy.",
      "Every academy needed its own domain, branding and pricing, while the client needed one codebase to maintain. Learners expected a smooth, mobile-friendly experience with progress that synced across devices.",
    ],
    solution: [
      "We built a multi-tenant Django backend with a clean REST API and an admin experience tailored to course creators. Tenants are resolved by custom domain, and each academy controls its own theme, catalogue and pricing.",
      "The learner-facing app is built in Next.js with static generation for public course pages, which keeps them fast and indexable, and an authenticated app for lessons, quizzes and discussions. Video is streamed through a CDN with signed URLs.",
    ],
    features: [
      { title: "White-label academies", text: "Custom domains, logos, colours and email templates for every tenant." },
      { title: "Course builder", text: "Drag-and-drop modules with video, text, downloads and embedded quizzes." },
      { title: "Live cohorts", text: "Scheduled sessions, calendar invites and recordings attached to each cohort." },
      { title: "Assessments", text: "Quizzes, assignments and auto-graded tests with configurable pass marks." },
      { title: "Certificates", text: "Automatically issued, verifiable certificates on course completion." },
      { title: "Payments & coupons", text: "One-off purchases, subscriptions, bundles and discount codes." },
    ],
    results: [
      { value: "<2 days", label: "to launch a new branded academy" },
      { value: "+30%", label: "course completion with cohort reminders" },
      { value: "95+", label: "Lighthouse score on public course pages" },
    ],
    tech: ["nextjs", "typescript", "django", "python", "postgresql", "aws"],
    platforms: ["Web", "Mobile web"],
    duration: "20 weeks",
  },
  {
    slug: "nestmind-ai-real-estate-assistant",
    name: "Nestmind",
    client: "Real estate brokerage, Australia",
    category: "AI",
    industry: "real-estate",
    service: "ai-development",
    year: "2025",
    accent: "#3DA9FC",
    summary:
      "An AI property assistant that answers buyer questions in plain language, recommends listings and books viewings around the clock.",
    seoTitle: "Nestmind: AI Real Estate Assistant Case Study",
    seoDescription:
      "How Red Hive Digital built Nestmind, an AI real estate assistant using OpenAI, LangChain and Next.js to search listings, answer questions and book viewings.",
    challenge: [
      "The brokerage's agents were spending hours each day answering the same questions about listings, suburbs and inspection times, often outside business hours. Leads that waited too long for a reply went elsewhere.",
      "A generic chatbot wasn't good enough. Answers had to be grounded in the brokerage's own listings and documents, never invent details about a property, and hand over to a human agent at the right moment.",
    ],
    solution: [
      "We built a retrieval-augmented assistant with LangChain and OpenAI models. Listings, strata reports and suburb guides are embedded into a PostgreSQL vector store, and every answer cites the listing or document it came from.",
      "Tool calls let the assistant filter listings by budget, location and features, check agent calendars and book viewings directly. The Next.js chat widget embeds on the brokerage website, and qualified leads are pushed into the CRM with a conversation summary.",
    ],
    features: [
      { title: "Natural-language search", text: "Buyers describe what they want and get matching listings with reasons for each match." },
      { title: "Grounded answers", text: "Responses are drawn from listings and documents, with sources shown to the user." },
      { title: "Viewing bookings", text: "The assistant checks agent availability and books inspections in the chat." },
      { title: "Lead qualification", text: "Budget, timeline and finance status captured and scored automatically." },
      { title: "CRM handoff", text: "Qualified leads and chat summaries pushed to the CRM for agent follow-up." },
      { title: "Guardrails & analytics", text: "Topic limits, PII redaction and a dashboard of common questions and gaps." },
    ],
    results: [
      { value: "24/7", label: "instant responses to buyer enquiries" },
      { value: "-50%", label: "repetitive questions handled by agents" },
      { value: "+20%", label: "enquiries converted to booked viewings" },
    ],
    tech: ["openai", "langchain", "nextjs", "python", "fastapi", "postgresql", "azure"],
    platforms: ["Web"],
    duration: "12 weeks",
  },
];

export const getCase = (slug: string) => caseStudies.find((c) => c.slug === slug);
