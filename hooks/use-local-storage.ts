"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Hook for syncing state with browser localStorage with SSR hydration safety and React 19 compatibility
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") return JSON.stringify(initialValue);
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? item : JSON.stringify(initialValue);
    } catch {
      return JSON.stringify(initialValue);
    }
  };

  const getServerSnapshot = () => JSON.stringify(initialValue);

  const rawValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  
  let parsedValue: T;
  try {
    parsedValue = JSON.parse(rawValue);
  } catch {
    parsedValue = initialValue;
  }

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const currentItem = window.localStorage.getItem(key);
        const current: T = currentItem !== null ? JSON.parse(currentItem) : initialValue;
        const valueToStore = value instanceof Function ? value(current) : value;

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new Event("storage"));
      } catch (error) {
        console.warn(`Error saving to localStorage key "${key}":`, error);
      }
    },
    [key, initialValue]
  );

  return [parsedValue, setValue];
}
