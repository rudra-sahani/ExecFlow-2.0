import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  UserCheck,
  Sparkles,
  Search,
  CheckCircle2,
  Tag,
  AlertTriangle,
  Lightbulb,
  CheckSquare,
} from 'lucide-react';
import { DEMO_SPEAKERS, DEMO_TRANSCRIPT } from '../../data/demoData';

export const Step2Transcript: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(1);
  const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((prev) => (prev < DEMO_TRANSCRIPT.length ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const filteredTranscript = selectedSpeaker
    ? DEMO_TRANSCRIPT.filter((item) => item.speakerId === selectedSpeaker)
    : DEMO_TRANSCRIPT.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0F1110] border border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#7CB518]/15 text-[#7CB518] font-sans text-xs font-semibold border border-[#7CB518]/30">
              STEP 02
            </span>
            <h2 className="text-lg font-bold text-white font-heading">Transcript Generation & Diarization</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Real-time multi-speaker speech-to-text with precise acoustic diarization, timestamp alignment, and sentiment scoring.
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans text-xs">
          <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            100% Diarization Match
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
        {/* Speaker Roster Bar */}
        <div className="lg:col-span-4 p-5 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2 font-heading">
              <UserCheck className="w-4 h-4 text-[#7CB518]" />
              Identified Speakers (5)
            </h3>
            {selectedSpeaker && (
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="text-[10px] text-[#7CB518] hover:underline font-sans"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="space-y-2.5 font-sans">
            {Object.values(DEMO_SPEAKERS).map((speaker) => {
              const isSelected = selectedSpeaker === speaker.id;
              return (
                <button
                  key={speaker.id}
                  onClick={() => setSelectedSpeaker(isSelected ? null : speaker.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#7CB518] text-black border-[#7CB518] font-medium shadow-sm'
                      : 'bg-[#151817] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${isSelected ? 'bg-black text-white' : speaker.avatarBg} font-bold text-xs flex items-center justify-center shrink-0`}>
                      {speaker.name.charAt(0)}
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isSelected ? 'text-black' : 'text-zinc-200'}`}>{speaker.name}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-black/80' : 'text-zinc-400'}`}>{speaker.role}</div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-sans px-2 py-0.5 rounded ${isSelected ? 'bg-black/20 text-black' : 'bg-[#050505] text-zinc-400'}`}>
                    {speaker.department}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Diarized Transcript Stream */}
        <div className="lg:col-span-8 p-6 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-xs font-sans">
            <span className="text-zinc-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7CB518]" />
              Live Transcript Ingestion Feed
            </span>
            <span className="text-zinc-500 font-mono text-[11px]">
              Showing {filteredTranscript.length} of {DEMO_TRANSCRIPT.length} lines
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            <AnimatePresence>
              {filteredTranscript.map((item) => {
                const speaker = DEMO_SPEAKERS[item.speakerId];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 rounded-lg bg-[#151817] border border-zinc-800 space-y-2 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-sans">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${speaker?.avatarBg || 'bg-[#7CB518]'}`} />
                        <span className="font-bold text-white font-heading">{speaker?.name || 'Unknown'}</span>
                        <span className="text-[10px] text-zinc-400 font-sans">({speaker?.role})</span>
                      </div>

                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="text-zinc-500 font-mono">{item.timestamp}</span>
                        {item.highlightCategory === 'decision' && (
                          <span className="px-2 py-0.5 rounded bg-[#7CB518]/10 text-[#7CB518] font-medium border border-[#7CB518]/20 flex items-center gap-1 font-sans">
                            <Lightbulb className="w-3 h-3" /> Decision Detected
                          </span>
                        )}
                        {item.highlightCategory === 'risk' && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-medium border border-amber-500/20 flex items-center gap-1 font-sans">
                            <AlertTriangle className="w-3 h-3" /> Risk Flagged
                          </span>
                        )}
                        {item.highlightCategory === 'task' && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20 flex items-center gap-1 font-sans">
                            <CheckSquare className="w-3 h-3" /> Action Item
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 font-sans leading-relaxed pl-4 border-l-2 border-[#7CB518]/60">
                      "{item.text}"
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
