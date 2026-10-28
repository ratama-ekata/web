"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BrandLogo } from "@/components/shared/brand-logo";
import { ROUTES } from "@/constants/routes";
import { Phone } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-[#E5E0D5] bg-white dark:bg-[#000000] text-[#171717] dark:text-neutral-100 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* 5-Column Grid Matched to Reference Screenshot (3-2-2-2-3 distribution) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8">
          {/* Column 1: Brand Logo, Official Address, Phone/Fax/Email, Social Icons */}
          <div className="lg:col-span-3 space-y-4">
            {/* Brand Logo (Stacked 4 figures + trilingual text) */}
            <Link href={ROUTES.HOME} className="inline-block select-none" aria-label="Rata Ma Ekata">
              <BrandLogo size="md" variant="stacked" />
            </Link>

            {/* Address */}
            <div className="text-xs sm:text-[13px] text-[#525252] dark:text-[#A3A3A3] leading-relaxed pt-0.5">
              <p>{t("addressLine1")}</p>
              <p>{t("addressLine2")}</p>
              <p>{t("addressLine3")}</p>
            </div>

            {/* Telephone, Fax, Email */}
            <div className="text-xs sm:text-[13px] text-[#525252] dark:text-[#A3A3A3] leading-relaxed space-y-0.5 pt-0.5">
              <p>
                Tel:{" "}
                <a href="tel:+94112354354" className="hover:text-[#171717] dark:hover:text-white transition-colors">
                  +94 (0) 11 2 354 354
                </a>
              </p>
              <p>Fax: +94 (0) 11 2 340 340</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:ps@presidentsoffice.lk"
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors"
                >
                  ps@presidentsoffice.lk
                </a>
              </p>
            </div>

            {/* Social Media Icons (YouTube, Facebook, X, Instagram, LinkedIn) */}
            <div className="flex items-center gap-4 text-[#171717] dark:text-white pt-2">
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="hover:text-[#882637] dark:hover:text-[#F29EAA] transition-colors"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-[#882637] dark:hover:text-[#F29EAA] transition-colors"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="hover:text-[#882637] dark:hover:text-[#F29EAA] transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-[#882637] dark:hover:text-[#F29EAA] transition-colors"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[#882637] dark:hover:text-[#F29EAA] transition-colors"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Official Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-[#171717] dark:text-white tracking-tight">
              {t("officialLinksTitle")}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#525252] dark:text-[#A3A3A3]">
              <li>
                <a
                  href="https://defence.lk"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors leading-snug block"
                >
                  {t("ministryLink")}
                </a>
              </li>
              <li>
                <a
                  href="https://presidentsoffice.gov.lk"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors leading-snug block"
                >
                  {t("presidentialLink")}
                </a>
              </li>
              <li>
                <a
                  href="https://police.lk"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors leading-snug block"
                >
                  {t("policeLink")}
                </a>
              </li>
              <li>
                <a
                  href="https://pmd.gov.lk"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors leading-snug block"
                >
                  {t("pmdLink")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-[#171717] dark:text-white tracking-tight">
              {t("resourcesTitle")}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#525252] dark:text-[#A3A3A3]">
              <li>
                <Link
                  href={ROUTES.RESOURCES}
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors block"
                >
                  {t("circulars")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.RESOURCES}
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors block"
                >
                  {t("cabinetDecisions")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.RESOURCES}
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors block"
                >
                  {t("reports")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.RESOURCES}
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors block"
                >
                  {t("downloads")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.RESOURCES}
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors block"
                >
                  {t("faqs")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: The Movement */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-[#171717] dark:text-white tracking-tight">
              {t("movementTitle")}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#525252] dark:text-[#A3A3A3]">
              <li>
                <Link
                  href={ROUTES.ABOUT}
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors block"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.REHABILITATION}
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors block"
                >
                  {t("rehabilitation")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.OUR_RESPONSE}
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors block"
                >
                  {t("whatWeDo")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.REPORT}
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors block"
                >
                  {t("howToReport")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.ABOUT}
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors block"
                >
                  {t("joinMovement")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.NEWS}
                  className="hover:text-[#882637] dark:hover:text-[#F8C9D0] transition-colors block"
                >
                  {t("recentStories")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: National Hotlines (Two distinct cards) */}
          <div id="hotlines" className="lg:col-span-3 space-y-3.5 scroll-mt-16">
            <h4 className="text-sm font-bold text-[#171717] dark:text-white tracking-tight">
              {t("hotlinesTitle")}
            </h4>

            <div className="space-y-4 pt-1">
              {/* Card 1: Report Drug Activity */}
              <a
                href="tel:1818"
                className="footer-card-item footer-card-top group block rounded-2xl border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] p-3.5 sm:p-4 shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#525252] dark:text-neutral-400 font-semibold">
                  <Phone className="h-3.5 w-3.5 text-[#882637] dark:text-[#F29EAA]" />
                  <span>{t("reportActivity")}</span>
                </div>
                <div className="flex items-center justify-between mt-1.5 pt-0.5">
                  <span className="text-2xl sm:text-[26px] font-black text-[#171717] dark:text-white tracking-tight group-hover:text-[#882637] dark:group-hover:text-[#F29EAA] transition-colors">
                    1818
                  </span>
                  <span className="text-[10px] sm:text-[10.5px] font-black text-white uppercase tracking-wider bg-[#882637] border border-[#882637] px-2.5 py-1 rounded-full shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]">
                    {t("tollFree")}
                  </span>
                </div>
              </a>

              {/* Card 2: Rehabilitation Support */}
              <a
                href="tel:1927"
                className="footer-card-item footer-card-bottom group block rounded-2xl border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] p-3.5 sm:p-4 shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#525252] dark:text-neutral-400 font-semibold">
                  <Phone className="h-3.5 w-3.5 text-[#882637] dark:text-[#F29EAA]" />
                  <span>{t("rehabSupport")}</span>
                </div>
                <div className="flex items-center justify-between mt-1.5 pt-0.5">
                  <span className="text-2xl sm:text-[26px] font-black text-[#171717] dark:text-white tracking-tight group-hover:text-[#882637] dark:group-hover:text-[#F29EAA] transition-colors">
                    1927
                  </span>
                  <span className="text-[10px] sm:text-[10.5px] font-black text-white uppercase tracking-wider bg-[#171717] dark:bg-neutral-800 border border-[#171717] dark:border-neutral-700 px-2.5 py-1 rounded-full shadow-[2px_2px_0px_0px_#882637]">
                    {t("confidential")}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="border-t border-[#E5E0D5] dark:border-neutral-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#737373] dark:text-neutral-400 gap-4">
          <p>{t("copyright")}</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href={ROUTES.ABOUT}
              className="text-[#525252] dark:text-neutral-400 underline underline-offset-4 hover:text-[#171717] dark:hover:text-white transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href={ROUTES.ABOUT}
              className="text-[#525252] dark:text-neutral-400 underline underline-offset-4 hover:text-[#171717] dark:hover:text-white transition-colors"
            >
              {t("terms")}
            </Link>
            <button
              type="button"
              className="text-[#525252] dark:text-neutral-400 underline underline-offset-4 hover:text-[#171717] dark:hover:text-white transition-colors cursor-pointer"
            >
              {t("cookies")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
