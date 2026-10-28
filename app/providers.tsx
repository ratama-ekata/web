"use client";

import React from "react";
import { ThemeProvider } from "@/context/theme-context";
import { AuthProvider } from "@/context/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system">
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
