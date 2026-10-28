import React from "react";
import { useTranslations } from "next-intl";
import { BrandEmblem } from "@/components/shared/brand-logo";
import { CallCard } from "@/components/report/report-sidebar";

export function NewsHeader() {
  const t = useTranslations("news.header");

  return (
    <header className="pt-10 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Section aligned to 12-column grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <BrandEmblem size="sm" className="[&_img]:h-4 [&_img]:w-4 shrink-0" />
              <span className="text-xs sm:text-[13px] font-semibold text-[#18181B] dark:text-zinc-200">
                {t("eyebrow")}
              </span>
            </div>
            <h1 className="max-w-[540px] text-4xl sm:text-5xl lg:text-[54px] font-black leading-[1.08] tracking-tight text-[#171717] dark:text-zinc-50">
              {t("title")}
            </h1>
            <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-[#52525B] dark:text-zinc-400">
              {t("description")}
            </p>
          </div>
          <div className="lg:col-span-4">
            <CallCard />
          </div>
        </div>

        {/* Divider beneath top section */}
        <hr className="my-8 sm:my-10 border-t border-[#E8E6DD] dark:border-zinc-800" />
      </div>
    </header>
  );
}
