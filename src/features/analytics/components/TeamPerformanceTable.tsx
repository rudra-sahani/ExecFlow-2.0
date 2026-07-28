import React from 'react';
import { Users, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import { TeamPerformanceItem } from '../../../types/analytics';

interface TeamPerformanceTableProps {
  teams: TeamPerformanceItem[];
  onDrillDown: (teamName: string) => void;
}

export const TeamPerformanceTable: React.FC<TeamPerformanceTableProps> = ({
  teams,
  onDrillDown,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Departmental Productivity Benchmarks
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cross-functional execution comparison across organization departments
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <th className="pb-3 px-2">Department / Team</th>
              <th className="pb-3 px-2">Members</th>
              <th className="pb-3 px-2">Meetings</th>
              <th className="pb-3 px-2">Tasks Done</th>
              <th className="pb-3 px-2">Completion %</th>
              <th className="pb-3 px-2">Decision Speed</th>
              <th className="pb-3 px-2">Risks</th>
              <th className="pb-3 px-2 text-right">Time Saved</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {teams.map((team) => (
              <tr
                key={team.teamName}
                onClick={() => onDrillDown(team.teamName)}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
              >
                <td className="py-3 px-2 font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {team.teamName}
                </td>
                <td className="py-3 px-2 text-slate-600 dark:text-slate-400">
                  {team.membersCount} Leads
                </td>
                <td className="py-3 px-2 font-medium text-slate-800 dark:text-slate-200">
                  {team.meetingsHeld}
                </td>
                <td className="py-3 px-2 font-medium text-slate-800 dark:text-slate-200">
                  {team.tasksCompleted}
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full"
                        style={{ width: `${team.completionRate}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {team.completionRate}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2 text-slate-600 dark:text-slate-400">
                  {team.avgDecisionVelocityDays} days
                </td>
                <td className="py-3 px-2">
                  <span className={`inline-flex items-center gap-1 font-semibold ${
                    team.riskCount > 3 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    <ShieldAlert className="w-3 h-3" />
                    {team.riskCount}
                  </span>
                </td>
                <td className="py-3 px-2 text-right font-bold text-indigo-600 dark:text-indigo-400">
                  {team.timeSavedHours} hrs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
