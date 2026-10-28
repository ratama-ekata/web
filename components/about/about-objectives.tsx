"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  HeartHandshake,
  GraduationCap,
  Scale,
  ArrowRight,
  CheckCircle2,
  Radio,
  Sparkles,
  PhoneCall,
  Flame,
  Activity,
  Award,
} from "lucide-react";

interface ActionItem {
  title: string;
  desc: string;
}

interface ObjectiveItem {
  number: string;
  tagline: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  status: string;
  actions: ActionItem[];
}

export function AboutObjectives() {
  const t = useTranslations("about.objectives");
  const [activeTab, setActiveTab] = useState(0);

  // Pillar metadata and contextual icons
  const pillarIcons = [
    <ShieldCheck key="p-1" className="h-5 w-5" />,
    <HeartHandshake key="p-2" className="h-5 w-5" />,
    <GraduationCap key="p-3" className="h-5 w-5" />,
    <Scale key="p-4" className="h-5 w-5" />,
  ];

  const actionIcons = [
    [
      <Flame key="a-1" className="h-4 w-4 text-[#8A1C2B] dark:text-[#F8C9D0] shrink-0" />,
      <Radio key="a-2" className="h-4 w-4 text-[#8A1C2B] dark:text-[#F8C9D0] shrink-0" />,
      <ShieldCheck key="a-3" className="h-4 w-4 text-[#8A1C2B] dark:text-[#F8C9D0] shrink-0" />,
    ],
    [
      <Activity key="b-1" className="h-4 w-4 text-[#8A1C2B] dark:text-[#F8C9D0] shrink-0" />,
      <Award key="b-2" className="h-4 w-4 text-[#8A1C2B] dark:text-[#F8C9D0] shrink-0" />,
      <HeartHandshake key="b-3" className="h-4 w-4 text-[#8A1C2B] dark:text-[#F8C9D0] shrink-0" />,
    ],
    [
      <GraduationCap key="c-1" className="h-4 w-4 text-[#8A1C2B] dark:text-[#F8C9D0] shrink-0" />,
      <PhoneCall key="c-2" className="h-4 w-4 text-[#8A1C2B] dark:text-[#F8C9D0] shrink-0" />,
      <Sparkles key="c-3" className="h-4 w-4 text-[#8A1C2B] dark:text-[#F8C9D0] shrink-0" />,
    ],
    [
      <Scale key="d-1" className="h-4 w-4 text-[#8A1C2B] dark:text-[#F8C9D0] shrink-0" />,
      <CheckCircle2 key="d-2" className="h-4 w-4 text-[#8A1C2B] dark:text-[#F8C9D0] shrink-0" />,
      <ShieldCheck key="d-3" className="h-4 w-4 text-[#8A1C2B] dark:text-[#F8C9D0] shrink-0" />,
    ],
  ];

  // Safely extract raw items array
  const rawItems = t.raw("items") as ObjectiveItem[];
  const currentItem = rawItems[activeTab] || rawItems[0];

  return (
    <section
      aria-label="National Strategic Objectives"
      className="relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-[#FFFDF0] dark:bg-[#000000] border-t border-[#E8E6DD] dark:border-neutral-800 transition-colors"
    >
      {/* Subtle ambient institutional background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05] bg-[radial-gradient(#8A1C2B_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#171717] dark:text-neutral-50">
            {t("title")}
          </h2>

          <p className="text-sm sm:text-base text-[#52525B] dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            {t("lead")}
          </p>
        </div>

        {/* 1. Strategic Command Ribbon (Segmented Pillar Selector) */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-[#882637] shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25]">
            {rawItems.map((item, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`group relative flex items-center gap-3 p-3 sm:p-4 rounded-xl text-left transition-all duration-200 cursor-pointer ${isActive
                    ? "bg-[#882637] text-white shadow-md shadow-[#882637]/30"
                    : "bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-[#882637]/10 dark:hover:bg-neutral-800/60"
                    }`}
                  aria-pressed={isActive}
                >
                  <div
                    className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-black transition-colors ${isActive
                      ? "bg-white/20 text-white"
                      : "bg-neutral-200 dark:bg-neutral-800 text-[#882637] dark:text-[#F8C9D0] group-hover:bg-[#882637]/20"
                      }`}
                  >
                    {item.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-semibold leading-tight line-clamp-2 transition-colors ${isActive
                        ? "text-white"
                        : "text-neutral-900 dark:text-neutral-100 group-hover:text-[#882637] dark:group-hover:text-[#F8C9D0]"
                        }`}
                    >
                      {item.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Pillar Deep-Dive Showcase */}
        <div className="about-showcase-card rounded-[28px] sm:rounded-[34px] border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] shadow-[7px_7px_0px_0px_#882637] dark:shadow-[7px_7px_0px_0px_#511B25] overflow-hidden transition-all duration-300 cursor-default">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Column */}
            <div className="relative lg:col-span-5 min-h-[300px] sm:min-h-[380px] lg:min-h-[500px] overflow-hidden bg-neutral-900">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Top Watermark & Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide">
                  <span className="h-2 w-2 rounded-full bg-[#E8920C] animate-pulse" />
                  {currentItem.badge}
                </span>
                <span className="font-mono text-3xl font-black text-white/30">
                  {currentItem.number}
                </span>
              </div>

              {/* Bottom Contextual Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 text-white space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#E8920C]">
                  {currentItem.status}
                </p>
                <p className="text-xs text-neutral-300 leading-snug">
                  {currentItem.tagline}
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-9 lg:p-11 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Eyebrow & Number */}
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A1C2B] dark:text-[#F8C9D0]">
                    {pillarIcons[activeTab]}
                    <span>{t("operationMandate")} • {currentItem.number}</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-neutral-400 dark:text-neutral-500">
                    Pillar {currentItem.number} / 04
                  </span>
                </div>

                {/* Main Heading */}
                <h3 className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white leading-tight">
                  {currentItem.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-[15px] leading-relaxed text-[#52525B] dark:text-neutral-300">
                  {currentItem.description}
                </p>

                {/* Core Directives & Action Areas */}
                <div className="pt-2 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    {t("keyDirectives")}
                  </p>

                  <div className="space-y-2.5">
                    {currentItem.actions.map((act, actIdx) => (
                      <div
                        key={act.title}
                        className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-[#882637]/25 hover:border-[#882637] hover:shadow-[3px_3px_0px_0px_#882637] dark:hover:shadow-[3px_3px_0px_0px_#511B25] hover:-translate-y-0.5 hover:rotate-[-0.6deg] transition-all duration-200 cursor-default"
                      >
                        <div className="mt-0.5">
                          {actionIcons[activeTab]?.[actIdx] || (
                            <CheckCircle2 className="h-4 w-4 text-[#8A1C2B] dark:text-[#F8C9D0] shrink-0" />
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                            {act.title}
                          </p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {act.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Indicator / Hotline Reference */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8A1C2B] dark:bg-[#F8C9D0]" />
                  <span className="font-medium">රටම එකට • A Nation United Under One Command</span>
                </div>
                <div className="font-mono text-[11px] text-[#8A1C2B] dark:text-[#F8C9D0] font-bold">
                  Hotlines: 1818 | 1927
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
