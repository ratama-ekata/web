"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BrandEmblem } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Plus, Minus } from "lucide-react";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export function FaqSection() {
  const t = useTranslations("marketing.faq");
  // All items closed by default so all tilted shadow boxes are immediately visible
  const [openId, setOpenId] = useState<string | null>(null);

  const faqItems: FaqItem[] = [
    {
      id: "faq-1",
      question: t("q1"),
      answer: t("a1"),
    },
    {
      id: "faq-2",
      question: t("q2"),
      answer: t("a2"),
    },
    {
      id: "faq-3",
      question: t("q3"),
      answer: t("a3"),
    },
    {
      id: "faq-4",
      question: t("q4"),
      answer: t("a4"),
    },
    {
      id: "faq-5",
      question: t("q5"),
      answer: t("a5"),
    },
  ];

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative w-full bg-[#FFFDF0] dark:bg-[#000000] transition-colors py-16 sm:py-20 lg:py-24 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Eyebrow, Main Headline, Subtitle, See All CTA */}
          <div className="lg:col-span-5 space-y-4">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 select-none">
              <BrandEmblem size="sm" priority />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#171717] dark:text-[#FAFAFA]">
                {t("eyebrow")}
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-black text-[#171717] dark:text-white tracking-tight leading-[1.12]">
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#525252] dark:text-[#A3A3A3] max-w-md leading-relaxed pt-1">
              {t("lead")}
            </p>

            {/* See All Button */}
            <div className="pt-2">
              <Link href={ROUTES.RESOURCES}>
                <Button
                  variant="outline"
                  size="md"
                  className="border-2 border-[#882637] text-[#882637] hover:bg-[#882637] hover:text-white dark:border-[#F29EAA] dark:text-[#F29EAA] dark:hover:bg-[#882637] dark:hover:text-white text-sm sm:text-base font-bold h-11 px-7 rounded-xl shadow-[3px_3px_0px_0px_#882637] hover:shadow-[5px_5px_0px_0px_#882637] dark:shadow-[3px_3px_0px_0px_#511b25] dark:hover:shadow-[5px_5px_0px_0px_#511b25] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  {t("seeAll")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Accordion List with Tilted Stance & Swaying Hover */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 py-4 px-2 sm:px-4">
            {faqItems.map((item, index) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`faq-tilted-item faq-item-pos-${index % 5} ${
                    isOpen ? "faq-item-open" : ""
                  } rounded-[22px] sm:rounded-[24px] border-[2.5px] border-[#882637] bg-[#FFFBEB] dark:bg-neutral-900 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511b25] overflow-hidden`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-5 sm:px-7 py-4.5 sm:py-5 flex items-center justify-between text-left transition-colors cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-sm sm:text-base font-bold pr-4 leading-snug transition-colors ${
                        isOpen
                          ? "text-[#882637] dark:text-[#F8C9D0]"
                          : "text-[#171717] dark:text-white group-hover:text-[#882637] dark:group-hover:text-[#F8C9D0]"
                      }`}
                    >
                      {item.question}
                    </span>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                        isOpen
                          ? "border-[#882637] bg-[#882637] text-white dark:bg-[#F29EAA] dark:text-black dark:border-[#F29EAA]"
                          : "border-[#882637]/40 bg-white/80 dark:bg-neutral-800 text-[#882637] dark:text-white group-hover:border-[#882637] group-hover:bg-[#FDF2F4] dark:group-hover:bg-[#320F16]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="h-4 w-4 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-7 pb-5 pt-2 text-xs sm:text-[14px] text-[#404040] dark:text-neutral-300 leading-relaxed border-t border-[#882637]/20 dark:border-neutral-800">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
