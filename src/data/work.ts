// Red Hive Digital case studies. Facts come from the project overviews supplied by the team.
// Fields left empty (tech, duration) are hidden on the site until filled in.

export type CaseStudy = {
  slug: string;
  name: string;
  /** Who it was built for, as it can be shown publicly. */
  client: string;
  category: "Web App" | "SaaS" | "Mobile App";
  /** Industry slug from industries.ts, or a plain label when no industry page fits. */
  industry: string;
  /** Service slug from services.ts */
  service: string;
  accent: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  challenge: string[];
  solution: string[];
  features: { title: string; text: string }[];
  /** Tech slugs from tech-slugs.ts. Leave empty if not confirmed. */
  tech: string[];
  platforms: string[];
  duration?: string;
  /** Captions for the gallery screens, in the order of public/images/work/<slug>-screen-N.webp */
  gallery: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sbh-ehr-portal",
    name: "SBH EHR Portal",
    client: "SBH, behavioral health",
    category: "Web App",
    industry: "healthcare",
    service: "enterprise-software-development",
    accent: "#0c9ca8",
    summary:
      "An electronic health records and operations platform for behavioral health facilities: resident charts, medication records, clinical notes and staff management in one portal.",
    seoTitle: "SBH EHR Portal: Behavioral Health EHR Case Study",
    seoDescription:
      "How Red Hive Digital built the SBH EHR Portal, a behavioral health EHR with resident charts, monthly MAR, therapy notes, staff scheduling and audit logs.",
    challenge: [
      "Behavioral health facilities run on a mix of paper binders, spreadsheets and general-purpose tools. Medication administration records, progress notes and staff paperwork each lived somewhere different, which made audits slow and handovers between shifts risky.",
      "The organisation also manages more than one facility, so access had to be scoped per organisation and per facility, with a clear record of who changed what.",
    ],
    solution: [
      "We built a single web portal that covers the resident side and the staff side of the operation. Each resident has a profile, chart, vitals, assessments and tracking history, and the medication module shows a full month of scheduled doses with staff initials and administration status.",
      "On the staff side the portal handles scheduling, timesheets, training, leave requests and employment forms. Administrators manage organisations, facilities and role capabilities from one admin center, and every change is written to an audit log.",
    ],
    features: [
      { title: "Resident management", text: "Profiles, medical charts, vitals, assessments and tracking for every resident in one place." },
      { title: "Medication administration records", text: "A monthly MAR with dose schedules, refill counts, staff initials and administration status." },
      { title: "Clinical documentation", text: "Therapy progress notes, appointments and re-assessments linked to each resident." },
      { title: "Employee management", text: "Scheduling, timesheets, training records, leave requests and performance tracking for staff." },
      { title: "Multi-facility administration", text: "Organisations, facilities and role-based access managed from a super-admin center." },
      { title: "Forms, alerts and audit logs", text: "A custom form builder, notifications, mileage tracking, reporting and a full audit trail." },
    ],
    tech: [],
    platforms: ["Web"],
    gallery: [
      "Resident care dashboard with census, appointments and form activity",
      "Monthly medication administration record (sample resident data)",
      "Super-admin center for organisations, facilities and roles",
      "Employee information and onboarding forms",
      "Staff training modules",
      "Booking an appointment for a resident",
    ],
  },
  {
    slug: "stockflow-pro",
    name: "StockFlow Pro",
    client: "Multi-company retail and wholesale",
    category: "SaaS",
    industry: "ecommerce-retail",
    service: "saas-development",
    accent: "#483ce4",
    summary:
      "A multi-tenant inventory and point-of-sale platform that runs products, warehouses, purchasing, sales and analytics for several companies from one account.",
    seoTitle: "StockFlow Pro: Inventory & POS SaaS Case Study",
    seoDescription:
      "StockFlow Pro is a multi-company inventory and POS SaaS built with Next.js, TypeScript, Supabase and PostgreSQL: warehouses, purchase orders, sales and roles.",
    challenge: [
      "Businesses that run more than one company or store usually end up with a separate system for each, plus spreadsheets for stock transfers between warehouses. Owners couldn't see sales, stock and purchasing together, and staff had more access than they needed.",
      "The product had to keep each company's data fully separate while letting one owner switch between them without logging in again.",
    ],
    solution: [
      "We built StockFlow Pro as a multi-tenant SaaS on Next.js and Supabase, with PostgreSQL row-level security keeping every company's data isolated. An owner creates a workspace, adds companies and switches between them from the header.",
      "Inside each company the platform covers the full stock cycle: product catalog and categories, warehouses and transfers, purchase orders from suppliers, a point-of-sale checkout, invoices and returns. Custom roles decide exactly which screens each team member can use, and analytics and activity logs show what is happening across the business.",
    ],
    features: [
      { title: "Multi-company workspaces", text: "Separate inventories and teams per company, with one-click switching for owners." },
      { title: "Inventory and warehouses", text: "Product catalog, categories, stock adjustments, multiple warehouses and stock transfers." },
      { title: "Point of sale", text: "A fast checkout screen with cart, totals and printable invoices, plus sales returns." },
      { title: "Purchasing", text: "Purchase orders, supplier access and invoice reviews tied to incoming stock." },
      { title: "Custom roles", text: "Build roles from granular permissions such as products:read or sales:write and assign them per company." },
      { title: "Analytics and audit logs", text: "Sales trends, inventory insights and an activity log of every change." },
    ],
    tech: ["nextjs", "react", "typescript", "supabase", "postgresql"],
    platforms: ["Web"],
    gallery: [
      "Company overview with quick links to products, inventory, sales and logs",
      "Point-of-sale checkout",
      "Sales analytics",
      "Custom role manager with granular permissions",
      "Creating a purchase order",
      "Adding a product with pricing and stock levels",
    ],
  },
  {
    slug: "chat-portal-ai",
    name: "Chat Portal AI",
    client: "Conversation intelligence SaaS",
    category: "SaaS",
    industry: "Customer communication",
    service: "ai-development",
    accent: "#6c48f0",
    summary:
      "A real-time messaging platform that uses Claude to analyse finished conversations and turn them into structured reports with key points and recommended actions.",
    seoTitle: "Chat Portal AI: Claude-Powered Chat Analysis Case Study",
    seoDescription:
      "Chat Portal AI combines real-time messaging with Claude AI analysis: automatic conversation reports, key points and next actions, secured with Supabase RLS.",
    challenge: [
      "Teams that talk to customers or users all day have the information they need buried in chat history. Someone has to read every thread to pull out decisions, problems and follow-ups, and most of the time nobody does.",
      "Conversations can contain sensitive details, so the platform needed proper authentication and strict per-user data access from the first version.",
    ],
    solution: [
      "We built a real-time chat workspace where admins and users message each other and share files. When a conversation is finished, an admin generates an analysis report with one click: Claude reads the thread and returns a structured summary of the main points, important details and recommended actions.",
      "Authentication and data access run on Supabase with row-level security, so each user only ever sees their own conversations. Admins get a dashboard with users, active chats, message counts and the latest AI analyses.",
    ],
    features: [
      { title: "Real-time messaging", text: "Instant conversations with file attachments and organised chat history." },
      { title: "Claude AI analysis", text: "One-click reports that summarise a conversation and list key points and next actions." },
      { title: "Admin dashboard", text: "Users, active chats, messages and recent analyses at a glance." },
      { title: "Conversation management", text: "Search and filter every conversation from a central list." },
      { title: "Secure by default", text: "Supabase authentication with row-level security on every table." },
      { title: "Responsive interface", text: "Works on desktop and mobile for both admins and users." },
    ],
    tech: ["openai", "supabase"],
    platforms: ["Web"],
    gallery: [
      "Admin dashboard with recent conversations and analyses",
      "Sign-in screen",
      "Conversation list",
      "A live conversation",
      "Generating a Claude analysis report",
    ],
  },
  {
    slug: "raheel-tech-pm",
    name: "Raheel Tech PM",
    client: "Raheel Tech",
    category: "SaaS",
    industry: "Professional services",
    service: "saas-development",
    accent: "#7860e4",
    summary:
      "A project management and team productivity platform with workspaces, tasks, time tracking, employee analytics, subscriptions and an apps center.",
    seoTitle: "Raheel Tech PM: Project Management SaaS Case Study",
    seoDescription:
      "Raheel Tech PM is a project management SaaS with workspaces, tasks and subtasks, time tracking, employee analytics, Stripe subscriptions and an add-ons center.",
    challenge: [
      "Growing teams tend to track projects in one tool, hours in another and team performance in spreadsheets, so managers can't see workload or progress without asking people directly. The brief was to bring all of that into one place.",
      "The platform also had to work as a product other companies could subscribe to, which meant plans, billing and white-label branding from the first release.",
    ],
    solution: [
      "We built a workspace-based platform where each project space holds tasks and subtasks with priorities, assignees, deadlines and several views. A built-in timer logs hours against each space, and dashboards show task status and time allocation in real time.",
      "For running it as a business, the platform has tiered subscription plans with Stripe checkout, an apps center where workspaces switch extra modules on and off, and an admin area for roles, permissions and company branding.",
    ],
    features: [
      { title: "Workspaces and tasks", text: "Projects, spaces, tasks and subtasks with priorities, assignments and deadlines." },
      { title: "Time tracking", text: "A built-in timer and timesheets with time logged per space." },
      { title: "Employee analytics", text: "Productivity and task completion per person and per team." },
      { title: "Subscriptions and billing", text: "Free, Unlimited, Business Pro and Enterprise plans with Stripe checkout." },
      { title: "Apps center", text: "Add-on modules that each workspace can enable or disable." },
      { title: "Admin and branding", text: "Role-based permissions, employee directory and white-label colours and logo." },
    ],
    tech: [],
    platforms: ["Web"],
    gallery: [
      "Workspace overview with task status and time allocation",
      "Subscription plans",
      "Apps center",
      "Admin, roles and white-label branding",
      "Time tracking and timesheets",
      "Subscription checkout",
    ],
  },
  {
    slug: "spendshift",
    name: "SpendShift",
    client: "Personal finance startup, Australia",
    category: "Web App",
    industry: "fintech",
    service: "web-application-development",
    accent: "#009024",
    summary:
      "A two-minute spending audit for Australians that finds likely money leaks from a short questionnaire, with no bank connection required.",
    seoTitle: "SpendShift: Personal Finance Audit Web App Case Study",
    seoDescription:
      "SpendShift is a personal finance web app that finds your biggest money leaks in about two minutes from a short quiz, without linking a bank account.",
    challenge: [
      "Most budgeting apps ask people to connect their bank on the first screen. Plenty of people won't, so they never find out where their money is going.",
      "SpendShift wanted the opposite: a quick, private way to estimate savings that works without any account or banking data, and then a clear next step for people who want more help.",
    ],
    solution: [
      "We designed and built a short, mobile-friendly audit. People answer simple questions about habits like takeaway, subscriptions and unplanned purchases, watch a short analysis step, and get an estimated yearly savings range with their top three money leaks.",
      "The free result leads into a paid full report with a personalised action plan. Everything runs without a bank connection, and the landing page explains the privacy approach up front.",
    ],
    features: [
      { title: "Two-minute audit", text: "A guided questionnaire with progress tracking that works well on phones." },
      { title: "Money-leak estimate", text: "A yearly savings range and the top three categories where money is likely leaking." },
      { title: "Analysis step", text: "A short, transparent analysis screen that shows what is being checked." },
      { title: "Paid full report", text: "A personalised action plan unlocked after the free result." },
      { title: "Private by design", text: "No sign-up, bank connection or payment details needed to get a result." },
      { title: "Built for Australians", text: "Copy, categories and estimates based on Australian spending habits." },
    ],
    tech: [],
    platforms: ["Web", "Mobile web"],
    gallery: [
      "Landing page",
      "Free result with estimated yearly savings",
      "Audit question",
      "Analysing the answers",
      "Upgrade to the full report",
    ],
  },
];

export const getCase = (slug: string) => caseStudies.find((c) => c.slug === slug);
