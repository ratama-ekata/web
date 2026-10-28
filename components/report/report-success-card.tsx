"use client";

import React, { useState } from "react";
import { BadgeCheck, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { maskPhoneNumber } from "@/lib/report-storage";
import { ReportInfoCards } from "./report-info-cards";

interface ReportSuccessCardProps {
  referenceNumber: string;
  phone?: string;
  email?: string;
  onSubmitAnother: () => void;
}

export function ReportSuccessCard({
  referenceNumber,
  phone,
  email,
  onSubmitAnother,
}: ReportSuccessCardProps) {
  const t = useTranslations("report.successCard");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!referenceNumber) return;
    try {
      await navigator.clipboard.writeText(referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy reference number:", err);
    }
  };

  const maskedPhone = maskPhoneNumber(phone);
  const smsNotice = maskedPhone
    ? t("smsNotice", { phone: maskedPhone })
    : t("smsNoticeGeneric");

  return (
    <div className="space-y-6">
      {/* Main Success Container matching Neo-Brutalist brand */}
      <div className="report-success-card rounded-[28px] sm:rounded-[32px] border-2 border-[#008A52] bg-[#F4FBF6] dark:bg-[#0D1E14] px-6 py-10 sm:px-12 sm:py-12 text-center shadow-[7px_7px_0px_0px_#008A52] dark:shadow-[7px_7px_0px_0px_#064e3b]">
        {/* Green Badge Check Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#008A52] bg-[#008A52] text-white shadow-[3px_3px_0px_0px_#000000]">
          <BadgeCheck className="h-8 w-8 stroke-[2.2]" />
        </div>

        {/* Badge Eyebrow */}
        <p className="mt-5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#008A52] dark:text-emerald-400">
          {t("badge")}
        </p>

        {/* Title */}
        <h2 className="mt-2 text-2xl sm:text-[30px] font-black text-[#18181B] dark:text-white tracking-tight">
          {t("title")}
        </h2>

        {/* Description & SMS Notice */}
        <p className="mt-3 max-w-xl mx-auto text-xs sm:text-[13px] leading-relaxed text-[#52525B] dark:text-zinc-300 font-medium">
          {t("description")} {smsNotice}
        </p>

        {/* Reference Number Box */}
        <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#132A1C] border-2 border-[#008A52] shadow-[4px_4px_0px_0px_#008A52] dark:shadow-[4px_4px_0px_0px_#064e3b] max-w-xl mx-auto">
          <p className="text-xs sm:text-sm font-bold text-[#52525B] dark:text-zinc-300 text-center uppercase tracking-wider">
            {t("refNumber")}
          </p>

          <div className="mt-3 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <span className="text-3xl sm:text-[36px] font-black tracking-tight text-[#18181B] dark:text-zinc-100 font-mono">
              {referenceNumber}
            </span>

            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border-2 border-[#008A52] bg-white dark:bg-[#008A52]/20 px-4 py-1.5 text-sm font-black text-[#008A52] dark:text-emerald-300 shadow-[2px_2px_0px_0px_#008A52] hover:shadow-[3px_3px_0px_0px_#008A52] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition-all"
            >
              {copied ? t("copied") : t("copy")}
            </button>
          </div>

          <p className="mt-3.5 text-xs text-[#71717A] dark:text-zinc-400 text-center leading-relaxed">
            {t("refNotice")}
          </p>

          {email && (
            <p className="mt-2.5 text-xs font-semibold text-[#008A52] dark:text-emerald-400 text-center leading-relaxed">
              ✓ An official confirmation with Report ID #{referenceNumber} has been dispatched to {email}.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-[#882637] hover:bg-[#701622] active:bg-[#511B25] text-white px-7 py-3 text-sm font-black border-2 border-[#882637] shadow-[3px_3px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            {t("returnHome")}
          </Link>

          <button
            type="button"
            onClick={onSubmitAnother}
            className="inline-flex items-center justify-center rounded-xl border-2 border-[#882637] bg-white dark:bg-[#16161A] text-[#882637] dark:text-[#F29EAA] hover:bg-[#882637]/5 px-7 py-3 text-sm font-black shadow-[3px_3px_0px_0px_#882637] hover:shadow-[4px_4px_0px_0px_#882637] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            {t("submitAnother")}
          </button>
        </div>

        {/* Rehab Support Note */}
        <div className="mt-7 flex items-center justify-center gap-2 text-xs sm:text-[13px] text-[#27272A] dark:text-zinc-300 font-medium">
          <Heart className="h-4 w-4 stroke-[2] text-[#882637] dark:text-[#F29EAA]" />
          <span>
            {t("rehabSupport")}{" "}
            <a
              href="tel:1927"
              className="font-bold underline text-[#882637] dark:text-[#F29EAA] hover:text-[#511B25]"
            >
              {t("call1927")}
            </a>
          </span>
        </div>
      </div>

      {/* Bottom 3 Info Cards */}
      <ReportInfoCards />
    </div>
  );
}
