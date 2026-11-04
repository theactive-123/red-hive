"use client";

import dynamic from "next/dynamic";

const HiveScene = dynamic(() => import("./HiveScene"), { ssr: false });
export default function HiveLazy({ className }: { className?: string }) {
  return <HiveScene className={className} />;
}
