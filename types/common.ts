import type { ReactNode } from "react";

/**
 * Standard children prop for React components
 */
export interface ChildrenProps {
  children?: ReactNode;
}

/**
 * Standard class name prop for extensible styling
 */
export interface ClassNameProps {
  className?: string;
}

/**
 * Async operation state tracking
 */
export type AsyncStatus = "idle" | "loading" | "success" | "error";

/**
 * Generic option item for select, dropdown, and radio inputs
 */
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * Breadcrumb item definition
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

/**
 * Navigation item definition
 */
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
  disabled?: boolean;
  external?: boolean;
  children?: NavItem[];
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
