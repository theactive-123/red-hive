import Link from "next/link";
import Magnetic from "@/components/motion/Magnetic";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "red";
  className?: string;
  magnetic?: boolean;
};

/** Pill button: a red fill rises from below on hover. Colours follow the section theme. */
export default function Button({ href, children, variant = "solid", className = "", magnetic = true }: Props) {
  const base = {
    solid: "bg-fg text-bg",
    outline: "border border-line text-fg",
    red: "bg-red text-white",
  }[variant];
  const fill = variant === "red" ? "bg-ink" : "bg-red";

  const el = (
    <Link
      href={href}
      className={`group relative inline-flex h-[3.25rem] items-center gap-3 overflow-hidden rounded-full pl-6 pr-5 text-[0.95rem] font-medium transition-colors duration-500 hover:text-white ${base} ${className}`}
    >
      <span className={`absolute inset-0 translate-y-[101%] rounded-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0 ${fill}`} />
      <span className="relative">{children}</span>
      <Arrow className="relative h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
    </Link>
  );
  return magnetic ? <Magnetic strength={0.2}>{el}</Magnetic> : el;
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 text-[0.95rem] font-medium ${className}`}>
      <span className="link-line">{children}</span>
      <Arrow className="h-4 w-4 -rotate-45 transition-transform duration-500 ease-out-expo group-hover:rotate-0" />
    </Link>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M3 10h13M11 4.5 16.5 10 11 15.5" />
    </svg>
  );
}
