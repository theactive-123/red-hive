export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

/** Named authors. Add real team members here (name, role, short bio, optional LinkedIn URL). */
export type Author = { name: string; role: string; bio: string; url?: string };
export const authors: Record<string, Author> = {};

export type Post = {
  /** Key into `authors`; posts without one are credited to the company. */
  author?: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  /** ISO yyyy-mm-dd */
  date: string;
  readMinutes: number;
  category: string;
  tags: string[];
  /** Tech slugs from tech-slugs.ts */
  relatedTech: string[];
  /** Service slug */
  relatedService: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "adding-ai-to-your-app",
    title: "A Practical Guide to Adding AI Features to Your Product",
    seoTitle: "How to Add AI Features to Your App: A Practical Guide",
    seoDescription:
      "How we add AI features to web apps and SaaS products: choosing the use case, RAG, agents, evaluations, cost control and data privacy.",
    excerpt:
      "Most AI features we get asked to rescue started with the model and worked backwards to a problem. Here's how we scope, build, test and run LLM features people actually keep using.",
    date: "2026-10-21",
    readMinutes: 9,
    category: "AI",
    tags: ["AI development", "LLM integration", "RAG", "AI agents", "Product strategy"],
    relatedTech: ["openai", "langchain", "python", "postgresql"],
    relatedService: "ai-development",
    body: [
      {
        type: "p",
        text: "Calling a model API takes an afternoon. Shipping an AI feature that customers trust, and that still makes financial sense once a few thousand of them use it every day, takes a lot longer. This is the process we follow when we add AI to a client's web app, mobile app or SaaS product.",
      },
      { type: "h2", text: "Start with a job, not a model" },
      {
        type: "p",
        text: "The features that stick remove a chore users already do inside your product. They tend to happen often, run on text or data you already store, and still help when the answer is a bit off, because a person reviews it before it goes anywhere.",
      },
      {
        type: "ul",
        items: [
          "Drafting: support replies, product descriptions, proposal sections, release notes.",
          "Summarising: long threads, call transcripts, documents, activity feeds.",
          "Extracting: pulling fields out of invoices, emails or PDFs.",
          "Searching: answering questions from your help centre, your docs or a customer's own records.",
          "Routing and classifying: tagging tickets, scoring leads, spotting intent.",
        ],
      },
      {
        type: "p",
        text: "We write the feature down as a job story before touching any code: when a user does X, they want Y, so they can Z. If we can't say how we'll know it worked, we're not ready to talk about models yet.",
      },
      { type: "h2", text: "Pick the simplest architecture that works" },
      {
        type: "p",
        text: "LLM features come in rough levels of complexity. Each level adds latency, cost and new failure modes, so we only go up as far as the problem forces us to.",
      },
      {
        type: "table",
        head: ["Pattern", "What it is", "Good for", "Watch out for"],
        rows: [
          ["Single prompt", "One model call with a carefully written prompt and structured output", "Drafting, summarising, classification", "The prompt grows messy as requirements pile up"],
          ["RAG", "Fetch the relevant documents first, then ask the model to answer from them", "Q&A over docs, support assistants, internal knowledge", "Bad retrieval means bad answers"],
          ["Tool calling", "The model picks from functions you expose (search, create, update)", "Assistants that do things inside your app", "Permissions and validation on every tool"],
          ["Agents", "A loop where the model plans, calls tools and checks results over several steps", "Multi-step research, back-office workflows", "Cost, latency and loops that never end"],
          ["Fine-tuning", "Training a model on your own examples", "Consistent tone or format at high volume", "Preparing data and retraining over time"],
        ],
      },
      {
        type: "p",
        text: "Most of what we put into production is a single prompt, or RAG with a few tools. We use agents when a task really does need several dependent steps that can't be written as ordinary code. That's rarer than the hype suggests.",
      },
      { type: "h2", text: "Getting retrieval-augmented generation right" },
      {
        type: "p",
        text: "RAG is how a model learns about your data at request time. The model can only be as good as the context you give it, so we spend far more time on retrieval than on prompt wording.",
      },
      {
        type: "ul",
        items: [
          "Split content along headings and sections instead of fixed character counts, and keep the title and metadata attached to each chunk.",
          "Run keyword search next to vector search. Embeddings are bad at exact strings like product codes and error messages; keyword search catches them.",
          "Re-rank the results so the best five passages reach the model, instead of whatever came back first.",
          "Check access at retrieval time. A user should never get an answer built from a document they aren't allowed to open.",
          "Show citations. People trust answers they can check, and wrong answers become easy to report.",
        ],
      },
      {
        type: "p",
        text: "For a lot of products, pgvector inside the PostgreSQL database you already run is plenty. The embeddings sit next to the data and permissions they belong to, and you don't add another system to operate until scale actually requires it.",
      },
      { type: "h2", text: "Agents and tool calling without surprises" },
      {
        type: "p",
        text: "Once a model can take actions, we treat it like an untrusted client calling our API. Every tool validates its input, checks the current user's permissions and can be retried safely. Anything destructive or expensive (sending emails, issuing refunds, deleting records) needs the user to confirm it in the interface.",
      },
      {
        type: "p",
        text: "Agent loops get hard limits: a maximum number of steps, a token budget per task and a timeout. We log every step, because sooner or later a user will report something strange and you'll want to replay exactly what happened.",
      },
      { type: "h2", text: "Evaluations are your test suite" },
      {
        type: "p",
        text: "Model output varies from run to run, so ordinary unit tests only get you part of the way. Before launch we build an evaluation set: somewhere between a few dozen and a few hundred real inputs, each with the result we expect. It runs every time someone changes a prompt, a model, a retrieval setting or a tool.",
      },
      {
        type: "ul",
        items: [
          "Use plain code checks wherever you can: valid JSON, required fields present, the right category, no banned phrases.",
          "Use a model to grade things like faithfulness to sources or tone, and check a sample of those grades by hand.",
          "Keep the scores over time. Model upgrades sometimes make answers quietly worse, and you want to see that before customers do.",
          "Add real thumbs-up and thumbs-down examples from production back into the set.",
        ],
      },
      {
        type: "quote",
        text: "If you can't measure whether a change made the feature better or worse, every prompt edit is a guess.",
      },
      { type: "h2", text: "Controlling cost and latency" },
      {
        type: "p",
        text: "You pay per token, and tokens grow with usage. A feature that costs pennies in a demo can turn into a real line on the cloud bill once thousands of people depend on it. We plan for that in the first sprint.",
      },
      {
        type: "ul",
        items: [
          "Route by difficulty: small, fast models for easy requests, bigger ones only for the hard cases.",
          "Trim the context. Send the relevant passages, not whole documents.",
          "Cache. The same question shouldn't hit the model twice.",
          "Stream responses so users see text appear straight away, even if the full answer takes a few seconds.",
          "Meter usage per account and put limits in your plans so AI costs track your pricing.",
        ],
      },
      { type: "h2", text: "Privacy, security and compliance" },
      {
        type: "p",
        text: "Customers will ask where their data goes, usually in the first sales call. Have the answer ready. Read your provider's retention and training policies, pick zero-retention or enterprise options where they exist, and write down exactly which data leaves your infrastructure.",
      },
      {
        type: "ul",
        items: [
          "Don't send personal or sensitive data the task doesn't need, and redact what you can.",
          "Guard against prompt injection. Retrieved content and user input are data. They should never be able to override your system rules or switch on tools.",
          "Keep an audit log of prompts, sources and actions for regulated workflows.",
          "Update your privacy policy and data processing agreements to cover the AI processing.",
        ],
      },
      { type: "h2", text: "Ship small, then expand" },
      {
        type: "p",
        text: "We release the first AI feature to a slice of users behind a feature flag, then read the outputs every day for a couple of weeks and adjust retrieval and prompts based on what we see. Once that feature is reliable and its costs are understood, the plumbing you built for it (evaluation suite, retrieval pipeline, usage metering, logging) makes the second and third features much quicker.",
      },
      {
        type: "p",
        text: "If you're trying to work out where AI belongs in your product, we can help you shortlist use cases, prototype the strongest one and put it into production with evaluations and cost controls in place.",
      },
    ],
  },
  {
    slug: "nextjs-for-saas",
    title: "Why We Build SaaS Products on Next.js",
    seoTitle: "Why We Build SaaS Products on Next.js (Architecture Guide)",
    seoDescription:
      "How we build SaaS products on Next.js: multi-tenancy, authentication, Stripe billing, PostgreSQL, caching and deployment, and when we'd pick something else.",
    excerpt:
      "Next.js lets a small SaaS team run the marketing site, the app and the API from one codebase. Here's our setup for multi-tenancy, auth, billing and data, and the trade-offs we accept.",
    date: "2026-10-07",
    readMinutes: 8,
    category: "Engineering",
    tags: ["Next.js", "SaaS development", "Architecture", "Stripe", "PostgreSQL"],
    relatedTech: ["nextjs", "react", "typescript", "postgresql"],
    relatedService: "web-application-development",
    body: [
      {
        type: "p",
        text: "When a founder asks us to build a SaaS product, the stack discussion nearly always lands in the same place: Next.js, TypeScript everywhere, PostgreSQL for data and Stripe for billing. We've tried other combinations. This one lets a small team ship something polished quickly and keep shipping as the product grows. Here's how we put it together.",
      },
      { type: "h2", text: "One framework for the marketing site, the app and the API" },
      {
        type: "p",
        text: "A SaaS business needs three things on the web: a fast marketing site that ranks, the logged-in application, and an API behind it. Next.js covers all three in one codebase. Marketing pages are generated statically. The dashboard uses React Server Components, so data is fetched on the server and less JavaScript ships to the browser. Route handlers and server actions handle most backend work without a separate service.",
      },
      {
        type: "p",
        text: "One repository and one language means shared types between client and server, fewer integration bugs, and developers who can work on any part of the product. When something needs to scale on its own, like heavy background processing, we move it into a dedicated service. You almost never need that on day one.",
      },
      { type: "h2", text: "Multi-tenancy: decide early" },
      {
        type: "p",
        text: "How you separate customers' data is the decision that costs the most to change later, so we make it in week one. There are three common options:",
      },
      {
        type: "table",
        head: ["Model", "How it works", "Best for"],
        rows: [
          ["Shared tables", "Every row has a tenant_id and every query is scoped by it", "Most B2B SaaS products, especially early on"],
          ["Schema per tenant", "Each customer gets a schema inside one database", "A moderate number of tenants who need customisation"],
          ["Database per tenant", "Each customer gets an isolated database", "Enterprise or regulated customers who need strict isolation"],
        ],
      },
      {
        type: "p",
        text: "We usually start with shared tables and protect them twice: application code always scopes queries by organisation, and PostgreSQL row-level security catches anything that slips through. The tenant comes from the session, and optionally from a subdomain or custom domain at the routing layer. Infrastructure stays simple, and a big customer can still be moved to dedicated resources later.",
      },
      { type: "h2", text: "Authentication and authorisation" },
      {
        type: "p",
        text: "B2B buyers expect more than an email and password field. A SaaS product ready for real customers usually needs:",
      },
      {
        type: "ul",
        items: [
          "Email, magic link and social login for self-serve sign-up.",
          "Organisations, invites and roles such as owner, admin and member.",
          "SAML or OIDC single sign-on for larger customers, often on higher plans only.",
          "Multi-factor authentication and session management.",
          "Audit logs for security-relevant actions.",
        ],
      },
      {
        type: "p",
        text: "Depending on budget and data residency, we either integrate an established identity provider or use a well-maintained open-source library. Permission checks always live on the server, next to the data. Hiding a button in the UI doesn't count.",
      },
      { type: "h2", text: "Billing with Stripe" },
      {
        type: "p",
        text: "Stripe Billing handles subscriptions, trials, coupons, tax and invoices, and its hosted checkout and customer portal keep a lot of sensitive screens out of your code. Our rule is simple: Stripe owns payment state, and webhooks keep your database in step with it.",
      },
      {
        type: "ul",
        items: [
          "Store plans and entitlements in your own database, so checking a feature never means calling Stripe mid-request.",
          "Verify webhook signatures and process events idempotently. They do arrive twice, and out of order.",
          "If seat-based or usage-based pricing is on the roadmap, support it from the start. Adding metering later is painful.",
          "Give failed payments a grace period and a clear message in the app. Locking people out instantly loses customers.",
        ],
      },
      { type: "h2", text: "PostgreSQL as the backbone" },
      {
        type: "p",
        text: "PostgreSQL handles relational data, JSON, full-text search, geospatial queries and vector embeddings. For most SaaS products that means you don't need four different databases. We pair it with a type-safe ORM or query builder, migrations that run in CI, and managed hosting with automated backups and point-in-time recovery.",
      },
      {
        type: "p",
        text: "As usage grows we add read replicas for reporting, connection pooling for serverless functions, and Redis for caching, rate limiting and queues. Emails, imports, webhooks and reports run in a separate worker process so the requests users wait on stay fast.",
      },
      { type: "h2", text: "Performance: caching and rendering" },
      {
        type: "p",
        text: "Next.js lets each route decide how it renders. Marketing and docs pages are static and served from a CDN. Dashboard pages render on the server per request, with caching wherever it's safe. Interactive widgets hydrate in the browser only where they need to. The app loads quickly and stays quick as people click around.",
      },
      {
        type: "ul",
        items: [
          "Cache shared, non-sensitive data like plan definitions or public content. Never cache per-tenant data globally.",
          "Invalidate caches by tag when data changes, instead of relying on short expiry times.",
          "Stream slow parts of a page with Suspense so the rest shows up immediately.",
          "Measure Core Web Vitals in production. Your laptop isn't representative.",
        ],
      },
      { type: "h2", text: "Deployment and operations" },
      {
        type: "p",
        text: "Next.js runs on managed platforms, in containers on AWS, Google Cloud or Azure, or on a plain Node.js server. We pick based on compliance, cost and what the client already runs. Every project gets preview deployments per pull request, tests and type checks in CI, error tracking, uptime monitoring and structured logs from the first week.",
      },
      { type: "h2", text: "When Next.js is not the right choice" },
      {
        type: "p",
        text: "If your product is mainly a mobile app, Flutter or React Native matters more than the web framework. If the backend is mostly heavy data processing or long-running jobs, we'd put that in a Python, Go or NestJS service and keep the web layer thin. And if your team already knows another framework well, that experience is often worth more than switching.",
      },
      {
        type: "quote",
        text: "The best SaaS stack is the one your team can ship and run with confidence for years.",
      },
      {
        type: "p",
        text: "For most new web-first SaaS products, Next.js with TypeScript, PostgreSQL and Stripe is still our default. It gets you to paying customers quickly and doesn't trap you later. If you're planning a build, send us your requirements and we'll suggest an architecture.",
      },
    ],
  },
  {
    slug: "saas-mvp-cost",
    title: "How Much Does It Cost to Build a SaaS MVP?",
    seoTitle: "How Much Does It Cost to Build a SaaS MVP in 2026?",
    seoDescription:
      "Typical SaaS MVP budgets by scope, what pushes the price up or down, and practical ways to spend less without cutting the features that matter.",
    excerpt:
      "SaaS MVP budgets vary a lot because scope varies a lot. Here are the ranges we see by complexity, what moves the number, and how to spend less without shipping less.",
    date: "2026-09-23",
    readMinutes: 8,
    category: "Startups",
    tags: ["SaaS MVP", "MVP development cost", "Startups", "Budgeting", "Product strategy"],
    relatedTech: ["nextjs", "nodejs", "postgresql", "supabase"],
    relatedService: "saas-development",
    body: [
      {
        type: "p",
        text: "Almost every founder asks this in the first call. \"It depends\" is true and also useless, so here are actual ranges for SaaS MVPs built by a professional team, what pushes a project to the top or bottom of each range, and the levers we use to keep budgets sensible.",
      },
      {
        type: "p",
        text: "These figures are typical agency ranges for experienced design and engineering teams. Use them for planning. They aren't a quote, and your number will depend on scope, where the team is based, your timeline and how many decisions you've already made.",
      },
      { type: "h2", text: "Typical SaaS MVP cost ranges" },
      {
        type: "table",
        head: ["MVP scope", "What it usually includes", "Typical timeline", "Typical budget (USD)"],
        rows: [
          ["Validation MVP", "One core workflow, basic auth, simple admin, Stripe checkout, responsive web app", "6 to 8 weeks", "$20,000 to $40,000"],
          ["Standard B2B MVP", "Organisations and roles, two or three core workflows, subscriptions, dashboards, email notifications, a few integrations", "10 to 14 weeks", "$40,000 to $90,000"],
          ["Complex MVP", "Real-time features, AI features, several user types, marketplace or payment flows, mobile app, compliance needs", "4 to 6 months", "$90,000 to $180,000+"],
        ],
      },
      {
        type: "p",
        text: "Those ranges include discovery, UI/UX design, front-end and back-end development, QA and deployment. Hosting, third-party services and work after launch are extra, and we cover them below.",
      },
      { type: "h2", text: "What drives the cost" },
      { type: "h3", text: "1. Number of user roles and workflows" },
      {
        type: "p",
        text: "Every type of user (admin, manager, customer, vendor) needs its own screens, permissions and testing. A product with one user type and one main workflow costs much less than a two-sided marketplace.",
      },
      { type: "h3", text: "2. Integrations" },
      {
        type: "p",
        text: "Connecting to CRMs, accounting tools, calendars, payment providers or industry systems usually takes longer than people expect. A modern, well-documented API is quick. Legacy systems, file imports and badly documented APIs are not.",
      },
      { type: "h3", text: "3. Real-time and AI features" },
      {
        type: "p",
        text: "Live collaboration, chat, notifications and AI assistants bring extra infrastructure, edge cases and testing. They might be the whole point of your product. If they aren't, they probably don't belong in version one.",
      },
      { type: "h3", text: "4. Design depth" },
      {
        type: "p",
        text: "A clean product built on a solid design system costs less than a fully custom visual identity with illustrations and motion. Both are valid. It comes down to how much your buyers judge on looks.",
      },
      { type: "h3", text: "5. Platforms" },
      {
        type: "p",
        text: "A responsive web app is the cheapest way to reach people. Adding iOS and Android apps with Flutter or React Native adds a big chunk to the budget, even with shared code.",
      },
      { type: "h3", text: "6. Compliance and security requirements" },
      {
        type: "p",
        text: "If you handle health data, payments or enterprise customers, you may need audit logs, encryption controls, data residency, SSO and documented processes from the first release. Building them in early is cheaper than bolting them on later, but it does raise the starting budget.",
      },
      { type: "h2", text: "Costs founders forget" },
      {
        type: "ul",
        items: [
          "Hosting: usually small at MVP stage, then it grows with users and environments.",
          "Third-party services: email delivery, authentication, error monitoring, analytics, AI usage and maps all bill monthly.",
          "Payment processing fees on every transaction.",
          "Maintenance: dependency updates, security patches and bug fixes after launch.",
          "Iteration: version one is never the last. Keep budget aside for changes once real users show up.",
        ],
      },
      { type: "h2", text: "How to reduce your MVP cost without hurting the product" },
      {
        type: "ul",
        items: [
          "Pick the one job your product does better than anything else and build that first. Everything else goes on a list for after launch.",
          "Pay for a short discovery phase. A few weeks of workshops, user flows and clickable prototypes saves expensive rework.",
          "Use proven services for authentication, billing, file storage and email instead of building them yourself.",
          "Stick to a mainstream stack such as Next.js, Node.js and PostgreSQL so future hires can pick it up.",
          "Launch on the web first and add native apps once people are actually using it.",
          "Do some things by hand at first. An admin screen your team uses for edge cases can replace weeks of automation.",
          "Make decisions quickly. Slow feedback and shifting requirements quietly eat more budget than almost anything else.",
        ],
      },
      {
        type: "quote",
        text: "The cheapest MVP is the one that answers your riskiest business question with the least code. The lowest quote is a different thing.",
      },
      { type: "h2", text: "Fixed price or time and materials?" },
      {
        type: "p",
        text: "Fixed price works when the scope is clear and stable, which usually means after discovery. Time and materials, or a dedicated team, suits products where you expect to learn and change direction, and that describes most early-stage products. Plenty of our clients do both: fixed-price discovery and MVP, then a monthly team for iteration.",
      },
      { type: "h2", text: "Getting an accurate estimate" },
      {
        type: "p",
        text: "To get a useful estimate from any development partner, bring a short description of your users, the problem, the three to five workflows that matter most, any integrations you can't live without, and a target launch date. Examples of products you like help too. With that, a good team can give you a realistic range within a few days and a fixed quote after discovery.",
      },
      {
        type: "p",
        text: "If you're planning a SaaS MVP, book a free call with us. We'll go through your idea, tell you what we'd cut and what we'd keep, and give you an honest budget and timeline range.",
      },
    ],
  },
  {
    slug: "flutter-vs-react-native",
    title: "Flutter vs React Native in 2026: Which Should You Choose?",
    seoTitle: "Flutter vs React Native in 2026: An Honest Comparison",
    seoDescription:
      "Flutter vs React Native compared on performance, UI, developer experience, ecosystem, hiring and cost, with clear advice on which to pick for your app.",
    excerpt:
      "Both frameworks can ship excellent iOS and Android apps from one codebase. Which one fits depends on your team, how custom your UI is and what else you're building. Here's how we decide.",
    date: "2026-09-09",
    readMinutes: 8,
    category: "Mobile",
    tags: ["Flutter", "React Native", "Cross-platform", "Mobile app development"],
    relatedTech: ["flutter", "react-native", "swift", "kotlin"],
    relatedService: "mobile-app-development",
    body: [
      {
        type: "p",
        text: "If you want an iOS and an Android app without paying for two native codebases, you'll end up choosing between Flutter and React Native. Both are mature, both have big companies behind them, and both run apps used by millions of people. We ship with both, so we don't have a side to sell. This is how we decide which one to recommend.",
      },
      { type: "h2", text: "The short answer" },
      {
        type: "ul",
        items: [
          "Pick Flutter for a highly custom, brand-led UI that looks identical everywhere, for animation-heavy screens, or if you also want desktop or embedded targets.",
          "Pick React Native if your team already writes React and TypeScript, you want to share logic with a React or Next.js web app, or you want each platform's native look.",
          "Go fully native with Swift and Kotlin when the app leans on the newest platform features, heavy background processing, or hardware where every millisecond counts.",
        ],
      },
      { type: "h2", text: "How they work" },
      {
        type: "p",
        text: "Flutter uses Dart and draws every pixel with its own rendering engine. Your app doesn't use the platform's buttons or lists. It renders Flutter widgets styled like Material, Cupertino or your own design system, which gives you full visual control and the same result on every device.",
      },
      {
        type: "p",
        text: "React Native uses JavaScript or TypeScript with React, and your components become real native views on iOS and Android. The new architecture (no bridge, synchronous native calls, concurrent rendering) fixed most of the performance complaints people had a few years ago.",
      },
      { type: "h2", text: "Side-by-side comparison" },
      {
        type: "table",
        head: ["Factor", "Flutter", "React Native"],
        rows: [
          ["Language", "Dart", "JavaScript / TypeScript"],
          ["Rendering", "Own engine draws every pixel", "Native platform components"],
          ["UI consistency", "Pixel-identical across platforms", "Native look and feel per platform"],
          ["Custom animation", "Excellent out of the box", "Excellent with Reanimated and similar libraries"],
          ["Code sharing with web", "Flutter web suits app-like experiences more than content sites", "Shares logic and types easily with React / Next.js"],
          ["Ecosystem", "Smaller package ecosystem, strong first-party packages", "Huge npm ecosystem plus Expo tooling"],
          ["Over-the-air updates", "Limited, mostly third-party", "Mature options through Expo updates"],
          ["Hiring", "Smaller but growing Dart talent pool", "Large pool of React developers"],
          ["Desktop and embedded", "First-class support", "Possible through community projects"],
        ],
      },
      { type: "h2", text: "Performance" },
      {
        type: "p",
        text: "For a typical business app (forms, lists, dashboards, feeds, checkout) nobody will feel a difference between a well-built Flutter app and a well-built React Native one. Both hit smooth frame rates on current phones. The differences show up at the edges. Flutter does better with complex custom animation and graphics-heavy screens. React Native gets native text input and accessibility behaviour for free.",
      },
      {
        type: "p",
        text: "When we're called in to fix a slow app, the cause is almost always architecture: needless re-renders, heavy work on the UI thread, huge images. The framework is rarely the problem.",
      },
      { type: "h2", text: "Developer experience and team fit" },
      {
        type: "p",
        text: "Team fit often settles it. If your company already has React developers on the web product, React Native lets them work on mobile with a short learning curve, and you can share validation, API clients and types between web and mobile. Expo has made the whole workflow much easier, with managed builds, quick device testing and over-the-air updates for JavaScript changes.",
      },
      {
        type: "p",
        text: "Flutter is a pleasure to work in too. Hot reload is fast, the widget system is consistent, and the official docs and tooling are very good. Developers who know Java, Kotlin, Swift or TypeScript pick up Dart quickly. For a team starting from scratch with no existing stack, Flutter is a very productive choice.",
      },
      { type: "h2", text: "Design and brand" },
      {
        type: "p",
        text: "If your designers have built a distinctive visual language that has to look exactly the same on every device, Flutter makes that easy because it controls every pixel. If your users expect an iPhone app to feel like an iPhone app and an Android app to feel like Android (system fonts, standard navigation, native date pickers), React Native gets you there with less effort.",
      },
      { type: "h2", text: "Cost and timeline" },
      {
        type: "p",
        text: "Either framework usually costs less than two separate native apps, because most UI and logic is written once. Some platform work remains (push notifications, deep links, in-app purchases, store submissions, native integrations), so budget for it. Between Flutter and React Native, the cost difference for the same app is usually small. Whether your team already knows the stack matters far more.",
      },
      { type: "h2", text: "Long-term maintenance" },
      {
        type: "p",
        text: "Both ship regular releases, and both make you keep up with Apple and Google's platform changes. Plan for framework upgrades and dependency updates every so often. React Native apps tend to depend on more third-party packages, so choose well-maintained ones. Flutter apps lean on first-party packages, which makes upgrades a bit more predictable.",
      },
      { type: "h2", text: "Our recommendation process" },
      {
        type: "p",
        text: "When a client asks which to use, we look at five things: the current team and codebase, whether there's a web app to share code with, how custom the UI needs to be, which device features are required, and who they plan to hire. Usually the answer is obvious by the end of one workshop.",
      },
      {
        type: "quote",
        text: "Pick the framework your team can maintain for the next five years. This year's benchmark winner matters much less.",
      },
      {
        type: "p",
        text: "Planning a mobile app and want a straight answer? Our mobile team builds production apps in Flutter, React Native, Swift and Kotlin, and we'll tell you which one we'd use for your product and why.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
