"use client";

import React, { createContext, useContext, useState, useTransition, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname, Locale } from "@/i18n/routing";

interface LocaleTransitionContextType {
  isPending: boolean;
  targetLocale: Locale | null;
  changeLocale: (newLocale: Locale) => void;
}

const LocaleTransitionContext = createContext<LocaleTransitionContextType>({
  isPending: false,
  targetLocale: null,
  changeLocale: () => {},
});

export function useLocaleTransition() {
  return useContext(LocaleTransitionContext);
}

export function LocaleTransitionProvider({ children }: { children: React.ReactNode }) {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [targetLocale, setTargetLocale] = useState<Locale | null>(null);

  const changeLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    setTargetLocale(newLocale);

    const executeChange = () => {
      startTransition(() => {
        router.replace(pathname, { locale: newLocale });
      });
    };

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      // Native View Transitions for ultra-smooth cross-fade
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        executeChange();
      });
    } else {
      executeChange();
    }
  };

  useEffect(() => {
    if (targetLocale === currentLocale) {
      setTargetLocale(null);
    }
  }, [currentLocale, targetLocale]);

  return (
    <LocaleTransitionContext.Provider value={{ isPending, targetLocale, changeLocale }}>
      {/* Sleek Top Accent Progress Bar during transition */}
      {isPending && (
        <div
          role="progressbar"
          aria-label="Switching language"
          className="fixed top-0 left-0 right-0 z-[100] h-[3px] overflow-hidden bg-neutral-200/50 dark:bg-neutral-800/50 pointer-events-none"
        >
          <div className="h-full bg-gradient-to-r from-[#882637] via-[#FBBF24] to-[#882637] w-full animate-indeterminate-progress" />
        </div>
      )}

      {/* Main Container with smooth fade on locale change */}
      <div
        key={currentLocale}
        className={`w-full flex-1 flex flex-col transition-all duration-300 ${
          isPending ? "opacity-75 filter blur-[0.3px]" : "animate-locale-fade"
        }`}
      >
        {children}
      </div>
    </LocaleTransitionContext.Provider>
  );
}
