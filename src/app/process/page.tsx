import PageHero from "@/components/sections/PageHero";
import ProcessScroller from "@/components/sections/ProcessScroller";
import StickyStory from "@/components/sections/StickyStory";
import Illustration from "@/components/illustrations/Illustration";
import Engagement from "@/components/sections/Engagement";
import FAQ from "@/components/sections/FAQ";
import Button from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Process: How We Build Software",
  description: "Discovery, design, agile development, launch and growth: how Red Hive Digital delivers web apps, mobile apps and SaaS products on time and on budget.",
  path: "/process",
});

const practices = [
  { title: "Two-week sprints", text: "Planned together and demoed every other week. You see working software, not slide decks." },
  { title: "Staging from day one", text: "A live staging environment lets your team click through every feature as it’s built." },
  { title: "Automated testing", text: "Unit, integration and end-to-end tests run on every pull request to keep regressions out." },
  { title: "Continuous delivery", text: "Every merge is built, tested and ready to deploy, so releases stop being events." },
  { title: "Peer code review", text: "Every change is reviewed by a second senior engineer for quality, security and clarity." },
  { title: "Clear communication", text: "A dedicated project lead, a shared Slack channel and a short written update every week." },
];

const faqs = [
  { q: "How do you estimate a project?", a: "After a discovery call we break the product into features, estimate each one and add design, QA and project management. You get a written proposal with scope, timeline, cost and the assumptions behind them." },
  { q: "How involved do I need to be?", a: "Around an hour a week: a sprint demo and quick feedback on designs and priorities. We handle the day-to-day and bring you decisions, not problems." },
  { q: "What if requirements change?", a: "Change is normal. On dedicated-team and time-and-materials engagements we re-prioritize the backlog. On fixed-scope projects we estimate the change and agree on it before work starts." },
  { q: "What do I get at the end?", a: "Full source code, infrastructure configuration, technical documentation, design files and admin access to every service, plus a handover session and an optional support plan." },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Process", path: "/process" }]}
        label="Process"
        title="How we work"
        text="Two-week sprints, a demo at the end of each one and a staging link you can click through any time. Here’s what that looks like week to week."
        visual={<Illustration name="mvp-development" className="h-auto w-full" />}
      >
        <Button href="/contact">Start with discovery</Button>
      </PageHero>
      <ProcessScroller title="The five stages" />
      <StickyStory title="How quality is built in" items={practices} dark />
      <Engagement />
      <FAQ faqs={faqs} />
    </>
  );
}
