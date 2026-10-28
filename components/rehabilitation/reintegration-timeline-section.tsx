"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { VerticalBarChart } from "./charts/bar-chart";
import {
  REINTEGRATION_2026_MONTHLY,
  REINTEGRATION_TOTALS,
  getTrilingual,
} from "./data/rehabilitation-data";
import { TrendingUp, UserCheck, Calendar, Award } from "lucide-react";
import { CountUpNumber } from "./charts/count-up-number";

export function ReintegrationTimelineSection() {
  const locale = useLocale() as Locale;

  const labels = {
    sectionTitle: {
      si: "6. පුනරුත්ථාපන ලාභීන් සමාජගත කිරීම",
      en: "6. Social Reintegration of Rehabilitation Beneficiaries",
      ta: "6. புனர்வாழ்வு பெற்ற பயனாளிகளை சமூகமயமாக்குதல்",
    },
    intro: {
      si: "2013 වර්ෂයේ සිට 2026.10.21 දක්වා අධිකරණ නියෝග මත ඇතුලත් වූ ලාභීන් 10,859 ක් සාර්ථකව සමාජගත කර ඇත. 2026.01.01 සිට 2026.10.21 දක්වා කාලසීමාව තුළ පමණක් පුද්ගලයින් 1,200 ක් සමාජගත කොට ඇත.",
      en: "From 2013 through Oct 21, 2026, a total of 10,859 court-ordered beneficiaries have been successfully reintegrated. In the 2026 calendar year to date, 1,200 citizens have returned to society.",
      ta: "2013 ஆம் ஆண்டு முதல் 2026.10.21 வரை நீதிமன்ற உத்தரவின் கீழ் அனுமதிக்கப்பட்ட 10,859 பயனாளிகள் சமூகத்தில் வெற்றிகரமாக மீள ஒருங்கிணைக்கப்பட்டுள்ளனர். 2026 ஆம் ஆண்டில் மாத்திரம் 1,200 பேர் சமூகமயப்படுத்தப்பட்டுள்ளனர்.",
    },
    monthlyChartTitle: {
      si: "2026 මාසික සමාජගත කිරීම් ප්‍රගතිය (ජනවාරි - ඔක්තෝබර්)",
      en: "2026 Monthly Reintegration Trajectory (Jan - Oct)",
      ta: "2026 மாதாந்த சமூகமயமாக்கல் முன்னேற்றம் (ஜனவரி - ஒக்டோபர்)",
    },
    monthCol: {
      si: "2026 මාසය",
      en: "2026 Month",
      ta: "2026 மாதம்",
    },
    countCol: {
      si: "සමාජගත කළ සංඛ්‍යාව",
      en: "Reintegrated Count",
      ta: "சமூகமயப்படுத்தப்பட்ட எண்ணிக்கை",
    },
    peakMonthLabel: {
      si: "උපරිම සමාජගත කිරීම් මාසය:",
      en: "Peak Reintegration Month:",
      ta: "உச்சபட்ச சமூகமயமாக்கல் மாதம்:",
    },
    totalLabel: {
      si: "2026 එකතුව",
      en: "2026 Total",
      ta: "2026 மொத்தம்",
    },
  };

  // Convert monthly data to bar chart items
  const chartData = REINTEGRATION_2026_MONTHLY.map((m) => ({
    id: m.monthKey,
    label: getTrilingual(m.name, locale),
    value: m.count,
    highlight: m.count === 209, // Highlight July
    color: m.count === 209 ? "#059669" : "#882637",
  }));

  return (
    <section className="py-8 sm:py-12 border-b border-[#E8E6DD] dark:border-zinc-800 bg-[#FFFDF0]/50 dark:bg-black/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#882637]/10 dark:bg-[#882637]/30 text-[#882637] dark:text-[#F29EAA] text-xs font-bold mb-2">
            <span>{labels.sectionTitle[locale]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            {locale === "si"
              ? "සමාජගත කිරීම් 10,859 ක් (2026 වසරේ 1,200 ක්)"
              : "10,859 Beneficiaries Reintegrated (1,200 in 2026)"}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {labels.intro[locale]}
          </p>
        </div>

        {/* 3 Metric Cards (Tilted Neo-Brutalist Sticker Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-10 pt-2 pb-2">
          {/* Card 1: Historical */}
          <div
            style={{ transform: "rotate(-1.5deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <Award className="h-5 w-5 text-[#882637] dark:text-[#F29EAA] stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                  Historical Reintegration
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none my-1">
                <CountUpNumber end={REINTEGRATION_TOTALS.cumulativeSince2013} />
              </p>
              <span className="text-xs text-[#525252] dark:text-neutral-400 font-medium block">
                2013 to Oct 21, 2026
              </span>
            </div>
          </div>

          {/* Card 2: 2026 Annual Deliverable */}
          <div
            style={{ transform: "rotate(1.4deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                  2026 Annual Deliverable
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight leading-none my-1">
                +<CountUpNumber end={REINTEGRATION_TOTALS.year2026Total} />
              </p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block">
                10 Months Trajectory (Avg ~120/mo)
              </span>
            </div>
          </div>

          {/* Card 3: Peak Month */}
          <div
            style={{ transform: "rotate(-1.3deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                  {labels.peakMonthLabel[locale]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none my-1">
                {getTrilingual(REINTEGRATION_TOTALS.peakMonth.month, locale)}{" "}
                <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                  (<CountUpNumber end={REINTEGRATION_TOTALS.peakMonth.count} />)
                </span>
              </p>
              <span className="text-xs text-[#525252] dark:text-neutral-400 font-medium block">
                Highest single month output
              </span>
            </div>
          </div>
        </div>

        {/* Monthly Bar Chart (Neo-Brutalist Sticker Card) */}
        <div className="rounded-[26px] sm:rounded-[30px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-6 sm:p-8 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b-2 border-[#882637]/20 dark:border-neutral-800">
            <div>
              <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                {labels.monthlyChartTitle[locale]}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {locale === "si"
                  ? "ජූලි මාසයේ උපරිම සමාජගත කිරීම් 209ක් වාර්තා විය (මාස 10 මුළු එකතුව 1,200 කි)"
                  : locale === "ta"
                  ? "ஜூலை மாதத்தில் அதிகபட்சமாக 209 பயனாளிகள் சமூகத்தில் மீள இணைக்கப்பட்டனர் (மொத்தம் 1,200)"
                  : "July recorded the highest reintegration peak with 209 beneficiaries returning home (1,200 total)"}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-black px-3.5 py-1.5 rounded-xl border-2 border-emerald-600 bg-white dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 shadow-[2px_2px_0px_0px_#059669] self-start sm:self-auto shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{labels.totalLabel[locale]}: 1,200</span>
            </div>
          </div>

          <div className="w-full">
            <VerticalBarChart
              data={chartData}
              height={360}
              barColor="#882637"
              highlightColor="#059669"
              valueSuffix=" citizens"
              barWidthClass="max-w-[48px] sm:max-w-[64px] md:max-w-[78px] lg:max-w-[86px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
