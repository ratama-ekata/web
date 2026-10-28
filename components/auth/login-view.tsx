"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/context/auth-context";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

export function LoginView() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [errors, setErrors] = useState<{
    usernameOrEmail?: string;
    password?: string;
  }>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      router.replace("/reports");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  const validate = (): boolean => {
    const newErrors: { usernameOrEmail?: string; password?: string } = {};

    if (!usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Username or Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        username_or_email: usernameOrEmail.trim(),
        password,
      });
      router.replace("/reports");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Authentication failed. Please verify your credentials and try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading || isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        py: { xs: 4, sm: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="xs" disableGutters>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            p: { xs: 3, sm: 4.5 },
            borderRadius: 3,
            bgcolor: "background.paper",
            borderColor: "divider",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 10px 30px rgba(0,0,0,0.5)"
                : "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          {/* Header & Logo */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Box sx={{ position: "relative", width: 56, height: 56, mb: 1.5 }}>
              <Image
                src="/Tagline vector.png"
                alt="Ratamaekata Emblem"
                fill
                sizes="56px"
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "-0.02em" }}
            >
              රටම එකට
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.5, fontWeight: 500, textAlign: "center" }}
            >
              Incident Management & Reporting Portal
            </Typography>
          </Box>

          {errorMessage && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                fontSize: "0.85rem",
                borderRadius: 1.5,
              }}
              onClose={() => setErrorMessage(null)}
            >
              {errorMessage}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username_or_email"
              label="Username or Email"
              name="username_or_email"
              autoComplete="username"
              autoFocus
              value={usernameOrEmail}
              onChange={(e) => {
                setUsernameOrEmail(e.target.value);
                if (errors.usernameOrEmail) {
                  setErrors((prev) => ({ ...prev, usernameOrEmail: undefined }));
                }
              }}
              error={Boolean(errors.usernameOrEmail)}
              helperText={errors.usernameOrEmail}
              disabled={isSubmitting}
              size="medium"
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              error={Boolean(errors.password)}
              helperText={errors.password}
              disabled={isSubmitting}
              size="medium"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={18} color="inherit" thickness={4} />
                ) : (
                  <LockOutlinedIcon fontSize="small" />
                )
              }
              sx={{
                py: 1.3,
                fontSize: "0.95rem",
                fontWeight: 700,
                letterSpacing: "0.01em",
              }}
            >
              {isSubmitting ? "Authenticating..." : "Sign In to Portal"}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Security Notice */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
            <ShieldOutlinedIcon sx={{ fontSize: 18, color: "text.secondary", mt: 0.2 }} />
            <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.4 }}>
              Authorized government access only. All authentication attempts and actions are monitored and audited under state security regulations.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
