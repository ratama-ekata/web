/**
 * Authentication and authorization types and contracts
 */

export type UserRole = "SYSTEM_ADMIN" | "ADMIN" | "USER";

export interface User {
  id: string;
  username: string;
  email: string;
  phone_no?: string | null;
  role: UserRole;
  is_active: boolean;
  created_at?: string | null;
}

export interface LoginCredentials {
  username_or_email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  role: UserRole;
  username: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
