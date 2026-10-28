"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Check, TrendingUp, ShieldAlert, FileSpreadsheet, Scale, Flame, X } from "lucide-react";

type MetricType = "suspects" | "raids" | "quantity";

function CountUpNumber({
  end,
  duration = 750,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startVal = 0;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutCubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * (end - startVal) + startVal);
      setCount(current);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

interface DrugStat {
  id: string;
  suspects: number;
  suspectsFormatted: string;
  raids: number;
  raidsFormatted: string;
  quantityKg: number;
  quantityG: number;
  highlight?: boolean;
}

const DRUG_DATA: DrugStat[] = [
  {
    id: "ice",
    suspects: 67762,
    suspectsFormatted: "67,762",
    raids: 67798,
    raidsFormatted: "67,798",
    quantityKg: 2542,
    quantityG: 454,
    highlight: true,
  },
  {
    id: "ganja",
    suspects: 59482,
    suspectsFormatted: "59,482",
    raids: 59660,
    raidsFormatted: "59,660",
    quantityKg: 14434,
    quantityG: 468,
  },
  {
    id: "heroin",
    suspects: 59243,
    suspectsFormatted: "59,243",
    raids: 59286,
    raidsFormatted: "59,286",
    quantityKg: 1482,
    quantityG: 820,
  },
  {
    id: "pills",
    suspects: 2921,
    suspectsFormatted: "2,921",
    raids: 2960,
    raidsFormatted: "2,960",
    quantityKg: 0,
    quantityG: 0,
  },
  {
    id: "hashish",
    suspects: 1444,
    suspectsFormatted: "1,444",
    raids: 1525,
    raidsFormatted: "1,525",
    quantityKg: 582,
    quantityG: 136,
  },
  {
    id: "cocaine",
    suspects: 86,
    suspectsFormatted: "86",
    raids: 91,
    raidsFormatted: "91",
    quantityKg: 32,
    quantityG: 642,
  },
];

const Y_AXIS_TICKS = [
  { label: "70k", value: 70000 },
  { label: "50k", value: 50000 },
  { label: "30k", value: 30000 },
  { label: "10k", value: 10000 },
  { label: "0", value: 0 },
];

export function StatSection() {
  const t = useTranslations("marketing.statistics");
  const [selectedId, setSelectedId] = useState<string>("ice");
  const [metric, setMetric] = useState<MetricType>("suspects");
  const [showTableModal, setShowTableModal] = useState<boolean>(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(true);

  const activeItem =
    DRUG_DATA.find((item) => item.id === selectedId) || DRUG_DATA[0];

  const MAX_SCALE = 70000;

  const getBarHeightPct = (item: DrugStat) => {
    const rawVal =
      metric === "suspects"
        ? item.suspects
        : metric === "raids"
          ? item.raids
          : Math.min(item.quantityKg, MAX_SCALE);

    if (rawVal <= 0) return 18;
    const ratio = rawVal / MAX_SCALE;
    // Substantially taller scaling across the expanded Y-axis (up to 98% height)
    const scaled = 18 + Math.pow(ratio, 0.58) * 80;
    return Math.min(Math.round(scaled), 98);
  };

  // Dynamic floating position for the stat card so it doesn't stay on the same row,
  // and stays safely below and away from the top headline number
  const getTooltipStyle = () => {
    const idx = DRUG_DATA.findIndex((d) => d.id === selectedId);
    const safeIdx = idx >= 0 ? idx : 0;

    // Distinct X and Y positions tailored for each drug so the card floats at different heights and spots
    // ICE sits safely at top: 22px, left: 24% so it never obscures the headline (190,938)
    const positions = [
      { top: "22px", left: "24%", transform: "translateX(-12%)" },  // ICE (placed safely below header and beside ICE bar)
      { top: "45px", left: "28%", transform: "translateX(-18%)" },  // Ganja (stepped down)
      { top: "80px", left: "36%", transform: "translateX(-24%)" },  // Heroin (mid height)
      { top: "130px", left: "46%", transform: "translateX(-32%)" }, // Pills (low bar, floats low)
      { top: "75px", left: "52%", transform: "translateX(-45%)" },  // Hashish (low-mid, stepped right)
      { top: "25px", left: "48%", transform: "translateX(-50%)" },  // Cocaine (low bar, floats upper right)
    ];

    return positions[safeIdx] || positions[0];
  };

  const getMetricHeadline = () => {
    if (metric === "suspects") return "190,938";
    if (metric === "raids") return "191,320";
    return "19,073 Kg";
  };

  const getMetricTitle = () => {
    if (metric === "suspects") return t("metricSuspectsTitle");
    if (metric === "raids") return t("metricRaidsTitle");
    return t("metricQuantityTitle");
  };

  return (
    <section
      id="statistics"
      className="relative w-full bg-[#FFFDF0] dark:bg-[#000000] py-12 sm:py-16 lg:py-20 transition-colors overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#171717] dark:text-white tracking-tight">
              {t("title")}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#882637] dark:text-[#F29EAA] mt-1">
              {t("lead")}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setShowTableModal(!showTableModal)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-[#882637] bg-white dark:bg-neutral-900 text-[#882637] dark:text-[#F29EAA] text-xs font-black shadow-[3px_3px_0px_0px_#882637] hover:shadow-[5px_5px_0px_0px_#882637] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>{showTableModal ? t("viewChart") : t("viewTable")}</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Feature Chart Card + Metric Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT: The Exact Sleek Glowing Dashboard Card */}
          <div className="lg:col-span-8 flex">
            <div className="stat-main-card relative w-full rounded-[28px] sm:rounded-[34px] bg-[#16161A] text-white p-6 sm:p-8 lg:p-9 border-2 border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] overflow-hidden flex flex-col justify-between cursor-default">
              {/* Intense Warm Maroon Radial Glow in Top Left */}
              <div
                className="absolute -top-16 -left-16 w-80 h-80 sm:w-96 sm:h-96 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(136, 38, 55, 0.8), rgba(81, 27, 37, 0.5) 45%, transparent 75%)",
                  filter: "blur(40px)",
                }}
              />

              {/* Secondary Soft Ambient Maroon Glow */}
              <div
                className="absolute top-1/4 -left-10 w-60 h-60 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(136, 38, 55, 0.45), transparent 70%)",
                  filter: "blur(50px)",
                }}
              />

              {/* Card Top Row: Label & Stat on Left, Metric Filter Pills on Right */}
              <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <span className="text-xs sm:text-[14px] font-semibold text-neutral-300 tracking-wide block">
                    {getMetricTitle()}
                  </span>
                  <div className="flex items-baseline gap-2.5 mt-1">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                      {getMetricHeadline()}
                    </span>
                  </div>
                </div>

                {/* Top Right: Pill Metric Selector */}
                <div className="shrink-0">
                  <div className="inline-flex p-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                    <button
                      type="button"
                      onClick={() => setMetric("suspects")}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${metric === "suspects"
                        ? "bg-[#882637] text-white shadow-[0_2px_12px_rgba(136,38,55,0.65)]"
                        : "text-neutral-300 hover:text-white"
                        }`}
                    >
                      {t("tabSuspects")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMetric("raids")}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${metric === "raids"
                        ? "bg-[#882637] text-white shadow-[0_2px_12px_rgba(136,38,55,0.65)]"
                        : "text-neutral-300 hover:text-white"
                        }`}
                    >
                      {t("tabRaids")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMetric("quantity")}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${metric === "quantity"
                        ? "bg-[#882637] text-white shadow-[0_2px_12px_rgba(136,38,55,0.65)]"
                        : "text-neutral-300 hover:text-white"
                        }`}
                    >
                      {t("tabQuantity")}
                    </button>
                  </div>
                </div>
              </div>

              {/* Chart Body: Expanded Y-Axis height with tall bars & dynamic floating stat card */}
              <div className="relative z-10 flex-1 flex flex-col justify-end pt-6 sm:pt-10 min-h-[360px] sm:min-h-[410px]">
                {/* Floating Glassmorphic Tooltip with Count-Up Animation & Maroon Accents */}
                {isTooltipOpen && (
                  <div
                    key={activeItem.id}
                    className="absolute z-30 transition-all duration-500 ease-out pointer-events-auto"
                    style={getTooltipStyle()}
                  >
                    <div className="backdrop-blur-2xl bg-[#16161A]/95 dark:bg-[#16161A]/95 border-2 border-[#882637] shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] rounded-[22px] p-4 sm:p-5 min-w-[250px] sm:min-w-[310px]">
                      {/* Header: Drug Name, Category, Year Badge & Close Button */}
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/15">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg sm:text-xl font-black text-white tracking-tight">
                            {t(`drugs.${activeItem.id}`)}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-neutral-400">
                            ({t(`drugs.${activeItem.id}Sub`)})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-[#882637]/35 text-[#F29EAA] border border-[#882637]/60 px-2.5 py-0.5 rounded-full shadow-xs">
                            {t("yearBadge")}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsTooltipOpen(false);
                            }}
                            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
                            aria-label="Close details"
                            title="Close"
                          >
                            <X className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                      </div>

                      {/* Data Rows with Count-Up Animation */}
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs sm:text-sm font-bold text-neutral-300">
                            {t("labelSuspects")}
                          </span>
                          <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight drop-shadow-sm">
                            <CountUpNumber end={activeItem.suspects} />
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs sm:text-sm font-bold text-neutral-300">
                            {t("labelRaids")}
                          </span>
                          <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight drop-shadow-sm">
                            <CountUpNumber end={activeItem.raids} />
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-white/15">
                          <span className="text-xs sm:text-sm font-bold text-neutral-300">
                            {t("labelQuantity")}
                          </span>
                          <span className="text-sm sm:text-base font-black text-[#F29EAA] font-mono tracking-tight text-right">
                            {activeItem.id === "pills" ? (
                              <CountUpNumber end={3961790} suffix={` ${t("pillsUnit")}`} />
                            ) : (
                              <span>
                                <CountUpNumber end={activeItem.quantityKg} suffix=" Kg " />
                                <CountUpNumber end={activeItem.quantityG} suffix=" g" />
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 1. CHART AREA: Expanded Y-Axis + Guidelines + Bars ONLY */}
                <div className="flex items-end h-[270px] sm:h-[310px] lg:h-[340px] w-full">
                  {/* Y-AXIS Column (Numbers on Left) */}
                  <div className="flex flex-col justify-between h-full pr-3 py-0.5 text-right select-none shrink-0 w-8 sm:w-10 border-r border-white/10">
                    {Y_AXIS_TICKS.map((tick) => (
                      <span
                        key={tick.label}
                        className="text-[10px] sm:text-[11px] font-bold text-neutral-400 tracking-tight leading-none"
                      >
                        {tick.label}
                      </span>
                    ))}
                  </div>

                  {/* Bars Container with Baseline Grid Lines */}
                  <div className="relative flex-1 grid grid-cols-6 gap-2.5 sm:gap-4 md:gap-5 items-end h-full pl-3 sm:pl-5">
                    {/* Horizontal Guideline Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-0.5">
                      <div className="w-full border-b border-dashed border-white/10" />
                      <div className="w-full border-b border-dashed border-white/10" />
                      <div className="w-full border-b border-dashed border-white/10" />
                      <div className="w-full border-b border-dashed border-white/10" />
                      <div className="w-full border-b border-white/25" />
                    </div>

                    {/* Bars Mapping (Bars ONLY) */}
                    {DRUG_DATA.map((item) => {
                      const isSelected = item.id === selectedId;
                      const height = getBarHeightPct(item);

                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (selectedId === item.id) {
                              setIsTooltipOpen(!isTooltipOpen);
                            } else {
                              setSelectedId(item.id);
                              setIsTooltipOpen(true);
                            }
                          }}
                          className="group relative z-10 flex flex-col items-center h-full justify-end cursor-pointer"
                        >
                          {/* Active Glowing Pin / Checkmark Indicator on Selected Bar */}
                          {isSelected && (
                            <div className="absolute -top-5 z-20 flex flex-col items-center">
                              <div className="w-6 h-6 rounded-full bg-white text-[#882637] border-2 border-[#882637] flex items-center justify-center shadow-lg animate-bounce">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                              <div className="w-[1.5px] h-3.5 bg-white/70" />
                            </div>
                          )}

                          {/* The Bar Itself - Reaching tall within chart height */}
                          <div
                            style={{ height: `${height}%` }}
                            className={`w-full rounded-t-[14px] sm:rounded-t-[18px] rounded-b-[4px] transition-all duration-300 ${isSelected
                              ? "bg-gradient-to-t from-[#511B25] via-[#882637] to-[#A83246] shadow-[0_0_24px_rgba(136,38,55,0.75)] scale-[1.04]"
                              : "bg-gradient-to-t from-[#202024] to-[#34343A] hover:from-[#2B2B32] hover:to-[#45454E]"
                              }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. X-AXIS LABELS: Cleanly separated row BELOW the chart baseline */}
                <div className="flex w-full pt-3">
                  {/* Left Spacer exactly matching Y-Axis column width */}
                  <div className="w-8 sm:w-10 shrink-0 pr-3" />

                  {/* 6 columns matching the 6 bars perfectly */}
                  <div className="flex-1 grid grid-cols-6 gap-2.5 sm:gap-4 md:gap-5 pl-3 sm:pl-5 text-center select-none">
                    {DRUG_DATA.map((item) => {
                      const isSelected = item.id === selectedId;

                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (selectedId === item.id) {
                              setIsTooltipOpen(!isTooltipOpen);
                            } else {
                              setSelectedId(item.id);
                              setIsTooltipOpen(true);
                            }
                          }}
                          className="cursor-pointer transition-colors"
                        >
                          <span
                            className={`block text-[11px] sm:text-xs font-black leading-tight transition-colors ${isSelected
                              ? "text-[#F29EAA]"
                              : "text-neutral-400 hover:text-white"
                              }`}
                          >
                            {t(`drugs.${item.id}`)}
                          </span>
                          <span
                            className={`block text-[9px] sm:text-[10px] font-semibold leading-tight mt-0.5 ${isSelected
                              ? "text-[#F29EAA]/80 font-bold"
                              : "text-neutral-500 hover:text-neutral-300"
                              }`}
                          >
                            {t(`drugs.${item.id}Sub`)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Complementary Official Statistics & Raids Highlights */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 h-full">
            {/* Stat Card 1: Total Suspects Arrested */}
            <div className="stat-card-item stat-card-item-1 flex-1 p-5 sm:p-6 lg:p-7 rounded-[26px] bg-[#FFFBEB] dark:bg-[#16161A] border-2 border-[#882637] shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] flex items-center gap-4 sm:gap-5 cursor-default">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-[#882637] text-white flex items-center justify-center shrink-0 shadow-md">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#171717] dark:text-white tracking-tight leading-none">
                  {t("card1Number")}
                </div>
                <div className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#882637] dark:text-[#F29EAA]">
                  {t("card1Title")}
                </div>
                <p className="text-xs sm:text-[13px] text-[#525252] dark:text-neutral-400 leading-snug">
                  {t("card1Desc")}
                </p>
              </div>
            </div>

            {/* Stat Card 2: Total Raids Conducted */}
            <div className="stat-card-item stat-card-item-2 flex-1 p-5 sm:p-6 lg:p-7 rounded-[26px] bg-[#FFFBEB] dark:bg-[#16161A] border-2 border-[#882637] shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] flex items-center gap-4 sm:gap-5 cursor-default">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-[#EA580C] text-white flex items-center justify-center shrink-0 shadow-md">
                <Flame className="h-6 w-6" />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#171717] dark:text-white tracking-tight leading-none">
                  {t("card2Number")}
                </div>
                <div className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#EA580C]">
                  {t("card2Title")}
                </div>
                <p className="text-xs sm:text-[13px] text-[#525252] dark:text-neutral-400 leading-snug">
                  {t("card2Desc")}
                </p>
              </div>
            </div>

            {/* Stat Card 3: Seized Narcotic Pills & Ice Mass */}
            <div className="stat-card-item stat-card-item-3 flex-1 p-5 sm:p-6 lg:p-7 rounded-[26px] bg-[#FFFBEB] dark:bg-[#16161A] border-2 border-[#882637] shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] flex items-center gap-4 sm:gap-5 cursor-default">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-[#171717] dark:bg-white text-white dark:text-[#171717] flex items-center justify-center shrink-0 shadow-md">
                <Scale className="h-6 w-6" />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#171717] dark:text-white tracking-tight leading-none">
                  {t("card3Number")}
                </div>
                <div className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#171717] dark:text-white">
                  {t("card3Title")}
                </div>
                <p className="text-xs sm:text-[13px] text-[#525252] dark:text-neutral-400 leading-snug">
                  {t("card3Desc")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Official Data Table View (Localized for en, si, ta) */}
        {showTableModal && (
          <div className="mt-8 rounded-[24px] border-2 border-[#882637] bg-white dark:bg-neutral-900 shadow-[6px_6px_0px_0px_#882637] overflow-hidden animate-in fade-in duration-300">
            <div className="bg-[#882637] text-white p-4 sm:p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  {t("tableTitle")}
                </h3>
                <p className="text-xs text-white/80 mt-0.5">
                  {t("tableSub")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTableModal(false)}
                className="text-white hover:bg-white/20 px-3 py-1 rounded-lg text-xs font-bold cursor-pointer"
              >
                ✕ {t("tableClose")}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#EFE5D8] dark:bg-neutral-800 text-[#171717] dark:text-neutral-200 border-b border-[#882637]/30 font-black">
                    <th className="py-3 px-4 border-r border-[#882637]/20">{t("thDrug")}</th>
                    <th className="py-3 px-4 text-center border-r border-[#882637]/20" colSpan={2}>
                      {t("thQuantity")}
                    </th>
                    <th className="py-3 px-4 text-right border-r border-[#882637]/20">{t("thRaids")}</th>
                    <th className="py-3 px-4 text-right">{t("thSuspects")}</th>
                  </tr>
                  <tr className="bg-[#F8EFE5] dark:bg-neutral-850 text-[#525252] dark:text-neutral-400 font-bold border-b border-[#882637]/20 text-[11px]">
                    <th className="py-2 px-4 border-r border-[#882637]/20"></th>
                    <th className="py-2 px-4 text-center border-r border-[#882637]/20">Kg</th>
                    <th className="py-2 px-4 text-center border-r border-[#882637]/20">g</th>
                    <th className="py-2 px-4 border-r border-[#882637]/20"></th>
                    <th className="py-2 px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#882637]/15 dark:divide-neutral-800">
                  <tr className="hover:bg-[#FFFBEB] dark:hover:bg-neutral-800/60 font-semibold">
                    <td className="py-3 px-4 font-black text-[#171717] dark:text-white border-r border-[#882637]/20">
                      {t("drugs.heroin")} ({t("drugs.heroinSub")})
                    </td>
                    <td className="py-3 px-4 text-center border-r border-[#882637]/20 font-mono font-bold">1482</td>
                    <td className="py-3 px-4 text-center border-r border-[#882637]/20 font-mono font-bold">820</td>
                    <td className="py-3 px-4 text-right border-r border-[#882637]/20 font-mono font-bold">59,286</td>
                    <td className="py-3 px-4 text-right font-mono font-black text-[#882637] dark:text-[#F29EAA]">59,243</td>
                  </tr>
                  <tr className="hover:bg-[#FFFBEB] dark:hover:bg-neutral-800/60 font-semibold">
                    <td className="py-3 px-4 font-black text-[#171717] dark:text-white border-r border-[#882637]/20">
                      {t("drugs.ganja")} ({t("drugs.ganjaSub")})
                    </td>
                    <td className="py-3 px-4 text-center border-r border-[#882637]/20 font-mono font-bold">14434</td>
                    <td className="py-3 px-4 text-center border-r border-[#882637]/20 font-mono font-bold">468</td>
                    <td className="py-3 px-4 text-right border-r border-[#882637]/20 font-mono font-bold">59,660</td>
                    <td className="py-3 px-4 text-right font-mono font-black text-[#882637] dark:text-[#F29EAA]">59,482</td>
                  </tr>
                  <tr className="hover:bg-[#FFFBEB] dark:hover:bg-neutral-800/60 font-semibold">
                    <td className="py-3 px-4 font-black text-[#171717] dark:text-white border-r border-[#882637]/20">
                      {t("drugs.cocaine")} ({t("drugs.cocaineSub")})
                    </td>
                    <td className="py-3 px-4 text-center border-r border-[#882637]/20 font-mono font-bold">32</td>
                    <td className="py-3 px-4 text-center border-r border-[#882637]/20 font-mono font-bold">642</td>
                    <td className="py-3 px-4 text-right border-r border-[#882637]/20 font-mono font-bold">91</td>
                    <td className="py-3 px-4 text-right font-mono font-black text-[#882637] dark:text-[#F29EAA]">86</td>
                  </tr>
                  <tr className="hover:bg-[#FFFBEB] dark:hover:bg-neutral-800/60 font-semibold">
                    <td className="py-3 px-4 font-black text-[#171717] dark:text-white border-r border-[#882637]/20">
                      {t("drugs.hashish")} ({t("drugs.hashishSub")})
                    </td>
                    <td className="py-3 px-4 text-center border-r border-[#882637]/20 font-mono font-bold">582</td>
                    <td className="py-3 px-4 text-center border-r border-[#882637]/20 font-mono font-bold">136</td>
                    <td className="py-3 px-4 text-right border-r border-[#882637]/20 font-mono font-bold">1,525</td>
                    <td className="py-3 px-4 text-right font-mono font-black text-[#882637] dark:text-[#F29EAA]">1,444</td>
                  </tr>
                  <tr className="hover:bg-[#FFFBEB] dark:hover:bg-neutral-800/60 font-semibold bg-[#FEF3C7]/40 dark:bg-orange-950/20">
                    <td className="py-3 px-4 font-black text-[#882637] dark:text-[#F29EAA] border-r border-[#882637]/20">
                      {t("drugs.ice")} ({t("drugs.iceSub")})
                    </td>
                    <td className="py-3 px-4 text-center border-r border-[#882637]/20 font-mono font-bold">2542</td>
                    <td className="py-3 px-4 text-center border-r border-[#882637]/20 font-mono font-bold">454</td>
                    <td className="py-3 px-4 text-right border-r border-[#882637]/20 font-mono font-bold">67,798</td>
                    <td className="py-3 px-4 text-right font-mono font-black text-[#EA580C]">67,762</td>
                  </tr>
                  <tr className="hover:bg-[#FFFBEB] dark:hover:bg-neutral-800/60 font-semibold">
                    <td className="py-3 px-4 font-black text-[#171717] dark:text-white border-r border-[#882637]/20">
                      {t("drugs.pills")} ({t("drugs.pillsSub")})
                    </td>
                    <td className="py-3 px-4 text-center border-r border-[#882637]/20 font-mono font-bold" colSpan={2}>
                      3,961,790 ({t("pillsUnit")})
                    </td>
                    <td className="py-3 px-4 text-right border-r border-[#882637]/20 font-mono font-bold">2,960</td>
                    <td className="py-3 px-4 text-right font-mono font-black text-[#882637] dark:text-[#F29EAA]">2,921</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-[#FFFDF0] dark:bg-neutral-800 font-black border-t-2 border-[#882637]">
                    <td className="py-3 px-4 border-r border-[#882637]/20 uppercase">{t("thTotal")}</td>
                    <td className="py-3 px-4 text-center border-r border-[#882637]/20 font-mono" colSpan={2}>
                      {t("totalQuantityText")}
                    </td>
                    <td className="py-3 px-4 text-right border-r border-[#882637]/20 font-mono text-[#882637] dark:text-[#F29EAA]">
                      191,320
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[#EA580C]">
                      190,938
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
