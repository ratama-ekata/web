import { NextResponse } from "next/server";
import { APP_CONFIG } from "@/constants/config";

export const dynamic = "force-static";

export async function GET() {
  const healthData = {
    status: "healthy",
    appName: APP_CONFIG.name,
    version: APP_CONFIG.version,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    services: {
      database: "connected",
      cache: "ready",
      auth: "operational",
    },
  };

  return NextResponse.json(
    {
      success: true,
      data: healthData,
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
