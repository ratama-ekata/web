"use client";

import React, { useEffect, useState } from "react";
import { ArrowDownRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { PhoneInput, COUNTRIES, isValidPhoneNumber, type Country } from "@/components/ui/phone-input";
import { FileUpload } from "@/components/ui/file-upload";
import { PoliceStationSelect } from "@/components/ui/police-station-select";
import { apiClient } from "@/services/api-client";
import { isValidEmail, isValidSriLankanNIC } from "@/lib/validators";
import { cn } from "@/lib/utils";
import {
  clearReportSubmission,
  getReportSubmission,
  saveReportSubmission,
} from "@/lib/report-storage";
import { ConfidentialityCard } from "./report-sidebar";
import { ReportSuccessCard } from "./report-success-card";
import { ReportErrorCard } from "./report-error-card";

const ACTIVITY_TYPE_KEYS = [
  "selling",
  "using-public",
  "storing",
  "near-school",
  "manufacturing",
  "other",
] as const;

export const OFFICIAL_ACTIVITY_MAPPINGS: Record<string, string> = {
  "selling": "Selling or dealing drugs",
  "using-public": "Using drugs in public",
  "storing": "Storing or transporting drugs",
  "near-school": "Drug activity near a school",
  "manufacturing": "Manufacturing or cultivation",
  "other": "Other",
  "selling or dealing drugs": "Selling or dealing drugs",
  "using drugs in public": "Using drugs in public",
  "storing or transporting drugs": "Storing or transporting drugs",
  "drug activity near a school": "Drug activity near a school",
  "manufacturing or cultivation": "Manufacturing or cultivation",
};

const MAX_DESCRIPTION = 2000;
const MAX_FILES = 3;
const MAX_FILE_SIZE_MB = 10;

interface FormState {
  fullName: string;
  phone: string;
  nic: string;
  email: string;
  address: string;
  policeStation: string;
  activityType: string;
  description: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_STATE: FormState = {
  fullName: "",
  phone: "",
  nic: "",
  email: "",
  address: "",
  policeStation: "",
  activityType: "",
  description: "",
};

function SectionHeading({
  index,
  title,
  description,
  badge,
}: {
  index: number;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b-2 border-[#882637]/20 pb-4 dark:border-zinc-800">
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-[#882637] bg-[#FFF1BF] dark:bg-[#320F16] text-[#882637] dark:text-[#F29EAA] shadow-[2px_2px_0px_0px_#882637] dark:shadow-[2px_2px_0px_0px_#511B25] text-sm font-black">
        {index}
      </span>
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 text-lg sm:text-xl font-black tracking-tight text-[#171717] dark:text-white">
          {title}
          {badge && (
            <Badge className="text-[11px] font-bold text-[#882637] bg-[#FDF2F4] dark:bg-[#320F16] dark:text-[#F29EAA] border border-[#882637]/30">
              {badge}
            </Badge>
          )}
        </h2>
        <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}

function Counter({ value, max }: { value: number; max: number }) {
  return (
    <span className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-zinc-400">
      {value}/{max}
    </span>
  );
}

export function ReportForm() {
  const t = useTranslations("report");
  const [view, setView] = useState<"form" | "success" | "error">("form");
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedRef, setSubmittedRef] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [files, setFiles] = useState<File[]>([]);

  // Check for persistent submission within 14 days
  useEffect(() => {
    let ignore = false;
    queueMicrotask(() => {
      if (ignore) return;
      const existing = getReportSubmission();
      if (existing) {
        setSubmittedRef(existing.referenceNumber);
        if (existing.phone) {
          setSubmittedPhone(existing.phone);
        }
        setView("success");
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const validateField = (field: keyof FormState, val: string): string | undefined => {
    switch (field) {
      case "fullName": {
        const trimmed = val.trim();
        if (!trimmed) return t("errors.fullName");
        if (trimmed.length < 2) return t("errors.fullName");
        return undefined;
      }
      case "phone": {
        const rawDigits = val.replace(/\D/g, "");
        const dialDigits = (country.dial || "").replace(/\D/g, "");
        const subscriberDigits = rawDigits.startsWith(dialDigits)
          ? rawDigits.slice(dialDigits.length)
          : rawDigits;

        if (!rawDigits || !subscriberDigits) {
          return t("errors.phoneRequired");
        }
        if (val.startsWith("+")) {
          if (!isValidPhoneNumber(val)) {
            return t("errors.phoneInvalid");
          }
        } else if (country.code === "LK") {
          if (subscriberDigits.length !== 9 && subscriberDigits.length !== 10) {
            return t("errors.phoneInvalid");
          }
        } else if (rawDigits.length < 6 || rawDigits.length > 15) {
          return t("errors.phoneInvalid");
        }
        return undefined;
      }
      case "nic":
        if (val.trim() && !isValidSriLankanNIC(val)) {
          return t("errors.nic");
        }
        return undefined;
      case "email":
        if (val.trim() && !isValidEmail(val)) {
          return t("errors.email");
        }
        return undefined;
      case "policeStation":
        if (!val || !val.trim()) {
          return t("errors.policeStation");
        }
        return undefined;
      case "activityType":
        if (!val) {
          return t("errors.activityType");
        }
        return undefined;
      case "description":
        if (!val.trim() || val.trim().length < 10) {
          return t("errors.description");
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const setField = (field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: keyof FormState, currentValue?: string) => {
    const err = validateField(field, currentValue ?? values[field]);
    // Set the error if invalid, and clear any stale error once the value is valid
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const validateAll = (): FormErrors => {
    const next: FormErrors = {};
    const fields: (keyof FormState)[] = [
      "fullName",
      "phone",
      "policeStation",
      "nic",
      "email",
      "activityType",
      "description",
    ];
    for (const f of fields) {
      const err = validateField(f, values[f]);
      if (err) next[f] = err;
    }
    return next;
  };

  const performSubmit = async () => {
    setSubmitError("");
    const nextErrors = validateAll();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setView("form");
      const firstKey = Object.keys(nextErrors)[0];
      const el = document.getElementById(`report-${firstKey}`);
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedPhone = values.phone.startsWith("+")
        ? values.phone
        : `${country.dial}${values.phone.replace(/\D/g, "").replace(/^0/, "")}`;

      const fullActivityType =
        OFFICIAL_ACTIVITY_MAPPINGS[values.activityType.trim().toLowerCase()] ||
        values.activityType.trim();

      const payload = {
        ...values,
        activityType: fullActivityType,
        policeStation: values.policeStation,
        police_station: values.policeStation,
        phone: formattedPhone,
        mobile: formattedPhone,
        fullname: values.fullName,
        type_of_activity: fullActivityType,
        activity_description: values.description,
        attachments: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
      };

      let refNum = "";
      try {
        const res = await apiClient.post<{
          referenceNumber?: string;
          report_id?: string;
          reportId?: string;
          id?: string;
        }>("/reports", payload);
        if (res?.data?.report_id) {
          refNum = res.data.report_id;
        } else if (res?.data?.reportId) {
          refNum = res.data.reportId;
        } else if (res?.data?.referenceNumber) {
          refNum = res.data.referenceNumber;
        } else if (res?.data?.id) {
          refNum = `RE-${new Date().getFullYear()}-${String(res.data.id).replace(/-/g, "").slice(0, 6).toUpperCase()}`;
        }
      } catch (err: unknown) {
        // Fallback to /suspect-reports/json if /reports wasn't reachable
        try {
          const fallbackRes = await apiClient.post<{
            referenceNumber?: string;
            report_id?: string;
            reportId?: string;
            id?: string;
          }>("/suspect-reports/json", payload);
          if (fallbackRes?.data?.report_id) {
            refNum = fallbackRes.data.report_id;
          } else if (fallbackRes?.data?.reportId) {
            refNum = fallbackRes.data.reportId;
          } else if (fallbackRes?.data?.referenceNumber) {
            refNum = fallbackRes.data.referenceNumber;
          } else if (fallbackRes?.data?.id) {
            refNum = `RE-${new Date().getFullYear()}-${String(fallbackRes.data.id).replace(/-/g, "").slice(0, 6).toUpperCase()}`;
          }
        } catch {
          throw err;
        }
      }

      if (refNum) {
        setSubmittedRef(refNum);
        setSubmittedPhone(formattedPhone);
        setSubmittedEmail(values.email);
        saveReportSubmission(refNum, formattedPhone);
        setView("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setView("error");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err: unknown) {
      console.error("Report submission failed:", err);
      if (err && typeof err === "object" && "details" in err && err.details) {
        setErrors(err.details as FormErrors);
      }
      setSubmitError(t("errors.submit"));
      setView("error");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    performSubmit();
  };

  const handleSubmitAnother = () => {
    clearReportSubmission();
    setValues(INITIAL_STATE);
    setFiles([]);
    setErrors({});
    setSubmittedRef("");
    setSubmittedPhone("");
    setSubmittedEmail("");
    setSubmitError("");
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleKeepAnswers = () => {
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTryAgain = () => {
    performSubmit();
  };

  const handleCancel = () => {
    const hasData =
      values.fullName ||
      values.phone ||
      values.policeStation ||
      values.nic ||
      values.email ||
      values.address ||
      values.activityType ||
      values.description ||
      files.length > 0;

    if (hasData) {
      if (window.confirm("Are you sure you want to cancel and clear the report?")) {
        setValues(INITIAL_STATE);
        setFiles([]);
        setErrors({});
        setSubmitError("");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setValues(INITIAL_STATE);
      setFiles([]);
      setErrors({});
      setSubmitError("");
    }
  };

  if (view === "success") {
    return (
      <ReportSuccessCard
        referenceNumber={submittedRef}
        phone={submittedPhone}
        email={submittedEmail}
        onSubmitAnother={handleSubmitAnother}
      />
    );
  }

  if (view === "error") {
    return (
      <ReportErrorCard
        onTryAgain={handleTryAgain}
        onKeepAnswers={handleKeepAnswers}
        isRetrying={isSubmitting}
      />
    );
  }

  const optional = t("optional");
  const activityOptions = ACTIVITY_TYPE_KEYS.map((key) => ({
    value: key,
    label: t(`types.${key}`),
  }));

  const inputClass = (hasError?: boolean) =>
    cn(
      "h-11 text-sm transition-colors",
      hasError
        ? "border-red-500! focus:ring-red-500! dark:border-red-500!"
        : "border-zinc-300 hover:border-zinc-400"
    );

  return (
    <div className="space-y-6">
      {/* On mobile: Confidentiality Card sits right before Section 1 */}
      <div className="block lg:hidden">
        <ConfidentialityCard />
      </div>

      <form id="report-form" onSubmit={handleSubmit} noValidate>
        <div className="report-form-card rounded-[28px] sm:rounded-[32px] border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] p-6 sm:p-8 lg:p-10 shadow-[7px_7px_0px_0px_#882637] dark:shadow-[7px_7px_0px_0px_#511B25] space-y-8">
        {/* 1. Your details */}
        <section className="space-y-5">
          <SectionHeading index={1} title={t("s1.title")} description={t("s1.description")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5 pt-1">
            <FormField label={t("s1.fullName")} htmlFor="report-fullName" required>
              <Input
                id="report-fullName"
                className={inputClass(!!errors.fullName)}
                placeholder={t("s1.fullNamePh")}
                autoComplete="name"
                value={values.fullName}
                error={errors.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                onBlur={() => handleBlur("fullName")}
              />
            </FormField>

            <FormField label={t("s1.phone")} htmlFor="report-phone" required>
              <PhoneInput
                id="report-phone"
                value={values.phone}
                onChange={(v) => setField("phone", v)}
                country={country}
                onCountryChange={setCountry}
                countryLabel={t("s1.countryCode")}
                error={errors.phone}
              />
            </FormField>

            <FormField
              label={t("s1.nic")}
              htmlFor="report-nic"
              optional
              optionalLabel={optional}
            >
              <Input
                id="report-nic"
                className={inputClass(!!errors.nic)}
                placeholder={t("s1.nicPh")}
                value={values.nic}
                error={errors.nic}
                onChange={(e) => setField("nic", e.target.value)}
                onBlur={() => handleBlur("nic")}
              />
            </FormField>

            <FormField
              label={t("s1.email")}
              htmlFor="report-email"
              optional
              optionalLabel={optional}
            >
              <Input
                id="report-email"
                type="email"
                className={inputClass(!!errors.email)}
                autoComplete="email"
                placeholder={t("s1.emailPh")}
                value={values.email}
                error={errors.email}
                onChange={(e) => setField("email", e.target.value)}
                onBlur={() => handleBlur("email")}
              />
            </FormField>
          </div>

          <FormField
            label={t("s1.address")}
            htmlFor="report-address"
            optional
            optionalLabel={optional}
          >
            <Input
              id="report-address"
              className={inputClass(false)}
              autoComplete="street-address"
              placeholder={t("s1.addressPh")}
              value={values.address}
              onChange={(e) => setField("address", e.target.value)}
            />
          </FormField>

          <FormField
            label={t("s1.policeStation")}
            htmlFor="report-policeStation"
            required
          >
            <PoliceStationSelect
              id="report-policeStation"
              value={values.policeStation}
              error={errors.policeStation}
              placeholder={t("s1.policeStationPh")}
              onChange={(val) => setField("policeStation", val)}
              onBlur={() => handleBlur("policeStation")}
              required
            />
          </FormField>
        </section>

        {/* 2. What did you see or hear */}
        <section className="space-y-5">
          <SectionHeading index={2} title={t("s2.title")} description={t("s2.description")} />
          <FormField label={t("s2.activityType")} htmlFor="report-activityType" required>
            <Select
              id="report-activityType"
              required
              className={cn(
                "h-11",
                errors.activityType
                  ? "border-red-500! focus:ring-red-500! dark:border-red-500!"
                  : "border-zinc-300"
              )}
              placeholder={t("s2.activityPh")}
              options={activityOptions}
              value={values.activityType}
              error={errors.activityType}
              onChange={(e) => setField("activityType", e.target.value)}
              onBlur={(e) => handleBlur("activityType", e.target.value)}
            />
          </FormField>
          <FormField
            label={t("s2.describe")}
            htmlFor="report-description"
            required
            hint={t("s2.describeHint")}
          >
            <div className="relative">
              <Textarea
                id="report-description"
                className={cn(
                  "min-h-[190px]",
                  errors.description
                    ? "border-red-500! focus:ring-red-500! dark:border-red-500!"
                    : "border-zinc-300"
                )}
                maxLength={MAX_DESCRIPTION}
                placeholder={t("s2.describePh")}
                value={values.description}
                error={errors.description}
                onChange={(e) => setField("description", e.target.value)}
                onBlur={() => handleBlur("description")}
              />
              <Counter value={values.description.length} max={MAX_DESCRIPTION} />
            </div>
          </FormField>
        </section>

        {/* 3. Photo or file */}
        <section className="space-y-5">
          <SectionHeading
            index={3}
            title={t("s3.title")}
            badge={optional}
            description={t("s3.description")}
          />
          <div className="space-y-2">
            <label
              htmlFor="report-files"
              className="block text-sm font-medium text-[#171717] dark:text-zinc-100"
            >
              {t("s3.uploadFile")} <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">({optional})</span>
            </label>
            <FileUpload
              id="report-files"
              files={files}
              onChange={setFiles}
              maxFiles={MAX_FILES}
              maxSizeMb={MAX_FILE_SIZE_MB}
              labels={{
                drop: t("s3.drop"),
                hint: t("s3.hint"),
                browse: t("s3.browse"),
                remove: t("s3.remove"),
                sizeError: t("errors.fileSize"),
                countError: t("errors.fileCount"),
                maxSize: t("s3.maxSize"),
              }}
            />
          </div>
        </section>

        {submitError && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
          >
            {submitError}
          </p>
        )}

        <div className="space-y-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            <span className="text-[#E5484D]">*</span> {t("requiredNote")}
          </p>

          <div className="rounded-2xl border-2 border-[#882637] bg-white dark:bg-[#1E1116] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#882637] dark:shadow-[4px_4px_0px_0px_#511B25]">
            <h3 className="text-base sm:text-lg font-black text-[#1F2937] dark:text-zinc-100">
              {t("readyToSubmit.title")}
            </h3>
            <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-[#6B7280] dark:text-zinc-400 font-medium">
              {t("readyToSubmit.description")}
            </p>
            <hr className="my-5 border-t-2 border-[#882637]/20 dark:border-zinc-800" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer rounded-xl border-2 border-[#882637] bg-[#FFFBEB] dark:bg-[#16161A] px-6 py-2.5 text-sm font-bold text-[#1F2937] dark:text-zinc-200 shadow-[3px_3px_0px_0px_#882637] hover:shadow-[4px_4px_0px_0px_#882637] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                {t("readyToSubmit.cancel")}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#882637] bg-[#882637] hover:bg-[#701622] active:bg-[#511B25] text-white font-black text-sm px-7 py-2.5 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[5px_5px_0px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>{t("readyToSubmit.submit")}</span>
                  </>
                ) : (
                  <>
                    <span>{t("readyToSubmit.submit")}</span>
                    <ArrowDownRight className="h-4 w-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  );
}
