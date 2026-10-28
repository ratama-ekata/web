"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { DonutChart } from "./charts/donut-chart";
import { VOLUNTARY_SENAPURA_DATA, getTrilingual } from "./data/rehabilitation-data";
import { HeartHandshake, BedDouble, Calendar, UserCheck, ShieldCheck } from "lucide-react";
import { CountUpNumber } from "./charts/count-up-number";

export function VoluntaryTreatmentSection() {
  const locale = useLocale() as Locale;

  const labels = {
    sectionTitle: {
      si: "7. ස්වේච්ඡාවෙන් පැමිණෙන්නන් සඳහා ප්‍රතිකාර (සේනපුර මධ්‍යස්ථානය)",
      en: "7. Voluntary Residential Inpatient Treatment (Senapura Centre)",
      ta: "7. சுயமாக முன்வருவோருக்கான உறைவிட சிகிச்சை (சேனபுர மையம்)",
    },
    subtitle: {
      si: "ස්වේච්ඡාවෙන් ප්‍රතිකාර පතන්නන් සඳහා ආරම්භ කරන ලද විශේෂිත නේවාසික පුනරුත්ථාපන පහසුකම.",
      en: "Specialized residential treatment facility dedicated to citizens who voluntarily seek rehabilitation without court orders.",
      ta: "நீதிமன்ற உத்தரவின்றி சுயமாக புனர்வாழ்வு பெற விரும்பும் பிரஜைகளுக்காக ஆரம்பிக்கப்பட்ட விசேட உறைவிட புனர்வாழ்வு வசதி.",
    },
    capacityLabel: {
      si: "එකවර නේවාසික ධාරිතාව",
      en: "Concurrent Inpatient Beds",
      ta: "ஒரே நேர உறைவிட கொள்ளளவு",
    },
    periodLabel: {
      si: "පුනරුත්ථාපන කාලය",
      en: "Rehabilitation Period",
      ta: "புனர்வாழ்வு காலம்",
    },
    referredLabel: {
      si: "2026 යොමු වූ සංඛ්‍යාව",
      en: "2026 Referrals",
      ta: "2026 இல் அனுமதிக்கப்பட்டோர்",
    },
    reintegratedLabel: {
      si: "සමාජගත කළ සංඛ්‍යාව",
      en: "Successfully Reintegrated",
      ta: "சமூகமயப்படுத்தப்பட்டோர்",
    },
  };

  const donutData = [
    {
      id: "reintegrated",
      label: locale === "si" ? "සමාජගත කළ" : "Reintegrated",
      value: VOLUNTARY_SENAPURA_DATA.year2026Reintegrated,
      color: "#059669",
      formattedValue: VOLUNTARY_SENAPURA_DATA.year2026Reintegrated.toString(),
    },
    {
      id: "active",
      label: locale === "si" ? "වත්මන් නේවාසික" : "Under Treatment",
      value: VOLUNTARY_SENAPURA_DATA.currentInCare,
      color: "#2563EB",
      formattedValue: VOLUNTARY_SENAPURA_DATA.currentInCare.toString(),
    },
  ];

  return (
    <section className="py-8 sm:py-12 border-b border-[#E8E6DD] dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-2">
            <span>{labels.sectionTitle[locale]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            {getTrilingual(VOLUNTARY_SENAPURA_DATA.centerName, locale)}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {labels.subtitle[locale]}
          </p>
        </div>

        {/* 4 Metrics Strip (Tilted Neo-Brutalist Sticker Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10 pt-2 pb-2">
          {/* Card 1: Treatment Period */}
          <div
            style={{ transform: "rotate(-1.6deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                  {labels.periodLabel[locale]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none my-1">
                03 Months
              </p>
              <span className="text-xs text-[#525252] dark:text-neutral-400 font-medium block">
                Residential Inpatient
              </span>
            </div>
          </div>

          {/* Card 2: Bed Capacity */}
          <div
            style={{ transform: "rotate(1.5deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <BedDouble className="h-5 w-5 text-[#882637] dark:text-[#F29EAA] stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                  {labels.capacityLabel[locale]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none my-1">
                <CountUpNumber end={100} suffix=" Beds" />
              </p>
              <span className="text-xs text-[#525252] dark:text-neutral-400 font-medium block">
                Concurrent Patient Capacity
              </span>
            </div>
          </div>

          {/* Card 3: Voluntarily Admitted */}
          <div
            style={{ transform: "rotate(-1.4deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <HeartHandshake className="h-5 w-5 text-amber-600 dark:text-amber-400 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                  {labels.referredLabel[locale]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 tracking-tight leading-none my-1">
                <CountUpNumber end={94} suffix=" Clients" />
              </p>
              <span className="text-xs text-[#525252] dark:text-neutral-400 font-medium block">
                Voluntarily Admitted in 2026
              </span>
            </div>
          </div>

          {/* Card 4: Successfully Reintegrated */}
          <div
            style={{ transform: "rotate(1.7deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                  {labels.reintegratedLabel[locale]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight leading-none my-1">
                <CountUpNumber end={59} suffix=" Clients" />
              </p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block">
                62.8% Completion Rate
              </span>
            </div>
          </div>
        </div>

        {/* Content Split: Donut Chart + Program Highlights (Equal Height Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Donut Chart: Senapura 2026 Inpatient Outcomes (Neo-Brutalist Sticker Card) */}
          <div className="lg:col-span-5 h-full rounded-[26px] sm:rounded-[30px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-6 sm:p-8 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] flex flex-col justify-between">
            <div className="w-full mb-4 pb-4 border-b-2 border-[#882637]/20 dark:border-neutral-800">
              <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                {locale === "si" ? "2026 ප්‍රතිකාර ප්‍රගතිය" : "2026 Clinical Outcome Share"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {locale === "si"
                  ? "යොමු වූ 94 දෙනාගෙන් 59ක් සමාජගත වී ඇති අතර 35ක් දැනට නේවාසිකව සිටියි"
                  : "59 reintegrated, 35 actively receiving residential treatment out of 94 admitted"}
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center py-2">
              <DonutChart
                data={donutData}
                size={270}
                thickness={46}
                centerTitle={locale === "si" ? "මුළු යොමුවීම්" : "Total Referrals"}
                centerTotalOverride="94"
                centerSubtitle="Year 2026"
                showLegend={true}
              />
            </div>
          </div>

          {/* 3 Highlights Cards (Equal Heights Matching Left Card) */}
          <div className="lg:col-span-7 h-full grid grid-rows-3 gap-4 sm:gap-5">
            {VOLUNTARY_SENAPURA_DATA.highlights.map((item, idx) => {
              const highlightIcons = [
                <HeartHandshake key="icon-0" className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />,
                <Calendar key="icon-1" className="h-5 w-5 sm:h-6 sm:w-6 text-[#882637] dark:text-[#F29EAA] stroke-[2.2]" />,
                <UserCheck key="icon-2" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400 stroke-[2.2]" />,
              ];

              return (
                <div
                  key={idx}
                  className="rounded-[22px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-5 sm:p-6 shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#882637] transition-all duration-300 flex items-center gap-4 cursor-pointer group h-full"
                >
                  <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                    {highlightIcons[idx] || <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-black text-neutral-900 dark:text-white mb-1 group-hover:text-[#882637] dark:group-hover:text-[#F29EAA] transition-colors">
                      {getTrilingual(item.title, locale)}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                      {getTrilingual(item.desc, locale)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
