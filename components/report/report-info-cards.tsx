"use client";

import React from "react";
import { Heart, Phone, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function ReportInfoCards() {
  const t = useTranslations("report.infoCards");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-8">
      {/* 1. Confidential handling */}
      <div className="report-info-card report-info-card-1 rounded-[22px] border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] p-5 sm:p-6 shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] cursor-default">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#882637] bg-white dark:bg-[#2A1116] text-[#882637] dark:text-[#F29EAA] shadow-[2px_2px_0px_0px_#882637] mb-3.5">
          <ShieldCheck className="h-5 w-5 stroke-[2.2]" />
        </div>
        <h4 className="text-sm sm:text-base font-black text-[#18181B] dark:text-zinc-100">
          {t("confidentialTitle")}
        </h4>
        <p className="mt-2 text-xs leading-relaxed text-[#52525B] dark:text-zinc-400 font-medium">
          {t("confidentialDesc")}
        </p>
      </div>

      {/* 2. Updates by SMS */}
      <div className="report-info-card report-info-card-2 rounded-[22px] border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] p-5 sm:p-6 shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] cursor-default">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#882637] bg-white dark:bg-[#2A1116] text-[#882637] dark:text-[#F29EAA] shadow-[2px_2px_0px_0px_#882637] mb-3.5">
          <Phone className="h-5 w-5 stroke-[2.2]" />
        </div>
        <h4 className="text-sm sm:text-base font-black text-[#18181B] dark:text-zinc-100">
          {t("smsTitle")}
        </h4>
        <p className="mt-2 text-xs leading-relaxed text-[#52525B] dark:text-zinc-400 font-medium">
          {t("smsDesc")}
        </p>
      </div>

      {/* 3. Your safety first */}
      <div className="report-info-card report-info-card-3 rounded-[22px] border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] p-5 sm:p-6 shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] cursor-default">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#882637] bg-white dark:bg-[#2A1116] text-[#882637] dark:text-[#F29EAA] shadow-[2px_2px_0px_0px_#882637] mb-3.5">
          <Heart className="h-5 w-5 stroke-[2.2]" />
        </div>
        <h4 className="text-sm sm:text-base font-black text-[#18181B] dark:text-zinc-100">
          {t("safetyTitle")}
        </h4>
        <p className="mt-2 text-xs leading-relaxed text-[#52525B] dark:text-zinc-400 font-medium">
          {t("safetyDesc")}
        </p>
      </div>
    </div>
  );
}
