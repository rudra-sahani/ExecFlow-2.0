/**
 * Formatting Utilities for Dates, Numbers, Durations, and Tokens
 */

export function formatDate(dateString?: string | Date, options?: Intl.DateTimeFormatOptions): string {
  if (!dateString) return 'N/A';
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return 'Invalid date';

  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat('en-US', defaultOptions).format(date);
}

export function formatDateTime(dateString?: string | Date): string {
  if (!dateString) return 'N/A';
  return formatDate(dateString, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTime(dateString?: string | Date): string {
  if (!dateString) return 'N/A';
  return formatDate(dateString, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDurationSeconds(seconds?: number): string {
  if (!seconds || seconds <= 0) return '0s';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const hrs = Math.floor(mins / 60);

  if (hrs > 0) {
    const remainingMins = mins % 60;
    return `${hrs}h ${remainingMins}m`;
  }
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
}

export function formatNumber(num?: number, decimals = 0): string {
  if (num === undefined || num === null) return '0';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatPercentage(num?: number): string {
  if (num === undefined || num === null) return '0%';
  return `${Math.round(num)}%`;
}

export function formatTokens(tokens?: number): string {
  if (!tokens) return '0 tokens';
  if (tokens >= 1000000) {
    return `${(tokens / 1000000).toFixed(1)}M tokens`;
  }
  if (tokens >= 1000) {
    return `${(tokens / 1000).toFixed(1)}k tokens`;
  }
  return `${tokens} tokens`;
}

export function formatBytes(bytes?: number, decimals = 2): string {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
