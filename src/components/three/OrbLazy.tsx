"use client";

import dynamic from "next/dynamic";

const ParticleOrb = dynamic(() => import("./ParticleOrb"), { ssr: false });
export default function OrbLazy({ className }: { className?: string }) {
  return <ParticleOrb className={className} />;
}
