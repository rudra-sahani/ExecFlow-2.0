import React from 'react';
import { RelatedPersonItem } from '../types/memoryExplorer';
import { Users, Mail, Video, CheckSquare, Mic } from 'lucide-react';

interface RelatedPeoplePanelProps {
  people: RelatedPersonItem[];
}

export const RelatedPeoplePanel: React.FC<RelatedPeoplePanelProps> = ({ people }) => {
  if (people.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          <Users className="w-4 h-4 text-indigo-500" />
          <span>Key Stakeholders & Contribution Insights</span>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          People Analysis
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {people.map((person) => (
          <div
            key={person.id}
            className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div>
              {/* Person Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/60 border-2 border-indigo-400 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-sm flex-shrink-0">
                  {person.avatarUrl ? (
                    <img
                      src={person.avatarUrl}
                      alt={person.person}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    person.person.charAt(0)
                  )}
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    {person.person}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                    <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{person.email}</span>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs mb-3">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Video className="w-3.5 h-3.5 text-blue-500" />
                  <span><strong>{person.meetingsCount}</strong> Meetings</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Mic className="w-3.5 h-3.5 text-purple-500" />
                  <span><strong>{person.speakingFrequency}%</strong> Airtime</span>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-1.5 mb-3">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Core Responsibilities
                </span>
                <div className="flex flex-wrap gap-1">
                  {person.responsibilities.map((resp, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-[11px] font-medium border border-indigo-200/60 dark:border-indigo-800"
                    >
                      {resp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frequently Assigned Work */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Frequently Owned Tasks
                </span>
                <ul className="space-y-1">
                  {person.frequentlyAssignedWork.map((work, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5"
                    >
                      <CheckSquare className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{work}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
