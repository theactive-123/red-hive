import { ArrowLink } from "./Button";

/** Section opener: big title on the left, supporting text (and optional link) on the right. */
export default function SectionHead({
  title,
  text,
  link,
  as: Tag = "h2",
  className = "",
}: {
  index?: string;
  label?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  link?: { href: string; label: string };
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`grid gap-8 md:grid-cols-12 md:items-end ${className}`}>
      <Tag data-split className="display-md md:col-span-7">
        {title}
      </Tag>
      {(text || link) && (
        <div data-reveal className="md:col-span-4 md:col-start-9">
          {text && <p className="text-[1.05rem] leading-relaxed text-muted">{text}</p>}
          {link && (
            <p className={text ? "mt-5" : ""}>
              <ArrowLink href={link.href}>{link.label}</ArrowLink>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
