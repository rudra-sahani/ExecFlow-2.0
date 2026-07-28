import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Play, CheckCircle2 } from 'lucide-react';
import { HeroAnimation } from './HeroAnimation';
import { ROUTES } from '../../../utils/constants';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#050505] text-white">
      {/* Background Subtle Olive Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-25">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#7CB518] rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1110] border border-[#7CB518]/25 text-zinc-300 text-xs font-medium backdrop-blur-md shadow-sm hover:border-[#7CB518]/50 transition-all cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-[#39FF14] animate-pulse" />
            <span className="font-semibold text-white">● Enterprise AI Execution Platform</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400 flex items-center gap-1">
              7 Autonomous AI Agents <Sparkles className="w-3 h-3 text-[#95D600]" />
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-white">
            Turn Every Meeting Into{' '}
            <span className="text-[#7CB518] drop-shadow-[0_0_25px_rgba(124,181,24,0.3)]">
              Instant Execution.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
            ExecFlow’s multi-agent AI pipeline automatically extracts tasks, decisions, risks, and governance workflows from your meeting discussions — dispatching enterprise tools in seconds.
          </p>

          {/* Call To Actions */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/demo"
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#7CB518] hover:bg-[#95D600] text-black font-semibold text-xs tracking-wide uppercase transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#7CB518]/20 flex items-center justify-center gap-2 group"
            >
              <Play className="w-4 h-4 fill-current text-black" />
              <span>Launch Interactive Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </Link>

            <Link
              to={ROUTES.REGISTER}
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#0F1110] hover:bg-[#111315] border border-[#7CB518]/30 hover:border-[#7CB518]/60 text-white font-semibold text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#95D600]" />
              <span>Start Free 14-Day Trial</span>
            </Link>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7CB518]" /> No Credit Card Required
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7CB518]" /> SOC2 & GDPR Compliant
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7CB518]" /> Instant 2-Minute Setup
            </div>
          </div>
        </div>

        {/* Hero Interactive Animation Showcase */}
        <div className="mt-14 sm:mt-16">
          <HeroAnimation />
        </div>
      </div>
    </section>
  );
};

