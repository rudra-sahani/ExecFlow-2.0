import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ROUTES } from '../../../utils/constants';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-[#050505] text-white relative overflow-hidden border-t border-[#7CB518]/15">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#7CB518]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1110] border border-[#7CB518]/30 text-[#95D600] text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#39FF14]" /> Transform Your Team Operations Today
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Ready To Turn Every Meeting Into{' '}
          <span className="text-[#7CB518] drop-shadow-[0_0_20px_rgba(124,181,24,0.3)]">
            Instant Execution?
          </span>
        </h2>

        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
          Join engineering and product teams eliminating manual notes and driving zero-friction workflow automations.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={ROUTES.REGISTER}
            className="w-full sm:w-auto px-9 py-3.5 rounded-lg bg-[#7CB518] hover:bg-[#95D600] text-black font-semibold text-xs tracking-wide uppercase transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#7CB518]/20 flex items-center justify-center gap-2 group"
          >
            <span>Start Free 14-Day Trial</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
          </Link>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#7CB518]" /> No Credit Card Required
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#7CB518]" /> 2-Minute Bot Setup
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#7CB518]" /> Cancel Anytime
          </div>
        </div>
      </div>
    </section>
  );
};

