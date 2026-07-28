import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const existingId = req.headers['x-request-id'] as string;
  const requestId = existingId || `req_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

  req.requestId = requestId;
  res.setHeader('X-Request-ID', requestId);

  next();
}
