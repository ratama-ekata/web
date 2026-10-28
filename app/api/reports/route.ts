import { NextResponse } from "next/server";
import { isValidEmail, isValidSriLankanNIC, sanitizeString } from "@/lib/validators";

export const OFFICIAL_DRUG_ACTIVITIES: Record<string, string> = {
  "selling": "Selling or dealing drugs",
  "using-public": "Using drugs in public",
  "storing": "Storing or transporting drugs",
  "near-school": "Drug activity near a school",
  "manufacturing": "Manufacturing or cultivation",
  "other": "Other",
  "selling or dealing drugs": "Selling or dealing drugs",
  "using drugs in public": "Using drugs in public",
  "storing or transporting drugs": "Storing or transporting drugs",
  "drug activity near a school": "Drug activity near a school",
  "manufacturing or cultivation": "Manufacturing or cultivation",
  "other ": "Other",
};

const VALID_ACTIVITY_TYPES = new Set([
  "Selling or dealing drugs",
  "Using drugs in public",
  "Storing or transporting drugs",
  "Drug activity near a school",
  "Manufacturing or cultivation",
  "Other",
  "selling",
  "using-public",
  "storing",
  "near-school",
  "manufacturing",
  "other",
]);

/**
 * Generate official Report ID format:
 * RE-{YEAR}-{6_DIGIT_ALPHANUMERIC} (e.g. RE-2026-A9019B)
 * - 'RE' is constant
 * - year changes based on current year (e.g. 2026, 2027)
 * - 6-character random alphanumeric string containing capital letters and numbers
 */
function generateReportId(year?: number): string {
  const currentYear = year || new Date().getFullYear();
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  if (!/[A-Z]/.test(code) || !/[0-9]/.test(code)) {
    return generateReportId(currentYear);
  }
  return `RE-${currentYear}-${code}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_BODY",
            message: "Request body must be a valid JSON object.",
            statusCode: 400,
          },
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const {
      fullName,
      phone,
      nic,
      email,
      address,
      policeStation,
      police_station,
      activityType,
      description,
      attachments,
    } = body;

    const resolvedPoliceStation = policeStation || police_station;

    const validationErrors: Record<string, string> = {};

    // 1. Full Name (Required, at least 2 characters)
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      validationErrors.fullName = "Please enter your full name.";
    }

    // 2. Phone (Required)
    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      validationErrors.phone = "Please enter a valid phone number.";
    }

    // 3. Police Station (Required)
    if (
      !resolvedPoliceStation ||
      typeof resolvedPoliceStation !== "string" ||
      resolvedPoliceStation.trim().length < 2
    ) {
      validationErrors.policeStation = "Please select a valid police station.";
    }

    // 3. NIC (Optional, but validated if provided)
    if (nic && typeof nic === "string" && nic.trim()) {
      if (!isValidSriLankanNIC(nic.trim())) {
        validationErrors.nic = "Please enter a valid Sri Lankan NIC number.";
      }
    }

    // 4. Email (Optional, but validated if provided)
    if (email && typeof email === "string" && email.trim()) {
      if (!isValidEmail(email.trim())) {
        validationErrors.email = "Please enter a valid email address.";
      }
    }

    // 5. Activity Type (Required, valid option)
    const cleanActivity = typeof activityType === "string" ? activityType.trim() : "";
    const normalizedActivity =
      OFFICIAL_DRUG_ACTIVITIES[cleanActivity.toLowerCase()] || cleanActivity;

    if (!cleanActivity || (!VALID_ACTIVITY_TYPES.has(cleanActivity) && !VALID_ACTIVITY_TYPES.has(normalizedActivity))) {
      validationErrors.activityType = "Please select a valid type of activity.";
    }

    // 6. Description (Required, min 10 chars, max 2000 chars)
    if (!description || typeof description !== "string" || description.trim().length < 10) {
      validationErrors.description = "Please describe the activity with at least 10 characters.";
    } else if (description.trim().length > 2000) {
      validationErrors.description = "Description cannot exceed 2000 characters.";
    }

    // 7. Attachments (Optional, max 3)
    if (attachments && Array.isArray(attachments)) {
      if (attachments.length > 3) {
        validationErrors.attachments = "You can attach up to 3 files.";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "One or more fields failed validation.",
            details: validationErrors,
            statusCode: 400,
          },
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Generate unique official Report ID: RE-{YEAR}-{6_ALPHANUMERIC} (e.g. RE-2026-A9019B)
    const reportId = generateReportId();
    const referenceNumber = reportId;

    // Sanitized record ready for database storage / notification dispatch
    const newReport = {
      reportId,
      report_id: reportId,
      referenceNumber,
      fullName: sanitizeString(fullName.trim()),
      phone: phone.trim(),
      nic: nic ? sanitizeString(nic.trim().toUpperCase()) : null,
      email: email ? sanitizeString(email.trim().toLowerCase()) : null,
      address: address ? sanitizeString(address.trim()) : null,
      policeStation: sanitizeString(resolvedPoliceStation.trim()),
      activityType: normalizedActivity,
      description: sanitizeString(description.trim()),
      attachmentsCount: Array.isArray(attachments) ? attachments.length : 0,
      status: "received",
      createdAt: new Date().toISOString(),
    };

    console.info(`[Report Received] Report ID: ${reportId}`, {
      activityType: newReport.activityType,
      policeStation: newReport.policeStation,
      phone: newReport.phone,
      email: newReport.email,
      attachmentsCount: newReport.attachmentsCount,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          reportId,
          report_id: reportId,
          referenceNumber,
          status: "received",
          submittedAt: newReport.createdAt,
        },
        message: "Your report has been successfully submitted.",
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Report Submission Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to process report. Please try again later.",
          statusCode: 500,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
