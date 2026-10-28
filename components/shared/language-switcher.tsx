"use client";

import React from "react";
import { useLocale } from "next-intl";
import { routing, Locale } from "@/i18n/routing";
import { useLocaleTransition } from "@/components/shared/locale-transition";

export function LanguageSwitcher() {
  const locale = useLocale();
  const { isPending, changeLocale } = useLocaleTransition();

  const localeLabels: Record<Locale, string> = {
    en: "English",
    si: "සිංහල",
    ta: "தமிழ்",
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={locale}
        disabled={isPending}
        onChange={(e) => changeLocale(e.target.value as Locale)}
        aria-label="Select Language"
        className="h-8 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-800 shadow-2xs hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus:ring-zinc-100 transition-colors cursor-pointer disabled:opacity-50"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeLabels[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
