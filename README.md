# Rata Ma Ekata (`ratamaekata.gov.lk`)

Official National Digital Citizen Platform of Sri Lanka built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

---

## 🏛️ Project Structure

This project follows an industry-standard, scalable folder structure configured for enterprise maintainability:

```
├── app/                  # Next.js App Router (route groups: (marketing), (auth), (dashboard), api/)
├── components/           # Reusable UI component library
│   ├── ui/               # Atomic/generic UI components (Button, Input, Card, Modal, Badge)
│   ├── layout/           # Global layout chrome (Navbar, Footer, Sidebar, Header)
│   └── shared/           # Composite widgets (PageHeader, EmptyState, ErrorFallback)
├── constants/            # Centralized routes, navigation menus, and app configuration
├── context/              # React Context state management (AuthProvider, ThemeProvider)
├── hooks/                # Custom React hooks (useDisclosure, useDebounce, useLocalStorage, useMediaQuery, useMounted)
├── lib/                  # Utilities (cn, formatters, validators, env, logger)
├── services/             # Typed API integration client & endpoints (apiClient, authService, userService)
├── store/                # Scalable state store directory (Zustand / Redux pattern)
├── styles/               # Global CSS files and design tokens
├── types/                # Global TypeScript definitions and data contracts
└── utils/                # Re-exports @/lib for flexible import conventions
```

Detailed architectural principles, coding conventions, and best practices are documented in [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## 🚀 Getting Started

First, install dependencies:
```bash
npm install
```

Run the development server with Turbopack:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 🛠️ Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create an optimized production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks
