import React from 'react';
import { Shield, Lock, FileCheck, KeyRound, Server, Eye, CheckCircle2 } from 'lucide-react';

const SECURITY_ITEMS = [
  {
    icon: Lock,
    title: 'Human-in-the-Loop Governance',
    description:
      'Configure risk thresholds that require mandatory human sign-off before executing high-impact API dispatches or financial commitments.',
  },
  {
    icon: Shield,
    title: 'SOC2 Type II & GDPR Ready',
    description:
      'Built according to zero-trust standards with end-to-end data isolation, RBAC role restrictions, and instant data deletion rights.',
  },
  {
    icon: KeyRound,
    title: 'AES-256 Encryption & TLS 1.3',
    description:
      'All meeting recordings, transcripts, and vector memory embeddings are encrypted at rest with AES-256 and in transit with TLS 1.3.',
  },
  {
    icon: Eye,
    title: 'Immutable Audit Telemetry',
    description:
      'Complete execution logs tracking every AI model prompt, token count, tool payload, and approval decision for full regulatory compliance.',
  },
];

export const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="py-24 bg-slate-950 text-white relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
            <Shield className="w-3.5 h-3.5" /> Enterprise Grade Security
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Uncompromising Security & Control.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Deploy with total confidence. Your meeting data remains private, strictly controlled, and never trained on without consent.
          </p>
        </div>

        {/* Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECURITY_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
              >
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
