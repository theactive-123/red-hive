import JsonLd from "@/components/seo/JsonLd";
import { faqLd } from "@/lib/seo";
import type { FAQ as FAQType } from "@/data/types";

export default function FAQ({ faqs, title = "Questions, answered" }: { faqs: FAQType[]; title?: string }) {
  return (
    <section className="wrap py-24 md:py-36">
      <JsonLd data={faqLd(faqs)} />
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p data-reveal className="tag">FAQ</p>
          <h2 data-split className="display-md mt-6 max-w-[12ch]">
            {title}
          </h2>
        </div>
        <div className="border-b border-line md:col-span-8">
          {faqs.map((f, i) => (
            <details key={i} data-reveal className="group border-t border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 text-lg font-medium md:text-xl [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="relative mt-2 h-3.5 w-3.5 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                  <span className="absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-8 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
