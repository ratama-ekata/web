"use client";

import React, { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { DonutChart } from "./charts/donut-chart";
import { GroupedBarChart } from "./charts/bar-chart";
import {
  PREVENTION_DATA,
  PREVENTION_TOTALS,
  getTrilingual,
} from "./data/rehabilitation-data";
import { BarChart3, PieChart, School, Users, Megaphone, MapPin, CheckCircle2 } from "lucide-react";
import { CountUpNumber } from "./charts/count-up-number";

export function PreventionAwarenessSection() {
  const locale = useLocale() as Locale;
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("pr-1"); // Default Anuradhapura
  const [chartMode, setChartMode] = useState<"single" | "top5" | "all" | "donut">("single");

  const labels = {
    sectionTitle: {
      si: "9. මත්ද්‍රව්‍ය නිවාරණය පිළිබඳ දැනුවත් කිරීමේ වැඩසටහන්",
      en: "9. Drug Prevention & Mass Public Awareness Campaigns",
      ta: "9. போதைப்பொருள் தடுப்பு மற்றும் மக்கள் விழிப்புணர்வு திட்டங்கள்",
    },
    subtitle: {
      si: "අන්තරායකර ඖෂධ පාලක ජාතික මණ්ඩලයේ (NDDCB) සහාය ඇතිව පාසල් සිසුන් සහ ප්‍රජාව දැනුවත් කිරීමේ වැඩසටහන් පවත්වා ඇත. අවශ්‍ය දිස්ත්‍රික්කය තෝරා සිරස් ප්‍රස්ථාර (Vertical Bar Chart) දත්ත පරිශීලනය කරන්න:",
      en: "School and community-level preventative awareness seminars executed in strategic alliance with the National Dangerous Drugs Control Board. Select any district below to load its dedicated vertical bar chart:",
      ta: "அபாயகர ஔடதங்கள் கட்டுப்பாட்டு தேசிய சபையின் ஆதரவுடன் பாடசாலை மாணவர்கள் மற்றும் பொதுமக்களுக்கான விழிப்புணர்வு திட்டங்கள். தேவையான மாவட்டத்தைத் தெரிவுசெய்து செங்குத்து வரைபடத் தரவுகளைப் பார்வையிடவும்:",
    },
    selectDistrict: {
      si: "දිස්ත්‍රික්කය තෝරන්න (දිස්ත්‍රික්ක 15):",
      en: "Select District (All 15 Districts):",
      ta: "மாவட்டத்தைத் தெரிவுசெய்க (15 மாவட்டங்கள்):",
    },
    singleViewTab: {
      si: "තෝරාගත් දිස්ත්‍රික්කය (District Focus)",
      en: "District Focus",
      ta: "தெரிவுசெய்த மாவட்டம்",
    },
    top5ViewTab: {
      si: "ඉහළම දිස්ත්‍රික්ක 5 (Top 5 Districts)",
      en: "Top 5 Districts",
      ta: "முக்கிய 5 மாவட்டங்கள்",
    },
    allViewTab: {
      si: "සියලු දිස්ත්‍රික්ක (All Districts)",
      en: "All Districts",
      ta: "அனைத்து மாவட்டங்கள்",
    },
    donutViewTab: {
      si: "ඩෝනට් ප්‍රස්ථාරය (Donut)",
      en: "Donut Chart",
      ta: "டோனட் வரைபடம்",
    },
    schoolProgs: {
      si: "පාසල් වැඩසටහන්",
      en: "School Programs",
      ta: "பாடசாலை திட்டங்கள்",
    },
    students: {
      si: "සිසුන් සහභාගීත්වය",
      en: "Students Reached",
      ta: "மாணவர் பங்கேற்பு",
    },
    commProgs: {
      si: "ප්‍රජා වැඩසටහන්",
      en: "Community Programs",
      ta: "சமூக திட்டங்கள்",
    },
    commReach: {
      si: "ප්‍රජා සහභාගීත්වය",
      en: "Community Participants",
      ta: "சமூக பங்கேற்பு",
    },
    totalProgs: {
      si: "මුළු වැඩසටහන්",
      en: "Total Programs",
      ta: "மொத்த திட்டங்கள்",
    },
    totalReach: {
      si: "මුළු සහභාගීත්වය",
      en: "Total Reach",
      ta: "மொத்த பங்கேற்பு",
    },
  };

  // Currently selected district
  const currentDistrict = useMemo(() => {
    return PREVENTION_DATA.find((d) => d.id === selectedDistrictId) || PREVENTION_DATA[0];
  }, [selectedDistrictId]);

  // Top 5 Districts by Total Reach
  const top5Districts = useMemo(() => {
    return [...PREVENTION_DATA]
      .sort((a, b) => b.totalReached - a.totalReached)
      .slice(0, 5);
  }, []);

  // Vertical Bar Chart Series
  const verticalSeries = [
    {
      key: "community",
      label: labels.commReach[locale],
      color: "#882637", // Maroon
    },
    {
      key: "students",
      label: labels.students[locale],
      color: "#2563EB", // Blue
    },
  ];

  // Vertical Bar Chart Categories
  const verticalCategories = useMemo(() => {
    if (chartMode === "all") {
      return PREVENTION_DATA.map((d) => ({
        id: d.id,
        categoryLabel: getTrilingual(d.district, locale),
        values: {
          community: d.communityReached,
          students: d.studentsReached,
        },
      }));
    }

    if (chartMode === "top5") {
      return top5Districts.map((d) => ({
        id: d.id,
        categoryLabel: getTrilingual(d.district, locale),
        values: {
          community: d.communityReached,
          students: d.studentsReached,
        },
      }));
    }

    // Single selected district view
    return [
      {
        id: currentDistrict.id,
        categoryLabel: getTrilingual(currentDistrict.district, locale),
        values: {
          community: currentDistrict.communityReached,
          students: currentDistrict.studentsReached,
        },
      },
      {
        id: "top-benchmark",
        categoryLabel: `${getTrilingual(top5Districts[0].district, locale)} (${locale === "si" ? "ඉහළම සහභාගීත්වය" : "Top District"})`,
        values: {
          community: top5Districts[0].communityReached,
          students: top5Districts[0].studentsReached,
        },
      },
      {
        id: "national-avg",
        categoryLabel: locale === "si" ? "දිස්ත්‍රික් සාමාන්‍යය (District Avg)" : "Island District Average",
        values: {
          community: Math.round(PREVENTION_TOTALS.totalCommunityReached / 15),
          students: Math.round(PREVENTION_TOTALS.totalStudentsReached / 15),
        },
      },
    ];
  }, [chartMode, currentDistrict, top5Districts, locale]);

  // Donut Chart: School vs Community Participants
  const donutData = [
    {
      id: "community",
      label: labels.commReach[locale],
      value: PREVENTION_TOTALS.totalCommunityReached,
      color: "#882637",
      formattedValue: PREVENTION_TOTALS.totalCommunityReached.toLocaleString("en-US"),
    },
    {
      id: "students",
      label: labels.students[locale],
      value: PREVENTION_TOTALS.totalStudentsReached,
      color: "#2563EB",
      formattedValue: PREVENTION_TOTALS.totalStudentsReached.toLocaleString("en-US"),
    },
  ];

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
              ? "පාසල් හා ප්‍රජා දැනුවත් කිරීම් 968 ක් (පුරවැසියන් 254,555 ක්)"
              : "968 Programs Reaching 254,555 Citizens Island-wide"}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {labels.subtitle[locale]}
          </p>
        </div>

        {/* 3 Top Metric Cards (Tilted Neo-Brutalist Sticker Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-8 pt-2 pb-2">
          {/* Card 1: School Prevention */}
          <div
            style={{ transform: "rotate(-1.5deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex items-center gap-4 cursor-pointer group"
          >
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
              <School className="h-6 w-6 text-blue-600 dark:text-blue-400 stroke-[2.2]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                School Prevention
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none my-1">
                <CountUpNumber end={PREVENTION_TOTALS.totalSchoolPrograms} suffix=" Sessions" />
              </p>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-bold block">
                <CountUpNumber end={PREVENTION_TOTALS.totalStudentsReached} /> Students Educated
              </span>
            </div>
          </div>

          {/* Card 2: Community Engagement */}
          <div
            style={{ transform: "rotate(1.4deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex items-center gap-4 cursor-pointer group"
          >
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
              <Users className="h-6 w-6 text-[#882637] dark:text-[#F29EAA] stroke-[2.2]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                Community Engagement
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none my-1">
                <CountUpNumber end={PREVENTION_TOTALS.totalCommunityPrograms} suffix=" Seminars" />
              </p>
              <span className="text-xs text-[#882637] dark:text-[#F29EAA] font-bold block">
                <CountUpNumber end={PREVENTION_TOTALS.totalCommunityReached} /> Citizens Reached
              </span>
            </div>
          </div>

          {/* Card 3: Combined Public Reach */}
          <div
            style={{ transform: "rotate(-1.3deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex items-center gap-4 cursor-pointer group"
          >
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
              <Megaphone className="h-6 w-6 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                Combined Public Reach
              </span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight leading-none my-1">
                <CountUpNumber end={PREVENTION_TOTALS.totalReached} />
              </p>
              <span className="text-xs text-[#525252] dark:text-neutral-400 font-medium block">
                Across {PREVENTION_TOTALS.totalPrograms} Total Prevention Programs
              </span>
            </div>
          </div>
        </div>

        {/* NEO-BRUTALIST INTERACTIVE DISTRICT VERTICAL CHART PANEL */}
        <div className="rounded-[26px] sm:rounded-[30px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-6 sm:p-8 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25]">
          {/* Header & Mode Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b-2 border-[#882637]/20 dark:border-neutral-800 mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#882637] dark:text-[#F29EAA] mb-1">
                {chartMode === "donut" ? <PieChart className="h-5 w-5" /> : <BarChart3 className="h-5 w-5" />}
                <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                  {chartMode === "donut"
                    ? locale === "si"
                      ? "සමස්ත සහභාගීත්ව අනුපාතය (ප්‍රජා vs පාසල්)"
                      : "Audience Reach Distribution (Community vs School)"
                    : chartMode === "all"
                    ? locale === "si"
                      ? "දිස්ත්‍රික්ක 15 හි සම්පූර්ණ සහභාගීත්ව සංසන්දනය"
                      : "All 15 Districts Citizen Reach Overview"
                    : chartMode === "top5"
                    ? locale === "si"
                      ? "ඉහළම දිස්ත්‍රික්ක 5 සහභාගීත්ව සංසන්දනය"
                      : "Top 5 Districts Citizen Reach Comparison"
                    : `${getTrilingual(currentDistrict.district, locale)} — ${locale === "si" ? "දැනුවත් කිරීම් සිරස් ප්‍රස්ථාරය" : "Prevention Reach Vertical Bar Chart"}`}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {chartMode === "donut"
                  ? locale === "si"
                    ? "ප්‍රජා වැඩසටහන් (74.5%) සහ පාසල් සිසුන් (25.5%) අතර සහභාගීත්ව බෙදීයාම"
                    : "Community participants (74.5%) vs School students (25.5%)"
                  : locale === "si"
                  ? "ප්‍රජා සහභාගීත්වය (තද රතු) සහ පාසල් සිසුන් (නිල්) සිරස් ස්තම්භ මගින් සංසන්දනය"
                  : "Vertical column comparison of Community Participants (Maroon) vs Students (Blue)"}
              </p>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="inline-flex items-center rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 p-1 shadow-[2px_2px_0px_0px_#882637] self-start lg:self-auto shrink-0 flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setChartMode("single")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  chartMode === "single"
                    ? "bg-[#882637] text-white shadow-xs"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900"
                }`}
              >
                {labels.singleViewTab[locale]}
              </button>
              <button
                type="button"
                onClick={() => setChartMode("top5")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  chartMode === "top5"
                    ? "bg-[#882637] text-white shadow-xs"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900"
                }`}
              >
                {labels.top5ViewTab[locale]}
              </button>
              <button
                type="button"
                onClick={() => setChartMode("all")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  chartMode === "all"
                    ? "bg-[#882637] text-white shadow-xs"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900"
                }`}
              >
                {labels.allViewTab[locale]}
              </button>
              <button
                type="button"
                onClick={() => setChartMode("donut")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  chartMode === "donut"
                    ? "bg-[#882637] text-white shadow-xs"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900"
                }`}
              >
                {labels.donutViewTab[locale]}
              </button>
            </div>
          </div>

          {/* District Selector & Quick Chips (Shown in Single Mode) */}
          {chartMode === "single" && (
            <div className="space-y-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="text-xs font-black text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#882637]" />
                  <span>{labels.selectDistrict[locale]}</span>
                </label>

                {/* Dropdown with all 15 Districts */}
                <div className="relative w-full sm:w-80">
                  <select
                    value={selectedDistrictId}
                    onChange={(e) => setSelectedDistrictId(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 text-xs font-bold rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white cursor-pointer shadow-[2px_2px_0px_0px_#882637] focus:outline-hidden"
                  >
                    {PREVENTION_DATA.map((d) => (
                      <option key={d.id} value={d.id}>
                        {getTrilingual(d.district, locale)} — {d.totalReached.toLocaleString("en-US")} Reached ({d.totalPrograms} Programs)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Select Chips for All 15 Districts */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {PREVENTION_DATA.map((d) => {
                  const isSelected = selectedDistrictId === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDistrictId(d.id)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#882637] text-white border-[#882637] shadow-[2px_2px_0px_0px_#511B25] scale-105"
                          : "bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:border-[#882637]"
                      }`}
                    >
                      {getTrilingual(d.district, locale)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4 White Neo-Brutalist Sticker Cards for the Selected District */}
          {chartMode === "single" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 pt-1 pb-1">
              {/* Card 1: School Programs */}
              <div
                style={{ transform: "rotate(-1.2deg)" }}
                className="p-3.5 sm:p-4 rounded-[18px] bg-white dark:bg-neutral-800 border-2 border-[#882637] shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#882637] transition-all duration-300 cursor-pointer"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA] block truncate">
                  {labels.schoolProgs[locale]}
                </span>
                <p className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 my-0.5 tracking-tight">
                  <CountUpNumber end={currentDistrict.schoolPrograms} />
                </p>
                <span className="text-[10px] text-[#525252] dark:text-neutral-400 font-medium block">
                  {currentDistrict.studentsReached.toLocaleString("en-US")} Students
                </span>
              </div>

              {/* Card 2: Community Programs */}
              <div
                style={{ transform: "rotate(1.2deg)" }}
                className="p-3.5 sm:p-4 rounded-[18px] bg-white dark:bg-neutral-800 border-2 border-[#882637] shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#882637] transition-all duration-300 cursor-pointer"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA] block truncate">
                  {labels.commProgs[locale]}
                </span>
                <p className="text-xl sm:text-2xl font-black text-[#882637] dark:text-[#F29EAA] my-0.5 tracking-tight">
                  <CountUpNumber end={currentDistrict.communityPrograms} />
                </p>
                <span className="text-[10px] text-[#882637] dark:text-[#F29EAA] font-bold block">
                  {currentDistrict.communityReached.toLocaleString("en-US")} Citizens
                </span>
              </div>

              {/* Card 3: Total Programs */}
              <div
                style={{ transform: "rotate(-1deg)" }}
                className="p-3.5 sm:p-4 rounded-[18px] bg-white dark:bg-neutral-800 border-2 border-[#882637] shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#882637] transition-all duration-300 cursor-pointer"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA] block truncate">
                  {labels.totalProgs[locale]}
                </span>
                <p className="text-xl sm:text-2xl font-black text-neutral-800 dark:text-neutral-200 my-0.5 tracking-tight">
                  <CountUpNumber end={currentDistrict.totalPrograms} />
                </p>
                <span className="text-[10px] text-[#525252] dark:text-neutral-400 font-medium block">
                  Prevention Sessions
                </span>
              </div>

              {/* Card 4: Total Reach */}
              <div
                style={{ transform: "rotate(1.4deg)" }}
                className="p-3.5 sm:p-4 rounded-[18px] bg-white dark:bg-neutral-800 border-2 border-[#882637] shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#882637] transition-all duration-300 cursor-pointer"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA] block truncate">
                  {labels.totalReach[locale]}
                </span>
                <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 my-0.5 tracking-tight">
                  <CountUpNumber end={currentDistrict.totalReached} />
                </p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                  Public & Student Total
                </span>
              </div>
            </div>
          )}

          {/* THE CHART: Handles Vertical Single District, Top 5, All Districts, or Donut */}
          {chartMode === "donut" ? (
            <div className="w-full py-6 flex justify-center">
              <DonutChart
                data={donutData}
                size={300}
                thickness={48}
                centerTitle={locale === "si" ? "මුළු සහභාගීත්වය" : "Total Reach"}
                centerTotalOverride="254,555"
                showLegend={true}
              />
            </div>
          ) : chartMode === "all" ? (
            <div className="w-full overflow-x-auto pb-4 pt-2">
              <div className="min-w-[1200px]">
                <GroupedBarChart
                  categories={verticalCategories}
                  series={verticalSeries}
                  height={380}
                  valueSuffix=""
                />
              </div>
            </div>
          ) : (
            <div className="w-full pt-2">
              <GroupedBarChart
                categories={verticalCategories}
                series={verticalSeries}
                height={360}
                valueSuffix=""
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
