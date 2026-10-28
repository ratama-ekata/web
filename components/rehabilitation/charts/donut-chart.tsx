"use client";

import React, { useState } from "react";

export interface DonutSegment {
  id: string;
  label: string;
  value: number;
  color: string;
  formattedValue?: string;
  sublabel?: string;
}

export interface DonutChartProps {
  data: DonutSegment[];
  size?: number;
  thickness?: number;
  centerTitle?: string;
  centerSubtitle?: string;
  centerTotalOverride?: string;
  showLegend?: boolean;
  className?: string;
  valueUnit?: string;
}

export function DonutChart({
  data,
  size = 280,
  thickness = 46,
  centerTitle,
  centerSubtitle,
  centerTotalOverride,
  showLegend = true,
  className = "",
  valueUnit = "",
}: DonutChartProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // SVG dimensions & radius
  const center = size / 2;
  const radius = center - 16;
  const innerRadius = radius - thickness;
  const circumference = 2 * Math.PI * radius;

  // Compute angles
  let accumulatedAngle = -90; // Start at 12 o'clock

  const segments = data.map((item) => {
    const angle = total > 0 ? (item.value / total) * 360 : 0;
    const startAngle = accumulatedAngle;
    accumulatedAngle += angle;
    const percentage = total > 0 ? (item.value / total) * 100 : 0;

    // Convert polar coordinates to Cartesian for SVG path arc
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = ((startAngle + angle) * Math.PI) / 180;

    const round3 = (n: number) => Number(n.toFixed(3));
    const x1 = round3(center + radius * Math.cos(startRad));
    const y1 = round3(center + radius * Math.sin(startRad));
    const x2 = round3(center + radius * Math.cos(endRad));
    const y2 = round3(center + radius * Math.sin(endRad));

    const ix1 = round3(center + innerRadius * Math.cos(endRad));
    const iy1 = round3(center + innerRadius * Math.sin(endRad));
    const ix2 = round3(center + innerRadius * Math.cos(startRad));
    const iy2 = round3(center + innerRadius * Math.sin(startRad));

    const largeArc = angle > 180 ? 1 : 0;

    // SVG donut slice path
    const path =
      angle >= 359.99
        ? `M ${center} ${center - radius} A ${radius} ${radius} 0 1 0 ${center} ${
            center + radius
          } A ${radius} ${radius} 0 1 0 ${center} ${
            center - radius
          } M ${center} ${center - innerRadius} A ${innerRadius} ${innerRadius} 0 1 1 ${center} ${
            center + innerRadius
          } A ${innerRadius} ${innerRadius} 0 1 1 ${center} ${center - innerRadius} Z`
        : `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix2} ${iy2} Z`;

    return {
      ...item,
      percentage,
      path,
    };
  });

  const activeSegment = segments.find((s) => s.id === hoveredId);

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible transition-transform duration-300 drop-shadow-xs"
        >
          {segments.map((seg) => {
            const isHovered = hoveredId === seg.id;
            return (
              <path
                key={seg.id}
                d={seg.path}
                fill={seg.color}
                className="transition-all duration-200 cursor-pointer"
                style={{
                  opacity: hoveredId && !isHovered ? 0.45 : 1,
                  transform: isHovered ? "scale(1.035)" : "scale(1)",
                  transformOrigin: `${center}px ${center}px`,
                  filter: isHovered ? "drop-shadow(0 4px 10px rgba(0,0,0,0.25))" : "none",
                }}
                onMouseEnter={() => setHoveredId(seg.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            );
          })}
        </svg>

        {/* Center Text Circle */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6"
          style={{
            width: innerRadius * 2,
            height: innerRadius * 2,
            margin: "auto",
          }}
        >
          {activeSegment ? (
            <div className="animate-fadeIn space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {activeSegment.label}
              </span>
              <p className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white leading-tight">
                {activeSegment.formattedValue ||
                  activeSegment.value.toLocaleString("en-US")}{" "}
                <span className="text-xs font-normal opacity-75">{valueUnit}</span>
              </p>
              <span
                className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: activeSegment.color }}
              >
                {activeSegment.percentage.toFixed(1)}%
              </span>
            </div>
          ) : (
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {centerTitle || "Total"}
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#882637] dark:text-[#F29EAA] leading-none">
                {centerTotalOverride || total.toLocaleString("en-US")}
              </p>
              {centerSubtitle && (
                <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                  {centerSubtitle}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Legend below */}
      {showLegend && (
        <div className="mt-5 w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
          {segments.map((seg) => {
            const isHovered = hoveredId === seg.id;
            return (
              <button
                key={seg.id}
                type="button"
                onMouseEnter={() => setHoveredId(seg.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  isHovered
                    ? "border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800 scale-105"
                    : "border-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  {seg.label}
                </span>
                <span className="font-bold text-neutral-900 dark:text-white">
                  {seg.percentage.toFixed(0)}%
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
