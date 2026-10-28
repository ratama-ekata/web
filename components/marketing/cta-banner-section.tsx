"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { ROUTES } from "@/constants/routes";
import { Phone, ArrowUpRight, Heart } from "lucide-react";

export interface CtaBannerProps {
  className?: string;
  id?: string;
}

/**
 * Reusable CTA Banner Component used across Home Page and Report Page
 */
export function CtaBannerSection({
  className = "",
  id = "report",
}: CtaBannerProps) {
  const t = useTranslations("marketing.cta");
  const pathname = usePathname();
  const isReportPage = pathname === ROUTES.REPORT || pathname.includes("/report");

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FFFDF0] dark:bg-[#000000] transition-colors py-12 sm:py-16 lg:py-20 scroll-mt-16 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        {/* Deep Maroon Banner Card with Neo-Brutalist Border & Shadow */}
        <div className="cta-tilted-banner rounded-[26px] sm:rounded-[32px] bg-[#2D0F16] dark:bg-[#1E080E] border-[2.5px] border-[#882637] p-8 sm:p-12 md:p-14 lg:p-16 text-center shadow-[8px_8px_0px_0px_#882637] dark:shadow-[8px_8px_0px_0px_#511B25] transition-all cursor-default">
          {/* Main Statement */}
          <p className="text-sm sm:text-base md:text-[16px] text-white/95 max-w-3xl mx-auto leading-relaxed font-medium">
            {t("statement")}
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 pt-8 sm:pt-10 pb-6">
            {/* Call 1818 */}
            <a
              href="tel:1818"
              className="h-12 px-6 sm:px-8 rounded-2xl bg-white hover:bg-neutral-100 text-[#171717] font-black text-sm sm:text-base border-2 border-white shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000000] transition-all inline-flex items-center gap-2.5 cursor-pointer"
              title={t("call1818")}
            >
              <Phone className="h-4 w-4 fill-[#171717] text-[#171717] shrink-0" />
              <span>{t("call1818")}</span>
            </a>

            {/* Report Drug Activity */}
            <Link
              href={ROUTES.REPORT}
              onClick={(e) => {
                if (isReportPage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="h-12 px-6 sm:px-8 rounded-2xl bg-[#882637] hover:bg-[#9E2C3F] text-white font-black text-sm sm:text-base border-2 border-[#F29EAA]/60 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000000] transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{t("reportCta")}</span>
              <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          </div>

          {/* Bottom Rehabilitation Helper */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-white/90 px-4 py-1.5 rounded-full bg-black/30 border border-white/15 backdrop-blur-xs mt-2">
            <Heart className="h-4 w-4 text-[#F29EAA] fill-[#F29EAA]/20 stroke-[2] shrink-0" />
            <span>{t("rehabQuestion")}</span>
            <a
              href="tel:1927"
              className="font-black text-white underline hover:text-[#F29EAA] transition-colors cursor-pointer"
            >
              {t("rehabCall")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export const CtaBanner = CtaBannerSection;
