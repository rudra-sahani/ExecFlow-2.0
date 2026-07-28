import React, { useState } from 'react';
import { Bookmark, Pin, Trash2, Edit2, Check, X, Play } from 'lucide-react';
import { SavedSearch } from '../types/memoryExplorer';

interface SavedSearchesProps {
  savedSearches: SavedSearch[];
  onSelectSavedSearch: (saved: SavedSearch) => void;
  onTogglePin: (id: string) => void;
  onDeleteSavedSearch: (id: string) => void;
  onRenameSavedSearch: (id: string, newName: string) => void;
  onSaveCurrentSearch?: (query: string) => void;
  currentQuery?: string;
}

export const SavedSearches: React.FC<SavedSearchesProps> = ({
  savedSearches,
  onSelectSavedSearch,
  onTogglePin,
  onDeleteSavedSearch,
  onRenameSavedSearch,
  onSaveCurrentSearch,
  currentQuery,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleStartEdit = (item: SavedSearch) => {
    setEditingId(item.id);
    setEditTitle(item.query);
  };

  const handleSaveEdit = (id: string) => {
    if (editTitle.trim()) {
      onRenameSavedSearch(id, editTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="bg-[#0F1110] rounded-xl border border-[#7CB518]/30 p-4 font-mono text-white">
      <div className="flex items-center justify-between mb-3 font-mono">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">
          <Bookmark className="w-4 h-4 text-[#39FF14]" />
          <span>Saved & Pinned Searches</span>
        </div>

        {currentQuery && onSaveCurrentSearch && (
          <button
            onClick={() => onSaveCurrentSearch(currentQuery)}
            className="text-xs text-[#39FF14] font-semibold hover:underline flex items-center gap-1 font-mono"
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>Save current query</span>
          </button>
        )}
      </div>

      {savedSearches.length === 0 ? (
        <p className="text-xs text-zinc-500 italic py-2 font-mono">
          No saved searches yet. Save frequently used vector queries for 1-click execution.
        </p>
      ) : (
        <div className="space-y-2 font-mono">
          {savedSearches.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                item.isPinned
                  ? 'bg-[#7CB518]/10 border-[#7CB518]/40'
                  : 'bg-[#050505] border-[#7CB518]/20'
              }`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0 mr-2 font-mono">
                <button
                  onClick={() => onTogglePin(item.id)}
                  className={`p-1 rounded transition-colors ${
                    item.isPinned
                      ? 'text-[#39FF14] hover:text-[#7CB518]'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                  title={item.isPinned ? 'Unpin' : 'Pin to top'}
                >
                  <Pin className={`w-3.5 h-3.5 ${item.isPinned ? 'fill-[#39FF14]' : ''}`} />
                </button>

                {editingId === item.id ? (
                  <div className="flex items-center gap-1 flex-1 font-mono">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full text-xs px-2 py-1 rounded bg-[#111315] border border-[#7CB518] text-white focus:outline-none font-mono"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveEdit(item.id)}
                      className="p-1 text-[#39FF14] hover:text-[#7CB518]"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1 text-zinc-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onSelectSavedSearch(item)}
                    className="text-left font-medium text-xs text-zinc-200 hover:text-[#39FF14] truncate flex-1 flex items-center gap-1.5 font-mono"
                  >
                    <Play className="w-3 h-3 text-[#39FF14] flex-shrink-0" />
                    <span className="truncate">{item.query}</span>
                  </button>
                )}
              </div>

              {editingId !== item.id && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStartEdit(item)}
                    className="p-1 text-zinc-400 hover:text-white rounded"
                    title="Rename"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onDeleteSavedSearch(item.id)}
                    className="p-1 text-zinc-400 hover:text-red-400 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
