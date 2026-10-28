"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  Paper,
  Link,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import RefreshIcon from "@mui/icons-material/Refresh";

import { SuspectReport } from "@/types/report";
import { reportService } from "@/services/report-service";

interface ReportDetailsDialogProps {
  open: boolean;
  reportId: string | null;
  onClose: () => void;
}

export function ReportDetailsDialog({
  open,
  reportId,
  onClose,
}: ReportDetailsDialogProps) {
  const [report, setReport] = useState<SuspectReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stale request guard
  const activeReportIdRef = useRef<string | null>(null);

  const fetchDetails = async (id: string) => {
    setLoading(true);
    setError(null);
    activeReportIdRef.current = id;

    try {
      const data = await reportService.getReportById(id);
      // Ensure this response matches the current active report
      if (activeReportIdRef.current === id) {
        setReport(data);
      }
    } catch (err: unknown) {
      if (activeReportIdRef.current === id) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to retrieve report details. Please try again."
        );
      }
    } finally {
      if (activeReportIdRef.current === id) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let ignore = false;

    if (open && reportId) {
      queueMicrotask(async () => {
        if (ignore) return;
        setLoading(true);
        setError(null);
        activeReportIdRef.current = reportId;

        try {
          const data = await reportService.getReportById(reportId);
          if (!ignore && activeReportIdRef.current === reportId) {
            setReport(data);
          }
        } catch (err: unknown) {
          if (!ignore && activeReportIdRef.current === reportId) {
            setError(
              err instanceof Error
                ? err.message
                : "Failed to retrieve report details. Please try again."
            );
          }
        } finally {
          if (!ignore && activeReportIdRef.current === reportId) {
            setLoading(false);
          }
        }
      });
    } else {
      queueMicrotask(() => {
        if (!ignore) {
          setReport(null);
          setError(null);
          activeReportIdRef.current = null;
        }
      });
    }

    return () => {
      ignore = true;
    };
  }, [open, reportId]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateStr?: string | null): string => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const getFileIcon = (contentType: string) => {
    if (contentType.startsWith("image/")) {
      return <ImageIcon color="primary" fontSize="small" />;
    }
    if (contentType.includes("zip") || contentType.includes("compressed")) {
      return <FolderZipIcon color="secondary" fontSize="small" />;
    }
    return <InsertDriveFileIcon color="action" fontSize="small" />;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby="report-details-dialog-title"
    >
      <DialogTitle
        id="report-details-dialog-title"
        sx={{
          m: 0,
          p: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
          <DescriptionIcon color="primary" />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Suspect Report Details
            </Typography>
            {reportId && (
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontFamily: "monospace",
                  display: "block",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                ID: {reportId}
              </Typography>
            )}
          </Box>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
        {loading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              gap: 2,
            }}
          >
            <CircularProgress size={40} thickness={4} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Retrieving report record and evidence links...
            </Typography>
          </Box>
        )}

        {error && !loading && (
          <Box sx={{ py: 3 }}>
            <Alert
              severity="error"
              action={
                reportId && (
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={<RefreshIcon />}
                    onClick={() => fetchDetails(reportId)}
                  >
                    Retry
                  </Button>
                )
              }
            >
              {error}
            </Alert>
          </Box>
        )}

        {!loading && !error && report && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Section 1: Incident Overview */}
            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                borderRadius: 2,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "primary.main",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LocalPoliceIcon fontSize="small" />
                Incident Overview
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                    Type of Suspicious Activity
                  </Typography>
                  <Chip
                    label={report.type_of_activity || "Unspecified"}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ mt: 0.5, fontWeight: 700 }}
                  />
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                    Designated Police Station
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                    {report.police_station || "Not Specified"}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                    Date & Time Submitted
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.5 }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {formatDate(report.created_at)}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}>
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
                    Incident Description & Details
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 1.5,
                      bgcolor: "background.paper",
                      whiteSpace: "pre-wrap",
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      color: "text.primary",
                    }}
                  >
                    {report.activity_description || "No description provided."}
                  </Paper>
                </Box>
              </Box>
            </Paper>

            {/* Section 2: Citizen / Informant Details */}
            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                borderRadius: 2,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "primary.main",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PersonIcon fontSize="small" />
                Citizen / Informant Details
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                    Full Name
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                    {report.fullname || "Anonymous / Not Provided"}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                    National Identity Card (NIC)
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.5 }}>
                    <BadgeIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {report.nic || "N/A"}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                    Contact Mobile Number
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.5 }}>
                    <PhoneIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    {report.mobile ? (
                      <Link
                        href={`tel:${report.mobile}`}
                        color="inherit"
                        underline="hover"
                        sx={{ fontWeight: 600, fontSize: "0.875rem" }}
                      >
                        {report.mobile}
                      </Link>
                    ) : (
                      <Typography variant="body2">N/A</Typography>
                    )}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                    Email Address
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.5 }}>
                    <EmailIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    {report.email ? (
                      <Link
                        href={`mailto:${report.email}`}
                        color="inherit"
                        underline="hover"
                        sx={{ fontWeight: 600, fontSize: "0.875rem" }}
                      >
                        {report.email}
                      </Link>
                    ) : (
                      <Typography variant="body2">N/A</Typography>
                    )}
                  </Box>
                </Box>

                <Box sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}>
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                    Physical Address
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.75, mt: 0.5 }}>
                    <HomeIcon sx={{ fontSize: 16, color: "text.secondary", mt: 0.2 }} />
                    <Typography variant="body2">
                      {report.address || "No address provided."}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Section 3: Attached Evidence Files */}
            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                borderRadius: 2,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <AttachFileIcon fontSize="small" />
                  Attached Evidence Files ({report.files?.length || 0})
                </Typography>
                {report.files && report.files.length > 0 && (
                  <Chip
                    label="Cloud Storage Verified"
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ fontSize: "0.68rem", fontWeight: 700, height: 20 }}
                  />
                )}
              </Box>

              {(!report.files || report.files.length === 0) ? (
                <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                  No evidence files were attached to this report.
                </Typography>
              ) : (
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                  {report.files.map((file) => (
                    <Box key={file.id}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1.75,
                          borderRadius: 2,
                          bgcolor: "background.paper",
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          height: "100%",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                          <Box sx={{ mt: 0.3 }}>{getFileIcon(file.content_type)}</Box>
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Tooltip title={file.original_filename}>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 600,
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                }}
                              >
                                {file.original_filename}
                              </Typography>
                            </Tooltip>
                            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                              {formatFileSize(file.size_bytes)} • {file.content_type}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider sx={{ my: 0.5 }} />

                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                          <Button
                            component="a"
                            href={file.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            variant="outlined"
                            color="primary"
                            endIcon={<OpenInNewIcon fontSize="inherit" />}
                            sx={{ fontSize: "0.75rem", py: 0.4 }}
                          >
                            View Evidence
                          </Button>
                        </Box>
                      </Paper>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
