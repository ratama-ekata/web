"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hook to verify if component has mounted on the client.
 * Uses `useSyncExternalStore` for idiomatic, race-condition-free SSR hydration safety.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
