import Link from "next/link";
import Magnetic from "@/components/motion/Magnetic";
import { Arrow } from "./Icon";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
  magnetic?: boolean;
};

export default function Button({ href, children, variant = "primary", className = "", magnetic = true }: Props) {
  const styles = {
    primary: "bg-red text-white hover:bg-red-hot shadow-[0_10px_40px_-10px_rgba(225,1,59,0.7)]",
    ghost: "border border-line-strong text-fg hover:border-white/60 bg-white/[0.02]",
    light: "bg-white text-ink hover:bg-white/90",
  }[variant];

  const inner = (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight transition-colors duration-300 ${styles} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-white/15">
        <Arrow className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-[150%]" />
        <Arrow className="absolute h-3.5 w-3.5 -translate-x-[150%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
      </span>
    </Link>
  );
  return magnetic ? <Magnetic strength={0.25}>{inner}</Magnetic> : inner;
}
