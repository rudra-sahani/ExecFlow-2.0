export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private formatMeta(meta?: LogContext): string {
    if (!meta || Object.keys(meta).length === 0) return '';
    try {
      // Sanitize sensitive fields before printing
      const sanitized = { ...meta };
      const sensitiveKeys = ['password', 'token', 'secret', 'authorization', 'apiKey', 'jwt'];
      for (const key of Object.keys(sanitized)) {
        if (sensitiveKeys.some((s) => key.toLowerCase().includes(s))) {
          sanitized[key] = '[REDACTED]';
        }
      }
      return ` ${JSON.stringify(sanitized)}`;
    } catch {
      return '';
    }
  }

  private log(level: LogLevel, message: string, meta?: LogContext) {
    const timestamp = new Date().toISOString();
    const formattedMeta = this.formatMeta(meta);
    const output = `[${timestamp}] [${level.toUpperCase()}] ${message}${formattedMeta}`;

    switch (level) {
      case 'error':
        console.error(output);
        break;
      case 'warn':
        console.warn(output);
        break;
      case 'info':
        console.info(output);
        break;
      case 'debug':
        if (process.env.NODE_ENV === 'development') {
          console.debug(output);
        }
        break;
    }
  }

  info(message: string, meta?: LogContext) {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: LogContext) {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: LogContext) {
    this.log('error', message, meta);
  }

  debug(message: string, meta?: LogContext) {
    this.log('debug', message, meta);
  }
}

export const logger = new Logger();
