import type { PaginationMeta } from "./common";

/**
 * Standard successful API response envelope
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

/**
 * Standard paginated API response envelope
 */
export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
  timestamp: string;
}

/**
 * Structured API error response
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[] | string>;
    statusCode: number;
  };
  timestamp: string;
}

/**
 * Standard query parameters for listing endpoints
 */
export interface ListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}
