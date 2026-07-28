import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/constants';

interface RememberMeProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showForgotPassword?: boolean;
}

export const RememberMe: React.FC<RememberMeProps> = ({
  checked = false,
  onChange,
  showForgotPassword = true,
}) => {
  return (
    <div className="flex items-center justify-between text-xs sm:text-sm font-sans">
      <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-400 hover:text-white">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 rounded border-zinc-800 bg-[#151817] text-[#7CB518] focus:ring-[#7CB518] accent-[#7CB518] cursor-pointer"
        />
        <span>Remember me</span>
      </label>

      {showForgotPassword && (
        <Link
          to="/forgot-password"
          className="font-medium text-[#7CB518] hover:text-[#8DC621] transition-colors"
        >
          Forgot password?
        </Link>
      )}
    </div>
  );
};
