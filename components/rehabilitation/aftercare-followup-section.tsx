"use client";

import React, { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { GroupedBarChart } from "./charts/bar-chart";
import {
  AFTERCARE_DATA,
  AFTERCARE_TOTALS,
  TrilingualText,
  getTrilingual,
} from "./data/rehabilitation-data";
import {
  BarChart3,
  Table2,
  CheckCircle2,
  Home,
  Users,
  MapPin,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { CountUpNumber } from "./charts/count-up-number";

interface OfficeGroup {
  id: string;
  name: TrilingualText;
  items: typeof AFTERCARE_DATA;
  totalReintegrated: number;
  totalFollowedUp: number;
  retentionRate: number;
}

export function AftercareFollowupSection() {
  const locale = useLocale() as Locale;
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("af-7"); // Default Gampaha
  const [chartMode, setChartMode] = useState<"single" | "top5" | "all26">("single");

  const labels = {
    sectionTitle: {
      si: "8. පශ්චාත් පුනරුත්ථාපන සහ පසු විපරම් ක්‍රියාවලිය",
      en: "8. Post-Rehabilitation Field Tracking & Aftercare Monitoring",
      ta: "8. புனர்வாழ்வுக்குப் பிந்தைய பின்தொடர் மற்றும் சமூகக் கண்காணிப்பு",
    },
    subtitle: {
      si: "දිස්ත්‍රික් කාර්යාල 15 ක් හරහා දිස්ත්‍රික්ක 26 ම ආවරණය වන පරිදි පුනරුත්ථාපන ලාභීන්ගේ නිවෙස් වෙත ගොස් පසු විපරම් හා උපදේශන ක්‍රියාවලිය සිදු කරනු ලබයි. අවශ්‍ය දිස්ත්‍රික්කය තෝරා ප්‍රස්ථාර දත්ත පරිශීලනය කරන්න:",
      en: "Regular in-person home tracking, surveillance, and family counseling conducted across 15 District Coordination Offices spanning all 26 administrative districts. Select any district below to load its dedicated chart:",
      ta: "15 மாவட்ட ஒருங்கிணைப்பு அலுவலகங்கள் ஊடாக 26 பிராந்தியங்களிலும் பயனாளிகளின் வீடுகளுக்குச் சென்று பின்தொடர் நடவடிக்கைகள் முன்னெடுக்கப்படுகின்றன. தேவையான மாவட்டத்தைத் தெரிவுசெய்து வரைபடத் தரவுகளைப் பார்வையிடவும்:",
    },
    selectDistrict: {
      si: "දිස්ත්‍රික්කය තෝරන්න (දිස්ත්‍රික්ක 26):",
      en: "Select District (All 26 Districts):",
      ta: "மாவட்டத்தைத் தெரிவுசெய்க (அனைத்து 26 மாவட்டங்கள்):",
    },
    singleViewTab: {
      si: "තෝරාගත් දිස්ත්‍රික්කය (District Focus)",
      en: "Selected District Focus",
      ta: "தெரிவுசெய்த மாவட்டம்",
    },
    top5ViewTab: {
      si: "ඉහළම දිස්ත්‍රික්ක 5 (Top 5 Districts)",
      en: "Top 5 Districts",
      ta: "முக்கிய 5 மாவட்டங்கள்",
    },
    all26ViewTab: {
      si: "සියලු දිස්ත්‍රික්ක 26 (All 26 Districts)",
      en: "All 26 Districts",
      ta: "அனைத்து 26 மாவட்டங்கள்",
    },
    reintegratedCol: {
      si: "සමාජගත කළ සංඛ්‍යාව",
      en: "Reintegrated",
      ta: "சமூகமயப்படுத்தப்பட்டோர்",
    },
    followedUpCol: {
      si: "පසු විපරම් කළ සංඛ්‍යාව",
      en: "Followed Up",
      ta: "பின்தொடரப்பட்டோர்",
    },
    unreachedCol: {
      si: "සම්බන්ධ නොවූ සංඛ්‍යාව",
      en: "Unreached / Inactive",
      ta: "தொடர்பு கொள்ளப்படாதோர்",
    },
    retentionRateCol: {
      si: "පසු විපරම් සාර්ථකත්වය",
      en: "Retention Rate",
      ta: "பின்தொடர் வெற்றி வீதம்",
    },
    officeTotalLabel: {
      si: "කාර්යාලයේ මුළු එකතුව",
      en: "Office Aggregate Total",
      ta: "அலுவலகத்தின் மொத்த எண்ணிக்கை",
    },
    coordinatingOfficeTag: {
      si: "සම්බන්ධීකරණ කාර්යාලය:",
      en: "Coordinating Office:",
      ta: "ஒருங்கிணைப்பு அலுவலகம்:",
    },
  };

  // Currently selected district item
  const currentDistrict = useMemo(() => {
    return AFTERCARE_DATA.find((d) => d.id === selectedDistrictId) || AFTERCARE_DATA[0];
  }, [selectedDistrictId]);

  // Sibling districts under same coordinating office
  const siblingDistricts = useMemo(() => {
    return AFTERCARE_DATA.filter(
      (d) => d.coordinatingOffice.en === currentDistrict.coordinatingOffice.en
    );
  }, [currentDistrict]);

  // Top 5 Districts by Reintegrated count
  const top5Districts = useMemo(() => {
    return [...AFTERCARE_DATA]
      .sort((a, b) => b.reintegrated - a.reintegrated)
      .slice(0, 5);
  }, []);

  // Build categories for GroupedBarChart
  const verticalChartCategories = useMemo(() => {
    if (chartMode === "all26") {
      return AFTERCARE_DATA.map((d) => ({
        id: d.id,
        categoryLabel: getTrilingual(d.district, locale),
        values: {
          reintegrated: d.reintegrated,
          followedUp: d.followedUp,
        },
      }));
    }

    if (chartMode === "top5") {
      return top5Districts.map((d) => ({
        id: d.id,
        categoryLabel: getTrilingual(d.district, locale),
        values: {
          reintegrated: d.reintegrated,
          followedUp: d.followedUp,
        },
      }));
    }

    // Single selected district view
    if (siblingDistricts.length > 1) {
      const cats = siblingDistricts.map((sub) => ({
        id: sub.id,
        categoryLabel: getTrilingual(sub.district, locale),
        values: {
          reintegrated: sub.reintegrated,
          followedUp: sub.followedUp,
        },
      }));

      // Append Office Total category
      const officeReint = siblingDistricts.reduce((sum, s) => sum + s.reintegrated, 0);
      const officeFollow = siblingDistricts.reduce((sum, s) => sum + s.followedUp, 0);
      cats.push({
        id: `office-total-${currentDistrict.coordinatingOffice.en}`,
        categoryLabel: `${getTrilingual(currentDistrict.coordinatingOffice, locale)} (${labels.officeTotalLabel[locale]})`,
        values: {
          reintegrated: officeReint,
          followedUp: officeFollow,
        },
      });

      return cats;
    }

    // Single district office
    return [
      {
        id: currentDistrict.id,
        categoryLabel: getTrilingual(currentDistrict.district, locale),
        values: {
          reintegrated: currentDistrict.reintegrated,
          followedUp: currentDistrict.followedUp,
        },
      },
      {
        id: "national-benchmark",
        categoryLabel: locale === "si" ? "ජාතික සාමාන්‍යය (Nat. Benchmark)" : "National Benchmark",
        values: {
          reintegrated: 724, // 10,859 / 15
          followedUp: 685,   // 10,279 / 15
        },
      },
    ];
  }, [chartMode, currentDistrict, siblingDistricts, top5Districts, labels.officeTotalLabel, locale]);

  const verticalSeries = [
    {
      key: "reintegrated",
      label: labels.reintegratedCol[locale],
      color: "#882637", // Maroon
    },
    {
      key: "followedUp",
      label: labels.followedUpCol[locale],
      color: "#059669", // Emerald Green
    },
  ];

  const unreachedCount = Math.max(
    currentDistrict.reintegrated - currentDistrict.followedUp,
    0
  );
  const diffFromNational = Number(
    (currentDistrict.followUpRate - AFTERCARE_TOTALS.nationalRetentionRate).toFixed(1)
  );

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
              ? "දිස්ත්‍රික් මට්ටමේ පසු විපරම් හා අධීක්ෂණ දත්ත"
              : "District-by-District Aftercare & Field Tracking"}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {labels.subtitle[locale]}
          </p>
        </div>

        {/* 3 Top Metric Cards (Tilted Neo-Brutalist Sticker Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-8 pt-2 pb-2">
          {/* Card 1: Reintegrated */}
          <div
            style={{ transform: "rotate(-1.5deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <Users className="h-5 w-5 text-[#882637] dark:text-[#F29EAA] stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                  {labels.reintegratedCol[locale]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none my-1">
                <CountUpNumber end={AFTERCARE_TOTALS.totalReintegrated} />
              </p>
              <span className="text-xs text-[#525252] dark:text-neutral-400 font-medium block">
                100% Tracking Coverage
              </span>
            </div>
          </div>

          {/* Card 2: Followed Up */}
          <div
            style={{ transform: "rotate(1.4deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <Home className="h-5 w-5 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                  {labels.followedUpCol[locale]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight leading-none my-1">
                <CountUpNumber end={AFTERCARE_TOTALS.totalFollowedUp} />
              </p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block">
                In-Person Home Follow-ups
              </span>
            </div>
          </div>

          {/* Card 3: National Retention */}
          <div
            style={{ transform: "rotate(-1.3deg)" }}
            className="rounded-[22px] p-4 sm:p-5 bg-[#FFFBEB] dark:bg-neutral-900 border-[2.5px] border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#882637] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#882637] group-hover:scale-105 transition-transform">
                <CheckCircle2 className="h-5 w-5 text-sky-600 dark:text-sky-400 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                  National Retention
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white tracking-tight leading-none my-1">
                <CountUpNumber end={AFTERCARE_TOTALS.nationalRetentionRate} decimals={1} suffix="%" />
              </p>
              <span className="text-xs text-[#525252] dark:text-neutral-400 font-medium block">
                Only 580 unreachable nationwide
              </span>
            </div>
          </div>
        </div>

        {/* NEO-BRUTALIST INTERACTIVE DISTRICT CHART PANEL */}
        <div className="rounded-[26px] sm:rounded-[30px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 p-6 sm:p-8 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25]">
          {/* Header & Mode Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b-2 border-[#882637]/20 dark:border-neutral-800 mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#882637] dark:text-[#F29EAA] mb-1">
                <BarChart3 className="h-5 w-5" />
                <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                  {chartMode === "all26"
                    ? locale === "si"
                      ? "දිස්ත්‍රික්ක 26 හි සම්පූර්ණ පසු විපරම් සංසන්දනාත්මක ප්‍රස්ථාරය"
                      : "All 26 Districts Comparative Aftercare Overview"
                    : chartMode === "top5"
                    ? locale === "si"
                      ? "ඉහළම දිස්ත්‍රික්ක 5 සංසන්දනාත්මක ස්තම්භ ප්‍රස්ථාරය"
                      : "Top 5 Districts Comparative Bar Chart"
                    : `${getTrilingual(currentDistrict.district, locale)} — ${locale === "si" ? "පසු විපරම් ස්තම්භ ප්‍රස්ථාරය" : "Aftercare Vertical Bar Chart"}`}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {chartMode === "all26"
                  ? locale === "si"
                    ? "දිස්ත්‍රික්ක 26 ම එකවර සංසන්දනය කිරීම සඳහා ප්‍රස්ථාරය තිරස්ව scroll කරන්න"
                    : "Scroll horizontally to view all 26 administrative districts side-by-side"
                  : locale === "si"
                  ? "සමාජගත කළ ප්‍රමාණය (තද රතු) සහ පසු විපරම් කළ ප්‍රමාණය (කොළ පැහැති) සංසන්දනය"
                  : "Side-by-side comparison of Reintegrated (Maroon) vs Followed Up (Green)"}
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
                onClick={() => setChartMode("all26")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  chartMode === "all26"
                    ? "bg-[#882637] text-white shadow-xs"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900"
                }`}
              >
                {labels.all26ViewTab[locale]}
              </button>
            </div>
          </div>

          {/* District Selector & Quick Chips (All 26 Districts) */}
          {chartMode === "single" && (
            <div className="space-y-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="text-xs font-black text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#882637]" />
                  <span>{labels.selectDistrict[locale]}</span>
                </label>

                {/* Dropdown with all 26 Districts */}
                <div className="relative w-full sm:w-80">
                  <select
                    value={selectedDistrictId}
                    onChange={(e) => setSelectedDistrictId(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 text-xs font-bold rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white cursor-pointer shadow-[2px_2px_0px_0px_#882637] focus:outline-hidden"
                  >
                    {AFTERCARE_DATA.map((d) => (
                      <option key={d.id} value={d.id}>
                        {getTrilingual(d.district, locale)}
                        {d.district.en !== d.coordinatingOffice.en
                          ? ` (${getTrilingual(d.coordinatingOffice, locale)})`
                          : ""} — {d.reintegrated.toLocaleString("en-US")} ({d.followUpRate}%)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Select Chips for All 26 Districts */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 max-h-36 overflow-y-auto pr-1">
                {AFTERCARE_DATA.map((d) => {
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
              {/* Card 1: Reintegrated */}
              <div
                style={{ transform: "rotate(-1.2deg)" }}
                className="p-3.5 sm:p-4 rounded-[18px] bg-white dark:bg-neutral-800 border-2 border-[#882637] shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#882637] transition-all duration-300 cursor-pointer"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA] block truncate">
                  {labels.reintegratedCol[locale]}
                </span>
                <p className="text-xl sm:text-2xl font-black text-[#882637] dark:text-[#F29EAA] my-0.5 tracking-tight">
                  <CountUpNumber end={currentDistrict.reintegrated} />
                </p>
                <span className="text-[10px] text-[#525252] dark:text-neutral-400 font-medium block truncate">
                  {labels.coordinatingOfficeTag[locale]} {getTrilingual(currentDistrict.coordinatingOffice, locale)}
                </span>
              </div>

              {/* Card 2: Followed Up */}
              <div
                style={{ transform: "rotate(1.2deg)" }}
                className="p-3.5 sm:p-4 rounded-[18px] bg-white dark:bg-neutral-800 border-2 border-[#882637] shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#882637] transition-all duration-300 cursor-pointer"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA] block truncate">
                  {labels.followedUpCol[locale]}
                </span>
                <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 my-0.5 tracking-tight">
                  <CountUpNumber end={currentDistrict.followedUp} />
                </p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                  Verified In-Person
                </span>
              </div>

              {/* Card 3: Unreached */}
              <div
                style={{ transform: "rotate(-1deg)" }}
                className="p-3.5 sm:p-4 rounded-[18px] bg-white dark:bg-neutral-800 border-2 border-[#882637] shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#882637] transition-all duration-300 cursor-pointer"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA] block truncate">
                  {labels.unreachedCol[locale]}
                </span>
                <p className="text-xl sm:text-2xl font-black text-neutral-800 dark:text-neutral-200 my-0.5 tracking-tight">
                  <CountUpNumber end={unreachedCount} />
                </p>
                <span className="text-[10px] text-[#525252] dark:text-neutral-400 font-medium block">
                  Inactive or relocated
                </span>
              </div>

              {/* Card 4: Retention */}
              <div
                style={{ transform: "rotate(1.4deg)" }}
                className="p-3.5 sm:p-4 rounded-[18px] bg-white dark:bg-neutral-800 border-2 border-[#882637] shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25] hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#882637] transition-all duration-300 cursor-pointer"
              >
                <span className="text-[10px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA] block truncate">
                  {labels.retentionRateCol[locale]}
                </span>
                <div className="flex items-center gap-1.5 my-0.5">
                  <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                    <CountUpNumber end={currentDistrict.followUpRate} decimals={1} suffix="%" />
                  </p>
                  <span
                    className={`text-[9.5px] font-black px-1.5 py-0.5 rounded-md ${
                      diffFromNational >= 0
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
                    }`}
                  >
                    {diffFromNational >= 0 ? `+${diffFromNational}%` : `${diffFromNational}%`}
                  </span>
                </div>
                <span className="text-[10px] text-[#525252] dark:text-neutral-400 font-medium block">
                  vs 94.7% national avg
                </span>
              </div>
            </div>
          )}

          {/* THE CHART: Handles Single, Top 5, and All 26 Districts */}
          {chartMode === "all26" ? (
            <div className="w-full overflow-x-auto pb-4 pt-2">
              <div className="min-w-[1500px]">
                <GroupedBarChart
                  categories={verticalChartCategories}
                  series={verticalSeries}
                  height={380}
                  valueSuffix=""
                />
              </div>
            </div>
          ) : (
            <div className="w-full pt-2">
              <GroupedBarChart
                categories={verticalChartCategories}
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
