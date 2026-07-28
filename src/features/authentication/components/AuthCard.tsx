import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../../lib/cn';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  badge?: string;
  className?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  children,
  badge,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn('w-full max-w-[440px] mx-auto', className)}
    >
      <div className="bg-[#0F1110] border border-zinc-800 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black/80">
        {/* Card Header */}
        <div className="mb-6 text-left">
          {badge && (
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-sans font-medium mb-3">
              <span>{badge}</span>
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mt-1.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form Slot */}
        {children}
      </div>
    </motion.div>
  );
};
