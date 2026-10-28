import { apiClient } from "./api-client";
import type { ReportQueryParams, SuspectReport } from "@/types/report";

const OFFICIAL_ACTIVITY_MAP: Record<string, string> = {
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

function generateFallbackReportId(year: number = new Date().getFullYear()): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RE-${year}-${code}`;
}

/**
 * Service managing suspect incident reports via backend API
 */
class ReportService {
  /**
   * Retrieve list of suspect reports with optional pagination and filters:
   * GET /suspect-reports/
   */
  public async getReports(params: ReportQueryParams = {}): Promise<SuspectReport[]> {
    const queryParams: Record<string, string | number | boolean | undefined> = {};
    if (params.skip !== undefined) queryParams.skip = params.skip;
    if (params.limit !== undefined) queryParams.limit = params.limit;
    if (params.police_station) queryParams.police_station = params.police_station;
    if (params.type_of_activity) queryParams.type_of_activity = params.type_of_activity;

    const response = await apiClient.get<SuspectReport[]>("/suspect-reports/", {
      params: queryParams,
    });
    return response.data;
  }

  /**
   * Retrieve complete details of a specific suspect report and attached evidence:
   * GET /suspect-reports/{report_id}
   */
  public async getReportById(reportId: string): Promise<SuspectReport> {
    const response = await apiClient.get<SuspectReport>(`/suspect-reports/${reportId}`);
    return response.data;
  }

  /**
   * Submit a new suspect incident report with designated police station
   * POST /reports or POST /suspect-reports/json
   */
  public async submitReport(payload: {
    fullName: string;
    phone: string;
    nic?: string;
    email?: string;
    address?: string;
    policeStation: string;
    activityType: string;
    description: string;
    attachments?: Array<{ name: string; size: number; type: string }>;
  }): Promise<{ referenceNumber: string; reportId: string }> {
    const fullActivity =
      OFFICIAL_ACTIVITY_MAP[payload.activityType.trim().toLowerCase()] ||
      payload.activityType.trim();

    const body = {
      ...payload,
      activityType: fullActivity,
      fullname: payload.fullName,
      mobile: payload.phone,
      police_station: payload.policeStation,
      type_of_activity: fullActivity,
      activity_description: payload.description,
    };

    try {
      const response = await apiClient.post<{
        referenceNumber?: string;
        report_id?: string;
        reportId?: string;
        id?: string;
      }>("/reports", body);

      const ref =
        response.data?.report_id ||
        response.data?.reportId ||
        response.data?.referenceNumber ||
        (response.data?.id
          ? `RE-${new Date().getFullYear()}-${String(response.data.id).slice(0, 6).toUpperCase()}`
          : generateFallbackReportId());

      return { referenceNumber: ref, reportId: ref };
    } catch {
      const fallbackResponse = await apiClient.post<{
        referenceNumber?: string;
        report_id?: string;
        reportId?: string;
        id?: string;
      }>("/suspect-reports/json", body);

      const ref =
        fallbackResponse.data?.report_id ||
        fallbackResponse.data?.reportId ||
        fallbackResponse.data?.referenceNumber ||
        (fallbackResponse.data?.id
          ? `RE-${new Date().getFullYear()}-${String(fallbackResponse.data.id).slice(0, 6).toUpperCase()}`
          : generateFallbackReportId());

      return { referenceNumber: ref, reportId: ref };
    }
  }
}

export const reportService = new ReportService();
