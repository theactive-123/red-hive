import JsonLd from "@/components/seo/JsonLd";
import { faqLd } from "@/lib/seo";
import type { FAQ as FAQType } from "@/data/types";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FAQ({ faqs, title = "Frequently asked questions", eyebrow = "FAQ" }: { faqs: FAQType[]; title?: string; eyebrow?: string }) {
  return (
    <section className="container-x py-24 sm:py-32">
      <JsonLd data={faqLd(faqs)} />
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow={eyebrow} title={title} text="Can’t find what you’re looking for? Reach out — a real engineer will reply within one business day." />
        </div>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f, i) => (
            <details key={i} data-reveal="up" className="group py-2" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-lg font-medium text-white [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span className="relative mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-open:border-red group-open:bg-red">
                  <span className="absolute h-[1.5px] w-3 bg-white" />
                  <span className="absolute h-3 w-[1.5px] bg-white transition-transform duration-300 group-open:rotate-90 group-open:scale-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
