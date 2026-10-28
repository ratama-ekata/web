import { apiClient } from "./api-client";
import { APP_CONFIG } from "@/constants/config";
import type { LoginCredentials, TokenResponse, User } from "@/types/auth";

/**
 * Service handling user authentication and profile retrieval
 */
class AuthService {
  /**
   * Authenticate user with JSON credentials:
   * POST /users/login/json
   */
  public async login(credentials: LoginCredentials): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>("/users/login/json", credentials);
    if (response.data?.access_token && typeof window !== "undefined") {
      localStorage.setItem(APP_CONFIG.storageKeys.authToken, response.data.access_token);
    }
    return response.data;
  }

  /**
   * Retrieve current authenticated user profile:
   * GET /users/me
   */
  public async getCurrentUser(token?: string): Promise<User> {
    const response = await apiClient.get<User>("/users/me", token ? { token } : undefined);
    return response.data;
  }

  /**
   * Clear authentication state and tokens from client storage
   */
  public logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(APP_CONFIG.storageKeys.authToken);
      localStorage.removeItem(APP_CONFIG.storageKeys.refreshToken);
    }
  }

  /**
   * Get currently stored auth token
   */
  public getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(APP_CONFIG.storageKeys.authToken);
  }
}

export const authService = new AuthService();
