"use client";

import React from "react";
import { WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReportInfoCards } from "./report-info-cards";

interface ReportErrorCardProps {
  onTryAgain: () => void;
  onKeepAnswers: () => void;
  isRetrying?: boolean;
}

export function ReportErrorCard({
  onTryAgain,
  onKeepAnswers,
  isRetrying = false,
}: ReportErrorCardProps) {
  const t = useTranslations("report.errorCard");

  return (
    <div className="space-y-6">
      {/* Main Error Container matching Neo-Brutalist brand */}
      <div className="report-error-card rounded-[28px] sm:rounded-[32px] border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#1E0D12] px-6 py-12 sm:px-12 sm:py-16 text-center shadow-[7px_7px_0px_0px_#882637] dark:shadow-[7px_7px_0px_0px_#511B25]">
        {/* Red Disconnected / Wifi-off Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#882637] bg-[#882637] text-white shadow-[3px_3px_0px_0px_#000000]">
          <WifiOff className="h-8 w-8 stroke-[2.2]" />
        </div>

        {/* Title */}
        <h2 className="mt-6 text-2xl sm:text-[30px] font-black text-[#18181B] dark:text-white tracking-tight">
          {t("title")}
        </h2>

        {/* Description */}
        <p className="mt-3 max-w-xl mx-auto text-xs sm:text-[13px] leading-relaxed text-[#52525B] dark:text-zinc-300 font-medium">
          {t("description")}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <button
            type="button"
            onClick={onTryAgain}
            disabled={isRetrying}
            className="inline-flex items-center justify-center rounded-xl bg-[#882637] hover:bg-[#701622] active:bg-[#511B25] text-white px-8 py-3 text-sm font-black border-2 border-[#882637] shadow-[3px_3px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition-all disabled:opacity-60"
          >
            {isRetrying ? "Submitting..." : t("tryAgain")}
          </button>

          <button
            type="button"
            onClick={onKeepAnswers}
            className="inline-flex items-center justify-center rounded-xl border-2 border-[#882637] bg-white dark:bg-[#16161A] text-[#882637] dark:text-[#F29EAA] hover:bg-[#882637]/5 px-8 py-3 text-sm font-black shadow-[3px_3px_0px_0px_#882637] hover:shadow-[4px_4px_0px_0px_#882637] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition-all"
          >
            {t("keepAnswers")}
          </button>
        </div>
      </div>

      {/* Bottom 3 Info Cards */}
      <ReportInfoCards />
    </div>
  );
}
