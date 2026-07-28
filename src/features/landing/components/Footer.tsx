import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/constants';
import { ExecFlowLogo } from '../../../components/common/ExecFlowLogo';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-[#7CB518]/15 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <ExecFlowLogo to="/" size="md" showSubtitle={false} />

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              ExecFlow is an enterprise AI Execution Platform transforming meeting discussions into automated tasks, decisions, risks, knowledge graph entries, and executive insights.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F1110] border border-[#7CB518]/25 text-[10px] font-mono text-[#95D600]">
                <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                All Agent Systems Operational
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-white uppercase tracking-wider block font-mono">Product</span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link to="/demo" className="hover:text-[#95D600] transition-colors">
                  Interactive Demo
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors cursor-pointer">
                  Platform Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pipeline')} className="hover:text-white transition-colors cursor-pointer">
                  Agent Pipeline
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('automation')} className="hover:text-white transition-colors cursor-pointer">
                  Automation Center
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('architecture')} className="hover:text-white transition-colors cursor-pointer">
                  Architecture
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors cursor-pointer">
                  Pricing Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-white uppercase tracking-wider block font-mono">Resources</span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link to={ROUTES.LOGIN} className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to={ROUTES.LOGIN} className="hover:text-white transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection('security')} className="hover:text-white transition-colors cursor-pointer">
                  Security Whitepaper
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors cursor-pointer">
                  FAQ & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-white uppercase tracking-wider block font-mono">Company</span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link to={ROUTES.LOGIN} className="hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to={ROUTES.REGISTER} className="hover:text-white transition-colors">
                  Start Free Trial
                </Link>
              </li>
              <li>
                <span className="text-zinc-600 cursor-default">Privacy Policy</span>
              </li>
              <li>
                <span className="text-zinc-600 cursor-default">Terms of Service</span>
              </li>
              <li>
                <span className="text-zinc-600 cursor-default">GDPR Compliance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#7CB518]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div>© {new Date().getFullYear()} ExecFlow AI Inc. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

