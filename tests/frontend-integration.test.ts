/**
 * Frontend Integration and Unit Test Suite
 * Tests: API Client, AuthService, ReportService, and Data Contracts
 */

import assert from "node:assert/strict";

// Mock localStorage for node environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

(globalThis as any).localStorage = localStorageMock;
(globalThis as any).window = {
  location: { origin: "http://localhost:3000" },
  localStorage: localStorageMock,
};

async function runTests() {
  console.log("Starting Ratamaekata Frontend Test Suite...\n");

  // 1. Test ApiClient Error Parsing with FastAPI format
  console.log("Test 1: ApiClient parsing FastAPI string error detail...");
  const { ApiClientError, apiClient } = await import("@/services/api-client");

  // Mock global fetch to simulate FastAPI 401 response
  (globalThis as any).fetch = async (url: string, init: any) => {
    return {
      ok: false,
      status: 401,
      headers: { get: () => "application/json" },
      json: async () => ({ detail: "Incorrect username/email or password" }),
      text: async () => JSON.stringify({ detail: "Incorrect username/email or password" }),
    };
  };

  try {
    await apiClient.post("/users/login/json", {
      username_or_email: "testuser",
      password: "wrongpassword",
    });
    assert.fail("Should have thrown ApiClientError");
  } catch (err: any) {
    assert.equal(err instanceof ApiClientError, true);
    assert.equal(err.statusCode, 401);
    assert.equal(err.message, "Incorrect username/email or password");
    console.log("  ✓ Correctly captured FastAPI error detail string");
  }

  // 2. Test ApiClient parsing FastAPI validation error list
  console.log("\nTest 2: ApiClient parsing FastAPI 422 validation error detail list...");
  (globalThis as any).fetch = async () => {
    return {
      ok: false,
      status: 422,
      headers: { get: () => "application/json" },
      json: async () => ({
        detail: [
          { loc: ["body", "password"], msg: "String should have at least 6 characters" },
        ],
      }),
      text: async () => "",
    };
  };

  try {
    await apiClient.post("/users/login/json", { username_or_email: "u", password: "1" });
    assert.fail("Should have thrown ApiClientError");
  } catch (err: any) {
    assert.equal(err.statusCode, 422);
    assert.equal(err.message, "String should have at least 6 characters");
    console.log("  ✓ Correctly formatted FastAPI validation error array message");
  }

  // 3. Test AuthService Login and Token Storage
  console.log("\nTest 3: AuthService login and storage...");
  const mockToken = "mock-jwt-token-xyz123";
  let capturedHeaders: any = null;
  let capturedBody: any = null;

  (globalThis as any).fetch = async (url: string, init: any) => {
    capturedHeaders = init.headers;
    capturedBody = JSON.parse(init.body || "{}");
    return {
      ok: true,
      status: 200,
      headers: { get: () => "application/json" },
      json: async () => ({
        access_token: mockToken,
        token_type: "bearer",
        role: "ADMIN",
        username: "admin",
      }),
    };
  };

  const { authService } = await import("@/services/auth-service");
  const tokenResult = await authService.login({
    username_or_email: "admin",
    password: "Admin@2026!",
  });

  assert.equal(tokenResult.access_token, mockToken);
  assert.equal(tokenResult.role, "ADMIN");
  assert.equal(capturedBody.username_or_email, "admin");
  assert.equal(authService.getToken(), mockToken);
  console.log("  ✓ Token saved into storage and verified");

  // 4. Test AuthService getCurrentUser sends Bearer token
  console.log("\nTest 4: AuthService getCurrentUser with Bearer header...");
  let userMeUrl = "";
  (globalThis as any).fetch = async (url: string, init: any) => {
    userMeUrl = url;
    capturedHeaders = init.headers;
    return {
      ok: true,
      status: 200,
      headers: { get: () => "application/json" },
      json: async () => ({
        id: "123e4567-e89b-12d3-a456-426614174000",
        username: "admin",
        email: "admin@ratamaekata.gov.lk",
        role: "ADMIN",
        is_active: true,
        created_at: "2026-10-20T10:00:00Z",
      }),
    };
  };

  const user = await authService.getCurrentUser();
  assert.equal(user.username, "admin");
  assert.equal(user.role, "ADMIN");
  assert.equal(capturedHeaders.Authorization, `Bearer ${mockToken}`);
  assert.equal(userMeUrl.includes("/users/me"), true);
  console.log("  ✓ Correctly passed Bearer token and deserialized user response");

  // 5. Test ReportService getReports URL parameters
  console.log("\nTest 5: ReportService query parameters construction...");
  let reportsUrl = "";
  (globalThis as any).fetch = async (url: string, init: any) => {
    reportsUrl = url;
    return {
      ok: true,
      status: 200,
      headers: { get: () => "application/json" },
      json: async () => [
        {
          id: "789e4567-e89b-12d3-a456-426614174000",
          fullname: "Citizen One",
          email: "citizen@example.com",
          mobile: "+94771234567",
          nic: "199012345678",
          address: "No 10, Main Street, Colombo",
          police_station: "Colombo Fort",
          type_of_activity: "selling",
          activity_description: "Suspicious drug distribution observed near harbor.",
          created_at: "2026-10-22T08:30:00Z",
          files: [],
        },
      ],
    };
  };

  const { reportService } = await import("@/services/report-service");
  const reports = await reportService.getReports({
    skip: 10,
    limit: 25,
    type_of_activity: "selling",
    police_station: "Colombo Fort",
  });

  assert.equal(reports.length, 1);
  assert.equal(reports[0].fullname, "Citizen One");
  assert.equal(reports[0].police_station, "Colombo Fort");
  assert.equal(reportsUrl.includes("skip=10"), true);
  assert.equal(reportsUrl.includes("limit=25"), true);
  assert.equal(reportsUrl.includes("type_of_activity=selling"), true);
  assert.equal(reportsUrl.includes("police_station=Colombo+Fort") || reportsUrl.includes("police_station=Colombo%20Fort"), true);
  console.log("  ✓ Generated exact query params: skip, limit, activity, station");

  // 6. Test ReportService getReportById URL
  console.log("\nTest 6: ReportService getReportById details endpoint...");
  let singleReportUrl = "";
  const testReportId = "550e8400-e29b-41d4-a716-446655440000";
  (globalThis as any).fetch = async (url: string) => {
    singleReportUrl = url;
    return {
      ok: true,
      status: 200,
      headers: { get: () => "application/json" },
      json: async () => ({
        id: testReportId,
        fullname: "Verified Informant",
        email: "informant@gov.lk",
        mobile: "+94770000000",
        nic: "198512345678",
        address: "Kandy Road",
        police_station: "Kandy Central",
        type_of_activity: "storing",
        activity_description: "Stash located in warehouse.",
        created_at: "2026-10-25T14:00:00Z",
        files: [
          {
            id: "file-uuid-1",
            file_url: "https://s3.amazonaws.com/bucket/suspect_reports/file1.jpg",
            filename: "file1.jpg",
            original_filename: "evidence_photo.jpg",
            content_type: "image/jpeg",
            size_bytes: 204800,
            created_at: "2026-10-25T14:00:00Z",
          },
        ],
      }),
    };
  };

  const singleReport = await reportService.getReportById(testReportId);
  assert.equal(singleReport.id, testReportId);
  assert.equal(singleReport.files.length, 1);
  assert.equal(singleReport.files[0].original_filename, "evidence_photo.jpg");
  assert.equal(singleReportUrl.endsWith(`/suspect-reports/${testReportId}`), true);
  console.log("  ✓ Correctly requested /suspect-reports/{id} and parsed attached files");

  // 7. Test AuthService logout
  console.log("\nTest 7: AuthService logout...");
  authService.logout();
  assert.equal(authService.getToken(), null);
  console.log("  ✓ Storage cleared upon logout");

  // 8. Test Police Stations Dataset Integrity
  console.log("\nTest 8: Police stations dataset verification...");
  const { POLICE_STATIONS } = await import("@/constants/police-stations");
  assert.equal(POLICE_STATIONS.length > 500, true);
  const kandyStation = POLICE_STATIONS.find((s) => s.station_name === "Kandy Hq");
  assert.notEqual(kandyStation, undefined);
  assert.equal(kandyStation?.station_id, 1);
  console.log(`  ✓ Successfully verified ${POLICE_STATIONS.length} police stations loaded with IDs and names`);

  // 9. Test Report Submission with Police Station
  console.log("\nTest 9: Report submission saving designated police station...");
  let submittedBody: any = null;
  let submittedUrl: string = "";
  (globalThis as any).fetch = async (url: string, init: any) => {
    submittedUrl = url;
    submittedBody = JSON.parse(init.body || "{}");
    return {
      ok: true,
      status: 201,
      headers: { get: () => "application/json" },
      json: async () => ({
        success: true,
        data: {
          report_id: "RE-2026-A9019B",
          reportId: "RE-2026-A9019B",
          referenceNumber: "RE-2026-A9019B",
          status: "received",
        },
      }),
    };
  };

  const submitResult = await reportService.submitReport({
    fullName: "Jane Citizen",
    phone: "+94771234567",
    nic: "199512345678",
    policeStation: "Kandy Hq",
    activityType: "selling",
    description: "Suspicious drug trade observed at the corner street.",
  });

  assert.equal(submitResult.referenceNumber, "RE-2026-A9019B");
  assert.equal(submitResult.reportId, "RE-2026-A9019B");
  assert.equal(/^RE-\d{4}-[A-Z0-9]{6}$/.test(submitResult.reportId), true);
  assert.equal(submittedBody.police_station, "Kandy Hq");
  assert.equal(submittedBody.policeStation, "Kandy Hq");
  assert.equal(submittedBody.type_of_activity, "Selling or dealing drugs");
  console.log("  ✓ Successfully verified report submission payload includes police_station, full drug activity name, and reportId");

  console.log("\n========================================");
  console.log("ALL 9 FRONTEND INTEGRATION TESTS PASSED!");
  console.log("========================================");
}

runTests().catch((err) => {
  console.error("Test Suite Failed:", err);
  process.exit(1);
});
