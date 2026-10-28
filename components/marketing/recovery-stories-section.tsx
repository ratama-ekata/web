"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BrandEmblem } from "@/components/shared/brand-logo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ROUTES } from "@/constants/routes";
import { Play, ArrowUpRight, Clock, Calendar, Phone } from "lucide-react";

export interface StoryItem {
  id: string;
  image: string;
  quote: string;
  attribution: string;
  date: string;
  watchTime: string;
  videoUrl: string;
  badge?: string;
}

export function RecoveryStoriesSection() {
  const t = useTranslations("marketing.stories");
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);

  const storiesData: StoryItem[] = [
    {
      id: "story-1",
      image: "/images/stories/story-rehab-center.jpg",
      badge: t("badge"),
      quote: t("s1Quote"),
      attribution: t("s1Attr"),
      date: t("date"),
      watchTime: t("watchTime", { time: 8 }),
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    {
      id: "story-2",
      image: "/images/stories/story-saman.jpg",
      badge: t("badge"),
      quote: t("s2Quote"),
      attribution: t("s2Attr"),
      date: t("date"),
      watchTime: t("watchTime", { time: 3 }),
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: "story-3",
      image: "/images/stories/story-counseling.jpg",
      badge: t("badge"),
      quote: t("s3Quote"),
      attribution: t("s3Attr"),
      date: t("date"),
      watchTime: t("watchTime", { time: 5 }),
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
  ];

  const [leadStory, rightStory1, rightStory2] = storiesData;

  return (
    <section id="stories" className="relative w-full bg-[#FFFDF0] dark:bg-[#000000] transition-colors py-16 sm:py-20 lg:py-24 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header: Centered Eyebrow, Heading, and Lead */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 select-none justify-center">
            <BrandEmblem size="sm" priority />
            <span className="text-[11px] sm:text-xs font-bold text-[#171717] dark:text-[#FAFAFA] tracking-tight">
              {t("eyebrow")}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171717] dark:text-white tracking-tight leading-[1.12]">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h2>

          {/* Subtitle / Lead Paragraph */}
          <p className="text-sm sm:text-base text-[#525252] dark:text-[#A3A3A3] max-w-2xl mx-auto leading-relaxed pt-1">
            {t("lead")}
          </p>
        </div>

        {/* Asymmetric 3-Card Stories Grid with Bold Tilts and Solid Shadows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-stretch py-4 px-2 sm:px-3">
          {/* LEFT COLUMN: Featured Large Tall Card (Story 1 - Tilted Left) */}
          <div className="lg:col-span-6 flex py-3">
            <div
              onClick={() => setActiveStory(leadStory)}
              style={{ transform: "rotate(-2.5deg)" }}
              className="story-tilted-card story-card-left -rotate-[2.5deg] w-full rounded-[26px] overflow-hidden border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 shadow-[7px_7px_0px_0px_#882637] dark:shadow-[7px_7px_0px_0px_#511B25] group cursor-pointer flex flex-col justify-between"
            >
              {/* Photo Area with Centered Play Button */}
              <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] xl:h-[510px] overflow-hidden bg-neutral-900 shrink-0 border-b-[2.5px] border-[#882637]">
                <Image
                  src={leadStory.image}
                  alt={leadStory.quote}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

                {/* Circular Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white dark:bg-black/90 border-2 border-[#882637] shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center text-[#882637] group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-6 w-6 sm:h-7 sm:w-7 fill-[#882637] text-[#882637] ml-1" />
                  </div>
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-[#FFFBEB] dark:bg-neutral-900">
                <div>
                  {/* Badge & Arrow Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-[#882637] dark:text-[#F29EAA] bg-[#FDF2F4] dark:bg-[#320F16] border border-[#882637]/40 dark:border-[#511B25] px-3 py-1 rounded-full uppercase tracking-wider">
                      {leadStory.badge}
                    </span>
                    <button
                      type="button"
                      aria-label="View story"
                      className="h-8 w-8 rounded-full border-2 border-[#882637] bg-[#882637] text-white flex items-center justify-center shadow-[2px_2px_0px_0px_#000000] group-hover:bg-white group-hover:text-[#882637] transition-all"
                    >
                      <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Headline Quote */}
                  <h3 className="text-base sm:text-lg font-black text-[#171717] dark:text-white leading-snug mt-3.5">
                    {leadStory.quote}
                  </h3>

                  {/* Attribution */}
                  <p className="text-xs text-[#525252] dark:text-neutral-400 mt-1.5 font-semibold leading-relaxed">
                    {leadStory.attribution}
                  </p>
                </div>

                {/* Meta Footer */}
                <div>
                  <div className="border-t border-[#882637]/20 dark:border-neutral-800 my-4" />
                  <div className="flex items-center gap-2 text-xs text-[#525252] dark:text-neutral-400 font-semibold">
                    <span>{leadStory.date}</span>
                    <span>|</span>
                    <span>{leadStory.watchTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 2 Stacked Landscape Cards (Story 2 & Story 3 - Tilted Opposite) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-7 lg:gap-9 py-2">
            {/* Story 2 (Top - Tilted Right) */}
            <div
              onClick={() => setActiveStory(rightStory1)}
              style={{ transform: "rotate(2.2deg)" }}
              className="story-tilted-card story-card-right-1 rotate-[2.2deg] w-full rounded-[26px] overflow-hidden border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 shadow-[7px_7px_0px_0px_#882637] dark:shadow-[7px_7px_0px_0px_#511B25] group cursor-pointer flex flex-col flex-1"
            >
              {/* Photo Area */}
              <div className="relative w-full h-[190px] sm:h-[220px] overflow-hidden bg-neutral-900 shrink-0 border-b-[2.5px] border-[#882637]">
                <Image
                  src={rightStory1.image}
                  alt={rightStory1.quote}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-white dark:bg-black/90 border-2 border-[#882637] shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center text-[#882637] group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-5 w-5 sm:h-6 sm:w-6 fill-[#882637] text-[#882637] ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-[#FFFBEB] dark:bg-neutral-900">
                <div>
                  {/* Badge & Arrow Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-[#882637] dark:text-[#F29EAA] bg-[#FDF2F4] dark:bg-[#320F16] border border-[#882637]/40 dark:border-[#511B25] px-3 py-1 rounded-full uppercase tracking-wider">
                      {rightStory1.badge}
                    </span>
                    <button
                      type="button"
                      aria-label="View story"
                      className="h-8 w-8 rounded-full border-2 border-[#882637] bg-[#882637] text-white flex items-center justify-center shadow-[2px_2px_0px_0px_#000000] group-hover:bg-white group-hover:text-[#882637] transition-all"
                    >
                      <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Headline Quote */}
                  <h3 className="text-base sm:text-lg font-black text-[#171717] dark:text-white leading-snug mt-3">
                    {rightStory1.quote}
                  </h3>

                  {/* Attribution */}
                  <p className="text-xs text-[#525252] dark:text-neutral-400 mt-1 font-semibold">
                    {rightStory1.attribution}
                  </p>
                </div>

                {/* Meta Footer */}
                <div>
                  <div className="border-t border-[#882637]/20 dark:border-neutral-800 my-3.5" />
                  <div className="flex items-center gap-2 text-xs text-[#525252] dark:text-neutral-400 font-semibold">
                    <span>{rightStory1.date}</span>
                    <span>|</span>
                    <span>{rightStory1.watchTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Story 3 (Bottom - Tilted Left) */}
            <div
              onClick={() => setActiveStory(rightStory2)}
              style={{ transform: "rotate(-2deg)" }}
              className="story-tilted-card story-card-right-2 -rotate-[2deg] w-full rounded-[26px] overflow-hidden border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 shadow-[7px_7px_0px_0px_#882637] dark:shadow-[7px_7px_0px_0px_#511B25] group cursor-pointer flex flex-col flex-1"
            >
              {/* Photo Area */}
              <div className="relative w-full h-[190px] sm:h-[220px] overflow-hidden bg-neutral-900 shrink-0 border-b-[2.5px] border-[#882637]">
                <Image
                  src={rightStory2.image}
                  alt={rightStory2.quote}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-white dark:bg-black/90 border-2 border-[#882637] shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center text-[#882637] group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-5 w-5 sm:h-6 sm:w-6 fill-[#882637] text-[#882637] ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-[#FFFBEB] dark:bg-neutral-900">
                <div>
                  {/* Badge & Arrow Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-[#882637] dark:text-[#F29EAA] bg-[#FDF2F4] dark:bg-[#320F16] border border-[#882637]/40 dark:border-[#511B25] px-3 py-1 rounded-full uppercase tracking-wider">
                      {rightStory2.badge}
                    </span>
                    <button
                      type="button"
                      aria-label="View story"
                      className="h-8 w-8 rounded-full border-2 border-[#882637] bg-[#882637] text-white flex items-center justify-center shadow-[2px_2px_0px_0px_#000000] group-hover:bg-white group-hover:text-[#882637] transition-all"
                    >
                      <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Headline Quote */}
                  <h3 className="text-base sm:text-lg font-black text-[#171717] dark:text-white leading-snug mt-3">
                    {rightStory2.quote}
                  </h3>

                  {/* Attribution */}
                  <p className="text-xs text-[#525252] dark:text-neutral-400 mt-1 font-semibold">
                    {rightStory2.attribution}
                  </p>
                </div>

                {/* Meta Footer */}
                <div>
                  <div className="border-t border-[#882637]/20 dark:border-neutral-800 my-3.5" />
                  <div className="flex items-center gap-2 text-xs text-[#525252] dark:text-neutral-400 font-semibold">
                    <span>{rightStory2.date}</span>
                    <span>|</span>
                    <span>{rightStory2.watchTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Outline CTA Button: Explore More Stories */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <Link href={ROUTES.NEWS}>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#882637] text-[#882637] hover:bg-[#882637] hover:text-white dark:border-[#F29EAA] dark:text-[#F29EAA] dark:hover:bg-[#882637] dark:hover:text-white text-sm sm:text-base font-bold h-11 px-8 rounded-xl shadow-[3px_3px_0px_0px_#882637] hover:shadow-[5px_5px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511b25] dark:hover:shadow-[5px_5px_0px_0px_#511b25] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              {t("exploreMore")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Interactive Video Playback Modal */}
      {activeStory && (
        <Modal
          isOpen={Boolean(activeStory)}
          onClose={() => setActiveStory(null)}
          title={t("modalTitle")}
          description={activeStory.attribution}
          className="max-w-3xl"
        >
          <div className="space-y-4">
            {/* HTML5 Video Player with Sample Video */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black shadow-inner">
              <video
                src={activeStory.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
                poster={activeStory.image}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Quote & Details inside Modal */}
            <div className="bg-[#FFFDF0] dark:bg-neutral-800 p-4 rounded-xl border border-[#E5E0D5] dark:border-neutral-700">
              <p className="text-sm sm:text-base font-semibold text-[#171717] dark:text-white leading-relaxed">
                {activeStory.quote}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-[#E5E0D5]/60 dark:border-neutral-700 text-xs text-[#737373] dark:text-neutral-400">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {activeStory.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {activeStory.watchTime}
                  </span>
                </div>

                <a
                  href="tel:1927"
                  className="font-bold text-[#882637] dark:text-[#F29EAA] hover:underline inline-flex items-center gap-1"
                >
                  <Phone className="h-3.5 w-3.5 fill-current" />
                  <span>{t("modalHotline")}</span>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
