import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SemanticSearchBar,
  SearchResults,
  AIKnowledgeSummary,
  TopicClusters,
  KnowledgeTimeline,
  RelationshipGraph,
  SourceEvidencePanel,
  RelatedPeoplePanel,
  RecurringRisksPanel,
  DecisionHistoryPanel,
  MemoryFilters,
  SavedSearches,
  SearchSuggestions,
  SearchHistory,
  EmptyKnowledgeState,
  MemorySkeleton,
  SimilarMeetingsPanel,
} from '../components';
import { memoryExplorerService } from '../services/memoryExplorerService';
import {
  KnowledgeSearchResponse,
  MemoryFilterState,
  SavedSearch,
  SearchHistoryItem,
  KnowledgeSearchResult,
  GraphNode,
} from '../types/memoryExplorer';
import {
  Sparkles,
  Database,
  Search,
  Share2,
  Calendar,
  ShieldCheck,
  Users,
  Grid,
  RefreshCw,
} from 'lucide-react';

const initialFilters: MemoryFilterState = {
  workspace: 'ws_execflow_primary',
  dateRange: 'ALL',
  people: [],
  projects: [],
  riskLevel: 'ALL',
  decisionType: 'ALL',
};

const defaultSuggestions = [
  'What deadlines are due next week?',
  'Show meetings discussing deployment.',
  'Who usually owns testing?',
  'What recurring risks have appeared?',
  'Decisions about authentication.',
  'Meetings mentioning PostgreSQL.',
];

export const MemoryExplorerPage: React.FC = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<
    'SEARCH' | 'GRAPH' | 'TIMELINE' | 'GOVERNANCE' | 'PEOPLE'
  >('SEARCH');

  const [filters, setFilters] = useState<MemoryFilterState>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<KnowledgeSearchResponse | null>(null);

  const [evidenceResult, setEvidenceResult] = useState<KnowledgeSearchResult | null>(null);

  const [selectedTopicCategory, setSelectedTopicCategory] = useState<string>('');

  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([
    {
      id: 'sh_1',
      query: 'What deadlines are due next week?',
      timestamp: '10 mins ago',
      resultsCount: 4,
    },
    {
      id: 'sh_2',
      query: 'Decisions about authentication.',
      timestamp: '1 hour ago',
      resultsCount: 6,
    },
  ]);

  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    {
      id: 'ss_1',
      query: 'What recurring risks have appeared?',
      createdAt: '2026-07-24',
      isPinned: true,
    },
    {
      id: 'ss_2',
      query: 'Show meetings discussing deployment.',
      createdAt: '2026-07-22',
      isPinned: false,
    },
  ]);

  const executeSearch = useCallback(
    async (searchQuery: string, currentFilters: MemoryFilterState = filters) => {
      setLoading(true);
      try {
        const response = await memoryExplorerService.searchKnowledge(
          searchQuery,
          currentFilters,
          selectedTopicCategory || undefined
        );
        setData(response);

        if (searchQuery.trim()) {
          // Add to search history if unique
          setSearchHistory((prev) => {
            const exists = prev.some((h) => h.query.toLowerCase() === searchQuery.toLowerCase());
            if (exists) return prev;
            return [
              {
                id: `sh_${Date.now()}`,
                query: searchQuery.trim(),
                timestamp: 'Just now',
                resultsCount: response.totalMatches,
              },
              ...prev.slice(0, 7),
            ];
          });
        }
      } catch (err) {
        console.error('Failed to search knowledge hub:', err);
      } finally {
        setLoading(false);
      }
    },
    [filters, selectedTopicCategory]
  );

  useEffect(() => {
    // Initial fetch on page mount
    executeSearch('');
  }, []);

  const handleSearchSubmit = (val: string) => {
    setQuery(val);
    executeSearch(val);
  };

  const handleOpenMeeting = (meetingId: string) => {
    navigate(`/meetings/${meetingId}`);
  };

  const handleSaveCurrentQuery = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    const newSaved: SavedSearch = {
      id: `ss_${Date.now()}`,
      query: searchQuery.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      isPinned: false,
    };
    setSavedSearches((prev) => [newSaved, ...prev]);
  };

  const handleTogglePinSaved = (id: string) => {
    setSavedSearches((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isPinned: !s.isPinned } : s))
    );
  };

  const handleDeleteSaved = (id: string) => {
    setSavedSearches((prev) => prev.filter((s) => s.id !== id));
  };

  const handleRenameSaved = (id: string, newName: string) => {
    setSavedSearches((prev) =>
      prev.map((s) => (s.id === id ? { ...s, query: newName } : s))
    );
  };

  const countActiveFilters = () => {
    let count = 0;
    if (filters.dateRange !== 'ALL') count++;
    if (filters.riskLevel !== 'ALL') count++;
    if (filters.decisionType !== 'ALL') count++;
    if (filters.taskOwner) count++;
    count += filters.people.length;
    count += filters.projects.length;
    return count;
  };

  return (
    <div className="min-h-screen bg-[#050505] p-4 sm:p-6 lg:p-8 space-y-6 font-mono text-white">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0F1110] rounded-xl p-6 border border-[#7CB518]/30 shadow-sm relative overflow-hidden font-mono">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#7CB518]/15 text-[#39FF14] border border-[#7CB518]/30 font-mono">
              Enterprise Vector Memory
            </span>
            <span className="flex items-center gap-1 text-xs text-[#39FF14] font-semibold font-mono">
              <ShieldCheck className="w-3.5 h-3.5" /> SOC-2 RBAC Scope Privacy
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white font-heading flex items-center gap-2">
            <span>Enterprise Knowledge Hub</span>
            <Sparkles className="w-6 h-6 text-[#39FF14] animate-pulse" />
          </h1>
          <p className="text-sm text-zinc-400 font-mono">
            Search, synthesize, and inspect cross-meeting organizational intelligence, decisions, and risks.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => executeSearch(query)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Index</span>
          </button>
        </div>
      </div>

      {/* Main Search Input Bar */}
      <SemanticSearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearchSubmit}
        onToggleFilters={() => setShowFilters(!showFilters)}
        isFilterActive={showFilters}
        activeFilterCount={countActiveFilters()}
        suggestions={defaultSuggestions}
        onSelectSuggestion={(s) => {
          setQuery(s);
          executeSearch(s);
        }}
      />

      {/* Toggleable Memory Filters Drawer */}
      {showFilters && (
        <MemoryFilters
          filters={filters}
          onChangeFilters={(newF) => {
            setFilters(newF);
            executeSearch(query, newF);
          }}
          onResetFilters={() => {
            setFilters(initialFilters);
            executeSearch(query, initialFilters);
          }}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Primary Module Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-[#7CB518]/20 overflow-x-auto pb-1 text-xs font-bold font-mono">
        <button
          onClick={() => setActiveTab('SEARCH')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'SEARCH'
              ? 'bg-[#7CB518] text-black font-bold shadow-md shadow-[#7CB518]/20'
              : 'text-zinc-400 hover:text-white hover:bg-[#111315]'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Knowledge Search & AI Synthesis</span>
        </button>

        <button
          onClick={() => setActiveTab('GRAPH')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'GRAPH'
              ? 'bg-[#7CB518] text-black font-bold shadow-md shadow-[#7CB518]/20'
              : 'text-zinc-400 hover:text-white hover:bg-[#111315]'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Entity Relationship Graph</span>
        </button>

        <button
          onClick={() => setActiveTab('TIMELINE')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'TIMELINE'
              ? 'bg-[#7CB518] text-black font-bold shadow-md shadow-[#7CB518]/20'
              : 'text-zinc-400 hover:text-white hover:bg-[#111315]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Knowledge Timeline</span>
        </button>

        <button
          onClick={() => setActiveTab('GOVERNANCE')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'GOVERNANCE'
              ? 'bg-[#7CB518] text-black font-bold shadow-md shadow-[#7CB518]/20'
              : 'text-zinc-400 hover:text-white hover:bg-[#111315]'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Governance: Decisions & Risks</span>
        </button>

        <button
          onClick={() => setActiveTab('PEOPLE')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'PEOPLE'
              ? 'bg-[#7CB518] text-black font-bold shadow-md shadow-[#7CB518]/20'
              : 'text-zinc-400 hover:text-white hover:bg-[#111315]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>People & Work Ownership</span>
        </button>
      </div>

      {/* Main Content Areas */}
      {loading ? (
        <MemorySkeleton />
      ) : (
        <div className="space-y-6">
          {/* TAB 1: KNOWLEDGE SEARCH & AI SYNTHESIS */}
          {activeTab === 'SEARCH' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: AI Summary & Search Results */}
              <div className="lg:col-span-8 space-y-6">
                {!query && (!data || data.results.length === 0) ? (
                  <EmptyKnowledgeState
                    onSelectSuggestion={(s) => {
                      setQuery(s);
                      executeSearch(s);
                    }}
                  />
                ) : (
                  <>
                    {/* AI Executive Knowledge Synthesis */}
                    {data?.summary && (
                      <AIKnowledgeSummary
                        summaryData={data.summary}
                        query={query || 'Organizational Knowledge'}
                        isSynthesizing={loading}
                      />
                    )}

                    {/* Topic Clusters */}
                    {data?.topicClusters && data.topicClusters.length > 0 && (
                      <TopicClusters
                        clusters={data.topicClusters}
                        selectedCategory={selectedTopicCategory}
                        onSelectCluster={(cat) => {
                          setSelectedTopicCategory(cat);
                          executeSearch(query);
                        }}
                      />
                    )}

                    {/* Results list */}
                    {data && (
                      <SearchResults
                        results={data.results}
                        entries={data.entries}
                        onOpenMeeting={handleOpenMeeting}
                        onViewSourceEvidence={(res) => setEvidenceResult(res)}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Right Sidebar: Saved Searches, Suggestions & Recent History */}
              <div className="lg:col-span-4 space-y-6">
                <SearchSuggestions
                  onSelectSuggestion={(s) => {
                    setQuery(s);
                    executeSearch(s);
                  }}
                />

                <SavedSearches
                  savedSearches={savedSearches}
                  onSelectSavedSearch={(ss) => {
                    setQuery(ss.query);
                    executeSearch(ss.query);
                  }}
                  onTogglePin={handleTogglePinSaved}
                  onDeleteSavedSearch={handleDeleteSaved}
                  onRenameSavedSearch={handleRenameSaved}
                  onSaveCurrentSearch={handleSaveCurrentQuery}
                  currentQuery={query}
                />

                <SearchHistory
                  history={searchHistory}
                  onSelectSearch={(s) => {
                    setQuery(s);
                    executeSearch(s);
                  }}
                  onClearHistory={() => setSearchHistory([])}
                  onRemoveItem={(id) =>
                    setSearchHistory((prev) => prev.filter((item) => item.id !== id))
                  }
                />

                {data?.results && (
                  <SimilarMeetingsPanel
                    results={data.results}
                    onOpenMeeting={handleOpenMeeting}
                  />
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ENTITY RELATIONSHIP GRAPH */}
          {activeTab === 'GRAPH' && data?.graph && (
            <div className="space-y-6">
              <RelationshipGraph
                graphData={data.graph}
                onSelectEntity={(node: GraphNode) => {
                  if (node.type === 'MEETING') {
                    handleOpenMeeting('mtg_01');
                  }
                }}
              />
            </div>
          )}

          {/* TAB 3: KNOWLEDGE TIMELINE */}
          {activeTab === 'TIMELINE' && data?.timeline && (
            <div className="space-y-6">
              <KnowledgeTimeline
                timeline={data.timeline}
                onOpenMeeting={handleOpenMeeting}
              />
            </div>
          )}

          {/* TAB 4: GOVERNANCE - DECISIONS & RISKS */}
          {activeTab === 'GOVERNANCE' && data && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DecisionHistoryPanel
                decisions={data.decisionHistory}
                onOpenMeeting={handleOpenMeeting}
              />
              <RecurringRisksPanel
                risks={data.recurringRisks}
                onOpenMeeting={handleOpenMeeting}
              />
            </div>
          )}

          {/* TAB 5: PEOPLE & WORK OWNERSHIP */}
          {activeTab === 'PEOPLE' && data?.relatedPeople && (
            <div className="space-y-6">
              <RelatedPeoplePanel people={data.relatedPeople} />
            </div>
          )}
        </div>
      )}

      {/* Source Evidence Slide-over Modal */}
      <SourceEvidencePanel
        result={evidenceResult}
        onClose={() => setEvidenceResult(null)}
        onOpenMeeting={handleOpenMeeting}
      />
    </div>
  );
};
