import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { env } from '../config/env';

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  const requestId = req.requestId || `req_${Date.now()}`;
  const statusCode = err.status || err.statusCode || 500;

  // Log detailed error internally
  logger.error(`[SERVER_ERROR] ${err.message || 'Unhandled error'}`, {
    requestId,
    url: req.url,
    method: req.method,
    stack: err.stack,
  });

  // Never leak database, SQL, JWT, or internal code details to client
  let sanitizedMessage = 'An unexpected server error occurred. Please try again.';
  let errorCode = 'INTERNAL_SERVER_ERROR';

  if (statusCode < 500 && err.message) {
    sanitizedMessage = err.message;
    errorCode = err.code || 'BAD_REQUEST';
  } else if (env.NODE_ENV === 'development') {
    sanitizedMessage = err.message || sanitizedMessage;
  }

  return res.status(statusCode).json({
    success: false,
    message: sanitizedMessage,
    code: errorCode,
    meta: {
      timestamp: new Date().toISOString(),
      requestId,
    },
  });
}
