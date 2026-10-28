"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Shield,
  HeartHandshake,
  AlertCircle,
} from "lucide-react";

export function ContactContent() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    subject: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contact || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        contact: "",
        subject: "general",
        message: "",
      });
    }, 800);
  };

  return (
    <section className="relative w-full pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 12-Column Grid with Equal Height Columns (items-stretch) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT SIDE: Send an Inquiry or Feedback (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="contact-form-card h-full rounded-[28px] sm:rounded-[32px] border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] p-6 sm:p-8 lg:p-10 shadow-[7px_7px_0px_0px_#882637] dark:shadow-[7px_7px_0px_0px_#511B25] flex flex-col justify-between cursor-default">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#171717] dark:text-zinc-50">
                  {t("form.title")}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#52525B] dark:text-zinc-400 leading-relaxed">
                  {t("form.subtitle")}
                </p>

                {isSuccess ? (
                  <div className="my-auto py-12 rounded-xl border border-[#FCE3CA] bg-[#FEF3C7] dark:bg-amber-950/30 dark:border-amber-900/50 p-6 text-center animate-in fade-in duration-300">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#8A1C2B] text-white">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-[#171717] dark:text-zinc-100">
                      {t("form.successTitle")}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#52525B] dark:text-zinc-300">
                      {t("form.successText")}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="mt-5 inline-flex items-center px-4 py-2 rounded-lg bg-[#8A1C2B] text-white text-xs font-bold hover:bg-[#701622] transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 flex-1 flex flex-col justify-between space-y-4 sm:space-y-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs sm:text-sm font-semibold text-[#18181B] dark:text-zinc-200 mb-1.5"
                      >
                        {t("form.nameLabel")}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder={t("form.namePlaceholder")}
                        className="w-full rounded-lg border border-[#E8E6DD] dark:border-zinc-800 bg-[#FAF9F5] dark:bg-zinc-800/60 px-4 py-2.5 text-xs sm:text-sm text-[#171717] dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#8A1C2B] dark:focus:ring-[#F29EAA] transition-all"
                      />
                    </div>

                    {/* Contact Channel */}
                    <div>
                      <label
                        htmlFor="contact-channel"
                        className="block text-xs sm:text-sm font-semibold text-[#18181B] dark:text-zinc-200 mb-1.5"
                      >
                        {t("form.contactLabel")}{" "}
                        <span className="text-[#8A1C2B] dark:text-[#F29EAA]">*</span>
                      </label>
                      <input
                        id="contact-channel"
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) =>
                          setFormData({ ...formData, contact: e.target.value })
                        }
                        placeholder={t("form.contactPlaceholder")}
                        className="w-full rounded-lg border border-[#E8E6DD] dark:border-zinc-800 bg-[#FAF9F5] dark:bg-zinc-800/60 px-4 py-2.5 text-xs sm:text-sm text-[#171717] dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#8A1C2B] dark:focus:ring-[#F29EAA] transition-all"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs sm:text-sm font-semibold text-[#18181B] dark:text-zinc-200 mb-1.5"
                      >
                        {t("form.subjectLabel")}
                      </label>
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full rounded-lg border border-[#E8E6DD] dark:border-zinc-800 bg-[#FAF9F5] dark:bg-zinc-800/60 px-4 py-2.5 text-xs sm:text-sm text-[#171717] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#8A1C2B] dark:focus:ring-[#F29EAA] transition-all"
                      >
                        <option value="general">{t("form.subjects.general")}</option>
                        <option value="rehab">{t("form.subjects.rehab")}</option>
                        <option value="volunteer">{t("form.subjects.volunteer")}</option>
                        <option value="media">{t("form.subjects.media")}</option>
                        <option value="other">{t("form.subjects.other")}</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex-1 flex flex-col">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs sm:text-sm font-semibold text-[#18181B] dark:text-zinc-200 mb-1.5"
                      >
                        {t("form.messageLabel")}{" "}
                        <span className="text-[#8A1C2B] dark:text-[#F29EAA]">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder={t("form.messagePlaceholder")}
                        className="w-full flex-1 min-h-[140px] rounded-lg border border-[#E8E6DD] dark:border-zinc-800 bg-[#FAF9F5] dark:bg-zinc-800/60 px-4 py-2.5 text-xs sm:text-sm text-[#171717] dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#8A1C2B] dark:focus:ring-[#F29EAA] transition-all resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#882637] hover:bg-[#701622] text-white text-xs sm:text-sm font-black border-2 border-[#882637] shadow-[3px_3px_0px_0px_#882637] hover:shadow-[5px_5px_0px_0px_#882637] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>{t("form.submitting")}</span>
                        ) : (
                          <>
                            <span>{t("form.submit")}</span>
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Hotlines & Headquarters Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-7 py-2">
            {/* Top Card: Emergency & Support Hotlines */}
            <div className="contact-hotlines-card flex-1 rounded-[26px] border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] p-6 sm:p-7 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] flex flex-col justify-between cursor-default">
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#882637] dark:text-[#F29EAA] tracking-tight">
                  {t("hotlines.title")}
                </h3>

                <div className="mt-4 space-y-2.5">
                  {/* 1818 */}
                  <a
                    href="tel:1818"
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-800/80 border-2 border-[#882637]/20 hover:border-[#882637] hover:shadow-[3px_3px_0px_0px_#882637] dark:hover:shadow-[3px_3px_0px_0px_#511B25] hover:-translate-y-0.5 hover:rotate-[-0.6deg] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-[#882637] text-white flex items-center justify-center shrink-0">
                        <Shield className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-[13px] font-bold text-[#171717] dark:text-zinc-100 group-hover:text-[#882637] dark:group-hover:text-[#F29EAA] transition-colors leading-tight">
                          {t("hotlines.h1Title")}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-[#64748B] dark:text-zinc-400 mt-0.5">
                          {t("hotlines.h1Sub")}
                        </p>
                      </div>
                    </div>
                    <Phone className="h-3.5 w-3.5 text-[#882637] dark:text-[#F29EAA] shrink-0" />
                  </a>

                  {/* 1927 */}
                  <a
                    href="tel:1927"
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-800/80 border-2 border-[#882637]/20 hover:border-[#882637] hover:shadow-[3px_3px_0px_0px_#882637] dark:hover:shadow-[3px_3px_0px_0px_#511B25] hover:-translate-y-0.5 hover:rotate-[-0.6deg] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-[#18181B] dark:bg-zinc-700 text-white flex items-center justify-center shrink-0">
                        <HeartHandshake className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-[13px] font-bold text-[#171717] dark:text-zinc-100 group-hover:text-[#882637] dark:group-hover:text-[#F29EAA] transition-colors leading-tight">
                          {t("hotlines.h2Title")}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-[#64748B] dark:text-zinc-400 mt-0.5">
                          {t("hotlines.h2Sub")}
                        </p>
                      </div>
                    </div>
                    <Phone className="h-3.5 w-3.5 text-[#882637] dark:text-[#F29EAA] shrink-0" />
                  </a>

                  {/* 119 */}
                  <a
                    href="tel:119"
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-800/80 border-2 border-[#882637]/20 hover:border-[#882637] hover:shadow-[3px_3px_0px_0px_#882637] dark:hover:shadow-[3px_3px_0px_0px_#511B25] hover:-translate-y-0.5 hover:rotate-[-0.6deg] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-[#3F3F46] text-white flex items-center justify-center shrink-0">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-[13px] font-bold text-[#171717] dark:text-zinc-100 group-hover:text-[#882637] dark:group-hover:text-[#F29EAA] transition-colors leading-tight">
                          {t("hotlines.h3Title")}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-[#64748B] dark:text-zinc-400 mt-0.5">
                          {t("hotlines.h3Sub")}
                        </p>
                      </div>
                    </div>
                    <Phone className="h-3.5 w-3.5 text-[#882637] dark:text-[#F29EAA] shrink-0" />
                  </a>

                  {/* 1990 */}
                  <a
                    href="tel:1990"
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-800/80 border-2 border-[#882637]/20 hover:border-[#882637] hover:shadow-[3px_3px_0px_0px_#882637] dark:hover:shadow-[3px_3px_0px_0px_#511B25] hover:-translate-y-0.5 hover:rotate-[-0.6deg] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-[#71717A] text-white flex items-center justify-center shrink-0">
                        <Phone className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-[13px] font-bold text-[#171717] dark:text-zinc-100 group-hover:text-[#882637] dark:group-hover:text-[#F29EAA] transition-colors leading-tight">
                          {t("hotlines.h4Title")}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-[#64748B] dark:text-zinc-400 mt-0.5">
                          {t("hotlines.h4Sub")}
                        </p>
                      </div>
                    </div>
                    <Phone className="h-3.5 w-3.5 text-[#882637] dark:text-[#F29EAA] shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Card: Official Headquarters */}
            <div className="contact-office-card flex-1 rounded-[26px] border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] p-6 sm:p-7 shadow-[6px_6px_0px_0px_#882637] dark:shadow-[6px_6px_0px_0px_#511B25] flex flex-col justify-between cursor-default">
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#171717] dark:text-zinc-50 tracking-tight">
                  {t("office.title")}
                </h3>

                <div className="mt-4 space-y-3 text-xs sm:text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-[#8A1C2B] dark:text-[#F29EAA] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#18181B] dark:text-zinc-100">
                        {t("office.name")}
                      </p>
                      <p className="text-[#64748B] dark:text-zinc-400 text-xs mt-0.5">
                        {t("office.address")}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-2.5 pt-2.5 border-t border-[#E8E6DD] dark:border-zinc-800">
                    <Clock className="h-4 w-4 text-[#8A1C2B] dark:text-[#F29EAA] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#18181B] dark:text-zinc-100">
                        {t("office.hoursTitle")}
                      </p>
                      <p className="text-[#64748B] dark:text-zinc-400 text-xs mt-0.5">
                        {t("office.hoursOps")}
                      </p>
                      <p className="text-[#64748B] dark:text-zinc-400 text-xs">
                        {t("office.hoursAdmin")}
                      </p>
                    </div>
                  </div>

                  {/* Emails */}
                  <div className="flex items-start gap-2.5 pt-2.5 border-t border-[#E8E6DD] dark:border-zinc-800">
                    <Mail className="h-4 w-4 text-[#8A1C2B] dark:text-[#F29EAA] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#18181B] dark:text-zinc-100">
                        {t("office.emailTitle")}
                      </p>
                      <p className="text-xs mt-0.5">
                        <a
                          href={`mailto:${t("office.email")}`}
                          className="text-[#64748B] dark:text-zinc-400 hover:text-[#8A1C2B] dark:hover:text-[#F29EAA] underline transition-colors"
                        >
                          {t("office.email")}
                        </a>
                      </p>
                      <p className="text-xs">
                        <a
                          href={`mailto:${t("office.opsEmail")}`}
                          className="text-[#64748B] dark:text-zinc-400 hover:text-[#8A1C2B] dark:hover:text-[#F29EAA] underline transition-colors"
                        >
                          {t("office.opsEmail")}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
