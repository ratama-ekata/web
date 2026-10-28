import React from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { MuiThemeProvider } from "@/components/theme/mui-theme-provider";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <MuiThemeProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </MuiThemeProvider>
    </ProtectedRoute>
  );
}
