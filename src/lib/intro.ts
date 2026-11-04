"use client";

declare global {
  interface Window {
    __rhIntroDone?: boolean;
  }
}

/** Resolves once the first-visit preloader has finished (immediately if it isn't showing). */
export function whenIntroDone(): Promise<void> {
  if (typeof window === "undefined" || window.__rhIntroDone !== false) return Promise.resolve();
  return new Promise((resolve) => window.addEventListener("rh:intro-done", () => resolve(), { once: true }));
}
