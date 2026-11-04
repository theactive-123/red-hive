import { processSteps } from "@/data/process";

/** Five columns joined by a line that fills as you scroll. */
export default function ProcessSteps() {
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-0 hidden h-px bg-line lg:block" />
      <div data-draw="x" className="absolute left-0 right-0 top-0 hidden h-px bg-red lg:block" />
      <ol className="grid gap-px lg:grid-cols-5 lg:gap-8">
        {processSteps.map((s) => (
          <li key={s.n} data-reveal className="relative border-t border-line py-8 lg:border-t-0 lg:pt-10">
            <span className="absolute -top-[5px] left-0 hidden h-2.5 w-2.5 rounded-full bg-red lg:block" />
            <p className="text-sm text-muted">
              {s.n} — {s.time}
            </p>
            <h3 className="display-sm mt-4">{s.title}</h3>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
