"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "@/i18n/routing";
import { Box, CircularProgress, Typography } from "@mui/material";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          bgcolor: "background.default",
        }}
      >
        <CircularProgress color="primary" size={40} thickness={4} />
        <Typography variant="body2" color="text.secondary">
          Verifying authorization...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
