"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { DonutChart } from "./charts/donut-chart";
import { GroupedBarChart } from "./charts/bar-chart";
import {
  CENTRE_CAPACITY_DATA,
  CAPACITY_TOTALS,
  PHYSICAL_PROGRESS_OVERVIEW,
  getTrilingual,
} from "./data/rehabilitation-data";
import { BarChart3, PieChart, Table2, Users, BedDouble, CheckCircle } from "lucide-react";
import { CountUpNumber } from "./charts/count-up-number";

export function CapacityProgressSection() {
  const locale = useLocale() as Locale;
  const [activeTab, setActiveTab] = useState<"charts" | "table">("charts");
  const [chartType, setChartType] = useState<"bar" | "donut">("bar");

  const labels = {
    sectionTitle: {
      si: "4. භෞතික ප්‍රගතිය (2026.01.01 සිට 2026.10.21 දක්වා)",
      en: "4. Physical Progress & Centre Capacity Utilization",
      ta: "4. பௌதீக முன்னேற்றம் மற்றும் நிலையக் கொள்ளளவு பயன்பாடு",
    },
    admissionsCardTitle: {
      si: "ඇතුළත් වූ සංඛ්‍යාව",
      en: "Admissions Progress",
      ta: "சேர்க்கை முன்னேற்றம்",
    },
    admissionsTotal: {
      si: "2013 සිට 2026.10.21 දක්වා මුළු සංඛ්‍යාව: 13,408 කි.",
      en: "Total Admissions from 2013 to 2026.10.21: 13,408",
      ta: "2013 முதல் 2026.10.21 வரையிலான மொத்த எண்ணிக்கை: 13,408",
    },
    admissions2026: {
      si: "2026 ජනවාරි 01 සිට ඔක්තොම්බර් 21 දක්වා 1,074 ක් යොමු කර ඇත.",
      en: "1,074 individuals admitted between Jan 01 and Oct 21, 2026.",
      ta: "2026 ஜனவரி 01 முதல் ஒக்டோபர் 21 வரை 1,074 பேர் அனுமதிக்கப்பட்டுள்ளனர்.",
    },
    centreTitle: {
      si: "මධ්‍යස්ථානය",
      en: "Rehabilitation Centre",
      ta: "புனர்வாழ்வு நிலையம்",
    },
    capacity: {
      si: "ධාරිතාවය",
      en: "Total Capacity",
      ta: "கொள்ளளவு",
    },
    current: {
      si: "වත්මන් ලාභීන් සංඛ්‍යාව",
      en: "Current Beneficiaries",
      ta: "தற்போதைய பயனாளிகள்",
    },
    available: {
      si: "තවදුරටත් ඇතුළත් කළ හැකි සංඛ්‍යාව",
      en: "Available Slots",
      ta: "வெற்றிடங்கள்",
    },
    occupancy: {
      si: "පිරී ඇති ප්‍රතිශතය",
      en: "Occupancy Rate",
      ta: "நிரம்பல் வீதம்",
    },
    totalJudicial: {
      si: "අධිකරණ නියෝග මත එකතුව",
      en: "Judicial Orders Subtotal",
      ta: "நீதிமன்ற உத்தரவுகளின் கீழான மொத்தம்",
    },
    grandTotal: {
      si: "මුළු එකතුව",
      en: "Grand Total",
      ta: "முழு மொத்தம்",
    },
    donutTitle: {
      si: "වත්මන් ලාභීන් බෙදීයාම (මධ්‍යස්ථාන අනුව)",
      en: "Current Inmates Distribution by Centre",
      ta: "தற்போதைய பயனாளிகள் பரம்பல்",
    },
    barTitle: {
      si: "ධාරිතාව, වත්මන් ලාභීන් සහ ඉතිරි ඉඩකඩ සැසඳීම",
      en: "Capacity vs Current Inmates vs Available Spaces",
      ta: "கொள்ளளவு மற்றும் தற்போதைய பயனாளிகள் ஒப்பீடு",
    },
  };

  // Donut data for current beneficiaries distribution
  const centreColors = ["#882637", "#2563EB", "#D97706", "#059669"];
  const donutData = CENTRE_CAPACITY_DATA.map((c, i) => ({
    id: c.id,
    label: getTrilingual(c.name, locale),
    value: c.currentInmates,
    color: centreColors[i % centreColors.length],
    formattedValue: c.currentInmates.toString(),
  }));

  // Grouped bar chart data
  const groupedCategories = CENTRE_CAPACITY_DATA.map((c) => ({
    id: c.id,
    categoryLabel: getTrilingual(c.name, locale),
    values: {
      capacity: c.capacity,
      current: c.currentInmates,
      available: c.availableSlots,
    },
  }));

  const groupedSeries = [
    { key: "capacity", label: labels.capacity[locale], color: "#882637" },
    { key: "current", label: labels.current[locale], color: "#2563EB" },
    { key: "available", label: labels.available[locale], color: "#059669" },
  ];

  return (
    <section className="py-8 sm:py-12 border-b border-[#E8E6DD] dark:border-zinc-800 bg-[#FFFDF0]/50 dark:bg-black/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading & View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#882637]/10 dark:bg-[#882637]/30 text-[#882637] dark:text-[#F29EAA] text-xs font-bold mb-2">
              <span>{labels.sectionTitle[locale]}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {locale === "si"
                ? "මධ්‍යස්ථාන ධාරිතාවය සහ වත්මන් තත්ත්වය"
                : locale === "ta"
                ? "நிலையக் கொள்ளளவு மற்றும் தற்போதைய நிலைமை"
                : "Centre Capacity & Current Occupancy"}
            </h2>
          </div>

          {/* Toggle Button Group: Charts vs Table */}
          <div className="inline-flex items-center rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-1 shadow-xs self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("charts")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "charts"
                  ? "bg-[#882637] text-white shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>{locale === "si" ? "ප්‍රස්ථාර (Charts)" : "Charts View"}</span>
            </button>
            <button
              onClick={() => setActiveTab("table")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "table"
                  ? "bg-[#882637] text-white shadow-xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
              }`}
            >
              <Table2 className="h-3.5 w-3.5" />
              <span>{locale === "si" ? "වගුව (Table)" : "Data Table"}</span>
            </button>
          </div>
        </div>

        {/* Admissions Highlights Banner (Tilted Neo-Brutalist Sticker Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10 pt-2 pb-2">
          {/* Card 1: 2013-2026 Admissions */}
          <div
            style={{ transform: "rotate(-1.5deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex items-center gap-4 cursor-pointer group"
          >
            <div className="h-11 w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
              <Users className="h-5 w-5 text-[#882637] dark:text-[#F29EAA] stroke-[2.2]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                2013 - 2026.10.21
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none my-1">
                <CountUpNumber end={PHYSICAL_PROGRESS_OVERVIEW.totalAdmittedSince2013} />
              </p>
              <span className="text-xs text-[#525252] dark:text-neutral-400 font-medium block">
                {labels.admissionsTotal[locale]}
              </span>
            </div>
          </div>

          {/* Card 2: 2026 Admissions */}
          <div
            style={{ transform: "rotate(1.4deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex items-center gap-4 cursor-pointer group"
          >
            <div className="h-11 w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
              <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                2026 Year-to-Date
              </span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight leading-none my-1">
                +<CountUpNumber end={PHYSICAL_PROGRESS_OVERVIEW.year2026Admitted} />
              </p>
              <span className="text-xs text-[#525252] dark:text-neutral-400 font-medium block">
                {labels.admissions2026[locale]}
              </span>
            </div>
          </div>

          {/* Card 3: Overall Capacity */}
          <div
            style={{ transform: "rotate(-1.2deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex items-center gap-4 cursor-pointer group"
          >
            <div className="h-11 w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
              <BedDouble className="h-5 w-5 text-[#882637] dark:text-[#F29EAA] stroke-[2.2]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                Overall Capacity
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none my-1">
                <CountUpNumber end={CAPACITY_TOTALS.overall.currentInmates} /> / {CAPACITY_TOTALS.overall.capacity}
              </p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block">
                {CAPACITY_TOTALS.overall.availableSlots} Available Slots ({CAPACITY_TOTALS.overall.occupancyRate}% Occupied)
              </span>
            </div>
          </div>
        </div>

        {/* Tab 1: SINGLE FULL-WIDTH CHART (Neo-Brutalist Sticker Card) */}
        {activeTab === "charts" && (
          <div className="rounded-[26px] sm:rounded-[30px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-4 sm:p-7 lg:p-8 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] overflow-hidden">
            {/* Header row with Title and Chart Type Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b-2 border-[#882637]/20 dark:border-neutral-800">
              <div>
                <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                  {chartType === "bar" ? labels.barTitle[locale] : labels.donutTitle[locale]}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 font-medium">
                  {chartType === "bar"
                    ? locale === "si"
                      ? "එක් එක් මධ්‍යස්ථානයේ ධාරිතාවය, වත්මන් ලාභීන් සහ තවදුරටත් ඇති ඉඩකඩ සංසන්දනය"
                      : "Side-by-side comparison of capacity limits, resident count, and vacant beds across centres"
                    : locale === "si"
                      ? "වත්මන් ලාභීන් 519 දෙනා මධ්‍යස්ථාන 4 අතර බෙදී ඇති ආකාරය"
                      : "Distribution of 519 active inmates across all residential facilities"}
                </p>
              </div>

              {/* View Switcher: Bar vs Donut */}
              <div className="inline-flex items-center rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 p-1 shadow-[2px_2px_0px_0px_#882637] self-start sm:self-auto shrink-0">
                <button
                  onClick={() => setChartType("bar")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    chartType === "bar"
                      ? "bg-[#882637] text-white shadow-xs"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900"
                  }`}
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span>{locale === "si" ? "තීරු ප්‍රස්ථාරය" : locale === "ta" ? "பார் வரைபடம்" : "Bar Chart"}</span>
                </button>
                <button
                  onClick={() => setChartType("donut")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    chartType === "donut"
                      ? "bg-[#882637] text-white shadow-xs"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900"
                  }`}
                >
                  <PieChart className="h-3.5 w-3.5" />
                  <span>{locale === "si" ? "ඩෝනට් ප්‍රස්ථාරය" : locale === "ta" ? "டோனட் வரைபடம்" : "Donut Chart"}</span>
                </button>
              </div>
            </div>

            {/* Chart Display: Bar (Full width) or Donut */}
            {chartType === "bar" ? (
              <div className="w-full">
                <div className="flex items-center justify-between text-[11px] text-[#882637] dark:text-[#F29EAA] font-bold mb-2 sm:hidden">
                  <span>
                    {locale === "si"
                      ? "← සියලු මධ්‍යස්ථාන බැලීමට පසෙකට අදින්න →"
                      : locale === "ta"
                      ? "← அனைத்து நிலையங்களையும் காண உருட்டவும் →"
                      : "← Swipe horizontally to view all centres →"}
                  </span>
                </div>
                <GroupedBarChart
                  categories={groupedCategories}
                  series={groupedSeries}
                  height={360}
                  valueSuffix=""
                />
              </div>
            ) : (
              <div className="w-full py-4 flex justify-center">
                <DonutChart
                  data={donutData}
                  size={320}
                  thickness={52}
                  centerTitle={locale === "si" ? "වත්මන් ලාභීන්" : "Active Inmates"}
                  centerTotalOverride={CAPACITY_TOTALS.overall.currentInmates.toString()}
                  centerSubtitle={`Cap: ${CAPACITY_TOTALS.overall.capacity}`}
                  showLegend={true}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab 2: STRUCTURED DATA TABLE */}
        {activeTab === "table" && (
          <div className="overflow-x-auto rounded-[26px] sm:rounded-[30px] border-[2.5px] border-[#882637] bg-white dark:bg-neutral-900 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#882637] text-white">
                <tr>
                  <th className="py-3 px-4 font-bold">{labels.centreTitle[locale]}</th>
                  <th className="py-3 px-4 font-bold text-right">{labels.capacity[locale]}</th>
                  <th className="py-3 px-4 font-bold text-right">{labels.current[locale]}</th>
                  <th className="py-3 px-4 font-bold text-right">{labels.available[locale]}</th>
                  <th className="py-3 px-4 font-bold text-right">{labels.occupancy[locale]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-800 dark:text-neutral-200">
                {/* Court Ordered Category Header */}
                <tr className="bg-neutral-50 dark:bg-neutral-800/40 font-bold text-neutral-700 dark:text-neutral-300">
                  <td colSpan={5} className="py-2.5 px-4 text-xs uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                    {locale === "si" ? "අධිකරණ නියෝග මත" : "Under Judicial Orders"}
                  </td>
                </tr>

                {CENTRE_CAPACITY_DATA.filter((c) => c.category === "judicial").map((centre) => (
                  <tr key={centre.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{getTrilingual(centre.name, locale)}</td>
                    <td className="py-3 px-4 text-right font-bold">{centre.capacity}</td>
                    <td className="py-3 px-4 text-right font-bold text-blue-600 dark:text-blue-400">
                      {centre.currentInmates}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {centre.availableSlots}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-neutral-100 dark:bg-neutral-800">
                        {centre.occupancyRate.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}

                {/* Judicial Subtotal */}
                <tr className="bg-[#FFFBEB] dark:bg-neutral-800/80 font-bold border-t-2 border-neutral-300 dark:border-neutral-700">
                  <td className="py-2.5 px-4">{labels.totalJudicial[locale]}</td>
                  <td className="py-2.5 px-4 text-right">{CAPACITY_TOTALS.judicial.capacity}</td>
                  <td className="py-2.5 px-4 text-right text-blue-600 dark:text-blue-400">
                    {CAPACITY_TOTALS.judicial.currentInmates}
                  </td>
                  <td className="py-2.5 px-4 text-right text-emerald-600 dark:text-emerald-400">
                    {CAPACITY_TOTALS.judicial.availableSlots}
                  </td>
                  <td className="py-2.5 px-4 text-right font-bold">
                    {CAPACITY_TOTALS.judicial.occupancyRate.toFixed(1)}%
                  </td>
                </tr>

                {/* Voluntary Rehabilitation */}
                <tr className="bg-neutral-50 dark:bg-neutral-800/40 font-bold text-neutral-700 dark:text-neutral-300">
                  <td colSpan={5} className="py-2.5 px-4 text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {locale === "si" ? "ස්වේච්ඡා පුනරුත්ථාපන" : "Voluntary Rehabilitation"}
                  </td>
                </tr>

                {CENTRE_CAPACITY_DATA.filter((c) => c.category === "voluntary").map((centre) => (
                  <tr key={centre.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{getTrilingual(centre.name, locale)}</td>
                    <td className="py-3 px-4 text-right font-bold">{centre.capacity}</td>
                    <td className="py-3 px-4 text-right font-bold text-blue-600 dark:text-blue-400">
                      {centre.currentInmates}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {centre.availableSlots}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-neutral-100 dark:bg-neutral-800">
                        {centre.occupancyRate.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}

                {/* Grand Total */}
                <tr className="bg-[#882637]/10 dark:bg-[#882637]/30 font-black text-sm border-t-2 border-[#882637]">
                  <td className="py-3 px-4 text-[#882637] dark:text-[#F29EAA]">{labels.grandTotal[locale]}</td>
                  <td className="py-3 px-4 text-right text-[#882637] dark:text-[#F29EAA]">
                    {CAPACITY_TOTALS.overall.capacity}
                  </td>
                  <td className="py-3 px-4 text-right text-blue-600 dark:text-blue-400">
                    {CAPACITY_TOTALS.overall.currentInmates}
                  </td>
                  <td className="py-3 px-4 text-right text-emerald-600 dark:text-emerald-400">
                    {CAPACITY_TOTALS.overall.availableSlots}
                  </td>
                  <td className="py-3 px-4 text-right text-[#882637] dark:text-[#F29EAA]">
                    {CAPACITY_TOTALS.overall.occupancyRate.toFixed(1)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
