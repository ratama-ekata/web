"use client";

import React, { useState } from "react";

// ==========================================
// 1. VERTICAL BAR CHART (Single Series)
// ==========================================
export interface VerticalBarItem {
  id: string;
  label: string;
  value: number;
  secondaryLabel?: string;
  color?: string;
  highlight?: boolean;
}

export interface VerticalBarChartProps {
  data: VerticalBarItem[];
  height?: number;
  barColor?: string;
  highlightColor?: string;
  valueSuffix?: string;
  className?: string;
  barWidthClass?: string;
}

export function VerticalBarChart({
  data,
  height = 260,
  barColor = "#882637",
  highlightColor = "#D97706",
  valueSuffix = "",
  className = "",
  barWidthClass = "",
}: VerticalBarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const getWidthClass = () => {
    if (barWidthClass) return barWidthClass;
    if (data.length <= 4) return "max-w-[80px] sm:max-w-[110px] md:max-w-[140px]";
    if (data.length <= 6) return "max-w-[65px] sm:max-w-[90px] md:max-w-[115px]";
    if (data.length <= 8) return "max-w-[55px] sm:max-w-[75px] md:max-w-[95px]";
    if (data.length <= 12) return "max-w-[46px] sm:max-w-[60px] md:max-w-[76px] lg:max-w-[84px]";
    return "max-w-[36px] sm:max-w-[48px] md:max-w-[60px]";
  };

  return (
    <div className={`w-full select-none ${className}`}>
      {/* Chart Canvas */}
      <div
        className="relative w-full flex items-end gap-2 sm:gap-4 md:gap-6 pt-10 pb-2 border-b-2 border-neutral-300 dark:border-neutral-700"
        style={{ height: `${height}px` }}
      >
        {/* Horizontal gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 dark:opacity-30">
          <div className="border-b border-dashed border-neutral-500 w-full" />
          <div className="border-b border-dashed border-neutral-500 w-full" />
          <div className="border-b border-dashed border-neutral-500 w-full" />
          <div className="w-full" />
        </div>

        {/* Bars */}
        {data.map((item, idx) => {
          const heightPercent = Math.max(Math.round((item.value / maxValue) * 100), 4);
          const isHovered = hoveredIndex === idx;
          const isHighlight = item.highlight;
          const currentColor = isHighlight
            ? highlightColor
            : item.color || barColor;

          return (
            <div
              key={item.id}
              className="relative flex-1 h-full flex flex-col justify-end items-center group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip on hover */}
              {isHovered && (
                <div className="absolute -top-11 z-20 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap animate-fadeIn pointer-events-none">
                  {item.value.toLocaleString("en-US")} {valueSuffix}
                </div>
              )}

              {/* Value Label above Bar */}
              <span
                className={`text-xs sm:text-sm font-black mb-1.5 transition-colors ${
                  isHovered || isHighlight
                    ? "text-[#882637] dark:text-[#FBBF24]"
                    : "text-neutral-700 dark:text-neutral-300"
                }`}
              >
                {item.value.toLocaleString("en-US")}
              </span>

              {/* Bar Fill with Increased Width */}
              <div
                className={`w-full ${getWidthClass()} rounded-t-[10px] sm:rounded-t-[14px] transition-all duration-300 group-hover:brightness-110 shadow-xs`}
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: currentColor,
                  opacity: hoveredIndex !== null && !isHovered ? 0.55 : 1,
                  transform: isHovered ? "scaleY(1.025)" : "scaleY(1)",
                  transformOrigin: "bottom",
                  boxShadow: isHovered
                    ? `0 -4px 14px ${currentColor}66`
                    : "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* X-Axis Labels */}
      <div className="w-full flex justify-between gap-1 sm:gap-2 pt-3">
        {data.map((item, idx) => (
          <div
            key={item.id}
            className="flex-1 text-center min-w-0 px-0.5"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span
              className={`block text-[11px] sm:text-xs md:text-[13px] font-bold line-clamp-2 leading-tight break-words transition-colors ${
                hoveredIndex === idx
                  ? "text-[#882637] dark:text-[#F29EAA]"
                  : "text-neutral-700 dark:text-neutral-300"
              }`}
              title={item.label}
            >
              {item.label}
            </span>
            {item.secondaryLabel && (
              <span className="hidden sm:block text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold mt-0.5">
                {item.secondaryLabel}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 2. GROUPED BAR CHART (Multi-Series)
// ==========================================
export interface GroupedBarSeries {
  key: string;
  label: string;
  color: string;
}

export interface GroupedBarItem {
  id: string;
  categoryLabel: string;
  values: Record<string, number>;
}

export interface GroupedBarChartProps {
  categories: GroupedBarItem[];
  series: GroupedBarSeries[];
  height?: number;
  className?: string;
  valueSuffix?: string;
  barWidthClass?: string;
}

export function GroupedBarChart({
  categories,
  series,
  height = 300,
  className = "",
  valueSuffix = "",
  barWidthClass = "",
}: GroupedBarChartProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // Maximum value across all bars
  let maxValue = 1;
  categories.forEach((cat) => {
    series.forEach((s) => {
      if ((cat.values[s.key] || 0) > maxValue) {
        maxValue = cat.values[s.key];
      }
    });
  });

  const getBarWidthClass = () => {
    if (barWidthClass) return barWidthClass;
    if (categories.length <= 2) {
      return "max-w-[75px] sm:max-w-[110px] md:max-w-[140px] lg:max-w-[160px]";
    }
    if (categories.length <= 3) {
      return "max-w-[65px] sm:max-w-[95px] md:max-w-[120px] lg:max-w-[135px]";
    }
    if (categories.length <= 5) {
      return "max-w-[50px] sm:max-w-[75px] md:max-w-[95px] lg:max-w-[105px]";
    }
    return "max-w-[38px] sm:max-w-[55px] md:max-w-[70px]";
  };

  return (
    <div className={`w-full select-none ${className}`}>
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-5 mb-5 text-xs font-bold">
        {series.map((s) => (
          <div key={s.key} className="inline-flex items-center gap-2">
            <span
              className="h-3.5 w-3.5 rounded-sm shadow-xs"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-neutral-800 dark:text-neutral-200">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Responsive Horizontal Scroll Wrapper for Mobile Screen Safety */}
      <div className="w-full overflow-x-auto pb-2 pt-1">
        <div className="min-w-[500px] sm:min-w-0 w-full">
          {/* Chart Canvas */}
          <div
            className="relative w-full flex items-end gap-3 sm:gap-6 md:gap-10 pt-10 pb-2 border-b-2 border-neutral-300 dark:border-neutral-700"
            style={{ height: `${height}px` }}
          >
            {/* Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 dark:opacity-30">
              <div className="border-b border-dashed border-neutral-500 w-full" />
              <div className="border-b border-dashed border-neutral-500 w-full" />
              <div className="border-b border-dashed border-neutral-500 w-full" />
              <div className="w-full" />
            </div>

            {/* Category Clusters */}
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex-1 h-full flex items-end justify-center gap-1.5 sm:gap-3 md:gap-4.5"
              >
                {series.map((s) => {
                  const val = cat.values[s.key] || 0;
                  const heightPercent = Math.max(Math.round((val / maxValue) * 100), 4);
                  const isHovered = hoveredKey === `${cat.id}-${s.key}`;

                  return (
                    <div
                      key={s.key}
                      className={`relative flex-1 ${getBarWidthClass()} h-full flex flex-col justify-end items-center group cursor-pointer`}
                      onMouseEnter={() => setHoveredKey(`${cat.id}-${s.key}`)}
                      onMouseLeave={() => setHoveredKey(null)}
                    >
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-11 z-20 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap animate-fadeIn pointer-events-none">
                          {s.label}: {val.toLocaleString("en-US")} {valueSuffix}
                        </div>
                      )}

                      {/* Value Above Bar */}
                      <span className="text-xs sm:text-sm font-black text-neutral-800 dark:text-neutral-200 mb-1.5 truncate">
                        {val.toLocaleString("en-US")}
                      </span>

                      {/* Bar Box with Increased Width and Rounded Tops */}
                      <div
                        className="w-full rounded-t-[8px] sm:rounded-t-[12px] md:rounded-t-[14px] transition-all duration-300 group-hover:brightness-110 shadow-sm"
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: s.color,
                          opacity: hoveredKey && !isHovered ? 0.6 : 1,
                          transform: isHovered ? "scaleY(1.025)" : "scaleY(1)",
                          transformOrigin: "bottom",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Category Labels */}
          <div className="w-full flex justify-between gap-3 sm:gap-6 md:gap-10 pt-3">
            {categories.map((cat) => (
              <div key={cat.id} className="flex-1 text-center min-w-0 px-1">
                <span
                  className="text-xs sm:text-sm md:text-[15px] font-bold text-neutral-800 dark:text-neutral-200 line-clamp-2 leading-snug break-words"
                  title={cat.categoryLabel}
                >
                  {cat.categoryLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. HORIZONTAL DUAL BAR CHART (Comparison)
// ==========================================
export interface HorizontalCompareItem {
  id: string;
  label: string;
  sublabel?: string;
  valueA: number;
  valueB: number;
  labelA: string;
  labelB: string;
  rate?: number;
}

export interface HorizontalBarChartProps {
  data: HorizontalCompareItem[];
  colorA?: string;
  colorB?: string;
  className?: string;
  maxDisplay?: number;
}

export function HorizontalCompareBarChart({
  data,
  colorA = "#882637",
  colorB = "#059669",
  className = "",
  maxDisplay,
}: HorizontalBarChartProps) {
  const displayItems = maxDisplay ? data.slice(0, maxDisplay) : data;
  const maxValue = Math.max(
    ...data.map((d) => Math.max(d.valueA, d.valueB)),
    1
  );

  return (
    <div className={`w-full space-y-3.5 select-none ${className}`}>
      {displayItems.map((item) => {
        const percentA = Math.max(Math.round((item.valueA / maxValue) * 100), 2);
        const percentB = Math.max(Math.round((item.valueB / maxValue) * 100), 2);

        return (
          <div
            key={item.id}
            className="p-3 rounded-xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all"
          >
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-neutral-900 dark:text-neutral-100 font-bold">
                {item.label}{" "}
                {item.sublabel && (
                  <span className="text-neutral-400 font-normal">
                    ({item.sublabel})
                  </span>
                )}
              </span>
              {item.rate !== undefined && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
                  {item.rate.toFixed(1)}% Success
                </span>
              )}
            </div>

            {/* Bar A */}
            <div className="space-y-1 mb-2">
              <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 font-semibold">
                <span>{item.labelA}</span>
                <span className="font-black text-neutral-900 dark:text-white">
                  {item.valueA.toLocaleString("en-US")}
                </span>
              </div>
              <div className="h-4 sm:h-5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentA}%`, backgroundColor: colorA }}
                />
              </div>
            </div>

            {/* Bar B */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 font-semibold">
                <span>{item.labelB}</span>
                <span className="font-black text-neutral-900 dark:text-white">
                  {item.valueB.toLocaleString("en-US")}
                </span>
              </div>
              <div className="h-4 sm:h-5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentB}%`, backgroundColor: colorB }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ==========================================
// 4. TRUE HORIZONTAL GROUPED BAR CHART (Grid & Axis)
// ==========================================
export interface HorizontalChartRowItem {
  id: string;
  label: string;
  sublabel?: string;
  valueA: number;
  valueB: number;
  rate?: number;
}

export interface HorizontalGroupedBarChartProps {
  data: HorizontalChartRowItem[];
  labelA: string;
  labelB: string;
  colorA?: string;
  colorB?: string;
  className?: string;
}

export function HorizontalGroupedBarChart({
  data,
  labelA,
  labelB,
  colorA = "#882637",
  colorB = "#059669",
  className = "",
}: HorizontalGroupedBarChartProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const rawMax = Math.max(
    ...data.map((d) => Math.max(d.valueA, d.valueB)),
    100
  );

  // Compute clean scale upper bound (e.g. 500, 1000, 1500, 2000, 2500)
  const step = rawMax > 1500 ? 500 : rawMax > 800 ? 250 : rawMax > 300 ? 100 : 50;
  const maxScale = Math.ceil(rawMax / step) * step;

  // Generate 4-5 ticks
  const ticks: number[] = [];
  for (let t = 0; t <= maxScale; t += step) {
    ticks.push(t);
  }

  return (
    <div className={`w-full select-none ${className}`}>
      {/* Legend & Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-4">
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          Showing <span className="font-bold text-neutral-900 dark:text-white">{data.length}</span> regions
        </div>
        <div className="flex items-center gap-5 text-xs font-semibold">
          <div className="inline-flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-xs shrink-0"
              style={{ backgroundColor: colorA }}
            />
            <span className="text-neutral-800 dark:text-neutral-200">{labelA}</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-xs shrink-0"
              style={{ backgroundColor: colorB }}
            />
            <span className="text-neutral-800 dark:text-neutral-200">{labelB}</span>
          </div>
        </div>
      </div>

      {/* Main Chart Grid Body */}
      <div className="relative w-full">
        {/* Background Vertical Grid Lines */}
        <div className="absolute inset-y-0 left-36 sm:left-48 right-16 sm:right-20 flex justify-between pointer-events-none opacity-20 dark:opacity-30">
          {ticks.map((tick, i) => (
            <div
              key={tick}
              className={`h-full border-l border-dashed border-neutral-400 dark:border-neutral-500 ${
                i === 0 ? "border-solid border-neutral-600 dark:border-neutral-400" : ""
              }`}
            />
          ))}
        </div>

        {/* Rows */}
        <div className="relative space-y-3 pt-1 pb-3">
          {data.map((item) => {
            const widthA = Math.max(Math.round((item.valueA / maxScale) * 100), 1);
            const widthB = Math.max(Math.round((item.valueB / maxScale) * 100), 1);
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`flex items-center gap-3 sm:gap-4 py-2 px-2 rounded-xl transition-all ${
                  isHovered
                    ? "bg-neutral-100/80 dark:bg-neutral-800/80 shadow-xs"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                }`}
              >
                {/* Left Y-Axis Label */}
                <div className="w-32 sm:w-44 shrink-0 text-left">
                  <span
                    className={`block text-xs sm:text-[13px] font-bold truncate transition-colors ${
                      isHovered
                        ? "text-[#882637] dark:text-[#F29EAA]"
                        : "text-neutral-900 dark:text-neutral-100"
                    }`}
                    title={item.label}
                  >
                    {item.label}
                  </span>
                  {item.sublabel && (
                    <span className="block text-[10px] text-neutral-400 dark:text-neutral-500 truncate">
                      {item.sublabel}
                    </span>
                  )}
                </div>

                {/* Center Bar Tracks */}
                <div className="relative flex-1 space-y-2 py-0.5">
                  {/* Bar A: Reintegrated */}
                  <div className="relative flex items-center h-6 sm:h-7 w-full bg-neutral-100 dark:bg-neutral-800/60 rounded-r-lg shadow-inner">
                    <div
                      className="h-full rounded-r-lg transition-all duration-500 flex items-center justify-end pr-2"
                      style={{
                        width: `${widthA}%`,
                        backgroundColor: colorA,
                        boxShadow: isHovered ? `0 2px 8px ${colorA}55` : "none",
                      }}
                    >
                      {widthA >= 18 && (
                        <span className="text-xs sm:text-[13px] font-black text-white leading-none">
                          {item.valueA.toLocaleString("en-US")}
                        </span>
                      )}
                    </div>
                    {widthA < 18 && (
                      <span className="ml-2 text-xs sm:text-[13px] font-black text-neutral-800 dark:text-neutral-200">
                        {item.valueA.toLocaleString("en-US")}
                      </span>
                    )}
                  </div>

                  {/* Bar B: Followed Up */}
                  <div className="relative flex items-center h-6 sm:h-7 w-full bg-neutral-100 dark:bg-neutral-800/60 rounded-r-lg shadow-inner">
                    <div
                      className="h-full rounded-r-lg transition-all duration-500 flex items-center justify-end pr-2"
                      style={{
                        width: `${widthB}%`,
                        backgroundColor: colorB,
                        boxShadow: isHovered ? `0 2px 8px ${colorB}55` : "none",
                      }}
                    >
                      {widthB >= 18 && (
                        <span className="text-xs sm:text-[13px] font-black text-white leading-none">
                          {item.valueB.toLocaleString("en-US")}
                        </span>
                      )}
                    </div>
                    {widthB < 18 && (
                      <span className="ml-2 text-xs sm:text-[13px] font-black text-neutral-800 dark:text-neutral-200">
                        {item.valueB.toLocaleString("en-US")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Badge: Rate */}
                <div className="w-16 sm:w-20 text-right shrink-0">
                  {item.rate !== undefined && (
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${
                        item.rate >= 95
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                          : item.rate >= 80
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                          : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                      }`}
                    >
                      {item.rate.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom X-Axis Ticks & Labels */}
        <div className="relative pt-3 border-t-2 border-neutral-300 dark:border-neutral-700">
          <div className="left-36 sm:left-48 right-16 sm:right-20 flex justify-between text-[10px] sm:text-[11px] font-bold text-neutral-500 dark:text-neutral-400 pl-36 sm:pl-48 pr-16 sm:pr-20">
            {ticks.map((tick) => (
              <span key={tick} className="-translate-x-1/2">
                {tick.toLocaleString("en-US")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

