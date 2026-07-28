import React, { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { PageSkeleton } from '../components/ui/Skeleton';
import { ExecFlowLogo } from '../components/common/ExecFlowLogo';
import { AuthIllustration } from '../features/authentication/components/AuthIllustration';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col font-sans relative overflow-x-hidden">
      {/* Top Navigation Bar with Single Primary Branding */}
      <header className="w-full border-b border-zinc-800/60 bg-[#050505]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <ExecFlowLogo to="/" size="md" showSubtitle={false} />

          <div className="flex items-center gap-4 text-xs font-sans">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Product</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Two-Column Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Product Showcase & Features (Desktop) */}
          <div className="lg:col-span-7 hidden lg:block h-full">
            <AuthIllustration />
          </div>

          {/* Right Column: Authentication Form Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-[440px] mx-auto">
              <Suspense fallback={<PageSkeleton />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 py-4 text-center text-xs text-zinc-500 font-sans">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} ExecFlow Enterprise Platform. All rights reserved.</span>
          <div className="flex items-center gap-4 text-[11px] text-zinc-500">
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">SOC-2 Compliance</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
