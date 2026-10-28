"use client";

import React, { useMemo } from "react";
import { ThemeProvider as MuiThemeProviderBase, createTheme } from "@mui/material";
import { useTheme } from "@/context/theme-context";
import { useMounted } from "@/hooks/use-mounted";

export function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();

  const theme = useMemo(() => {
    const isDark = resolvedTheme === "dark";

    return createTheme({
      palette: {
        mode: isDark ? "dark" : "light",
        primary: {
          main: isDark ? "#e66f7f" : "#882637",
          light: isDark ? "#f8c9d0" : "#a83243",
          dark: isDark ? "#a83243" : "#6b202e",
          contrastText: "#ffffff",
        },
        secondary: {
          main: isDark ? "#fbbf24" : "#b8892f",
          light: isDark ? "#fde68a" : "#d9a441",
          dark: isDark ? "#946c24" : "#73531f",
          contrastText: isDark ? "#000000" : "#ffffff",
        },
        background: {
          default: isDark ? "#09090b" : "#f8fafc",
          paper: isDark ? "#141416" : "#ffffff",
        },
        text: {
          primary: isDark ? "#f4f4f5" : "#0f172a",
          secondary: isDark ? "#a1a1aa" : "#475569",
        },
        divider: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)",
      },
      typography: {
        fontFamily: "var(--font-noto-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        button: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
      shape: {
        borderRadius: 8,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              boxShadow: "none",
              borderRadius: 8,
              textTransform: "none",
              "&:hover": {
                boxShadow: "none",
              },
            },
            contained: {
              backgroundColor: isDark ? "#e66f7f" : "#882637",
              color: isDark ? "#141416" : "#ffffff",
              "&:hover": {
                backgroundColor: isDark ? "#f29eaa" : "#6b202e",
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none",
            },
            outlined: {
              borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            head: {
              fontWeight: 600,
              backgroundColor: isDark ? "#1a1a1e" : "#f1f5f9",
              color: isDark ? "#e4e4e7" : "#334155",
            },
            root: {
              borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: 12,
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              boxShadow: "none",
            },
          },
        },
      },
    });
  }, [resolvedTheme]);

  // SSR Hydration guard: render matching fallback until mounted on client
  if (!mounted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            border: "4px solid #882637",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "mui-spin 1s linear infinite",
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "@keyframes mui-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }",
          }}
        />
      </div>
    );
  }

  return (
    <MuiThemeProviderBase theme={theme}>
      {children}
    </MuiThemeProviderBase>
  );
}
