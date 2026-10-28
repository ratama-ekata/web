"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import { APP_CONFIG } from "@/constants/config";

export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_CHANGE_EVENT = "rme-theme-change";

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
}) {
  const subscribe = useCallback((callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    window.addEventListener(THEME_CHANGE_EVENT, callback);
    window.addEventListener("storage", callback);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, callback);
      window.removeEventListener("storage", callback);
    };
  }, []);

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      const saved = localStorage.getItem(APP_CONFIG.storageKeys.theme) as Theme | null;
      return saved && ["light", "dark", "system"].includes(saved) ? saved : defaultTheme;
    } catch {
      return defaultTheme;
    }
  }, [defaultTheme]);

  const getServerSnapshot = useCallback(() => defaultTheme, [defaultTheme]);

  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Apply theme class and data-theme attribute to <html> element
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme() {
      const systemIsDark = mediaQuery.matches;
      const effective: "light" | "dark" =
        theme === "system" ? (systemIsDark ? "dark" : "light") : theme;

      if (effective === "dark") {
        root.classList.add("dark");
        root.setAttribute("data-theme", "dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.setAttribute("data-theme", "light");
        root.style.colorScheme = "light";
      }
    }

    applyTheme();

    mediaQuery.addEventListener("change", applyTheme);
    return () => mediaQuery.removeEventListener("change", applyTheme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem(APP_CONFIG.storageKeys.theme, newTheme);
    } catch {
      // LocalStorage unavailable
    }
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: newTheme }));
  }, []);

  const resolvedTheme: "light" | "dark" = useMemo(() => {
    if (typeof window === "undefined") return "light";
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return theme;
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
