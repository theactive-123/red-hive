// PLACEHOLDER CASE STUDIES — sample projects that illustrate the kind of work Red Hive Digital does. Replace with real, client-approved case studies before launch.

export type CaseStudy = {
  slug: string;
  name: string;
  /** Generic descriptor, e.g. "Telehealth startup, USA". No real company names. */
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
  /** Text shown on the product's main screen in the drawn mockup. */
  screen: {
    title: string;
    subtitle: string;
    metric: { label: string; value: string };
    rows: { name: string; meta: string; value: string }[];
  };
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
      "A telehealth app for iOS and Android where patients book a doctor, join the video call and read their visit notes afterwards. One Flutter codebase covers both stores.",
    seoTitle: "Pulsecare: Flutter Telehealth App Case Study",
    seoDescription:
      "How Red Hive Digital built Pulsecare, a Flutter telehealth app for iOS and Android with video visits, secure messaging and appointment scheduling.",
    challenge: [
      "The founders had proved demand with a web prototype, but patients kept asking for an app. They wanted to book from their phone, join a call with one tap and get reminders that actually showed up. Two separate native apps would have doubled the budget and slowed every release.",
      "It's healthcare, so the data rules were strict. Messages, visit notes and attachments had to be encrypted in transit and at rest, every access had to be logged, and video calls had to survive weak mobile signal.",
    ],
    solution: [
      "We built one Flutter app for iOS and Android on a shared design system, so each feature went out to both stores on the same day. BLoC state management kept booking, video and messaging in separate modules that we could test on their own.",
      "The backend is a Node.js API on AWS that handles scheduling, notifications and role-based access, with PostgreSQL for records and audit logs. Video runs through a WebRTC provider with adaptive bitrate and automatic reconnects. The whole stack was set up to support HIPAA requirements.",
    ],
    features: [
      { title: "One-tap video visits", text: "WebRTC calls that drop quality before they drop the call, plus in-call chat for links and files." },
      { title: "Scheduling", text: "Live provider availability, slots shown in the patient's time zone, and reminders by push, SMS and email." },
      { title: "Secure messaging", text: "Encrypted threads between patients and their care team. Attachments are scanned before delivery." },
      { title: "Visit summaries", text: "Doctors publish notes and care plans that patients can read and download after each visit." },
      { title: "Provider dashboard", text: "A web view for clinicians to manage their queue, set availability and check patient history." },
      { title: "Audit trail", text: "Every read of protected data is logged and can be reviewed during a compliance check." },
    ],
    results: [
      { value: "2x", label: "release pace compared with two native codebases" },
      { value: "4.7★", label: "average app store rating after launch" },
      { value: "-35%", label: "missed appointments once reminders went live" },
    ],
    tech: ["flutter", "firebase", "nodejs", "postgresql", "aws", "docker"],
    platforms: ["iOS", "Android", "Web"],
    duration: "18 weeks",
    screen: {
      title: "Good morning, Maya",
      subtitle: "Next visit: Dr. Okafor, 10:30",
      metric: { label: "Heart rate", value: "72 bpm" },
      rows: [
        { name: "Video consult", meta: "Today · 10:30", value: "Join" },
        { name: "Lab results", meta: "Uploaded Mon", value: "View" },
        { name: "Refill: Lisinopril", meta: "Ready Thu", value: "Track" },
      ],
    },
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
      "A multi-tenant cash-flow and invoicing product. Finance teams see what's owed to them, what they owe and what the bank balance will look like over the next 13 weeks.",
    seoTitle: "Ledgerly: Fintech SaaS Dashboard Case Study",
    seoDescription:
      "How Red Hive Digital built Ledgerly, a multi-tenant fintech SaaS dashboard with Next.js and NestJS for real-time cash-flow forecasting and invoicing.",
    challenge: [
      "Finance teams at small and mid-sized companies were answering one question with spreadsheets, bank exports and their accounting software: how much cash will we have next month? The client wanted a product that pulled all of that into one place.",
      "One platform would hold data for many companies, so tenant data could never leak. It also had to sync reliably with bank and accounting APIs and stay quick with years of transactions loaded into the charts.",
    ],
    solution: [
      "Tenant isolation is enforced in the database with PostgreSQL row-level security, so a bug in the app layer can't show one company another's data. A NestJS API exposes typed, versioned endpoints, and background workers run the bank and accounting syncs with retries and idempotency keys.",
      "The Next.js front end renders on the server for quick first loads and streams heavier reports in as they're ready. Redis caches the aggregates behind each dashboard. Stripe subscription billing with seat and usage limits was part of the first release.",
    ],
    features: [
      { title: "Cash-flow forecast", text: "A rolling 13-week forecast built from open invoices, recurring bills and past payment patterns." },
      { title: "Bank and ledger sync", text: "Scheduled imports from bank feeds and accounting platforms that are safe to re-run and flag conflicts." },
      { title: "Invoice automation", text: "Create, send and chase invoices with reminder templates and payment links." },
      { title: "Role-based access", text: "Separate permissions for owners, accountants and approvers, with SSO for larger teams." },
      { title: "Subscription billing", text: "Self-serve plans, trials, seat limits and usage-based upgrades." },
      { title: "Report exports", text: "PDF and CSV exports of P&L, aged receivables and forecasts for board packs." },
    ],
    results: [
      { value: "<1s", label: "dashboard load for a typical tenant" },
      { value: "-60%", label: "time spent on month-end reconciliation" },
      { value: "99.9%", label: "uptime since launch" },
    ],
    tech: ["nextjs", "typescript", "nestjs", "postgresql", "redis", "aws", "docker"],
    platforms: ["Web"],
    duration: "22 weeks",
    screen: {
      title: "Cash position",
      subtitle: "Forecast · next 13 weeks",
      metric: { label: "Projected balance", value: "£184,200" },
      rows: [
        { name: "INV-2041 Harlow Ltd", meta: "Due in 3 days", value: "£12,400" },
        { name: "Payroll run", meta: "28 Nov", value: "-£46,900" },
        { name: "INV-2038 Brightway", meta: "7 days overdue", value: "£3,150" },
      ],
    },
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
      "A local delivery marketplace with three apps (customer, courier and merchant) and an operations console that shows every live order on one map.",
    seoTitle: "Dashly: On-Demand Delivery App Case Study",
    seoDescription:
      "How Red Hive Digital built Dashly, an on-demand delivery marketplace with React Native customer and courier apps, a Node.js backend and real-time tracking.",
    challenge: [
      "The client was entering a crowded local delivery market. Customers, couriers and merchants each needed their own app, and all three depended on accurate live locations and order status.",
      "Dispatch had to be quick and fair to couriers. Payments had to split cleanly between merchant, courier and platform. And the system had to hold up during the lunch and dinner rush, when order volume jumps several times over.",
    ],
    solution: [
      "The customer and courier apps are built in React Native and share most of their components and logic. Merchants use a React web portal. A Node.js backend pushes courier locations and order updates over WebSockets.",
      "The dispatch service ranks nearby couriers by distance, current load and acceptance rate. MongoDB geospatial indexes keep location lookups fast, Redis queues absorb the rush-hour spikes, and payouts are split automatically through marketplace payments.",
    ],
    features: [
      { title: "Live order tracking", text: "The courier's position and an updated ETA on a map, from pickup to the door." },
      { title: "Dispatch", text: "Couriers are assigned automatically based on distance, how busy they are and how often they accept jobs." },
      { title: "Courier app", text: "Shifts, navigation handoff to Google Maps or Waze, proof of delivery photos and earnings." },
      { title: "Merchant portal", text: "Menus, stock levels, the incoming order queue and payout reports." },
      { title: "Split payments", text: "Card and wallet payments, with merchant and courier payouts calculated per order." },
      { title: "Ops console", text: "A live map of active orders and couriers, with problems flagged for the support team." },
    ],
    results: [
      { value: "3", label: "apps built on one shared codebase" },
      { value: "-25%", label: "average delivery time after tuning dispatch" },
      { value: "10x", label: "normal peak-hour volume handled in load tests" },
    ],
    tech: ["react-native", "react", "nodejs", "mongodb", "redis", "google-cloud"],
    platforms: ["iOS", "Android", "Web"],
    duration: "20 weeks",
    screen: {
      title: "Order on the way",
      subtitle: "Omar is 4 min away",
      metric: { label: "Arriving", value: "12:48" },
      rows: [
        { name: "Chicken shawarma x2", meta: "Al Reef Grill", value: "AED 46" },
        { name: "Fresh mint lemonade", meta: "Al Reef Grill", value: "AED 14" },
        { name: "Delivery fee", meta: "2.1 km", value: "AED 7" },
      ],
    },
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
      "A fleet management web app that replaced spreadsheets and phone calls with live vehicle tracking, route planning and maintenance alerts.",
    seoTitle: "Routewise: Fleet Management Platform Case Study",
    seoDescription:
      "How Red Hive Digital built Routewise, a fleet management web app with React, Go and AWS for live GPS tracking, route planning and maintenance scheduling.",
    challenge: [
      "The operator ran a growing fleet on spreadsheets, an old GPS portal and a lot of phone calls. Dispatchers couldn't see in one place where trucks were, which loads were running late or which vehicles were due for service.",
      "Telematics devices send a steady stream of position and sensor readings. The new system had to take in that stream without dropping data, keep the map live for dozens of dispatchers at once, and stay affordable to run.",
    ],
    solution: [
      "A Go ingestion service receives telematics events, validates them and writes them to time-partitioned PostgreSQL tables. It runs in autoscaling containers on AWS, with a managed queue between each stage so a slow step never blocks the next.",
      "Dispatchers work in a React app with a live map, a route planner and a feed of exceptions. Updates arrive over WebSockets instead of polling. Maintenance rules raise alerts from mileage and engine data, and reports export straight into the tools the operator already used.",
    ],
    features: [
      { title: "Live fleet map", text: "Position, speed and status for every vehicle on one map, refreshed every few seconds." },
      { title: "Route planning", text: "Multi-stop routes that respect delivery windows and driver hours rules." },
      { title: "Exception alerts", text: "Late deliveries, route deviations and long idle times flagged automatically." },
      { title: "Maintenance scheduling", text: "Service reminders driven by mileage, engine hours and fault codes." },
      { title: "Driver scorecards", text: "Harsh braking, speeding and on-time performance tracked per driver." },
      { title: "Data exports", text: "Scheduled CSV and API exports for billing, payroll and BI tools." },
    ],
    results: [
      { value: "-18%", label: "fuel cost after route optimization" },
      { value: "2.5x", label: "vehicles managed per dispatcher" },
      { value: "-40%", label: "unplanned vehicle downtime" },
    ],
    tech: ["react", "typescript", "golang", "postgresql", "aws", "docker", "kubernetes"],
    platforms: ["Web"],
    duration: "24 weeks",
    screen: {
      title: "Fleet overview",
      subtitle: "Dallas depot · 64 vehicles",
      metric: { label: "On time today", value: "93%" },
      rows: [
        { name: "Truck 218", meta: "I-35 N · 58 mph", value: "On time" },
        { name: "Truck 104", meta: "Idle 22 min", value: "Check" },
        { name: "Van 37", meta: "Service due", value: "4 days" },
      ],
    },
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
      "A white-label e-learning platform. Training companies use it to run their own branded academy with courses, live cohorts, quizzes and certificates.",
    seoTitle: "LearnLoop: E-learning SaaS Platform Case Study",
    seoDescription:
      "How Red Hive Digital built LearnLoop, a white-label e-learning SaaS with Next.js and Django for courses, live cohorts, assessments and certificates.",
    challenge: [
      "The client works with training providers who were selling courses through a patchwork of video hosting, form builders and payment links. They wanted one platform that each provider could brand as its own academy.",
      "Each academy needed its own domain, branding and pricing, while the client wanted a single codebase to maintain. Learners expected it to work well on a phone and to pick up where they left off on any device.",
    ],
    solution: [
      "The backend is a multi-tenant Django app with a REST API and an admin area designed for course creators. Requests are matched to a tenant by custom domain, and each academy sets its own theme, catalog and prices.",
      "Learners use a Next.js app. Public course pages are statically generated so they load fast and rank in search, while lessons, quizzes and discussions sit behind login. Video streams through a CDN with signed URLs so it can't be hotlinked.",
    ],
    features: [
      { title: "White-label academies", text: "Custom domain, logo, colors and email templates for each tenant." },
      { title: "Course builder", text: "Drag-and-drop modules with video, text, downloads and embedded quizzes." },
      { title: "Live cohorts", text: "Scheduled sessions with calendar invites and recordings attached afterwards." },
      { title: "Assessments", text: "Quizzes, assignments and auto-graded tests with a pass mark set per course." },
      { title: "Certificates", text: "Issued automatically on completion, with a public link anyone can verify." },
      { title: "Payments and coupons", text: "One-off purchases, subscriptions, bundles and discount codes." },
    ],
    results: [
      { value: "<2 days", label: "to launch a new branded academy" },
      { value: "+30%", label: "course completion with cohort reminders" },
      { value: "95+", label: "Lighthouse score on public course pages" },
    ],
    tech: ["nextjs", "typescript", "django", "python", "postgresql", "aws"],
    platforms: ["Web", "Mobile web"],
    duration: "20 weeks",
    screen: {
      title: "Welcome back, Priya",
      subtitle: "Project Management Basics",
      metric: { label: "Course progress", value: "68%" },
      rows: [
        { name: "Module 4: Risk logs", meta: "12 min video", value: "Resume" },
        { name: "Quiz: Scheduling", meta: "10 questions", value: "Start" },
        { name: "Live cohort call", meta: "Thu · 6:00 PM", value: "Join" },
      ],
    },
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
      "An AI assistant on a brokerage's website that answers buyer questions about listings, suggests homes that fit and books inspections, at any hour.",
    seoTitle: "Nestmind: AI Real Estate Assistant Case Study",
    seoDescription:
      "How Red Hive Digital built Nestmind, an AI real estate assistant using OpenAI, LangChain and Next.js to search listings, answer questions and book viewings.",
    challenge: [
      "Agents at the brokerage spent hours a day answering the same questions about listings, suburbs and inspection times, often in the evening. Buyers who waited too long for a reply moved on to another agency.",
      "A generic chatbot wouldn't do. Answers had to come from the brokerage's own listings and documents, it could never make up details about a property, and it had to hand the conversation to a real agent at the right point.",
    ],
    solution: [
      "We built a retrieval-augmented assistant with LangChain and OpenAI models. Listings, strata reports and suburb guides are stored as embeddings in PostgreSQL with pgvector, and every answer cites the listing or document it came from.",
      "Tool calls let the assistant filter listings by budget, suburb and features, check agent calendars and book inspections in the chat. The Next.js widget sits on the brokerage's website, and qualified leads go into the CRM with a short summary of the conversation.",
    ],
    features: [
      { title: "Plain-language search", text: "Buyers describe what they want and get matching listings, each with a reason it fits." },
      { title: "Sourced answers", text: "Replies come from listings and documents, and the source is shown under each answer." },
      { title: "Inspection bookings", text: "The assistant checks agent availability and books inspections inside the chat." },
      { title: "Lead qualification", text: "Budget, timeline and finance status are captured and scored automatically." },
      { title: "CRM handoff", text: "Qualified leads arrive in the CRM with a chat summary for the agent." },
      { title: "Guardrails and analytics", text: "Topic limits, personal data redaction and a report of the questions it couldn't answer." },
    ],
    results: [
      { value: "24/7", label: "replies to buyer questions" },
      { value: "-50%", label: "repeat questions reaching agents" },
      { value: "+20%", label: "enquiries that became booked inspections" },
    ],
    tech: ["openai", "langchain", "nextjs", "python", "fastapi", "postgresql", "azure"],
    platforms: ["Web"],
    duration: "12 weeks",
    screen: {
      title: "Ask Nestmind",
      subtitle: "3-bed near good schools, under $1.2M",
      metric: { label: "Matches found", value: "14" },
      rows: [
        { name: "12 Wattle St, Ryde", meta: "3 bed · 2 bath", value: "$1.15M" },
        { name: "4/88 Pittwater Rd", meta: "3 bed · 1 bath", value: "$985K" },
        { name: "Inspection booked", meta: "Sat · 11:15 AM", value: "Done" },
      ],
    },
  },
];

export const getCase = (slug: string) => caseStudies.find((c) => c.slug === slug);
