import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import { cn } from '../../lib/cn';

const PATH_NAME_MAP: Record<string, string> = {
  dashboard: 'Dashboard',
  meetings: 'Meetings',
  tasks: 'Action Tasks',
  analytics: 'Analytics & Reports',
  memory: 'Vector Memory',
  approvals: 'Human Approvals',
  'agent-monitor': 'Agent Observability',
  settings: 'Workspace Settings',
  profile: 'User Profile',
  'ai-insights': 'AI Insights',
  'forgot-password': 'Forgot Password',
  'reset-password': 'Reset Password',
};

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  if (pathSegments.length === 0) {
    return (
      <nav aria-label="Breadcrumb" className="flex items-center text-xs font-medium text-zinc-400">
        <span className="flex items-center gap-1.5 font-semibold text-white">
          <Home className="w-3.5 h-3.5 text-[#7CB518]" />
          <span>Dashboard</span>
        </span>
      </nav>
    );
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs font-medium text-zinc-400 font-mono">
      <Link
        to={ROUTES.DASHBOARD}
        className="flex items-center gap-1 hover:text-[#95D600] transition-colors"
      >
        <Home className="w-3.5 h-3.5 shrink-0 text-zinc-400 hover:text-[#95D600]" />
        <span className="sr-only sm:not-sr-only">Home</span>
      </Link>

      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const displayName =
          PATH_NAME_MAP[segment.toLowerCase()] ||
          (segment.length > 12 ? `${segment.substring(0, 10)}...` : segment);

        return (
          <React.Fragment key={path}>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-white truncate max-w-[150px] sm:max-w-[200px]">
                {displayName}
              </span>
            ) : (
              <Link
                to={path}
                className="hover:text-[#95D600] transition-colors truncate max-w-[120px]"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
