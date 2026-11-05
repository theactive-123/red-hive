"use client";

import { usePathname } from "next/navigation";

/**
 * Keys the page by route. GSAP pins (pin-spacers) and SplitText rearrange DOM that React
 * owns; remounting the whole page in one go on navigation means React removes a single,
 * untouched wrapper instead of nodes GSAP has moved, which caused the
 * "removeChild: not a child of this node" crash on client navigation.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div key={pathname}>{children}</div>;
}
