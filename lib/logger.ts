import { isDevelopment } from "./env";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogPayload {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
}

function formatLog(payload: LogPayload): string {
  return `[${payload.timestamp}] [${payload.level.toUpperCase()}] ${payload.message}`;
}

/**
 * Structured application logger for server and client execution
 */
export const logger = {
  debug(message: string, data?: unknown) {
    if (!isDevelopment) return;
    const payload: LogPayload = {
      level: "debug",
      message,
      data,
      timestamp: new Date().toISOString(),
    };
    if (data !== undefined) {
      console.debug(formatLog(payload), data);
    } else {
      console.debug(formatLog(payload));
    }
  },

  info(message: string, data?: unknown) {
    const payload: LogPayload = {
      level: "info",
      message,
      data,
      timestamp: new Date().toISOString(),
    };
    if (data !== undefined) {
      console.info(formatLog(payload), data);
    } else {
      console.info(formatLog(payload));
    }
  },

  warn(message: string, data?: unknown) {
    const payload: LogPayload = {
      level: "warn",
      message,
      data,
      timestamp: new Date().toISOString(),
    };
    if (data !== undefined) {
      console.warn(formatLog(payload), data);
    } else {
      console.warn(formatLog(payload));
    }
  },

  error(message: string, error?: unknown) {
    const payload: LogPayload = {
      level: "error",
      message,
      data: error,
      timestamp: new Date().toISOString(),
    };
    if (error !== undefined) {
      console.error(formatLog(payload), error);
    } else {
      console.error(formatLog(payload));
    }
  },
};
