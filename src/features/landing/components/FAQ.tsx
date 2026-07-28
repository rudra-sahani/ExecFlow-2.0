import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const FAQS = [
  {
    q: 'How does ExecFlow prevent hallucinated tasks?',
    a: 'ExecFlow uses a multi-agent self-consistency reflection loop. Before any task is finalized, a Reflection Agent verifies the extraction against raw transcript audio timestamps. Items with confidence scores below 95% are flagged for manual human verification.',
  },
  {
    q: 'Which video conferencing platforms are supported?',
    a: 'ExecFlow natively integrates with Zoom, Google Meet, Microsoft Teams, and Cisco Webex via automated bot recorders. You can also drag-and-drop raw audio files (MP4, M4A, MP3, WAV) directly into the web dashboard.',
  },
  {
    q: 'Is our meeting data encrypted and private?',
    a: 'Yes. All data is encrypted at rest using AES-256 and in transit with TLS 1.3. We offer complete data isolation, SOC2 Type II compliance standards, and an explicit policy: your organizational data is NEVER used to train public foundation models.',
  },
  {
    q: 'How quickly are tasks dispatched to Jira, GitHub, or Slack?',
    a: 'Webhooks and API dispatches execute in under 30 seconds following the conclusion of a meeting session. In live streaming mode, tasks are dispatched almost instantaneously as decisions are finalized.',
  },
  {
    q: 'Can we configure human approval gates before webhooks fire?',
    a: 'Absolutely. ExecFlow includes a dedicated Human Approval Governance module where you can define risk thresholds. High-impact actions (e.g. repo merges, budget commitments) trigger human sign-off gates before executing.',
  },
  {
    q: 'What happens after our 14-day free trial?',
    a: 'During your 14-day trial, you receive full access to all Professional tier capabilities with zero feature limits or credit card requirements. You can seamlessly upgrade to Pro or Enterprise at any point.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#050505] text-white relative font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Everything You Need To Know.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-mono">
            Have questions about integrations, security, or deployment? We've got answers.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 font-mono">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#0F1110] border border-[#7CB518]/30 hover:border-[#7CB518]/60 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base font-bold text-white font-heading">{item.q}</span>
                  <div
                    className={`p-1.5 rounded-full bg-[#111315] text-zinc-300 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#7CB518] text-black font-bold' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-[#7CB518]/15 pt-4 font-mono">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
