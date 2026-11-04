import { ArrowLink } from "./Button";

/** Section opener: small index + label on the left rail, large title, optional link. */
export default function SectionHead({
  index,
  label,
  title,
  text,
  link,
  as: Tag = "h2",
  className = "",
}: {
  index?: string;
  label: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  link?: { href: string; label: string };
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`grid gap-6 md:grid-cols-12 ${className}`}>
      <p data-reveal className="tag md:col-span-3 md:pt-3">
        {index && <span className="text-fg">{index}</span>}
        {label}
      </p>
      <div className="md:col-span-9">
        <Tag data-split className="display-md max-w-[16ch]">
          {title}
        </Tag>
        {(text || link) && (
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            {text && (
              <p data-reveal className="max-w-xl text-lg leading-relaxed text-muted">
                {text}
              </p>
            )}
            {link && (
              <div data-reveal>
                <ArrowLink href={link.href}>{link.label}</ArrowLink>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
