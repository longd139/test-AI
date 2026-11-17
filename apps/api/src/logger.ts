/**
 * apps/api/src/logger.ts
 *
 * Production-Grade Structured JSON HTTP Logger (Slot 5 Observability)
 * Implements Pino-compatible structured JSON log format as required by Slot 5 Slide 10:
 * Fields: level (30=info, 40=warn, 50=error), time, reqId, method, url, status, responseTimeMs, msg
 *
 * Zero-dependency native implementation maintaining complete compatibility with cloud log drains
 * (Render stdout, Vercel, Datadog, Loki) without external binary or npm bloat.
 */

import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export const LOG_LEVEL_CODES: Record<LogLevel, number> = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

export interface StructuredLogPayload {
  level: number;
  time: number;
  reqId?: string;
  method?: string;
  url?: string;
  status?: number;
  responseTimeMs?: number;
  msg: string;
  error?: {
    message: string;
    stack?: string;
    code?: string;
  };
  [key: string]: unknown;
}

function writeLog(
  level: LogLevel,
  msg: string,
  extra?: Record<string, unknown>
): void {
  const payload: StructuredLogPayload = {
    level: LOG_LEVEL_CODES[level],
    time: Date.now(),
    msg,
    ...extra,
  };

  const jsonString = JSON.stringify(payload);

  if (LOG_LEVEL_CODES[level] >= LOG_LEVEL_CODES.error) {
    process.stderr.write(jsonString + '\n');
  } else {
    process.stdout.write(jsonString + '\n');
  }
}

export const logger = {
  trace: (msg: string, extra?: Record<string, unknown>) =>
    writeLog('trace', msg, extra),
  debug: (msg: string, extra?: Record<string, unknown>) =>
    writeLog('debug', msg, extra),
  info: (msg: string, extra?: Record<string, unknown>) =>
    writeLog('info', msg, extra),
  warn: (msg: string, extra?: Record<string, unknown>) =>
    writeLog('warn', msg, extra),
  error: (msg: string, extra?: Record<string, unknown>) =>
    writeLog('error', msg, extra),
  fatal: (msg: string, extra?: Record<string, unknown>) =>
    writeLog('fatal', msg, extra),
};

/**
 * Express middleware that:
 * 1. Attaches a unique request ID (x-request-id) to req and res.
 * 2. Emits a structured Pino-compatible log line upon response completion.
 */
export function httpLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const startTime = Date.now();

  // Extract or generate request ID
  const incomingReqId = req.headers['x-request-id'];
  const reqId =
    typeof incomingReqId === 'string' && incomingReqId.length > 0
      ? incomingReqId
      : `req-${randomUUID().slice(0, 8)}`;

  // Store reqId on request object and response header
  (req as Request & { reqId: string }).reqId = reqId;
  res.setHeader('x-request-id', reqId);

  // Skip logging for quiet health check probes in local testing if needed,
  // but in production emit structured logs for all endpoints.
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const isError = res.statusCode >= 500;
    const level: LogLevel = isError ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';

    writeLog(level, 'request completed', {
      reqId,
      method: req.method,
      url: req.originalUrl || req.url,
      status: res.statusCode,
      responseTimeMs: duration,
    });
  });

  next();
}
