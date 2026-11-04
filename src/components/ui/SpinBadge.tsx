import Link from "next/link";

/** Circular rotating text badge with the logo triangle in the middle. */
export default function SpinBadge({ href = "/contact", text = "Start a project · Get an estimate · " }: { href?: string; text?: string }) {
  return (
    <Link href={href} aria-label="Start a project" data-cursor="Go" className="group relative grid h-36 w-36 place-items-center md:h-40 md:w-40">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite] group-hover:[animation-duration:5s]" aria-hidden>
        <defs>
          <path id="spin-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fontSize="17" fontWeight="600" letterSpacing="3.2" fill="currentColor" style={{ fontFamily: "var(--ff-body), sans-serif", textTransform: "uppercase" }}>
          <textPath href="#spin-circle">{text}</textPath>
        </text>
      </svg>
      <span className="grid h-16 w-16 place-items-center bg-red transition-transform duration-500 ease-out-expo group-hover:scale-110">
        <span className="tri bg-white text-xl" />
      </span>
    </Link>
  );
}
