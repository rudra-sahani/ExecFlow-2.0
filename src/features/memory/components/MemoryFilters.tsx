import React from 'react';
import { Filter, X, RefreshCw, Check } from 'lucide-react';
import { MemoryFilterState } from '../types/memoryExplorer';

interface MemoryFiltersProps {
  filters: MemoryFilterState;
  onChangeFilters: (newFilters: MemoryFilterState) => void;
  onResetFilters: () => void;
  onClose?: () => void;
}

export const MemoryFilters: React.FC<MemoryFiltersProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
  onClose,
}) => {
  const peopleOptions = ['Alex Chen', 'Sarah Jenkins', 'Marcus Vance', 'Elena Rostova'];
  const projectOptions = ['ExecFlow AI Platform', 'Vector Memory Store', 'SOC-2 Compliance', 'Express Migration'];
  const riskLevels = ['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const;
  const decisionTypes = ['ALL', 'ARCHITECTURE', 'SECURITY', 'INFRASTRUCTURE', 'PRODUCT', 'OPERATIONS'] as const;

  const togglePerson = (person: string) => {
    const exists = filters.people.includes(person);
    const updated = exists
      ? filters.people.filter((p) => p !== person)
      : [...filters.people, person];
    onChangeFilters({ ...filters, people: updated });
  };

  const toggleProject = (proj: string) => {
    const exists = filters.projects.includes(proj);
    const updated = exists
      ? filters.projects.filter((p) => p !== proj)
      : [...filters.projects, proj];
    onChangeFilters({ ...filters, projects: updated });
  };

  return (
    <div className="bg-[#0F1110] rounded-xl border border-[#7CB518]/30 p-5 shadow-lg space-y-5 font-mono text-white">
      <div className="flex items-center justify-between pb-3 border-b border-[#7CB518]/15 font-mono">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#39FF14]" />
          <h3 className="text-sm font-semibold text-white font-heading">
            Semantic Memory Filters
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onResetFilters}
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-mono"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        {/* Date Range */}
        <div className="space-y-1.5 font-mono">
          <label className="font-semibold text-zinc-300 font-mono">
            Date Horizon
          </label>
          <div className="grid grid-cols-2 gap-1.5 font-mono">
            {(['ALL', '7D', '30D', '90D'] as const).map((range) => (
              <button
                key={range}
                onClick={() => onChangeFilters({ ...filters, dateRange: range })}
                className={`py-1.5 px-2 font-medium rounded-lg border text-center transition-all font-mono ${
                  filters.dateRange === range
                    ? 'bg-[#7CB518] text-black font-bold border-[#7CB518]'
                    : 'bg-[#050505] text-zinc-300 border-[#7CB518]/20 hover:border-[#7CB518]/40'
                }`}
              >
                {range === 'ALL' ? 'All Time' : `Last ${range}`}
              </button>
            ))}
          </div>
        </div>

        {/* Risk Level */}
        <div className="space-y-1.5 font-mono">
          <label className="font-semibold text-zinc-300 font-mono">
            Risk Severity
          </label>
          <div className="grid grid-cols-2 gap-1.5 font-mono">
            {riskLevels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => onChangeFilters({ ...filters, riskLevel: lvl })}
                className={`py-1.5 px-2 font-medium rounded-lg border text-center transition-all font-mono ${
                  filters.riskLevel === lvl
                    ? 'bg-[#7CB518] text-black font-bold border-[#7CB518]'
                    : 'bg-[#050505] text-zinc-300 border-[#7CB518]/20 hover:border-[#7CB518]/40'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Decision Type */}
        <div className="space-y-1.5 font-mono">
          <label className="font-semibold text-zinc-300 font-mono">
            Decision Category
          </label>
          <select
            value={filters.decisionType}
            onChange={(e) =>
              onChangeFilters({
                ...filters,
                decisionType: e.target.value as MemoryFilterState['decisionType'],
              })
            }
            className="w-full py-2 px-3 rounded-lg border border-[#7CB518]/30 bg-[#050505] text-white focus:outline-none focus:border-[#7CB518] font-mono"
          >
            {decisionTypes.map((dt) => (
              <option key={dt} value={dt}>
                {dt}
              </option>
            ))}
          </select>
        </div>

        {/* Task Owner */}
        <div className="space-y-1.5 font-mono">
          <label className="font-semibold text-zinc-300 font-mono">
            Task Owner / Assignee
          </label>
          <select
            value={filters.taskOwner || ''}
            onChange={(e) =>
              onChangeFilters({ ...filters, taskOwner: e.target.value || undefined })
            }
            className="w-full py-2 px-3 rounded-lg border border-[#7CB518]/30 bg-[#050505] text-white focus:outline-none focus:border-[#7CB518] font-mono"
          >
            <option value="">All Assignees</option>
            {peopleOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2 border-t border-[#7CB518]/15 font-mono">
        {/* People Multi-select */}
        <div className="font-mono">
          <label className="font-semibold text-zinc-300 mb-1.5 block font-mono">
            Filter by People
          </label>
          <div className="flex flex-wrap gap-1.5 font-mono">
            {peopleOptions.map((person) => {
              const selected = filters.people.includes(person);
              return (
                <button
                  key={person}
                  onClick={() => togglePerson(person)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1 transition-all font-mono ${
                    selected
                      ? 'bg-[#7CB518]/20 text-[#39FF14] border-[#7CB518]/50'
                      : 'bg-[#050505] text-zinc-400 border-[#7CB518]/20 hover:border-[#7CB518]/40'
                  }`}
                >
                  {selected && <Check className="w-3 h-3 text-[#39FF14]" />}
                  <span>{person}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Multi-select */}
        <div className="font-mono">
          <label className="font-semibold text-zinc-300 mb-1.5 block font-mono">
            Filter by Projects / Initiatives
          </label>
          <div className="flex flex-wrap gap-1.5 font-mono">
            {projectOptions.map((proj) => {
              const selected = filters.projects.includes(proj);
              return (
                <button
                  key={proj}
                  onClick={() => toggleProject(proj)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1 transition-all font-mono ${
                    selected
                      ? 'bg-[#7CB518]/20 text-[#39FF14] border-[#7CB518]/50'
                      : 'bg-[#050505] text-zinc-400 border-[#7CB518]/20 hover:border-[#7CB518]/40'
                  }`}
                >
                  {selected && <Check className="w-3 h-3 text-[#39FF14]" />}
                  <span>{proj}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
