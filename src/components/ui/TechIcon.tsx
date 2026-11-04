import * as simpleIcons from "simple-icons";

type SimpleIcon = { path: string; title: string; hex: string };

/** Server-only: renders a brand glyph from simple-icons, or a monogram when none exists. */
export default function TechIcon({
  icon,
  name,
  className = "h-7 w-7",
  color = "currentColor",
}: {
  icon?: string;
  name: string;
  className?: string;
  color?: string;
}) {
  const data = icon ? (simpleIcons as unknown as Record<string, SimpleIcon | undefined>)[icon] : undefined;
  if (data) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill={color} role="img" aria-label={name}>
        <path d={data.path} />
      </svg>
    );
  }
  const mono = name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label={name}>
      <path d="M12 1.5 21.1 6.75v10.5L12 22.5 2.9 17.25V6.75Z" fill="none" stroke={color} strokeWidth="1.4" />
      <text x="12" y="12.2" textAnchor="middle" dominantBaseline="middle" fontSize={mono.length > 2 ? 6 : 7.5} fontWeight="700" fill={color} fontFamily="ui-sans-serif, system-ui">
        {mono}
      </text>
    </svg>
  );
}
