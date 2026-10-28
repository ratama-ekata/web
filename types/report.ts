/**
 * Suspect report types and contracts matching the backend API
 */

export interface SuspectReportFile {
  id: string;
  file_url: string;
  filename: string;
  original_filename: string;
  content_type: string;
  size_bytes: number;
  created_at?: string | null;
}

export interface SuspectReport {
  id: string;
  report_id?: string;
  referenceNumber?: string;
  fullname: string;
  email: string;
  mobile: string;
  nic: string;
  address: string;
  police_station: string;
  type_of_activity: string;
  activity_description: string;
  created_at?: string | null;
  files: SuspectReportFile[];
}

export interface ReportQueryParams {
  skip?: number;
  limit?: number;
  police_station?: string;
  type_of_activity?: string;
}
