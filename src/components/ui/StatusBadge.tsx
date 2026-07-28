import React from 'react';
import { Badge } from './Badge';

export interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const upper = (status || '').toUpperCase();

  switch (upper) {
    case 'COMPLETED':
    case 'SUCCESS':
    case 'APPROVED':
    case 'HEALTHY':
      return <Badge variant="success" className={className}>{upper}</Badge>;

    case 'PENDING':
    case 'SCHEDULED':
    case 'RETRYING':
    case 'DEGRADED':
      return <Badge variant="warning" className={className}>{upper}</Badge>;

    case 'FAILED':
    case 'REJECTED':
    case 'CANCELLED':
    case 'UNHEALTHY':
    case 'BLOCKED':
      return <Badge variant="error" className={className}>{upper}</Badge>;

    case 'RUNNING':
    case 'RECORDING':
    case 'PROCESSING':
    case 'IN_PROGRESS':
    case 'EXECUTING':
      return <Badge variant="indigo" className={className}>{upper}</Badge>;

    case 'SKIPPED':
    case 'EXPIRED':
    case 'IDLE':
    default:
      return <Badge variant="neutral" className={className}>{upper}</Badge>;
  }
};
