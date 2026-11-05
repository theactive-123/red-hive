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
  /** Mobile apps only: captions for public/images/work/screens/<slug>-N.webp (single phone screens). */
  phones?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "videeo",
    name: "Videeo",
    client: "Video streaming startup",
    category: "Mobile App",
    industry: "Media & entertainment",
    service: "mobile-app-development",
    accent: "#70e000",
    summary:
      "A streaming and pay-per-view platform: an Android app for viewers, a web portal where creators upload and earn, and an admin panel that runs it all.",
    seoTitle: "Videeo: Streaming & Pay-Per-View App Case Study",
    seoDescription:
      "Videeo is a streaming and pay-per-view platform with an Android viewer app, a content creator portal for uploads and earnings, and a full admin panel.",
    challenge: [
      "Independent creators and event organisers want to sell their videos and live events directly, without handing most of the revenue to a large platform. Viewers, on the other hand, expect the polish of the big streaming apps.",
      "That meant three products in one: a viewer app people enjoy using, a portal where creators can publish and get paid, and an admin side that keeps content, payments and users under control.",
    ],
    solution: [
      "We designed an Android app around a dark, cinematic interface with neon green accents. Viewers browse TV shows, movies and channels, continue where they left off, rent or buy titles, and join live pay-per-view events such as sports, online classes and live shopping. Subscriptions, downloads and a friends list round it out.",
      "Creators get a web portal to submit titles, set prices, follow views and track earnings by region. The admin panel covers users, creators, channels, categories, video moderation and approval, coupons, packages, payment reports and push notifications.",
    ],
    features: [
      { title: "Streaming and rentals", text: "TV shows, movies and channels with trailers, episodes, ratings and rent-or-buy options." },
      { title: "Live pay-per-view", text: "Ticketed live events for sports, education, live shopping and online classes." },
      { title: "Subscriptions", text: "Monthly plans with device and quality limits, plus one-off purchases." },
      { title: "Social and sign-in", text: "Friends, requests and sharing, with sign-in by email, OTP, Google, Facebook or Apple." },
      { title: "Creator portal", text: "Uploads, pricing, analytics and earnings by region for content creators." },
      { title: "Admin panel", text: "Content approval, user and creator management, coupons, packages, payments and push notifications." },
    ],
    tech: [],
    platforms: ["Android", "Web"],
    gallery: [
      "Home, title page and live pay-per-view events",
      "Movies, theater and subscription plans",
      "Sign in, friends and creator content",
      "Creator portal: earnings dashboard",
      "Admin panel: video management",
      "Admin panel: content approval",
    ],
    phones: ["Home", "Title page", "Live pay-per-view", "Movies", "Theater", "Subscription plan", "Friends", "Sign in"],
  },
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
    slug: "printgraphi",
    name: "Printgraphi",
    client: "Online printing marketplace",
    category: "Mobile App",
    industry: "ecommerce-retail",
    service: "mobile-app-development",
    accent: "#1e8ccb",
    summary:
      "A custom-printing marketplace: customers order and design prints on the web, and print shops pick up, manage and deliver those jobs from a seller mobile app.",
    seoTitle: "Printgraphi: Print Marketplace App Case Study",
    seoDescription:
      "Printgraphi is a printing marketplace with a customer web store and template editor, and an Android seller app where print shops accept and manage orders.",
    challenge: [
      "Ordering custom printing online usually means a long form, a file upload and a lot of back and forth. On the other side, independent print shops have no simple way to find work and manage it from the shop floor.",
      "The marketplace had to make ordering easy for customers and give sellers a fast, phone-first tool for taking jobs, without either side needing training.",
    ],
    solution: [
      "Customers shop by product (business cards, banners, clothing, booklets and more), choose options like paper stock, finish and corners, then upload their own design or customise a template in the built-in editor before checkout. Their account keeps a dashboard, order history with one-click re-order and saved payment methods.",
      "Print shops use an Android app. New jobs arrive in an order pool where sellers see the specification and accept or reject in one tap, then move them through ongoing and completed. The app also covers earnings, reviews, notifications, supply requests for boxes and tape, and subscriptions.",
    ],
    features: [
      { title: "Order pool", text: "Sellers see nearby jobs with full print specs and accept or reject them in one tap." },
      { title: "Order management", text: "Ongoing and completed orders with status, details and shipping information." },
      { title: "Seller dashboard", text: "Earnings, live orders, a performance chart and the latest reviews at a glance." },
      { title: "Template editor", text: "Customers pick a template by industry and texture, then customise it in the browser." },
      { title: "Customer accounts", text: "Dashboard, order history with re-order, and saved payment methods." },
      { title: "Supplies and reviews", text: "Request packaging supplies and track feedback stats from customers." },
    ],
    tech: [],
    platforms: ["Android", "Web"],
    gallery: [
      "Seller app: dashboard, order pool and order details",
      "Seller app: ongoing orders, review stats and notifications",
      "Seller app: supplies, profile and sign in",
      "Customer dashboard",
      "Template editor",
      "Order history",
      "Cart",
    ],
    phones: ["Seller dashboard", "Order pool", "Order details", "Ongoing orders", "Review stats", "Notifications", "Request supplies", "Seller profile"],
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
    slug: "flubr",
    name: "Flubr",
    client: "Influencer marketing startup, Pakistan",
    category: "Web App",
    industry: "Marketing",
    service: "web-application-development",
    accent: "#6c33ff",
    summary:
      "An influencer marketing platform where brands post campaigns, micro-influencers bid on them, and both sides manage the work, chat and payments in one place.",
    seoTitle: "Flubr: Influencer Marketing Platform Case Study",
    seoDescription:
      "Flubr is an influencer marketing web app: brands launch campaigns, influencers bid and build profiles, and admins manage escrow, payouts and disputes.",
    challenge: [
      "Brands want to work with smaller, local influencers, but finding them, agreeing a price and getting paid safely is mostly done over DMs and spreadsheets.",
      "The platform needed two clear experiences, one for brands and one for influencers, plus an admin side that can hold payments in escrow and step in when something goes wrong.",
    ],
    solution: [
      "Brands create campaigns, review bids and proposals, hire influencers and chat with them, with spending and campaign analytics on their dashboard. Influencers build a profile with their social accounts, skills and portfolio, browse campaigns and brands, place bids and track earnings and jobs.",
      "Admins manage users, oversee campaigns, handle finances (escrow, payouts and refunds) and resolve disputes, with moderation and settings in the same panel.",
    ],
    features: [
      { title: "Campaign marketplace", text: "Brands post campaigns with budget, category and type; influencers filter and bid." },
      { title: "Bid management", text: "Brands compare proposals and hire the right influencer for each campaign." },
      { title: "Brand dashboard", text: "Campaign analytics, spending and hiring in one view." },
      { title: "Influencer profiles", text: "Social accounts, skills, experience and portfolio, set up in guided steps." },
      { title: "Chat", text: "Built-in messaging between brands and influencers for each job." },
      { title: "Admin and escrow", text: "Payouts, refunds, disputes and moderation managed by the platform team." },
    ],
    tech: [],
    platforms: ["Web"],
    gallery: [
      "Brand dashboard",
      "Campaign marketplace",
      "Influencer dashboard",
      "Bid management",
      "Chat",
      "Admin dashboard",
      "Admin finances",
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
