import { site } from "@/data/site";
import { services } from "@/data/services";
import { caseStudies } from "@/data/work";
import { industries } from "@/data/industries";
import { posts } from "@/data/posts";

export const dynamic = "force-static";

/** llms.txt: a plain-text map of the site for AI assistants and answer engines. */
export function GET() {
  const u = (p: string) => `${site.url}${p}`;
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Contact: ${site.email} · ${site.phones[0].display}`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.name}](${u(`/services/${s.slug}`)}): ${s.tagline}`),
    `- [Government software (state & local agencies)](${u("/government-contracts")}): Section 508 / WCAG 2.1 AA accessible portals, permitting, payments and case management.`,
    "",
    "## Case studies",
    ...caseStudies.map((c) => `- [${c.name}](${u(`/work/${c.slug}`)}) (${c.category}): ${c.summary}`),
    "",
    "## Industries",
    ...industries.map((i) => `- [${i.name}](${u(`/industries/${i.slug}`)}): ${i.tagline}`),
    "",
    "## Articles",
    ...posts.map((p) => `- [${p.title}](${u(`/insights/${p.slug}`)}): ${p.excerpt}`),
    "",
    "## Company",
    `- [About](${u("/about")})`,
    `- [Process](${u("/process")})`,
    `- [Technologies](${u("/technologies")})`,
    `- [Contact](${u("/contact")})`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
