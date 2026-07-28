import React from 'react';
import { cn } from '../../lib/cn';
import { Icons } from '../../lib/icons';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CB518] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none rounded-xl';

    const variants = {
      primary: 'bg-[#7CB518] text-black font-semibold hover:bg-[#8DC621] active:scale-[0.99] shadow-xs',
      secondary:
        'bg-[#151817] text-white hover:bg-[#1C201E] border border-zinc-800 hover:border-zinc-700',
      outline:
        'border border-zinc-800 bg-transparent text-white hover:bg-[#151817] hover:border-zinc-700',
      ghost:
        'bg-transparent text-zinc-400 hover:text-white hover:bg-[#151817]',
      danger: 'bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.99] shadow-xs',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-sm gap-2.5',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Icons.Spinner className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
