import React from 'react';
import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';

interface NarrationBarProps {
  narrationText: string;
  stepTitle: string;
  narrationEnabled: boolean;
}

export const NarrationBar: React.FC<NarrationBarProps> = ({
  narrationText,
  stepTitle,
  narrationEnabled,
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-xl bg-[#0F1110] border border-zinc-800 backdrop-blur-xl space-y-2 relative overflow-hidden">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#7CB518]/10 text-[#7CB518]">
            <Volume2 className="w-4 h-4 text-[#7CB518]" />
          </div>
          <span className="font-sans text-zinc-300 font-semibold uppercase tracking-wider text-[11px]">
            DEMO NARRATOR: <span className="text-white">{stepTitle}</span>
          </span>
        </div>

        {narrationEnabled && (
          <div className="flex items-center gap-1.5 font-sans text-xs text-[#7CB518]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7CB518] animate-pulse" />
            <span>Active Narration Stream</span>
          </div>
        )}
      </div>

      <motion.p
        key={narrationText}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed pl-1"
      >
        "{narrationText}"
      </motion.p>
    </div>
  );
};

