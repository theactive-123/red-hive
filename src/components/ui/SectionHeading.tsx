export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && (
        <p data-reveal="fade" className={`eyebrow mb-5 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <span className="inline-block h-2 w-2 bg-red clip-hex" />
          {eyebrow}
        </p>
      )}
      <Tag data-split="words" className="text-[clamp(2.1rem,4.6vw,4rem)] font-semibold text-white">
        {title}
      </Tag>
      {text && (
        <p data-reveal="up" className={`mt-6 text-lg leading-relaxed text-muted ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {text}
        </p>
      )}
    </div>
  );
}
