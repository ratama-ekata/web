"use client";

import React, { useState } from "react";
import sriLankaMap from "@svg-maps/sri-lanka";
import { Clock, ChevronDown, X } from "lucide-react";
import { useTranslations } from "next-intl";

export interface MapLocation {
  id: string;
  name: string;
  path: string;
}

export interface DistrictStats {
  name: string;
  totalReports: number;
  actedOnReports: number;
  actedOnPct: number;
  inReviewPct: number;
  closedPct: number;
  avgResponseHours: number;
  centerX: number;
  centerY: number;
}

const DISTRICT_CENTERS: Record<string, { x: number; y: number }> = {
  colombo: { x: 77, y: 605 },
  gampaha: { x: 73, y: 550 },
  kalutara: { x: 98, y: 660 },
  kandy: { x: 216, y: 531 },
  matale: { x: 221, y: 433 },
  "nuwara-eliya": { x: 212, y: 572 },
  galle: { x: 120, y: 735 },
  matara: { x: 182, y: 744 },
  hambantota: { x: 304, y: 720 },
  jaffna: { x: 98, y: 39 },
  kilinochchi: { x: 130, y: 79 },
  mannar: { x: 80, y: 194 },
  vavuniya: { x: 167, y: 203 },
  mullaitivu: { x: 186, y: 130 },
  batticaloa: { x: 377, y: 406 },
  ampara: { x: 359, y: 549 },
  trincomalee: { x: 288, y: 257 },
  kurunegala: { x: 119, y: 428 },
  puttalam: { x: 55, y: 389 },
  anuradhapura: { x: 166, y: 298 },
  polonnaruwa: { x: 281, y: 373 },
  badulla: { x: 277, y: 557 },
  moneragala: { x: 319, y: 599 },
  ratnapura: { x: 185, y: 659 },
  kegalle: { x: 141, y: 551 },
};

const DISTRICT_DATA: Record<string, DistrictStats> = {
  anuradhapura: {
    name: "ANURADHAPURA",
    totalReports: 412,
    actedOnReports: 236,
    actedOnPct: 57,
    inReviewPct: 24,
    closedPct: 19,
    avgResponseHours: 18,
    centerX: 166,
    centerY: 298,
  },
  colombo: {
    name: "COLOMBO",
    totalReports: 820,
    actedOnReports: 584,
    actedOnPct: 71,
    inReviewPct: 18,
    closedPct: 11,
    avgResponseHours: 6,
    centerX: 77,
    centerY: 605,
  },
  gampaha: {
    name: "GAMPAHA",
    totalReports: 590,
    actedOnReports: 412,
    actedOnPct: 70,
    inReviewPct: 19,
    closedPct: 11,
    avgResponseHours: 8,
    centerX: 73,
    centerY: 550,
  },
  kalutara: {
    name: "KALUTARA",
    totalReports: 340,
    actedOnReports: 218,
    actedOnPct: 64,
    inReviewPct: 22,
    closedPct: 14,
    avgResponseHours: 12,
    centerX: 98,
    centerY: 660,
  },
  kandy: {
    name: "KANDY",
    totalReports: 480,
    actedOnReports: 310,
    actedOnPct: 65,
    inReviewPct: 21,
    closedPct: 14,
    avgResponseHours: 10,
    centerX: 216,
    centerY: 531,
  },
  matale: {
    name: "MATALE",
    totalReports: 230,
    actedOnReports: 142,
    actedOnPct: 62,
    inReviewPct: 23,
    closedPct: 15,
    avgResponseHours: 14,
    centerX: 221,
    centerY: 433,
  },
  "nuwara-eliya": {
    name: "NUWARA ELIYA",
    totalReports: 190,
    actedOnReports: 115,
    actedOnPct: 61,
    inReviewPct: 24,
    closedPct: 15,
    avgResponseHours: 15,
    centerX: 212,
    centerY: 572,
  },
  galle: {
    name: "GALLE",
    totalReports: 380,
    actedOnReports: 245,
    actedOnPct: 64,
    inReviewPct: 22,
    closedPct: 14,
    avgResponseHours: 11,
    centerX: 120,
    centerY: 735,
  },
  matara: {
    name: "MATARA",
    totalReports: 295,
    actedOnReports: 188,
    actedOnPct: 64,
    inReviewPct: 21,
    closedPct: 15,
    avgResponseHours: 12,
    centerX: 182,
    centerY: 744,
  },
  hambantota: {
    name: "HAMBANTOTA",
    totalReports: 270,
    actedOnReports: 165,
    actedOnPct: 61,
    inReviewPct: 24,
    closedPct: 15,
    avgResponseHours: 14,
    centerX: 304,
    centerY: 720,
  },
  jaffna: {
    name: "JAFFNA",
    totalReports: 320,
    actedOnReports: 198,
    actedOnPct: 62,
    inReviewPct: 23,
    closedPct: 15,
    avgResponseHours: 14,
    centerX: 98,
    centerY: 39,
  },
  kilinochchi: {
    name: "KILINOCHCHI",
    totalReports: 155,
    actedOnReports: 92,
    actedOnPct: 59,
    inReviewPct: 25,
    closedPct: 16,
    avgResponseHours: 16,
    centerX: 130,
    centerY: 79,
  },
  mannar: {
    name: "MANNAR",
    totalReports: 185,
    actedOnReports: 110,
    actedOnPct: 59,
    inReviewPct: 26,
    closedPct: 15,
    avgResponseHours: 17,
    centerX: 80,
    centerY: 194,
  },
  vavuniya: {
    name: "VAVUNIYA",
    totalReports: 210,
    actedOnReports: 128,
    actedOnPct: 61,
    inReviewPct: 24,
    closedPct: 15,
    avgResponseHours: 15,
    centerX: 167,
    centerY: 203,
  },
  mullaitivu: {
    name: "MULLAITIVU",
    totalReports: 145,
    actedOnReports: 85,
    actedOnPct: 59,
    inReviewPct: 26,
    closedPct: 15,
    avgResponseHours: 18,
    centerX: 186,
    centerY: 130,
  },
  batticaloa: {
    name: "BATTICALOA",
    totalReports: 290,
    actedOnReports: 175,
    actedOnPct: 60,
    inReviewPct: 25,
    closedPct: 15,
    avgResponseHours: 15,
    centerX: 377,
    centerY: 406,
  },
  ampara: {
    name: "AMPARA",
    totalReports: 325,
    actedOnReports: 195,
    actedOnPct: 60,
    inReviewPct: 24,
    closedPct: 16,
    avgResponseHours: 16,
    centerX: 359,
    centerY: 549,
  },
  trincomalee: {
    name: "TRINCOMALEE",
    totalReports: 298,
    actedOnReports: 182,
    actedOnPct: 61,
    inReviewPct: 24,
    closedPct: 15,
    avgResponseHours: 15,
    centerX: 288,
    centerY: 257,
  },
  kurunegala: {
    name: "KURUNEGALA",
    totalReports: 520,
    actedOnReports: 345,
    actedOnPct: 66,
    inReviewPct: 20,
    closedPct: 14,
    avgResponseHours: 11,
    centerX: 119,
    centerY: 428,
  },
  puttalam: {
    name: "PUTTALAM",
    totalReports: 395,
    actedOnReports: 240,
    actedOnPct: 61,
    inReviewPct: 23,
    closedPct: 16,
    avgResponseHours: 14,
    centerX: 55,
    centerY: 389,
  },
  polonnaruwa: {
    name: "POLONNARUWA",
    totalReports: 275,
    actedOnReports: 168,
    actedOnPct: 61,
    inReviewPct: 24,
    closedPct: 15,
    avgResponseHours: 16,
    centerX: 281,
    centerY: 373,
  },
  badulla: {
    name: "BADULLA",
    totalReports: 248,
    actedOnReports: 152,
    actedOnPct: 61,
    inReviewPct: 24,
    closedPct: 15,
    avgResponseHours: 15,
    centerX: 277,
    centerY: 557,
  },
  moneragala: {
    name: "MONERAGALA",
    totalReports: 230,
    actedOnReports: 138,
    actedOnPct: 60,
    inReviewPct: 25,
    closedPct: 15,
    avgResponseHours: 17,
    centerX: 319,
    centerY: 599,
  },
  ratnapura: {
    name: "RATNAPURA",
    totalReports: 360,
    actedOnReports: 225,
    actedOnPct: 63,
    inReviewPct: 22,
    closedPct: 15,
    avgResponseHours: 13,
    centerX: 185,
    centerY: 659,
  },
  kegalle: {
    name: "KEGALLE",
    totalReports: 310,
    actedOnReports: 195,
    actedOnPct: 63,
    inReviewPct: 22,
    closedPct: 15,
    avgResponseHours: 12,
    centerX: 141,
    centerY: 551,
  },
};

function getDistrictStats(id: string, name: string): DistrictStats {
  if (DISTRICT_DATA[id]) {
    return DISTRICT_DATA[id];
  }
  const center = DISTRICT_CENTERS[id] || { x: 200, y: 400 };
  return {
    name: name.toUpperCase(),
    totalReports: 280,
    actedOnReports: 165,
    actedOnPct: 59,
    inReviewPct: 24,
    closedPct: 17,
    avgResponseHours: 16,
    centerX: center.x,
    centerY: center.y,
  };
}

export function HeroMap() {
  const t = useTranslations("marketing.map");
  const [selectedId, setSelectedId] = useState<string | null>("anuradhapura");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [isYearOpen, setIsYearOpen] = useState<boolean>(false);
  const [cardVisible, setCardVisible] = useState<boolean>(true);

  const selectedLocation = selectedId
    ? sriLankaMap.locations.find((l: MapLocation) => l.id === selectedId)
    : null;

  const currentStats = selectedId
    ? getDistrictStats(selectedId, selectedLocation ? selectedLocation.name : "Anuradhapura")
    : null;

  const handleDistrictClick = (id: string) => {
    setSelectedId(id);
    setCardVisible(true);
  };

  // Smart Card Positioning:
  // When selected district is in the southern/eastern half (centerY > 480):
  // Float card in the upper-right so it NEVER covers southern/eastern districts (Galle, Matara, Hambantota, Ampara, etc.)
  // When selected district is in the northern/central half (centerY <= 480):
  // Float card in the lower-right exactly like the reference screenshot!
  const isSouthOrEast = currentStats ? currentStats.centerY > 480 : false;

  return (
    <div className="relative w-full max-w-[460px] lg:max-w-[490px] xl:max-w-[530px] mx-auto flex items-center justify-center select-none py-1">
      <div className="relative w-full aspect-[450/793] max-h-[calc(100vh-140px)] max-h-[calc(100dvh-140px)] lg:max-h-[min(560px,calc(100vh-140px))] xl:max-h-[min(620px,calc(100vh-140px))]">
        {/* 1. Fully Interactive SVG Map of Sri Lanka */}
        <svg
          viewBox={sriLankaMap.viewBox}
          className="w-full h-full filter drop-shadow-sm transition-all"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {sriLankaMap.locations.map((location: MapLocation) => {
            const isSelected = selectedId === location.id;
            const isHovered = hoveredId === location.id;

            return (
              <path
                key={location.id}
                id={location.id}
                d={location.path}
                onClick={() => handleDistrictClick(location.id)}
                onMouseEnter={() => setHoveredId(location.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`transition-colors duration-150 cursor-pointer ${
                  isSelected
                    ? "fill-[#882637] dark:fill-[#882637] stroke-[#882637] dark:stroke-[#F29EAA] stroke-[1.8]"
                    : isHovered
                    ? "fill-[#FCE4E8] dark:fill-[#320F16] stroke-[#882637] dark:stroke-[#F29EAA] stroke-[1.6]"
                    : "fill-white/85 dark:fill-[#171717] hover:fill-[#FDF2F4] dark:hover:fill-[#262626] stroke-[#882637] dark:stroke-[#F29EAA] stroke-[1.15]"
                }`}
              >
                <title>{`${location.name} (Click to inspect)`}</title>
              </path>
            );
          })}

          {/* Hand Pointer 👆 Cursor Placed on the Active District Centroid */}
          {currentStats && (
            <g
              transform={`translate(${currentStats.centerX - 12}, ${currentStats.centerY - 14})`}
              className="pointer-events-none transition-transform duration-300 ease-out filter drop-shadow-md"
            >
              {/* White Hand Pointer with Crisp Dark Border Matching Screenshot */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="white"
                stroke="#171717"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0 M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2 M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8 M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
            </g>
          )}
        </svg>

        {/* Hover Tooltip (shows district name on hover) */}
        {hoveredId && hoveredId !== selectedId && (
          <div
            style={{ transform: "rotate(-2deg)" }}
            className="absolute top-2 left-2 pointer-events-none bg-[#FFFBEB] dark:bg-neutral-900 text-[#882637] dark:text-[#F29EAA] border-2 border-[#882637] text-xs font-black px-3 py-1 rounded-xl shadow-[3px_3px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511B25] z-30 flex items-center gap-1.5"
          >
            <span>{sriLankaMap.locations.find((l: MapLocation) => l.id === hoveredId)?.name}</span>
            <span className="text-[10px] font-semibold text-[#525252] dark:text-neutral-400">(Click to view)</span>
          </div>
        )}

        {/* 
          2. Floating Dynamic District Analytics Card
          - Positioned dynamically so it NEVER covers selected districts!
          - Northern/Central selection: bottom-right (matching screenshot).
          - Southern/Eastern selection: top-right (leaving south/east clear to click).
          - Includes a close button (✕) to dismiss and view full unobstructed map.
        */}
        {cardVisible && currentStats && (
          <div
            style={{ transform: "rotate(-2.5deg)" }}
            className={`hero-map-stat-card absolute right-0 z-30 w-[275px] sm:w-[315px] rounded-[24px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-[#1A1416] shadow-[7px_7px_0px_0px_#882637] dark:shadow-[7px_7px_0px_0px_#511B25] overflow-hidden cursor-pointer ${
              isSouthOrEast
                ? "top-2 sm:top-4"
                : "bottom-2 sm:bottom-4"
            }`}
          >
            {/* Header Bar: Solid Maroon with District Name, Year Dropdown & Close Button */}
            <div className="bg-[#882637] text-white px-3.5 py-2.5 flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-white truncate max-w-[140px]">
                {currentStats.name}
              </span>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Year Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsYearOpen(!isYearOpen)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    <span>{selectedYear}</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>

                  {isYearOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#262626] rounded-md shadow-lg border border-[#E5E5E5] dark:border-[#404040] py-1 z-40 min-w-[70px]">
                      {["2026", "2025", "2024"].map((yr) => (
                        <button
                          key={yr}
                          onClick={() => {
                            setSelectedYear(yr);
                            setIsYearOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1 text-xs transition-colors cursor-pointer ${
                            selectedYear === yr
                              ? "font-bold text-[#882637] bg-[#FDF2F4] dark:bg-[#320F16]"
                              : "text-[#171717] dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Close Button: Lets user dismiss card to see the whole map freely */}
                <button
                  type="button"
                  onClick={() => setCardVisible(false)}
                  className="h-6 w-6 rounded-md bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Close card to see full map"
                  aria-label="Close card"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3.5">
              {/* Stat: Reports Count */}
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#171717] dark:text-white tracking-tight leading-tight">
                  {t("reportsOf", { acted: currentStats.actedOnReports, total: currentStats.totalReports })}
                </div>
                <div className="text-xs text-[#525252] dark:text-neutral-400 font-medium -mt-0.5">
                  {t("ledToAction")}
                </div>
              </div>

              {/* Segmented Progress Bar */}
              <div className="space-y-2">
                <div className="h-2.5 w-full rounded-full overflow-hidden flex gap-0.5 bg-[#E5E5E5] dark:bg-neutral-800 p-0.5">
                  <div
                    style={{ width: `${currentStats.actedOnPct}%` }}
                    className="h-full bg-[#882637] rounded-l-full transition-all duration-500"
                    title={`${t("actedOn")}: ${currentStats.actedOnPct}%`}
                  />
                  <div
                    style={{ width: `${currentStats.inReviewPct}%` }}
                    className="h-full bg-[#D9A441] transition-all duration-500"
                    title={`${t("inReview")}: ${currentStats.inReviewPct}%`}
                  />
                  <div
                    style={{ width: `${currentStats.closedPct}%` }}
                    className="h-full bg-[#D4D4D4] dark:bg-neutral-600 rounded-r-full transition-all duration-500"
                    title={`${t("closed")}: ${currentStats.closedPct}%`}
                  />
                </div>

                {/* Progress Legend */}
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#171717] dark:text-neutral-200">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#882637]" />
                    <span>{t("actedOn")} {currentStats.actedOnPct}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#D9A441]" />
                    <span>{t("inReview")} {currentStats.inReviewPct}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#A3A3A3]" />
                    <span>{t("closed")} {currentStats.closedPct}%</span>
                  </div>
                </div>
              </div>

              {/* Average First Response Row */}
              <div className="pt-2 border-t border-[#FDE68A]/80 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#525252] dark:text-neutral-400 font-medium">
                  <Clock className="h-4 w-4 text-[#882637] dark:text-[#F8C9D0]" />
                  <span>{t("avgResponse")}</span>
                </div>
                <span className="text-sm sm:text-base font-extrabold text-[#171717] dark:text-white">
                  {t("hours", { hrs: currentStats.avgResponseHours })}
                </span>
              </div>

              {/* Verified Footnote */}
              <div className="text-[9px] text-[#A3A3A3] text-center pt-0.5 tracking-tight">
                Verified 9 Oct 2026 - Presidential Secretariat
              </div>
            </div>
          </div>
        )}

        {/* Small hint button if card was closed */}
        {!cardVisible && (
          <button
            onClick={() => setCardVisible(true)}
            className="absolute bottom-2 right-2 bg-[#882637] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md hover:bg-[#6B202E] transition-colors cursor-pointer z-20 flex items-center gap-1"
          >
            <span>Show {currentStats ? currentStats.name : "District"} Stats</span>
          </button>
        )}
      </div>
    </div>
  );
}
