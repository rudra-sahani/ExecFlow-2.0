import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Settings,
  Keyboard,
  LogOut,
  ChevronDown,
  Sparkles,
  Shield,
  Moon,
  Sun,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useLogout } from '../../features/authentication/hooks/useLogout';
import { useUIStore } from '../../store/useUIStore';
import { useThemeStore } from '../../store/useThemeStore';
import { ROUTES } from '../../utils/constants';
import { cn } from '../../lib/cn';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const { logout, isLoggingOut } = useLogout();
  const setKeyboardShortcutsOpen = useUIStore((state) => state.setKeyboardShortcutsOpen);
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userName = user?.fullName || 'User';
  const userEmail = user?.email || 'user@execflow.ai';
  const userRole = user?.role === 'admin' ? 'Admin' : 'Member';
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Avatar Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#111315] transition-colors cursor-pointer group focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={userName}
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-[#7CB518]/30"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-[#7CB518] text-black font-bold text-xs flex items-center justify-center shadow-xs">
              {initials}
            </div>
          )}
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#39FF14] ring-2 ring-[#050505]" />
        </div>

        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-bold text-white leading-none font-heading">
            {userName}
          </span>
          <span className="text-[10px] font-medium text-zinc-400 mt-0.5 font-mono">
            {userRole}
          </span>
        </div>

        <ChevronDown
          className={cn(
            'hidden md:block w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform duration-200 ml-0.5',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0F1110] border border-[#7CB518]/30 shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Profile Summary */}
          <div className="p-3 border-b border-[#7CB518]/15 bg-[#111315] rounded-lg mb-1">
            <p className="text-xs font-bold text-white truncate font-heading">
              {userName}
            </p>
            <p className="text-[11px] text-zinc-400 truncate mt-0.5 font-mono">
              {userEmail}
            </p>
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] text-[10px] font-semibold font-mono">
              <Shield className="w-3 h-3 text-[#7CB518]" />
              <span>{userRole}</span>
            </div>
          </div>

          {/* Menu Options */}
          <div className="space-y-0.5 py-1 text-xs">
            <button
              type="button"
              onClick={() => {
                navigate(ROUTES.PROFILE);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:bg-[#111315] hover:text-white transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>My Profile</span>
            </button>

            <button
              type="button"
              onClick={() => {
                navigate(ROUTES.SETTINGS);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:bg-[#111315] hover:text-white transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>Workspace Settings</span>
            </button>

            <button
              type="button"
              onClick={() => {
                toggleTheme();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:bg-[#111315] hover:text-white transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <Moon className="w-4 h-4 text-[#7CB518] shrink-0" />
                )}
                <span>Appearance Mode</span>
              </div>
              <span className="text-[10px] font-mono font-semibold uppercase text-zinc-400">
                {theme}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setKeyboardShortcutsOpen(true);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:bg-[#111315] hover:text-white transition-colors cursor-pointer"
            >
              <Keyboard className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>Keyboard Shortcuts</span>
              <kbd className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#111315] border border-[#7CB518]/30 text-[#95D600]">
                ?
              </kbd>
            </button>
          </div>

          <div className="pt-1 mt-1 border-t border-[#7CB518]/15">
            <button
              type="button"
              disabled={isLoggingOut}
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer font-semibold"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>{isLoggingOut ? 'Signing out...' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
