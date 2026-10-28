# Architecture & Folder Structure Guide

## Overview

This application (`ratamaekata.gov.lk`) is built with **Next.js 16 (App Router)**, **React 19**, and **TypeScript 5**. It is designed with clean architecture principles, strict separation of concerns, and enterprise-grade modularity.

---

## Directory Layout

```
├── app/                  # Next.js App Router (Routing, Layouts, Server Endpoints)
│   ├── (auth)/           # Route Group: Authentication flows (login, register, forgot-password)
│   ├── (dashboard)/      # Route Group: Protected citizen portal & management views
│   ├── (marketing)/      # Route Group: Public-facing pages (home, about, info)
│   ├── api/              # Route Handlers: Serverless API endpoints
│   ├── error.tsx         # Global client-side error boundary
│   ├── global-error.tsx  # Root error boundary (catches root layout failures)
│   ├── loading.tsx       # Global suspense loading fallback
│   ├── not-found.tsx     # Global 404 page
│   ├── providers.tsx     # Client providers wrapper (Theme, Auth, etc.)
│   └── layout.tsx        # Root HTML layout and metadata configuration
│
├── components/           # Reusable UI component library
│   ├── ui/               # Atomic / primitive UI components (Button, Input, Card, Modal, Badge)
│   ├── layout/           # Global chrome & shell components (Navbar, Footer, Sidebar, Header)
│   ├── shared/           # Cross-cutting composite widgets (PageHeader, EmptyState, ErrorFallback)
│   └── index.ts          # Central barrel export
│
├── constants/            # Centralized constants, config, and route dictionaries
│   ├── config.ts         # App settings, environment fallbacks, API timeout configurations
│   ├── navigation.ts     # Navigation links and menu data
│   ├── routes.ts         # Centralized route URL dictionary (prevents hardcoded links)
│   └── index.ts          # Barrel export
│
├── context/              # React Context Providers for global client state
│   ├── auth-context.tsx  # User session, login, logout, and permissions
│   ├── theme-context.tsx # Color mode (system/light/dark) using useSyncExternalStore
│   └── index.ts          # Barrel export
│
├── hooks/                # Custom reusable React hooks
│   ├── use-debounce.ts   # Debounced values (search inputs, auto-saves)
│   ├── use-disclosure.ts # Visibility state for modals, drawers, and menus
│   ├── use-local-storage.ts # Type-safe localStorage synchronization
│   ├── use-media-query.ts   # Viewport listener for responsive logic
│   ├── use-mounted.ts       # SSR hydration guard using useSyncExternalStore
│   └── index.ts          # Barrel export
│
├── lib/                  # Core utilities and runtime infrastructure
│   ├── env.ts            # Environment variable validation & runtime detection
│   ├── logger.ts         # Structured logging helper for server and client
│   ├── utils.ts          # Class merging (`cn`), formatters (date, currency), sleep, debounce
│   ├── validators.ts     # Input validation (email, password strength, NIC)
│   └── index.ts          # Barrel export
│
├── services/             # API clients and data layer
│   ├── api-client.ts     # Generic Fetch API wrapper (interceptors, tokens, timeouts, ApiClientError)
│   ├── auth-service.ts   # Authentication endpoints (login, register, session)
│   ├── user-service.ts   # User profile endpoints
│   └── index.ts          # Barrel export
│
├── store/                # Scalable global state store directory (Zustand / Redux pattern reference)
│   └── index.ts          # State store directory index and pattern guidelines
│
├── styles/               # Global CSS files and design tokens
│   ├── variables.css     # CSS custom properties and design tokens
│   └── globals.css       # Enhanced global utility classes and scrollbars
│
├── types/                # Central TypeScript definitions and data contracts
│   ├── api.ts            # Standard API envelopes (ApiResponse<T>, PaginatedResponse<T>, ApiError)
│   ├── auth.ts           # Authentication domain contracts (User, UserRole, Session, LoginCredentials)
│   ├── common.ts         # Shared UI prop contracts (ChildrenProps, NavItem, PaginationMeta)
│   └── index.ts          # Barrel export
│
└── utils/                # Re-exports `@/lib` for convenience
    └── index.ts
```

---

## Architectural Conventions & Best Practices

### 1. Path Aliases
Always use the `@/*` alias defined in `tsconfig.json` to reference files cleanly:
```typescript
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { apiClient } from "@/services/api-client";
import { cn } from "@/lib/utils";
```

### 2. Route Groups
Group routes using parentheses to organize by context without affecting URL paths:
- `app/(marketing)/page.tsx` renders at `/`
- `app/(auth)/login/page.tsx` renders at `/login`
- `app/(dashboard)/dashboard/page.tsx` renders at `/dashboard`

### 3. Server Components vs. Client Components
- Keep pages and layouts as **Server Components** by default for maximum performance, SEO, and streaming.
- Add `"use client";` at the top of a file only when you need event listeners (`onClick`, `onChange`), browser APIs (`localStorage`, `window`), or React hooks (`useState`, `useEffect`).
- Move interactive client trees into dedicated components rather than marking entire pages as client components.

### 4. API & Data Layer
- **Never call `fetch` directly from random UI components.**
- Add endpoint calls to `services/` using `apiClient`.
- All API methods return typed `ApiResponse<T>` promises and handle errors via `ApiClientError`.

### 5. Centralized Route Constants
Avoid raw string literals for URLs:
```typescript
// Good:
import { ROUTES } from "@/constants/routes";
<Link href={ROUTES.DASHBOARD.HOME}>Dashboard</Link>

// Avoid:
<Link href="/dashboard">Dashboard</Link>
```

### 6. React 19 State & Hydration
- External browser state (like `localStorage` or `window.matchMedia`) is read via `useSyncExternalStore` in `hooks/` to eliminate cascading renders and hydration mismatches.
- Always use `useMounted()` if rendering content that differs between server and client.
