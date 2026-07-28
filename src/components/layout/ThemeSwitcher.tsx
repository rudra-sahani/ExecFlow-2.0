import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { ThemeMode } from '../../types/ui';
import { cn } from '../../lib/cn';

export const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme, resolvedTheme } = useThemeStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeOptions: { mode: ThemeMode; label: string; icon: React.ElementType }[] = [
    { mode: 'light', label: 'Light', icon: Sun },
    { mode: 'dark', label: 'Dark', icon: Moon },
    { mode: 'system', label: 'System', icon: Laptop },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#111315] transition-colors cursor-pointer"
        aria-label="Switch theme mode"
        title={`Current theme: ${theme} (Resolved: ${resolvedTheme})`}
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="w-5 h-5 text-[#39FF14]" />
        ) : (
          <Sun className="w-5 h-5 text-amber-400" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl bg-[#0F1110] border border-[#7CB518]/30 shadow-2xl z-50 p-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-0.5">
            {themeOptions.map(({ mode, label, icon: Icon }) => {
              const isActive = theme === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setTheme(mode);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer font-mono',
                    isActive
                      ? 'bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] font-semibold'
                      : 'text-zinc-400 hover:bg-[#111315] hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{label}</span>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-[#39FF14]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
