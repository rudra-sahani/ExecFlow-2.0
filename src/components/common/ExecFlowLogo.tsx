import React from 'react';
import { Link } from 'react-router-dom';

interface ExecFlowLogoProps {
  to?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const ExecFlowIcon: React.FC<{ sizeClass?: string }> = ({ sizeClass = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={sizeClass}>
    {/* Geometric Workflow to Execution mark */}
    <rect x="3" y="4" width="6" height="6" rx="1.5" fill="#7CB518" />
    <rect x="3" y="14" width="6" height="6" rx="1.5" fill="#7CB518" fillOpacity="0.4" />
    <path
      d="M12 7H15.5C17.5 7 19 8.5 19 10.5V12M12 17H15.5C17.5 17 19 15.5 19 13.5V12M19 12H21"
      stroke="#95D600"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 9.5L21 12L18 14.5"
      stroke="#39FF14"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ExecFlowLogo: React.FC<ExecFlowLogoProps> = ({
  to = '/',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const iconSizeMap = {
    sm: 'w-7 h-7 p-1',
    md: 'w-9 h-9 p-1.5',
    lg: 'w-11 h-11 p-2',
  };

  const svgSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textMap = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const content = (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      <div
        className={`shrink-0 flex items-center justify-center rounded-xl bg-[#111315] border border-[#7CB518]/20 group-hover:border-[#7CB518]/50 transition-all shadow-sm ${iconSizeMap[size]}`}
      >
        <ExecFlowIcon sizeClass={svgSizeMap[size]} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-heading font-bold tracking-tight text-white ${textMap[size]}`}
          >
            Exec<span className="text-[#7CB518]">Flow</span>
          </span>
          <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded bg-[#7CB518]/15 text-[#95D600] border border-[#7CB518]/30">
            AI
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] text-zinc-400 font-medium tracking-wide -mt-0.5">
            Enterprise Execution Platform
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
};
