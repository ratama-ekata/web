"use client";

import React, { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { DonutChart } from "./charts/donut-chart";
import { VerticalBarChart, VerticalBarItem } from "./charts/bar-chart";
import {
  CAPITAL_PROJECTS_DATA,
  TOTAL_CAPITAL_ALLOCATION,
  getTrilingual,
} from "./data/rehabilitation-data";
import {
  Landmark,
  Building,
  Bath,
  CheckCircle,
  Sparkles,
  PieChart,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { CountUpNumber } from "./charts/count-up-number";

export function CapitalDevelopmentSection() {
  const locale = useLocale() as Locale;
  const [chartMode, setChartMode] = useState<"donut" | "bars">("donut");

  const labels = {
    sectionTitle: {
      si: "12. භෞතික සංවර්ධන කටයුතු සඳහා වෙන් කළ ප්‍රතිපාදන",
      en: "12. Capital Budget Allocations for Infrastructure Development",
      ta: "12. பௌதீக அபிவிருத்தி பணிகளுக்காக ஒதுக்கப்பட்ட நிதி ஒதுக்கீடுகள்",
    },
    title: {
      si: "රු. 87.7+ මිලියනයක යටිතල පහසුකම් සංවර්ධනය",
      en: "LKR 87.7M+ Capital Infrastructure Investment",
      ta: "ரூபா 87.7M+ மூலதன உட்கட்டமைப்பு முதலீடு",
    },
    subtitle: {
      si: "පුනරුත්ථාපන මධ්‍යස්ථානවල යටිතල පහසුකම් පුළුල් කිරීම, නේවාසික ගුණාත්මකභාවය ඉහළ නැංවීම හා නව ඉඩම් සංවර්ධනය වෙනුවෙන් වෙන් කර ඇති සමස්ත රාජ්‍ය ප්‍රතිපාදන:",
      en: "Government capital provisions dedicated to expanding inmate housing capacity, upgrading water & sanitation infrastructure, and commissioning new residential centers:",
      ta: "புனர்வாழ்வு நிலையங்களின் உட்கட்டமைப்பை விரிவுபடுத்துதல், உறைவிட தரத்தை உயர்த்துதல் மற்றும் புதிய நிலங்களை அபிவிருத்தி செய்வதற்காக ஒதுக்கப்பட்ட அரச நிதி:",
    },
    totalBudget: {
      si: "මුළු ඇස්තමේන්තු ප්‍රාග්ධන ප්‍රතිපාදනය",
      en: "Total Capital Budget",
      ta: "மொத்த மதிப்பீட்டு மூலதன ஒதுக்கீடு",
    },
    treasuryApproved: {
      si: "භාණ්ඩාගාර අනුමැතිය ලත්",
      en: "Treasury Approved",
      ta: "திறைசேரி அங்கீகரிக்கப்பட்டது",
    },
    projectsCount: {
      si: "ප්‍රමුඛ උපායමාර්ගික යටිතල පහසුකම් ව්‍යාපෘති 7 ක්",
      en: "7 Major High-Priority Strategic Capital Infrastructure Projects",
      ta: "7 முக்கிய மூலோபாய உட்கட்டமைப்பு திட்டங்கள்",
    },
    allocationShare: {
      si: "ප්‍රාග්ධන ප්‍රතිපාදන බෙදීයාම",
      en: "Capital Allocation Share",
      ta: "மூலதன ஒதுக்கீட்டுப் பங்கீடு",
    },
    allocationSub: {
      si: "නාරංගල්ලේගම ඉඩම (82.3%) • නේවාසිකාගාර (15.0%) • සනීපාරක්ෂාව (2.7%)",
      en: "Narangallegama Land (82.3%) • Housing/Hostels (15.0%) • Sanitation (2.7%)",
      ta: "நாரங்கல்லேகம நிலம் (82.3%) • தங்குமிடம் (15.0%) • சுகாதாரம் (2.7%)",
    },
    donutTab: {
      si: "සහභාගීත්ව අනුපාතය",
      en: "Donut Share",
      ta: "பங்கீட்டு விகிதம்",
    },
    barTab: {
      si: "සිරස් ප්‍රස්ථාරය",
      en: "Cost Bar Chart",
      ta: "செலவு வரைபடம்",
    },
    catLand: {
      si: "ඉඩම් අත්පත් කර ගැනීම",
      en: "Land Acquisition",
      ta: "நிலம் கையகப்படுத்தல்",
    },
    catAccom: {
      si: "නේවාසිකාගාර හා නිල නිවාස",
      en: "Accommodation & Hostels",
      ta: "தங்குமிடம் & விடுதிகள்",
    },
    catSanitation: {
      si: "සනීපාරක්ෂක හා ජල පහසුකම්",
      en: "Sanitation & Hygiene",
      ta: "சுகாதாரம் & நீர் வசதிகள்",
    },
    ofBudget: {
      si: "ප්‍රතිපාදනයෙන්",
      en: "of Budget",
      ta: "நிதி ஒதுக்கீட்டில்",
    },
  };

  // Donut chart items
  const donutData = useMemo(() => {
    return CAPITAL_PROJECTS_DATA.map((p) => {
      const fullLabel = getTrilingual(p.description, locale);
      const shortLabel = fullLabel.length > 28 ? fullLabel.slice(0, 26) + "..." : fullLabel;
      return {
        id: p.id,
        label: shortLabel,
        value: p.amountLkr,
        color: p.color,
        formattedValue: `Rs. ${(p.amountLkr / 1000000).toFixed(2)}M`,
      };
    });
  }, [locale]);

  // Vertical Bar Chart items in Millions
  const verticalBarData: VerticalBarItem[] = useMemo(() => {
    return CAPITAL_PROJECTS_DATA.map((p) => {
      let shortLabel = getTrilingual(p.description, locale);
      if (shortLabel.length > 22) {
        shortLabel = shortLabel.slice(0, 20) + "...";
      }
      return {
        id: p.id,
        label: shortLabel,
        value: Number((p.amountLkr / 1000000).toFixed(2)),
        color: p.color,
        secondaryLabel: `${p.sharePercentage.toFixed(1)}%`,
      };
    });
  }, [locale]);

  // 3 Category Summaries
  const categorySummaries = useMemo(() => [
    {
      id: "land",
      name: labels.catLand[locale],
      amount: 72220094,
      share: 82.32,
      color: "#882637",
      icon: Landmark,
    },
    {
      id: "accommodation",
      name: labels.catAccom[locale],
      amount: 13098774,
      share: 14.93,
      color: "#2563EB",
      icon: Building,
    },
    {
      id: "sanitation",
      name: labels.catSanitation[locale],
      amount: 2412208,
      share: 2.75,
      color: "#059669",
      icon: Bath,
    },
  ], [locale, labels.catLand, labels.catAccom, labels.catSanitation]);

  return (
    <section className="py-8 sm:py-12 border-b border-[#E8E6DD] dark:border-zinc-800 bg-[#FFFDF0]/50 dark:bg-black/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#882637]/10 dark:bg-[#882637]/30 text-[#882637] dark:text-[#F29EAA] text-xs font-black tracking-wide mb-2.5 border border-[#882637]/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{labels.sectionTitle[locale]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
            {labels.title[locale]}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mt-2 font-medium">
            {labels.subtitle[locale]}
          </p>
        </div>

        {/* Total Budget Card Banner (Tilted Neo-Brutalist Sticker Card) */}
        <div className="rounded-[26px] sm:rounded-[30px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-6 sm:p-8 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] rotate-[-1.2deg] transition-all duration-300 hover:rotate-0 hover:-translate-y-1.5 mb-10 cursor-default">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                {labels.totalBudget[locale]}
              </span>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white mt-1 mb-1 tracking-tight leading-none">
                Rs. <CountUpNumber end={TOTAL_CAPITAL_ALLOCATION} duration={1200} />
              </p>
              <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-bold block mt-1">
                {labels.projectsCount[locale]}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-neutral-800 border-2 border-[#882637] text-xs sm:text-sm font-black text-[#882637] dark:text-[#F29EAA] shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] self-start sm:self-auto">
              <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
              <span>{labels.treasuryApproved[locale]}</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN INFRASTRUCTURE SECTION: 2-COLUMN STICKER LAYOUT */}
        {/* Left: Interactive Allocation Chart Box + 3 Summary Cards */}
        {/* Right: 7 High-Priority Capital Project Sticker Cards */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          
          {/* LEFT COLUMN: Donut Chart / Bar Chart + Category Breakdown */}
          <div className="lg:col-span-5 rounded-[26px] sm:rounded-[30px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-6 sm:p-7 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] flex flex-col justify-between">
            <div>
              {/* Header with View Toggle */}
              <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b-2 border-[#882637]/20">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                    {labels.allocationShare[locale]}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium">
                    {labels.allocationSub[locale]}
                  </p>
                </div>

                {/* Switch between Donut and Bar Chart */}
                <div className="inline-flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setChartMode("donut")}
                    aria-label="Show Donut Chart"
                    className={`p-1.5 rounded-lg border-2 transition-all cursor-pointer ${
                      chartMode === "donut"
                        ? "bg-[#882637] text-white border-[#882637] shadow-[2px_2px_0px_0px_#511B25]"
                        : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 hover:border-[#882637]"
                    }`}
                  >
                    <PieChart className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartMode("bars")}
                    aria-label="Show Bar Chart"
                    className={`p-1.5 rounded-lg border-2 transition-all cursor-pointer ${
                      chartMode === "bars"
                        ? "bg-[#882637] text-white border-[#882637] shadow-[2px_2px_0px_0px_#511B25]"
                        : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 hover:border-[#882637]"
                    }`}
                  >
                    <BarChart3 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Chart Canvas */}
              {chartMode === "donut" ? (
                <div className="py-2 flex flex-col items-center">
                  <DonutChart
                    data={donutData}
                    size={280}
                    thickness={48}
                    centerTitle={locale === "si" ? "මුළු අයවැය" : "Total Budget"}
                    centerTotalOverride="Rs. 87.7M"
                    centerSubtitle="LKR 87,731,076"
                    showLegend={true}
                  />
                </div>
              ) : (
                <div className="py-2">
                  <div className="mb-2 text-right">
                    <span className="text-[11px] font-bold text-neutral-500">
                      Values in Million LKR (Rs. M)
                    </span>
                  </div>
                  <VerticalBarChart
                    data={verticalBarData}
                    height={280}
                    barWidthClass="max-w-[42px] sm:max-w-[50px]"
                    valueSuffix="M"
                  />
                </div>
              )}
            </div>

            {/* 3 Pillar Summary Cards Below Chart */}
            <div className="mt-6 pt-5 border-t-2 border-[#882637]/20 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA] block">
                {locale === "si" ? "ප්‍රධාන ක්ෂේත්‍ර ත්‍රිත්වය" : "Core Expenditure Streams"}
              </span>

              {categorySummaries.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="rounded-2xl border-2 border-[#882637] bg-white dark:bg-neutral-800 p-3.5 shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] flex items-center justify-between gap-3 hover:-translate-y-0.5 transition-transform"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                        style={{ backgroundColor: cat.color }}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white block">
                          {cat.name}
                        </span>
                        <span className="text-[11px] font-bold text-neutral-500">
                          {cat.share.toFixed(1)}% {labels.ofBudget[locale]}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white block">
                        Rs. <CountUpNumber end={cat.amount} duration={850} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: 7 High-Priority Capital Project Cards */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                {locale === "si" ? "ව්‍යාපෘති 7 හි සවිස්තර පිරිවැය" : "7 Strategic Capital Project Allocations"}
              </span>
              <span className="text-xs font-bold text-neutral-500">
                100% {labels.treasuryApproved[locale]}
              </span>
            </div>

            {CAPITAL_PROJECTS_DATA.map((proj, idx) => {
              // Alternating subtle tilts
              const tiltClass =
                idx % 2 === 0
                  ? "rotate-[-0.8deg] hover:rotate-0"
                  : "rotate-[0.8deg] hover:rotate-0";

              return (
                <div
                  key={proj.id}
                  className={`rounded-[22px] border-[2.5px] border-[#882637] bg-white dark:bg-neutral-900 p-4 sm:p-5 shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25] transition-all duration-300 hover:-translate-y-1 hover:border-[#882637] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 ${tiltClass}`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: proj.color }}
                      />
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#882637]/10 dark:bg-[#882637]/25 text-[#882637] dark:text-[#F29EAA] border border-[#882637]/20">
                        {proj.category}
                      </span>
                      <span className="text-xs font-black text-neutral-600 dark:text-neutral-400">
                        {proj.sharePercentage.toFixed(1)}% {labels.ofBudget[locale]}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white leading-snug">
                      {getTrilingual(proj.description, locale)}
                    </h4>
                  </div>

                  <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#882637]/15">
                    <span className="text-xs text-neutral-500 font-bold block sm:mb-0.5">
                      {locale === "si" ? "ප්‍රතිපාදනය" : "Allocation"}
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#882637] dark:text-[#F29EAA]">
                      Rs. <CountUpNumber end={proj.amountLkr} duration={900} />
                    </span>
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
