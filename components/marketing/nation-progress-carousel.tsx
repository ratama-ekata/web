"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BrandEmblem } from "@/components/shared/brand-logo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export interface ProgressNewsItem {
  id: string;
  badge: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
}

export function NationProgressCarousel() {
  const t = useTranslations("marketing.progress");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const progressNewsItems: ProgressNewsItem[] = [
    {
      id: "news-1",
      badge: t("n1Badge"),
      title: t("n1Title"),
      date: t("n1Date"),
      readTime: t("readTime", { time: 8 }),
      image: "/images/news/news-media-center.jpg",
      href: ROUTES.NEWS,
    },
    {
      id: "news-2",
      badge: t("n2Badge"),
      title: t("n2Title"),
      date: t("n2Date"),
      readTime: t("readTime", { time: 8 }),
      image: "/images/news/news-awareness-meeting.jpg",
      href: ROUTES.NEWS,
    },
    {
      id: "news-3",
      badge: t("n3Badge"),
      title: t("n3Title"),
      date: t("n3Date"),
      readTime: t("readTime", { time: 5 }),
      image: "/images/news/news-coastal-patrol.jpg",
      href: ROUTES.NEWS,
    },
    {
      id: "news-4",
      badge: t("n4Badge"),
      title: t("n4Title"),
      date: t("n4Date"),
      readTime: t("readTime", { time: 6 }),
      image: "/images/news/news-youth-summit.jpg",
      href: ROUTES.NEWS,
    },
  ];

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability, { passive: true });
      window.addEventListener("resize", checkScrollability);
      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth >= 768 ? container.clientWidth * 0.52 : container.clientWidth * 0.88;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="news" className="relative w-full bg-[#FFFDF0] dark:bg-[#000000] transition-colors py-16 sm:py-20 lg:py-24 overflow-hidden scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Row: Eyebrow + Split Title and Carousel Navigation Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="space-y-3">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 select-none">
              <BrandEmblem size="sm" priority />
              <span className="text-[11px] sm:text-xs font-bold text-[#171717] dark:text-[#FAFAFA] tracking-tight">
                {t("eyebrow")}
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#171717] dark:text-white tracking-tight leading-[1.12]">
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </h2>
          </div>

          {/* Carousel Arrow Controls (Neo-Brutalist Buttons) */}
          <div className="flex items-center gap-3 self-end sm:self-auto shrink-0 pb-1">
            {/* Previous Button (Circular Outline with Solid Shadow) */}
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className="h-12 w-12 rounded-full border-2 border-[#882637] bg-white text-[#882637] flex items-center justify-center shadow-[3px_3px_0px_0px_#882637] hover:shadow-[5px_5px_0px_0px_#882637] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#882637] transition-all cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none"
              aria-label={t("prevBtn")}
              title={t("prevBtn")}
            >
              <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
            </button>

            {/* Next Button (Solid Maroon Circular Button with Solid Shadow) */}
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className="h-12 w-12 rounded-full border-2 border-[#882637] bg-[#882637] text-white flex items-center justify-center shadow-[3px_3px_0px_0px_#000000] hover:shadow-[5px_5px_0px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000000] transition-all cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none"
              aria-label={t("nextBtn")}
              title={t("nextBtn")}
            >
              <ChevronRight className="h-5 w-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Carousel Slider Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-7 lg:gap-9 overflow-x-auto scroll-smooth snap-x snap-mandatory py-6 px-2 sm:px-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {progressNewsItems.map((item, index) => {
            const rotAngles = ["-2.4deg", "2.2deg", "-2deg", "2.4deg"];
            const currentRot = rotAngles[index % 4];

            return (
              <div
                key={item.id}
                className="w-[88vw] sm:w-[440px] md:w-[calc(50%-14px)] lg:w-[calc(50%-18px)] shrink-0 snap-start flex py-2"
              >
                <Link href={item.href} className="w-full flex group">
                  <div
                    style={{ transform: `rotate(${currentRot})` }}
                    className={`progress-tilted-card progress-card-pos-${index % 4} w-full rounded-[24px] sm:rounded-[26px] overflow-hidden border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] flex flex-col justify-between cursor-pointer`}
                  >
                    {/* Photo Thumbnail with Bottom Border */}
                    <div className="relative w-full aspect-[16/10] sm:h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden bg-neutral-900 shrink-0 border-b-[2.5px] border-[#882637]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 90vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors" />
                    </div>

                  {/* Bottom Cream Content Block */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-[#FFFBEB] dark:bg-neutral-900">
                    <div>
                      {/* Top Row: Pill Badge + Circular Arrow Icon Button */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-[#882637] dark:text-[#F29EAA] bg-[#FDF2F4] dark:bg-[#320F16] border border-[#882637]/40 dark:border-[#511B25] px-3 py-1 rounded-full uppercase tracking-wider">
                          {item.badge}
                        </span>
                        <div className="h-8 w-8 rounded-full border-2 border-[#882637] bg-[#882637] text-white flex items-center justify-center shadow-[2px_2px_0px_0px_#000000] group-hover:bg-white group-hover:text-[#882637] transition-all">
                          <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Title Headline */}
                      <h3 className="text-base sm:text-lg font-black text-[#171717] dark:text-white leading-snug mt-3.5 line-clamp-2 group-hover:text-[#882637] dark:group-hover:text-[#F8C9D0] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Metadata Footer */}
                    <div>
                      <div className="border-t border-[#882637]/20 dark:border-neutral-800 my-4" />
                      <div className="flex items-center gap-2 text-xs text-[#525252] dark:text-neutral-400 font-semibold">
                        <span>{item.date}</span>
                        <span>|</span>
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

        {/* Centered Outline CTA Button: Explore More Updates */}
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
    </section>
  );
}
