"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import { useRouter, usePathname } from "@/i18n/routing";
import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Tooltip,
  useTheme as useMuiTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ShieldIcon from "@mui/icons-material/Shield";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@/context/theme-context";

const DRAWER_WIDTH = 260;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const { resolvedTheme, setTheme } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
    router.replace("/login");
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isReportsActive = pathname.includes("/reports");

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Brand Header */}
      <Box
        sx={{
          height: 64,
          px: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ position: "relative", width: 34, height: 34, flexShrink: 0 }}>
          <Image
            src="/Tagline vector.png"
            alt="Ratamaekata Emblem"
            fill
            sizes="34px"
            style={{ objectFit: "contain" }}
            priority
          />
        </Box>
        <Box sx={{ minWidth: 0, overflow: "hidden" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              lineHeight: 1.2,
              color: "text.primary",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            රටම එකට
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              display: "block",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              fontSize: "0.68rem",
            }}
          >
            Portal Administration
          </Typography>
        </Box>
      </Box>

      {/* Navigation List - Only Reports as specified in requirements */}
      <Box sx={{ flex: 1, py: 2, px: 1.5 }}>
        <Typography
          variant="caption"
          sx={{
            px: 1.5,
            mb: 1,
            display: "block",
            color: "text.secondary",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontSize: "0.7rem",
          }}
        >
          Management
        </Typography>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              selected={isReportsActive}
              onClick={() => {
                if (isMobile) setMobileOpen(false);
                router.push("/reports");
              }}
              sx={{
                borderRadius: 1.5,
                py: 1.2,
                px: 1.5,
                mb: 0.5,
                transition: "all 0.15s ease",
                "&.Mui-selected": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(230, 111, 127, 0.15)"
                      : "rgba(136, 38, 55, 0.08)",
                  color: "primary.main",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(230, 111, 127, 0.22)"
                        : "rgba(136, 38, 55, 0.12)",
                  },
                },
                "&:hover": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 38,
                  color: isReportsActive ? "primary.main" : "text.secondary",
                }}
              >
                <AssignmentIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Reports"
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: "0.92rem",
                      fontWeight: isReportsActive ? 700 : 500,
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Drawer Footer System Status */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.02)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ShieldIcon sx={{ fontSize: 16, color: "success.main" }} />
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
            Secure Government Gateway
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Top Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ height: 64, px: { xs: 2, sm: 3 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Top Bar Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.15rem" },
                color: "text.primary",
                letterSpacing: "-0.01em",
              }}
            >
              Ratamaekata Incident Operations
            </Typography>
          </Box>

          {/* Right Header Controls */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Theme Toggle */}
            <Tooltip title={`Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`}>
              <IconButton onClick={toggleTheme} color="inherit" size="small">
                {resolvedTheme === "dark" ? (
                  <Brightness7Icon fontSize="small" />
                ) : (
                  <Brightness4Icon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>

            {/* User Profile Summary */}
            {user && (
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                  alignItems: "flex-end",
                  mr: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                  {user.username}
                </Typography>
                <Chip
                  label={user.role}
                  size="small"
                  color={user.role === "SYSTEM_ADMIN" ? "secondary" : "primary"}
                  sx={{
                    height: 18,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                  }}
                />
              </Box>
            )}

            {/* Profile Avatar & Menu Trigger */}
            <Tooltip title="Account profile and settings">
              <IconButton
                onClick={handleProfileMenuOpen}
                size="small"
                sx={{
                  p: 0.5,
                  border: "2px solid",
                  borderColor: "primary.main",
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "primary.main",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  {user?.username ? user.username.charAt(0).toUpperCase() : <PersonIcon fontSize="small" />}
                </Avatar>
              </IconButton>
            </Tooltip>

            {/* Dropdown Profile Menu */}
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileMenuClose}
              onClick={handleProfileMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              slotProps={{
                paper: {
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    minWidth: 220,
                    overflow: "visible",
                    borderRadius: 2,
                    filter: "drop-shadow(0px 4px 20px rgba(0,0,0,0.12))",
                  },
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {user?.username || "Authenticated User"}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                  {user?.email || "Gov Official"}
                </Typography>
                <Chip
                  label={user?.role || "ADMIN"}
                  size="small"
                  color="primary"
                  sx={{ mt: 0.75, height: 18, fontSize: "0.65rem", fontWeight: 700 }}
                />
              </Box>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleLogout} sx={{ color: "error.main", gap: 1.5, py: 1 }}>
                <LogoutIcon fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        aria-label="admin navigation"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              borderRight: "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}
      >
        {/* Toolbar Spacer */}
        <Toolbar sx={{ height: 64 }} />

        {/* Page Content */}
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, flex: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
