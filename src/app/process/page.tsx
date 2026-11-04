import PageHero from "@/components/sections/PageHero";
import Process from "@/components/sections/Process";
import Engagement from "@/components/sections/Engagement";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { FeatureGrid } from "@/components/sections/Blocks";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How We Work — Our Software Development Process",
  description: "Discovery, design, agile development, launch and scale: see how Red Hive Digital delivers web apps, mobile apps and SaaS products on time and on budget.",
  path: "/process",
});

const practices = [
  { title: "Two-week sprints", text: "Planned together, demoed every other week. You always see working software, not slide decks." },
  { title: "Staging from day one", text: "A live staging environment lets your team click through every feature as it’s built." },
  { title: "Automated testing", text: "Unit, integration and end-to-end tests run on every pull request to keep regressions out." },
  { title: "CI/CD pipelines", text: "Every merge is built, tested and deployable — releases become boring, which is the goal." },
  { title: "Code reviews", text: "Every line is reviewed by a second senior engineer for quality, security and maintainability." },
  { title: "Clear communication", text: "A dedicated project manager, shared Slack channel and a weekly written status report." },
];

const faqs = [
  { q: "How do you estimate a project?", a: "After a discovery call we break the product into features, estimate each with ranges and add design, QA and project management. You get a written proposal with scope, timeline and cost, plus the assumptions behind them." },
  { q: "How involved do I need to be?", a: "Plan on roughly an hour a week: a sprint demo and quick feedback on designs and priorities. We handle the day-to-day and come to you with decisions, not problems." },
  { q: "What happens if requirements change?", a: "Change is normal. On dedicated-team and time-and-materials engagements we simply re-prioritize the backlog. On fixed-scope projects we estimate the change and agree on it before work begins." },
  { q: "What do I get at the end?", a: "Your full source code, infrastructure-as-code, technical documentation, design files and admin access to every service — plus a handover session and an optional support plan." },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "How we work", path: "/process" }]}
        eyebrow="Our process"
        title={<>Predictable delivery, without the bureaucracy</>}
        text="A lightweight, transparent process refined over hundreds of sprints. It keeps momentum high and surprises low."
      >
        <Button href="/contact">Start with discovery</Button>
      </PageHero>
      <Process />
      <section className="container-x py-20">
        <SectionHeading eyebrow="Engineering practices" title="How quality is built in" className="mb-12" />
        <FeatureGrid items={practices} />
      </section>
      <Engagement />
      <FAQ faqs={faqs} />
      <CTA />
    </>
  );
}
