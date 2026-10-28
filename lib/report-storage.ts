/**
 * Utilities for managing persistent report submission state and formatting.
 * Keeps the submission state active for 14 days unless cleared by "Submit Another Report".
 */

export const SUBMISSION_STORAGE_KEY = "ratamaekata_report_submission";
export const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

export interface StoredReportSubmission {
  referenceNumber: string;
  phone?: string;
  submittedAt: number;
  expiresAt: number;
}

/**
 * Persists the report submission in localStorage with a 14-day expiry.
 */
export function saveReportSubmission(referenceNumber: string, phone?: string): void {
  if (typeof window === "undefined") return;
  try {
    const now = Date.now();
    const data: StoredReportSubmission = {
      referenceNumber,
      phone,
      submittedAt: now,
      expiresAt: now + FOURTEEN_DAYS_MS,
    };
    localStorage.setItem(SUBMISSION_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save report submission state:", error);
  }
}

/**
 * Retrieves the stored report submission if still valid within the 14-day window.
 * Cleans up automatically if expired.
 */
export function getReportSubmission(): StoredReportSubmission | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SUBMISSION_STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw) as StoredReportSubmission;
    if (!data || !data.referenceNumber || !data.expiresAt) {
      localStorage.removeItem(SUBMISSION_STORAGE_KEY);
      return null;
    }

    if (Date.now() > data.expiresAt) {
      localStorage.removeItem(SUBMISSION_STORAGE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Failed to retrieve report submission state:", error);
    return null;
  }
}

/**
 * Clears the stored report submission (e.g., when clicking "Submit Another Report").
 */
export function clearReportSubmission(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SUBMISSION_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear report submission state:", error);
  }
}

/**
 * Formats a phone number for privacy display (e.g., "077 ••• ••12").
 */
export function maskPhoneNumber(phone?: string): string {
  if (!phone) return "077 ••• ••12";
  const trimmed = phone.trim();

  // Extract raw digits
  let digits = trimmed.replace(/\D/g, "");

  // If local Sri Lankan with international prefix (+94...)
  if (digits.startsWith("94") && digits.length >= 11) {
    digits = "0" + digits.slice(2);
  }

  if (digits.length >= 9) {
    // Standard SL format (07X ••• ••YY)
    const prefix = digits.slice(0, 3);
    const suffix = digits.slice(-2);
    return `${prefix} ••• ••${suffix}`;
  }

  // Fallback for short numbers
  if (digits.length > 4) {
    return `${digits.slice(0, 2)} ••• ${digits.slice(-2)}`;
  }

  return "077 ••• ••12";
}
