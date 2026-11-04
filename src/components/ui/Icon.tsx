import type { IconKey } from "@/data/types";

const paths: Record<IconKey, React.ReactNode> = {
  web: (<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18M7 6h.01M10 6h.01M8 12l-2 2 2 2M16 12l2 2-2 2M13 11l-2 6" /></>),
  mobile: (<><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3M9.5 5.5h5" /></>),
  saas: (<><path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4 4 0 0 1-.5 9.5H7Z" /><path d="M12 11v5M9.5 13.5 12 11l2.5 2.5" /></>),
  design: (<><path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="m3 13 9 5 9-5" /><path d="m3 16.5 9 5 9-5" opacity=".45" /></>),
  mvp: (<><path d="M5 19c1.5-4 4-7.5 9-10l1 4c-3 2.5-6 4-10 6Z" /><path d="M14 9c1.5-3 4-5 6-5 0 2-2 4.5-5 6M7 15l-2 2M9 17l-1.5 3" /></>),
  enterprise: (<><rect x="4" y="3" width="10" height="18" rx="1" /><path d="M14 9h5a1 1 0 0 1 1 1v11H14M7 7h4M7 11h4M7 15h4M17 13h0M17 17h0" /></>),
  commerce: (<><path d="M4 5h2l2 10h10l2-7H7" /><circle cx="9.5" cy="19" r="1.4" /><circle cx="16.5" cy="19" r="1.4" /></>),
  cloud: (<><path d="M7 17a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 7.5a4 4 0 0 1-.5 9.5H7Z" /><path d="M9 20.5h6M12 17v3.5" /></>),
  ai: (<><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9.5 10h0M14.5 10h0M9.5 14c1.5 1 3.5 1 5 0M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" /></>),
  api: (<><path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16" /></>),
  support: (<><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.5-2 2.5-5 2.5" /></>),
  health: (<><path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10Z" /><path d="M8 12h2l1-2 2 4 1-2h2" /></>),
  finance: (<><path d="M3 20h18M5 17V10M9.5 17V10M14.5 17V10M19 17V10M2.5 8 12 3l9.5 5Z" /></>),
  education: (<><path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z" /><path d="M6.5 11v5c3 2.5 8 2.5 11 0v-5M21.5 9v6" /></>),
  logistics: (<><path d="M2.5 6h11v10h-11zM13.5 10h4l3 3v3h-7" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>),
  realestate: (<><path d="M3 11 12 4l9 7M5 10v10h14V10" /><path d="M10 20v-5h4v5" /></>),
  delivery: (<><circle cx="12" cy="10" r="3" /><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /></>),
  travel: (<><path d="M10.5 13.5 3 11l1.5-1.5 8 .5 4-4.5a2 2 0 0 1 3 3l-4.5 4 .5 8L14 22l-2.5-7.5" /><path d="M7 17l-3 .5 1 1.5" /></>),
  media: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9 5 3-5 3V9Z" /></>),
};

export default function Icon({ name, className = "h-6 w-6" }: { name: IconKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
