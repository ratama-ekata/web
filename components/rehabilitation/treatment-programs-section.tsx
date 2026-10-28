"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { DonutChart } from "./charts/donut-chart";
import { VerticalBarChart } from "./charts/bar-chart";
import {
  TREATMENT_PROGRAMS_DATA,
  TOTAL_PROGRAMS_COUNT,
  VOCATIONAL_COURSES_COUNT,
  getTrilingual,
} from "./data/rehabilitation-data";
import { BarChart3, PieChart, Table2, Award, Sparkles, BookOpen } from "lucide-react";
import { CountUpNumber } from "./charts/count-up-number";

export function TreatmentProgramsSection() {
  const locale = useLocale() as Locale;
  const [activeTab, setActiveTab] = useState<"charts" | "table">("charts");
  const [chartType, setChartType] = useState<"bar" | "donut">("bar");

  const labels = {
    sectionTitle: {
      si: "5. ප්‍රතිකාර වැඩසටහන් සහ වෘත්තිය පුහුණු පාඨමාලා",
      en: "5. Therapeutic Treatment Programs & Vocational Courses",
      ta: "5. சிகிச்சைத் திட்டங்கள் மற்றும் தொழிற்பயிற்சி படிப்புகள்",
    },
    subtitle: {
      si: "පුනරුත්ථාපන ලාභීන්ගේ කායික හා මානසික සංවර්ධනය සඳහා විවිධ වැඩසටහන් 420 ක් පවත්වා ඇති අතර, වෘත්තීය සාක්ෂරතා මධ්‍යස්ථානය හරහා වෘත්තීය පුහුණු පාඨමාලා 12 ක් පවත්වා ඇත.",
      en: "420 specialized therapeutic and educational programs have been conducted for physical and mental rehabilitation, alongside 12 accredited technical and vocational training courses.",
      ta: "புனர்வாழ்வு பெறுவோரின் உடல் மற்றும் மன வளர்ச்சிக்காக 420 பல்வேறு திட்டங்கள் நடத்தப்பட்டுள்ளதுடன், தொழிற்கல்வி மையம் ஊடாக 12 தொழிற்பயிற்சி நெறிகள் முன்னெடுக்கப்பட்டுள்ளன.",
    },
    programType: {
      si: "වැඩසටහන් වර්ගය",
      en: "Program Category",
      ta: "திட்ட வகை",
    },
    count: {
      si: "සිදු කරනු ලැබූ මුළු සංඛ්‍යාව",
      en: "Programs Conducted",
      ta: "நடத்தப்பட்ட மொத்த எண்ணிக்கை",
    },
    percentage: {
      si: "ප්‍රතිශතය",
      en: "Percentage Share",
      ta: "சதவீதம்",
    },
    donutTitle: {
      si: "ප්‍රධාන වැඩසටහන් බෙදීයාම",
      en: "Program Share Breakdown",
      ta: "முக்கிய திட்டப் பரம்பல்",
    },
    barTitle: {
      si: "වැඩසටහන් ප්‍රමාණය අනුව වර්ගීකරණය",
      en: "Program Volume by Discipline",
      ta: "திட்டங்களின் எண்ணிக்கை ஒப்பீடு",
    },
  };

  // Donut chart top items + others grouped
  const topCategories = TREATMENT_PROGRAMS_DATA.slice(0, 6);
  const otherSum = TREATMENT_PROGRAMS_DATA.slice(6).reduce((acc, c) => acc + c.count, 0);

  const donutData = [
    ...topCategories.map((p) => ({
      id: p.id,
      label: getTrilingual(p.title, locale).split("(")[0].trim(),
      value: p.count,
      color: p.color,
      formattedValue: p.count.toString(),
    })),
    {
      id: "prog-others",
      label: locale === "si" ? "වෙනත් විශේෂිත වැඩසටහන්" : "Other Specialized Programs",
      value: otherSum,
      color: "#94A3B8",
      formattedValue: otherSum.toString(),
    },
  ];

  // Trilingual clean short labels to prevent awkward truncation / overflow
  const programShortNames: Record<string, { si: string; en: string; ta: string }> = {
    "prog-counseling": {
      si: "උපදේශන",
      en: "Counseling",
      ta: "ஆலோசனை",
    },
    "prog-beyond-rehab": {
      si: "ජීවන කුසලතා",
      en: "Beyond Rehab",
      ta: "புனர்வாழ்வுக்கு அப்பால்",
    },
    "prog-thai-language": {
      si: "තායි භාෂාව",
      en: "Thai Language",
      ta: "தாய் மொழி",
    },
    "prog-national-festivals": {
      si: "සංස්කෘතික / උත්සව",
      en: "Festivals & Cultural",
      ta: "தேசிய விழாக்கள்",
    },
    "prog-vocational": {
      si: "වෘත්තීය පුහුණු",
      en: "Vocational",
      ta: "தொழிற்பயிற்சி",
    },
    "prog-yoga": {
      si: "යෝගා සහ සුවතා",
      en: "Yoga & Wellness",
      ta: "யோகா & நலவாழ்வு",
    },
    "prog-aesthetic": {
      si: "සෞන්දර්ය චිකිත්සා",
      en: "Aesthetic Arts",
      ta: "நுண்கலை சிகிச்சை",
    },
    "prog-spiritual": {
      si: "අධ්‍යාත්මික සුව",
      en: "Spiritual Healing",
      ta: "ஆன்மீக சிகிச்சை",
    },
    "prog-sports": {
      si: "ක්‍රීඩා සහ ශාරීරික",
      en: "Sports & Fitness",
      ta: "விளையாட்டு",
    },
    "prog-leadership": {
      si: "නායකත්ව පුහුණු",
      en: "Leadership",
      ta: "தலைமைத்துவம்",
    },
    "prog-excursions": {
      si: "අධ්‍යාපනික සංචාර",
      en: "Excursions",
      ta: "கள விஜயம்",
    },
    "prog-special-talents": {
      si: "විශේෂ කුසලතා",
      en: "Special Talents",
      ta: "சிறப்பு திறமை",
    },
  };

  // Vertical Bar Chart data
  const barData = TREATMENT_PROGRAMS_DATA.map((p) => ({
    id: p.id,
    label: programShortNames[p.id]?.[locale] || getTrilingual(p.title, locale),
    secondaryLabel: `${p.count}`,
    value: p.count,
    color: p.color,
    highlight: p.count >= 70,
  }));

  return (
    <section className="py-8 sm:py-12 border-b border-[#E8E6DD] dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading & View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#882637]/10 dark:bg-[#882637]/30 text-[#882637] dark:text-[#F29EAA] text-xs font-bold mb-2">
              <span>{labels.sectionTitle[locale]}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {locale === "si"
                ? "චිකිත්සක හා වෘත්තීය නිපුණතා වැඩසටහන් 420"
                : "420 Therapeutic, Mind-Body & Vocational Courses"}
            </h2>
          </div>

          {/* Toggle */}
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
              <span>Charts</span>
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
              <span>Data Table</span>
            </button>
          </div>
        </div>

        {/* Intro Subtitle */}
        <p className="max-w-3xl text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
          {labels.subtitle[locale]}
        </p>

        {/* 2 Quick Summary Stats (Tilted Neo-Brutalist Sticker Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-10 pt-2 pb-2">
          {/* Card 1: Total Programs */}
          <div
            style={{ transform: "rotate(-1.5deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex items-center gap-4 cursor-pointer group"
          >
            <div className="h-11 w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5 text-[#882637] dark:text-[#F29EAA] stroke-[2.2]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                Total Sessions Conducted
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none my-1">
                <CountUpNumber end={TOTAL_PROGRAMS_COUNT} suffix=" Programs" />
              </p>
              <span className="text-xs text-[#525252] dark:text-neutral-400 font-medium block">
                Spanning 12 distinct rehabilitation therapies
              </span>
            </div>
          </div>

          {/* Card 2: Vocational Courses */}
          <div
            style={{ transform: "rotate(1.4deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex items-center gap-4 cursor-pointer group"
          >
            <div className="h-11 w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
              <Award className="h-5 w-5 text-purple-600 dark:text-purple-400 stroke-[2.2]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                Accredited Trade Literacy
              </span>
              <p className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 tracking-tight leading-none my-1">
                <CountUpNumber end={VOCATIONAL_COURSES_COUNT} suffix=" Courses" />
              </p>
              <span className="text-xs text-[#525252] dark:text-neutral-400 font-medium block">
                Delivered via Tertiary Training Centre
              </span>
            </div>
          </div>
        </div>

        {/* Tab 1: SINGLE FULL-WIDTH CHART (Neo-Brutalist Sticker Card) */}
        {activeTab === "charts" && (
          <div className="rounded-[26px] sm:rounded-[30px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-6 sm:p-8 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] mb-8">
            {/* Header row with Title and Chart Type Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b-2 border-[#882637]/20 dark:border-neutral-800">
              <div>
                <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                  {chartType === "bar" ? labels.barTitle[locale] : labels.donutTitle[locale]}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {chartType === "bar"
                    ? locale === "si"
                      ? "උපදේශන (101), ජීවන කුසලතා (85), භාෂා (74) සහ සංස්කෘතික (70) ඇතුළු වැඩසටහන් 12 සංසන්දනය"
                      : "High volume across Counseling (101), Beyond Rehab (85), Language (74), and Festivals (70)"
                    : locale === "si"
                      ? "වැඩසටහන් 420 ප්‍රධාන කාණ්ඩ අතර ප්‍රතිශත බෙදීයාම"
                      : "Percentage distribution across therapeutic streams"}
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
                <VerticalBarChart
                  data={barData}
                  height={360}
                  barColor="#882637"
                  highlightColor="#D97706"
                  valueSuffix=""
                />
              </div>
            ) : (
              <div className="w-full py-4 flex justify-center">
                <DonutChart
                  data={donutData}
                  size={320}
                  thickness={52}
                  centerTitle={locale === "si" ? "මුළු වැඩසටහන්" : "Total Programs"}
                  centerTotalOverride={TOTAL_PROGRAMS_COUNT.toString()}
                  showLegend={true}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab 2: DATA TABLE */}
        {activeTab === "table" && (
          <div className="overflow-x-auto rounded-[26px] sm:rounded-[30px] border-[2.5px] border-[#882637] bg-white dark:bg-neutral-900 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] mb-8">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#882637] text-white">
                <tr>
                  <th className="py-3 px-4 font-bold">{labels.programType[locale]}</th>
                  <th className="py-3 px-4 font-bold text-right">{labels.count[locale]}</th>
                  <th className="py-3 px-4 font-bold text-right">{labels.percentage[locale]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-800 dark:text-neutral-200">
                {TREATMENT_PROGRAMS_DATA.map((prog) => (
                  <tr key={prog.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="py-3 px-4 font-medium flex items-center gap-2.5">
                      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: prog.color }} />
                      <span>{getTrilingual(prog.title, locale)}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-neutral-900 dark:text-white">
                      {prog.count}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-neutral-100 dark:bg-neutral-800">
                        {prog.percentage.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
                {/* Total */}
                <tr className="bg-[#882637]/10 dark:bg-[#882637]/30 font-black text-sm border-t-2 border-[#882637]">
                  <td className="py-3 px-4 text-[#882637] dark:text-[#F29EAA]">
                    {locale === "si" ? "මුළු වැඩසටහන් සංඛ්‍යාව" : "Total Programs Conducted"}
                  </td>
                  <td className="py-3 px-4 text-right text-[#882637] dark:text-[#F29EAA]">
                    {TOTAL_PROGRAMS_COUNT}
                  </td>
                  <td className="py-3 px-4 text-right text-[#882637] dark:text-[#F29EAA]">
                    100.0%
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
