import React from 'react';
import { Icons } from '../../lib/icons';
import { cn } from '../../lib/cn';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showKbd?: boolean;
  onKbdClick?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search meetings, tasks, transcripts...',
  className,
  showKbd = true,
  onKbdClick,
}) => {
  return (
    <div className={cn('relative flex items-center w-full', className)}>
      <Icons.Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-lg border border-slate-200/80 bg-slate-50/80 pl-9 pr-12 text-xs text-slate-900 transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:bg-slate-900"
      />
      {value ? (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <Icons.X className="h-3.5 w-3.5" />
        </button>
      ) : showKbd ? (
        <button
          type="button"
          onClick={onKbdClick}
          className="absolute right-2.5 hidden sm:inline-flex items-center rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-500 select-none"
        >
          ⌘K
        </button>
      ) : null}
    </div>
  );
};
