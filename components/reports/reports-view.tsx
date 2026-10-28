"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
  Button,
  Alert,
  Tooltip,
  LinearProgress,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from "@mui/icons-material/Clear";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SecurityIcon from "@mui/icons-material/Security";

import { SuspectReport } from "@/types/report";
import { reportService } from "@/services/report-service";
import { ReportDetailsDialog } from "./report-details-dialog";
import { PoliceStationSelect } from "@/components/ui/police-station-select";

// Official drug activity types matching the exact database records
const ACTIVITY_TYPES = [
  { value: "ALL", label: "All Activity Types" },
  { value: "Selling or dealing drugs", label: "Selling or dealing drugs" },
  { value: "Using drugs in public", label: "Using drugs in public" },
  { value: "Storing or transporting drugs", label: "Storing or transporting drugs" },
  { value: "Drug activity near a school", label: "Drug activity near a school" },
  { value: "Manufacturing or cultivation", label: "Manufacturing or cultivation" },
  { value: "Other", label: "Other" },
];

export function ReportsView() {
  const [reports, setReports] = useState<SuspectReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedActivity, setSelectedActivity] = useState<string>("ALL");
  const [policeStationFilter, setPoliceStationFilter] = useState<string>("");

  // Pagination state
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Dialog state
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // Fetch reports from backend API
  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Backend GET /suspect-reports/?skip=0&limit=200
      const data = await reportService.getReports({
        skip: 0,
        limit: 200,
        type_of_activity: selectedActivity !== "ALL" ? selectedActivity : undefined,
        police_station: policeStationFilter.trim() || undefined,
      });
      setReports(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load reports from backend service.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [selectedActivity, policeStationFilter]);

  useEffect(() => {
    let ignore = false;
    queueMicrotask(() => {
      if (!ignore) {
        fetchReports();
      }
    });
    return () => {
      ignore = true;
    };
  }, [fetchReports]);

  // Client-side text search across multiple fields
  const filteredReports = useMemo(() => {
    if (!searchTerm.trim()) return reports;

    const query = searchTerm.toLowerCase().trim();
    return reports.filter((item) => {
      return (
        item.fullname?.toLowerCase().includes(query) ||
        item.nic?.toLowerCase().includes(query) ||
        item.mobile?.toLowerCase().includes(query) ||
        item.email?.toLowerCase().includes(query) ||
        item.police_station?.toLowerCase().includes(query) ||
        item.type_of_activity?.toLowerCase().includes(query) ||
        item.activity_description?.toLowerCase().includes(query) ||
        item.report_id?.toLowerCase().includes(query) ||
        item.id?.toLowerCase().includes(query)
      );
    });
  }, [reports, searchTerm]);

  // Paginated subset
  const paginatedReports = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredReports.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredReports, page, rowsPerPage]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDetails = (id: string) => {
    setSelectedReportId(id);
    setDialogOpen(true);
  };

  const handleCloseDetails = () => {
    setDialogOpen(false);
    setSelectedReportId(null);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedActivity("ALL");
    setPoliceStationFilter("");
    setPage(0);
  };

  const hasActiveFilters =
    Boolean(searchTerm) ||
    selectedActivity !== "ALL" ||
    Boolean(policeStationFilter);

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
      });
    } catch {
      return dateStr;
    }
  };

  const getActivityChipColor = (type?: string): "error" | "warning" | "info" | "default" => {
    switch (type) {
      case "selling":
      case "manufacturing":
        return "error";
      case "near-school":
      case "storing":
        return "warning";
      case "using-public":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Contextual Header & Breadcrumb */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Portal Administration &gt; Incident Reports
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "-0.02em" }}
            >
              Suspect Incident Reports
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Review, filter, and inspect verified intelligence and citizen reports.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={fetchReports}
              disabled={loading}
              sx={{ borderRadius: 1.5 }}
            >
              Refresh
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Summary KPI Strip */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, gap: 2 }}>
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, display: "block" }}>
              Total Reports Retrieved
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "primary.main", mt: 0.5 }}>
              {reports.length}
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, display: "block" }}>
              Filtered Results
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
              {filteredReports.length}
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, display: "block" }}>
              Security Classification
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.5 }}>
              <SecurityIcon sx={{ fontSize: 20, color: "success.main" }} />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Law Enforcement Restricted
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Filter and Search Bar */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: { xs: "stretch", md: "center" },
          position: "relative",
          zIndex: 10,
          overflow: "visible",
        }}
      >
        {/* Search input */}
        <TextField
          size="small"
          placeholder="Search by report ID, citizen name, NIC, phone, station, or keywords..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          sx={{ flex: 2 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: searchTerm ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm("")}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
        />

        {/* Activity Type Filter */}
        <TextField
          select
          size="small"
          label="Activity Type"
          value={selectedActivity}
          onChange={(e) => {
            setSelectedActivity(e.target.value);
            setPage(0);
          }}
          sx={{ minWidth: 200, flex: 1 }}
        >
          {ACTIVITY_TYPES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Police Station Filter - Searchable Dropdown */}
        <Box sx={{ minWidth: 220, flex: 1, position: "relative", zIndex: 30 }}>
          <PoliceStationSelect
            value={policeStationFilter}
            onChange={(val) => {
              setPoliceStationFilter(val);
              setPage(0);
            }}
            showAllOption={true}
            allOptionLabel="All Police Stations"
            placeholder="Filter Police Station"
            className="!h-10 text-xs sm:text-sm"
          />
        </Box>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="text"
            size="small"
            color="secondary"
            onClick={handleClearFilters}
            sx={{ whiteSpace: "nowrap" }}
          >
            Clear Filters
          </Button>
        )}
      </Paper>

      {/* Error Banner with Retry */}
      {error && !loading && (
        <Alert
          severity="error"
          sx={{ borderRadius: 2 }}
          action={
            <Button color="inherit" size="small" onClick={fetchReports}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Main Reports Table Container */}
      <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
        {loading && <LinearProgress color="primary" />}

        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="suspect reports table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 100 }}>Report ID</TableCell>
                <TableCell sx={{ minWidth: 160 }}>Citizen Informant</TableCell>
                <TableCell sx={{ minWidth: 140 }}>Activity Type</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Police Station</TableCell>
                <TableCell sx={{ minWidth: 160 }}>Date Submitted</TableCell>
                <TableCell align="center" sx={{ minWidth: 90 }}>Evidence</TableCell>
                <TableCell align="center" sx={{ minWidth: 90 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedReports.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
                      <AssignmentIcon sx={{ fontSize: 48, color: "text.secondary", opacity: 0.5 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.secondary" }}>
                        No Suspect Reports Found
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 380 }}>
                        {hasActiveFilters
                          ? "No incident records matched your filter criteria. Try resetting your search filters."
                          : "No incident reports have been submitted yet."}
                      </Typography>
                      {hasActiveFilters && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={handleClearFilters}
                          sx={{ mt: 1 }}
                        >
                          Reset Filters
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              )}

              {paginatedReports.map((report) => (
                <TableRow
                  key={report.id}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenDetails(report.id)}
                >
                  {/* ID Column */}
                  <TableCell sx={{ fontFamily: "monospace", fontSize: "0.8rem", color: "text.secondary" }}>
                    <Tooltip title={report.report_id || report.id}>
                      <span>
                        {report.report_id
                          ? report.report_id
                          : report.id
                            ? `#${report.id.substring(0, 8)}`
                            : "N/A"}
                      </span>
                    </Tooltip>
                  </TableCell>

                  {/* Citizen / Informant Column */}
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {report.fullname || "Anonymous"}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mt: 0.25 }}>
                      {report.nic && (
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          NIC: {report.nic}
                        </Typography>
                      )}
                      {report.mobile && (
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          • Tel: {report.mobile}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>

                  {/* Activity Type Column */}
                  <TableCell>
                    <Chip
                      label={report.type_of_activity || "General"}
                      size="small"
                      color={getActivityChipColor(report.type_of_activity)}
                      sx={{ fontWeight: 600, fontSize: "0.72rem" }}
                    />
                  </TableCell>

                  {/* Police Station Column */}
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {report.police_station || "N/A"}
                    </Typography>
                  </TableCell>

                  {/* Date Submitted Column */}
                  <TableCell>
                    <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                      {formatDate(report.created_at)}
                    </Typography>
                  </TableCell>

                  {/* Evidence Files Column */}
                  <TableCell align="center">
                    {report.files && report.files.length > 0 ? (
                      <Chip
                        icon={<AttachFileIcon fontSize="small" />}
                        label={report.files.length}
                        size="small"
                        color="secondary"
                        variant="outlined"
                        sx={{ fontWeight: 700, fontSize: "0.72rem" }}
                      />
                    ) : (
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        None
                      </Typography>
                    )}
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell
                    align="center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetails(report.id);
                    }}
                  >
                    <Tooltip title="View complete report details">
                      <IconButton
                        color="primary"
                        size="small"
                        aria-label={`View report ${report.id}`}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table Pagination */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filteredReports.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: "1px solid", borderColor: "divider" }}
        />
      </Paper>

      {/* Complete Report Details Popup Dialog */}
      <ReportDetailsDialog
        open={dialogOpen}
        reportId={selectedReportId}
        onClose={handleCloseDetails}
      />
    </Box>
  );
}
