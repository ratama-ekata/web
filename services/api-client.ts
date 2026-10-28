import { APP_CONFIG } from "@/constants/config";
import type { ApiErrorResponse, ApiResponse } from "@/types/api";

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  timeoutMs?: number;
  token?: string;
}

/**
 * Custom error class for API client failures
 */
export class ApiClientError extends Error {
  statusCode: number;
  code?: string;
  details?: Record<string, string[] | string>;
  response?: unknown;

  constructor(
    message: string,
    statusCode: number,
    code?: string,
    details?: Record<string, string[] | string>,
    response?: unknown
  ) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.response = response;
  }
}

/**
 * High-performance, production-ready Fetch API wrapper
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = APP_CONFIG.api.baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): string {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = new URL(`${this.baseUrl}${cleanEndpoint}`, typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          url.searchParams.append(key, String(val));
        }
      });
    }

    return url.toString();
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(APP_CONFIG.storageKeys.authToken);
  }

  public async request<T = unknown>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, timeoutMs = APP_CONFIG.api.timeoutMs, token, headers, ...customConfig } = options;
    const url = this.buildUrl(endpoint, params);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const authToken = token ?? this.getAuthToken();

    const isFormData = typeof FormData !== "undefined" && customConfig.body instanceof FormData;

    const requestHeaders: Record<string, string> = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Accept: "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(headers as Record<string, string>),
    };

    try {
      const response = await fetch(url, {
        ...customConfig,
        headers: requestHeaders,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        let errorMessage = `API Error with status: ${response.status}`;
        let errorCode: string | undefined;
        let errorDetails: Record<string, string[] | string> | undefined;

        if (typeof data === "object" && data !== null) {
          const obj = data as Record<string, unknown>;
          const errEnvelope = obj.error as { message?: string; code?: string; details?: Record<string, string[] | string> } | undefined;
          if (errEnvelope?.message) {
            errorMessage = errEnvelope.message;
            errorCode = errEnvelope.code;
            errorDetails = errEnvelope.details;
          } else if (typeof obj.detail === "string") {
            errorMessage = obj.detail;
          } else if (Array.isArray(obj.detail)) {
            // FastAPI validation error detail array
            errorMessage = obj.detail
              .map((d: { msg?: string }) => d.msg || JSON.stringify(d))
              .join("; ");
          } else if (typeof obj.message === "string") {
            errorMessage = obj.message;
          }
        }

        throw new ApiClientError(
          errorMessage,
          response.status,
          errorCode,
          errorDetails,
          data
        );
      }

      // Format response cleanly
      if (typeof data === "object" && data !== null && "success" in data) {
        return data as ApiResponse<T>;
      }

      return {
        success: true,
        data: data as T,
        timestamp: new Date().toISOString(),
      };
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      if (err instanceof ApiClientError) {
        throw err;
      }

      if ((err as Error)?.name === "AbortError") {
        throw new ApiClientError(
          `Request timeout after ${timeoutMs}ms`,
          408,
          "TIMEOUT_ERROR"
        );
      }

      throw new ApiClientError(
        (err as Error)?.message || "Network error occurred",
        0,
        "NETWORK_ERROR"
      );
    }
  }

  // Convenience HTTP methods
  public get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  public post<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: isFormData ? (body as BodyInit) : (body ? JSON.stringify(body) : undefined),
    });
  }

  public put<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: isFormData ? (body as BodyInit) : (body ? JSON.stringify(body) : undefined),
    });
  }

  public patch<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: isFormData ? (body as BodyInit) : (body ? JSON.stringify(body) : undefined),
    });
  }

  public delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
