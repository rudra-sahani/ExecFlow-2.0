import React from 'react';
import { Sparkles, Calendar, Shield, Users, CheckCircle2, AlertTriangle, Database } from 'lucide-react';

interface SearchSuggestionsProps {
  onSelectSuggestion: (query: string) => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ onSelectSuggestion }) => {
  const categories = [
    {
      title: 'Deadlines & Tasks',
      icon: Calendar,
      query: 'What deadlines are due next week?',
      badge: 'Action Items',
    },
    {
      title: 'Deployments & Release',
      icon: Database,
      query: 'Show meetings discussing deployment.',
      badge: 'Infrastructure',
    },
    {
      title: 'Work Ownership',
      icon: Users,
      query: 'Who usually owns testing?',
      badge: 'Responsibilities',
    },
    {
      title: 'Risk Analysis',
      icon: AlertTriangle,
      query: 'What recurring risks have appeared?',
      badge: 'Compliance',
    },
    {
      title: 'Decisions Log',
      icon: CheckCircle2,
      query: 'Decisions about authentication.',
      badge: 'Architecture',
    },
    {
      title: 'Technical Search',
      icon: Shield,
      query: 'Meetings mentioning PostgreSQL.',
      badge: 'Database',
    },
  ];

  return (
    <div className="w-full bg-[#0F1110] rounded-xl border border-[#7CB518]/30 p-4 font-mono text-white">
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">
        <Sparkles className="w-4 h-4 text-[#39FF14]" />
        <span>Example Natural Language Prompts</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 font-mono">
        {categories.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectSuggestion(item.query)}
              className="group text-left p-3 rounded-lg border border-[#7CB518]/20 bg-[#050505] hover:border-[#7CB518]/60 transition-all flex flex-col justify-between font-mono"
            >
              <div className="flex items-center justify-between mb-1 font-mono">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#39FF14] font-mono">
                  <Icon className="w-3.5 h-3.5 text-[#39FF14]" />
                  {item.title}
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30 font-mono">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-1 italic font-mono">
                "{item.query}"
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
