import React from 'react';
import { cn } from '../../lib/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  name,
  size = 'md',
  status,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);

  const initials = name
    ? name
        .split(' ')
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  const sizes = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-11 w-11 text-base',
    xl: 'h-14 w-14 text-lg',
  };

  const statusColors = {
    online: 'bg-emerald-500 ring-2 ring-white dark:ring-slate-900',
    offline: 'bg-slate-400 ring-2 ring-white dark:ring-slate-900',
    busy: 'bg-rose-500 ring-2 ring-white dark:ring-slate-900',
    away: 'bg-amber-500 ring-2 ring-white dark:ring-slate-900',
  };

  return (
    <div className="relative inline-block" {...props}>
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-full bg-indigo-100 font-semibold text-indigo-700 select-none dark:bg-indigo-950 dark:text-indigo-300',
          sizes[size],
          className
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={name || 'User avatar'}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};
