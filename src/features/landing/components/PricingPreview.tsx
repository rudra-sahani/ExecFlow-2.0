import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { ROUTES } from '../../../utils/constants';

const PLANS = [
  {
    name: 'Starter',
    badge: 'Individual Leads',
    priceMonthly: 29,
    priceAnnual: 24,
    description: 'Perfect for engineering leads and project managers managing single team syncs.',
    features: [
      'Up to 1,000 meeting minutes / mo',
      'Basic Task Extraction Agent',
      'Jira & Slack 1-way integration',
      '7-day Knowledge Graph memory',
      'Email support',
    ],
    ctaText: 'Start Free Trial',
    popular: false,
    gradient: 'border-[#7CB518]/20 bg-[#0F1110]',
  },
  {
    name: 'Professional',
    badge: 'Most Popular',
    priceMonthly: 79,
    priceAnnual: 64,
    description: 'Designed for scaling engineering departments requiring automated multi-tool execution.',
    features: [
      'Unlimited meeting minutes',
      'Full Multi-Agent Swarm (Planner + Reflection)',
      '2-Way Sync: Jira, GitHub, Slack, Notion',
      'Persistent Semantic Knowledge Graph',
      'Human Approval Governance Gates',
      'Agent Monitor Real-Time Telemetry',
      'Priority 24/7 Support',
    ],
    ctaText: 'Start 14-Day Free Trial',
    popular: true,
    gradient: 'border-[#7CB518] bg-[#0F1110] shadow-2xl shadow-[#7CB518]/15',
  },
  {
    name: 'Enterprise',
    badge: 'Custom Governance',
    priceMonthly: 'Custom',
    priceAnnual: 'Custom',
    description: 'Custom security policies, dedicated VPC deployment, and custom SLA commitments for large enterprises.',
    features: [
      'Dedicated VPC or On-Premise deployment',
      'Custom LLM fine-tuning on domain data',
      'SAML SSO & Custom RBAC roles',
      'Unlimited Knowledge Graph vectors',
      'Dedicated Account Manager & SLA',
      'Custom Webhooks & Internal Tooling',
    ],
    ctaText: 'Contact Enterprise Sales',
    popular: false,
    gradient: 'border-[#7CB518]/20 bg-[#0F1110]',
  },
];

export const PricingPreview: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-[#050505] text-white relative border-t border-[#7CB518]/15 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] text-xs font-mono">
            <Zap className="w-3.5 h-3.5" /> Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Simple, Predictable Plans.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-mono">
            Start with a 14-day unrestricted free trial. Scale as your team grows.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4 font-mono">
            <span className={`text-xs font-bold ${!isAnnual ? 'text-white' : 'text-zinc-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-[#111315] border border-[#7CB518]/30 p-1 flex items-center transition-all cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full bg-[#7CB518] transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold ${isAnnual ? 'text-white' : 'text-zinc-400'}`}>
              Annual <span className="text-[#39FF14] font-mono text-[10px] bg-[#7CB518]/15 px-2 py-0.5 rounded border border-[#7CB518]/30">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch font-mono">
          {PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-xl border ${plan.gradient} flex flex-col justify-between space-y-8 relative overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#7CB518] text-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-lg shadow-md font-mono">
                  Most Popular
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <span className="text-xs font-mono text-[#39FF14] font-bold uppercase">{plan.badge}</span>
                  <h3 className="text-2xl font-black text-white font-heading">{plan.name}</h3>
                </div>

                <div className="flex items-baseline gap-1">
                  {typeof plan.priceMonthly === 'number' ? (
                    <>
                      <span className="text-4xl font-black text-white font-mono font-heading">
                        ${isAnnual ? plan.priceAnnual : plan.priceMonthly}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">/ user / mo</span>
                    </>
                  ) : (
                    <span className="text-3xl font-black text-white font-mono font-heading">Custom</span>
                  )}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-mono">{plan.description}</p>

                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Included Capabilities:
                  </span>
                  <ul className="space-y-2 text-xs text-zinc-200 font-mono">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <div className="p-0.5 rounded-full bg-[#7CB518]/20 text-[#39FF14] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                to={ROUTES.REGISTER}
                className={`w-full py-3.5 rounded-lg font-bold text-xs text-center flex items-center justify-center gap-2 transition-all font-mono ${
                  plan.popular
                    ? 'bg-[#7CB518] hover:bg-[#39FF14] text-black shadow-lg shadow-[#7CB518]/25'
                    : 'bg-[#111315] hover:bg-[#181a1c] text-zinc-200 border border-[#7CB518]/30'
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
