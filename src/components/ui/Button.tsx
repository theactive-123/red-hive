import Link from "next/link";
import Magnetic from "@/components/motion/Magnetic";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "red" | "outline";
  className?: string;
  magnetic?: boolean;
};

/** Rectangular button with the logo's cut corner. A colour panel sweeps in on hover. */
export default function Button({ href, children, variant = "solid", className = "", magnetic = false }: Props) {
  const base = {
    solid: "bg-fg text-bg",
    red: "bg-red text-white",
    outline: "text-fg shadow-[inset_0_0_0_1.5px_currentColor]",
  }[variant];
  const sweep = variant === "red" ? "bg-navy" : "bg-red";
  const el = (
    <Link
      href={href}
      className={`cut group relative inline-flex h-14 items-center overflow-hidden px-7 text-[0.98rem] font-semibold transition-colors duration-300 hover:text-white ${base} ${className}`}
    >
      <span className={`absolute inset-0 -translate-x-[101%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0 ${sweep}`} />
      <span className="relative">{children}</span>
    </Link>
  );
  return magnetic ? <Magnetic strength={0.2}>{el}</Magnetic> : el;
}

/** Plain underlined text link. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`font-semibold underline decoration-red decoration-2 underline-offset-[6px] transition-colors hover:text-red ${className}`}>
      {children}
    </Link>
  );
}
