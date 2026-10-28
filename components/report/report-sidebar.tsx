import React from "react";
import { AlertCircle, Check, Heart, Phone, ShieldCheck, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";

export function CallCard() {
  const t = useTranslations("report.call");

  return (
    <div className="contact-call-card w-full rounded-2xl border-2 border-[#882637] bg-[#FFFBEB] p-5 sm:p-6 shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] dark:bg-[#16161A] cursor-default">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs sm:text-[13px] font-medium text-[#4B5563] dark:text-zinc-300">
            {t("prompt")}
          </p>
          <p className="mt-1 text-2xl sm:text-[28px] font-black tracking-tight text-[#882637] dark:text-[#F29EAA]">
            {t("cta")}
          </p>
        </div>
        <a
          href="tel:1818"
          aria-label={t("cta")}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#882637] text-white shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          <Phone className="h-5 w-5 fill-white text-white" />
        </a>
      </div>
      <p className="mt-3.5 text-xs leading-relaxed text-[#6B7280] dark:text-zinc-400">
        {t("note")}
      </p>
    </div>
  );
}

export function ConfidentialityCard() {
  const t = useTranslations("report.sidebar");

  return (
    <div className="report-sidebar-conf rounded-2xl border-2 border-[#008A52] bg-[#EBF9EE] p-5 sm:p-6 dark:border-emerald-700 dark:bg-emerald-950/35 shadow-[5px_5px_0px_0px_#008A52] dark:shadow-[5px_5px_0px_0px_#064e3b]">
      <div className="mb-3.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#008A52] bg-[#008A52] text-white shadow-[2px_2px_0px_0px_#000000]">
        <ShieldCheck className="h-5 w-5 stroke-[2.2]" />
      </div>
      <h3 className="text-base font-black text-[#085C38] dark:text-emerald-300">
        {t("confTitle")}
      </h3>
      <hr className="my-3 border-t border-[#008A52]/30 dark:border-emerald-700/50" />
      <p className="text-xs sm:text-[13px] leading-relaxed text-[#2F6B4F] dark:text-emerald-200/90 font-medium">
        {t("confText")}
      </p>
      <div className="mt-3.5 flex justify-end">
        <Link
          href="/privacy"
          className="text-xs font-bold text-[#085C38] underline transition-colors hover:text-[#046C42] dark:text-emerald-300 dark:hover:text-emerald-200"
        >
          {t("privacyPolicy")}
        </Link>
      </div>
    </div>
  );
}

export function ReportSidebar() {
  const t = useTranslations("report.sidebar");
  const helps = t.raw("helps") as string[];
  const safe = t.raw("safe") as string[];

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      {/* 1. Confidentiality Card (shown on desktop here; on mobile it is displayed above the form) */}
      <div className="hidden lg:block">
        <ConfidentialityCard />
      </div>

      {/* 2. What helps us */}
      <div className="report-sidebar-card report-sidebar-card-left rounded-[24px] border-2 border-[#882637] bg-[#FFFBEB] p-5 sm:p-6 dark:border-[#882637] dark:bg-[#16161A] shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25]">
        <div className="mb-3.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#882637] bg-[#FDE68A] text-[#78350F] shadow-[2px_2px_0px_0px_#882637] dark:bg-amber-900/50 dark:text-amber-200">
          <Heart className="h-5 w-5 stroke-[2.2]" />
        </div>
        <h3 className="text-base font-black text-[#1F2937] dark:text-zinc-100">
          {t("helpsTitle")}
        </h3>
        <hr className="my-3 border-t border-[#882637]/20 dark:border-zinc-800" />
        <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#4B5563] dark:text-zinc-300">
          {helps.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 stroke-[2.8]" />
              <span className="leading-snug font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Keep yourself safe */}
      <div className="report-sidebar-card report-sidebar-card-right rounded-[24px] border-2 border-[#882637] bg-[#FFFBEB] p-5 sm:p-6 dark:border-[#882637] dark:bg-[#16161A] shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25]">
        <div className="mb-3.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#882637] bg-[#FDE68A] text-[#78350F] shadow-[2px_2px_0px_0px_#882637] dark:bg-amber-900/50 dark:text-amber-200">
          <AlertCircle className="h-5 w-5 stroke-[2.2]" />
        </div>
        <h3 className="text-base font-black text-[#1F2937] dark:text-zinc-100">
          {t("safeTitle")}
        </h3>
        <hr className="my-3 border-t border-[#882637]/20 dark:border-zinc-800" />
        <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#4B5563] dark:text-zinc-300">
          {safe.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500 stroke-[2.8]" />
              <span className="leading-snug font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

