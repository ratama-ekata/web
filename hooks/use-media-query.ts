"use client";

import { useSyncExternalStore } from "react";

/**
 * Hook to reactively listen to media query changes
 * Uses React 19 `useSyncExternalStore` to avoid cascading render lint issues and hydration mismatches.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener("change", callback);
    return () => mediaQueryList.removeEventListener("change", callback);
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
