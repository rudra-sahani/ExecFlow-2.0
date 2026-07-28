import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, Filter, X, ArrowRight, Command } from 'lucide-react';

interface SemanticSearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: (val: string) => void;
  onToggleFilters: () => void;
  isFilterActive?: boolean;
  activeFilterCount?: number;
  suggestions?: string[];
  onSelectSuggestion?: (suggestion: string) => void;
}

export const SemanticSearchBar: React.FC<SemanticSearchBarProps> = ({
  value,
  onChange,
  onSearch,
  onToggleFilters,
  isFilterActive,
  activeFilterCount = 0,
  suggestions = [],
  onSelectSuggestion,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowDropdown(false);
      onSearch(value);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-900/5 transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
        <div className="pl-4 pr-2 text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything across organizational meetings (e.g. 'What deadlines are due next week?')"
          className="w-full py-4 px-2 text-base bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
        />

        {value && (
          <button
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mr-1"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-2 pr-3">
          <button
            onClick={onToggleFilters}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
              isFilterActive
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setShowDropdown(false);
              onSearch(value);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-md shadow-indigo-600/20 transition-colors"
          >
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-30 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Command className="w-3.5 h-3.5 text-indigo-500" />
              Suggested Natural Language Queries
            </span>
            <span className="text-[10px] uppercase tracking-wider">Semantic Vector Match</span>
          </div>

          <div className="max-h-64 overflow-y-auto py-1">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onChange(suggestion);
                  if (onSelectSuggestion) onSelectSuggestion(suggestion);
                  setShowDropdown(false);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                <span className="truncate">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
