import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { ROUTES } from '../../../utils/constants';
import { cn } from '../../../lib/cn';
import { ExecFlowLogo } from '../../../components/common/ExecFlowLogo';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[78px] flex items-center',
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-[#7CB518]/20 shadow-2xl shadow-black/80'
          : 'bg-[#050505]/50 backdrop-blur-md border-b border-white/[0.06]'
      )}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: ExecFlow Logo */}
          <div className="flex items-center shrink-0">
            <ExecFlowLogo to="/" size="md" showSubtitle={false} />
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0F1110]/90 border border-[#7CB518]/20 px-3 py-1.5 rounded-full backdrop-blur-md shadow-inner">
            <Link
              to="/demo"
              className="px-3.5 py-1.5 text-xs font-bold text-[#39FF14] hover:text-white bg-[#7CB518]/15 hover:bg-[#7CB518]/25 border border-[#7CB518]/30 rounded-full transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#39FF14]" />
              <span>Demo Mode</span>
            </Link>
            <button
              onClick={() => scrollToSection('features')}
              className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('pipeline')}
              className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              Solutions
            </button>
            <button
              onClick={() => scrollToSection('architecture')}
              className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              Enterprise
            </button>
            <button
              onClick={() => scrollToSection('automation')}
              className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              Resources
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              Pricing
            </button>
          </nav>

          {/* Right: Auth Actions & Hamburger Menu */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            {isAuthenticated ? (
              <button
                onClick={() => navigate(ROUTES.DASHBOARD)}
                className="px-4 py-2 rounded-lg bg-[#7CB518] hover:bg-[#39FF14] text-black font-bold text-xs transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 shadow-md shadow-[#7CB518]/20 cursor-pointer"
              >
                <span>Go to Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  className="text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="px-4 py-2 rounded-lg bg-[#7CB518] hover:bg-[#39FF14] text-black font-bold text-xs transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 shadow-md shadow-[#7CB518]/20 cursor-pointer whitespace-nowrap"
                >
                  <span>Start Free</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </>
            )}

            {/* Hamburger Menu (placed directly after CTA with consistent spacing) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-[#7CB518]/20 bg-[#0F1110] text-zinc-300 hover:text-white hover:border-[#7CB518]/40 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[78px] left-0 right-0 bg-[#050505]/95 border-b border-[#7CB518]/20 px-4 sm:px-6 pt-4 pb-6 space-y-4 backdrop-blur-2xl animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-1">
            <Link
              to="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left px-3 py-2.5 text-xs font-bold text-[#39FF14] hover:bg-[#111315] rounded-lg flex items-center gap-2 border border-[#7CB518]/20 bg-[#7CB518]/10"
            >
              <Sparkles className="w-4 h-4 text-[#39FF14]" />
              <span>Interactive Demo Mode</span>
            </Link>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-[#111315] hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('pipeline')}
              className="text-left px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-[#111315] hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Solutions
            </button>
            <button
              onClick={() => scrollToSection('architecture')}
              className="text-left px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-[#111315] hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Enterprise
            </button>
            <button
              onClick={() => scrollToSection('automation')}
              className="text-left px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-[#111315] hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Resources
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-[#111315] hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Pricing
            </button>
          </div>

          <div className="pt-3 border-t border-[#7CB518]/15 flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate(ROUTES.DASHBOARD);
                }}
                className="w-full py-2.5 rounded-lg bg-[#7CB518] hover:bg-[#39FF14] text-black font-bold text-xs text-center flex items-center justify-center gap-2"
              >
                <span>Go to Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-3 pt-1">
                <Link
                  to={ROUTES.LOGIN}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-medium text-xs text-center transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 rounded-lg bg-[#7CB518] hover:bg-[#39FF14] text-black font-bold text-xs text-center transition-colors"
                >
                  Start Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

