"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export interface NewsArticleItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
}

const ITEMS_PER_PAGE = 10;

export function NewsList() {
  const t = useTranslations("news");
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  // Retrieve news items from locale translation file
  let items: NewsArticleItem[] = [];
  try {
    items = t.raw("items") as NewsArticleItem[];
  } catch {
    items = [];
  }

  // Initialize page from URL query string on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const pageParam = parseInt(params.get("page") || "1", 10);
      if (!isNaN(pageParam) && pageParam >= 1) {
        setCurrentPage(pageParam);
      }
    }
  }, []);

  if (!items || items.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const validatedPage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  const startIndex = (validatedPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, items.length);
  const currentBatch = items.slice(startIndex, endIndex);

  const featured = currentBatch[0];
  const regularItems = currentBatch.slice(1);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === validatedPage) return;
    setCurrentPage(newPage);

    // Update query string without full reload
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("page", newPage.toString());
      window.history.pushState({}, "", url.toString());

      // Smooth scroll back to the top of news feed
      if (topRef.current) {
        const yOffset = -90; // offset for sticky navbar
        const y =
          topRef.current.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  // Generate pagination page numbers
  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (validatedPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (validatedPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", validatedPage - 1, validatedPage, validatedPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <section ref={topRef} id="news-feed-top" className="relative w-full pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Featured News Item (Image 1 top element) */}
        {featured && (
          <article className="group grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 lg:gap-10 items-center">
            {/* Featured Image */}
            <div className="md:col-span-6 lg:col-span-6 py-2 px-1 sm:px-2">
              <Link
                href={`/news/${featured.slug}`}
                className="news-image-frame news-image-featured relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-2 border-[#882637] shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] block cursor-pointer"
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  priority
                />
              </Link>
            </div>

            {/* Featured Content */}
            <div className="flex flex-col justify-between h-full md:col-span-6 lg:col-span-6">
              <div>
                <Link href={`/news/${featured.slug}`}>
                  <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-black leading-[1.18] tracking-tight text-[#0F172A] dark:text-zinc-100 hover:text-[#8A1C2B] dark:hover:text-[#F29EAA] transition-colors">
                    {featured.title}
                  </h2>
                </Link>

                <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-[#52525B] dark:text-zinc-400 line-clamp-4">
                  {featured.description}
                </p>

                <Link
                  href={`/news/${featured.slug}`}
                  className="mt-3.5 sm:mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8A1C2B] dark:text-[#F29EAA] hover:text-[#701622] hover:underline group/btn w-fit"
                >
                  <span>{t("readFull")}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>

              {/* Meta row at bottom (Date and Author only) */}
              <div className="mt-5 sm:mt-6 pt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-[13px] text-[#64748B] dark:text-zinc-400">
                <span>{featured.date}</span>
                <span className="text-[#CBD5E1] dark:text-zinc-700">|</span>
                <span>{featured.author}</span>
              </div>
            </div>
          </article>
        )}

        {/* Divider between featured and subsequent items */}
        {regularItems.length > 0 && (
          <hr className="my-8 sm:my-10 border-t border-[#E8E6DD] dark:border-zinc-800" />
        )}

        {/* Subsequent News Rows (Image 1 list items) */}
        <div className="space-y-8 sm:space-y-10">
          {regularItems.map((item, index) => {
            const rotClass = index % 2 === 0 ? "news-image-left" : "news-image-right";
            return (
              <React.Fragment key={item.slug || index}>
                <article className="group flex flex-col sm:flex-row gap-5 sm:gap-6 lg:gap-8 items-start sm:items-center">
                  {/* Thumbnail Image */}
                  <div className="shrink-0 py-2 px-1 sm:px-2">
                    <Link
                      href={`/news/${item.slug}`}
                      className={`news-image-frame ${rotClass} relative aspect-[16/10] w-full sm:w-[240px] md:w-[280px] shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 border-2 border-[#882637] shadow-[5px_5px_0px_0px_#882637] dark:shadow-[5px_5px_0px_0px_#511B25] block cursor-pointer`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 280px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </Link>
                  </div>

                  {/* Article Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/news/${item.slug}`}>
                      <h3 className="text-base sm:text-lg lg:text-[19px] font-black leading-snug tracking-tight text-[#0F172A] dark:text-zinc-100 hover:text-[#8A1C2B] dark:hover:text-[#F29EAA] transition-colors">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#52525B] dark:text-zinc-400 line-clamp-2">
                      {item.description}
                    </p>

                    <Link
                      href={`/news/${item.slug}`}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8A1C2B] dark:text-[#F29EAA] hover:text-[#701622] hover:underline group/btn w-fit"
                    >
                      <span>{t("readMore")}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>

                    {/* Meta row at bottom (Date and Author only) */}
                    <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#64748B] dark:text-zinc-400">
                      <span>{item.date}</span>
                      <span className="text-[#CBD5E1] dark:text-zinc-700">|</span>
                      <span>{item.author}</span>
                    </div>
                  </div>
                </article>

                {/* Row divider, except for last item */}
                {index < regularItems.length - 1 && (
                  <hr className="border-t border-[#E8E6DD] dark:border-zinc-800" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Divider above pagination */}
        <hr className="my-10 sm:my-12 border-t border-[#E8E6DD] dark:border-zinc-800" />

        {/* Pagination Section (One page shows 10 news) */}
        {totalPages > 1 && (
          <nav
            aria-label="News Pagination"
            className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2"
          >
            {/* Showing status counter */}
            <p className="text-xs sm:text-[13px] font-medium text-[#64748B] dark:text-zinc-400 order-2 sm:order-1">
              {t("pagination.showing", {
                start: startIndex + 1,
                end: endIndex,
                total: items.length,
              })}
            </p>

            {/* Pagination Controls */}
            <div className="inline-flex items-center gap-1.5 order-1 sm:order-2">
              {/* Previous Page Button */}
              <button
                type="button"
                onClick={() => handlePageChange(validatedPage - 1)}
                disabled={validatedPage <= 1}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-[#E8E6DD] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#171717] dark:text-zinc-200 hover:bg-[#F9F8F3] dark:hover:bg-zinc-800/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                aria-label={t("pagination.previous")}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden xs:inline">{t("pagination.previous")}</span>
              </button>

              {/* Numbered Page Buttons */}
              <div className="flex items-center gap-1">
                {renderPageNumbers().map((page, idx) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-2 py-1 text-xs text-zinc-400 dark:text-zinc-500 select-none"
                      >
                        …
                      </span>
                    );
                  }

                  const pageNum = page as number;
                  const isActive = pageNum === validatedPage;

                  return (
                    <button
                      key={`page-${pageNum}`}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      aria-current={isActive ? "page" : undefined}
                      className={`min-w-[36px] h-9 px-2.5 flex items-center justify-center text-xs sm:text-sm font-bold rounded-lg transition-all shadow-2xs cursor-pointer ${
                        isActive
                          ? "bg-[#8A1C2B] text-white border border-[#8A1C2B]"
                          : "border border-[#E8E6DD] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#52525B] dark:text-zinc-300 hover:bg-[#F9F8F3] dark:hover:bg-zinc-800/80"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Page Button */}
              <button
                type="button"
                onClick={() => handlePageChange(validatedPage + 1)}
                disabled={validatedPage >= totalPages}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-[#E8E6DD] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#171717] dark:text-zinc-200 hover:bg-[#F9F8F3] dark:hover:bg-zinc-800/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                aria-label={t("pagination.next")}
              >
                <span className="hidden xs:inline">{t("pagination.next")}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        )}
      </div>
    </section>
  );
}
