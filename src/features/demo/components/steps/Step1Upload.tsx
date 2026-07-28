import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  UploadCloud,
  FileAudio,
  CheckCircle2,
  Video,
  Bot,
  Sparkles,
  Zap,
  Clock,
  HardDrive,
  Users,
} from 'lucide-react';
import { SAMPLE_ORGANIZATION } from '../../data/demoData';

export const Step1Upload: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDone(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0F1110] border border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#7CB518]/15 text-[#7CB518] font-sans text-xs font-semibold border border-[#7CB518]/30">
              STEP 01
            </span>
            <h2 className="text-lg font-bold text-white font-heading">Meeting Upload & Stream Ingestion</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-1">
            Simulating enterprise audio stream ingestion, noise reduction, and multi-channel speaker signal preparation.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-sans">
          <span className="text-zinc-400">Target Organization:</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#151817] text-white font-medium border border-zinc-800">
            {SAMPLE_ORGANIZATION.name}
          </span>
        </div>
      </div>

      {/* Main Upload Stage & Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dropzone & Live Progress Animation */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#7CB518]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#7CB518]/10 text-[#7CB518] border border-[#7CB518]/20">
                <FileAudio className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-heading">{SAMPLE_ORGANIZATION.meetingTitle}</h3>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  {SAMPLE_ORGANIZATION.recordingFile} • {SAMPLE_ORGANIZATION.fileSize}
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-[#7CB518]/10 text-[#7CB518] text-xs font-sans font-medium flex items-center gap-1.5 border border-[#7CB518]/20">
              <span className="w-2 h-2 rounded-full bg-[#7CB518] animate-ping" />
              Ingesting Stream
            </span>
          </div>

          {/* Audio Waveform Simulation */}
          <div className="p-4 rounded-lg bg-[#151817] border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-sans">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#7CB518]" /> Duration: 42m 18s
              </span>
              <span>Sampling Rate: 48 kHz / 24-bit PCM</span>
            </div>

            <div className="flex items-center justify-center gap-1 h-16 pt-2">
              {Array.from({ length: 48 }).map((_, idx) => {
                const heightPercent = Math.sin(idx * 0.4 + progress * 0.1) * 35 + 45;
                const isActive = (idx / 48) * 100 <= progress;
                return (
                  <motion.div
                    key={idx}
                    animate={{ height: [`${Math.max(15, heightPercent - 20)}%`, `${heightPercent}%`, `${Math.max(15, heightPercent - 15)}%`] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: idx * 0.03 }}
                    className={`w-1.5 rounded-full transition-colors ${
                      isActive ? 'bg-[#7CB518]' : 'bg-[#222725]'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Upload Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-sans">
              <span className="text-zinc-200 font-medium flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#7CB518]" />
                Audio Signal Ingestion & Spectral De-noising
              </span>
              <span className="text-white font-semibold font-mono">{progress}%</span>
            </div>
            <div className="h-2.5 w-full bg-[#151817] rounded-full overflow-hidden p-0.5 border border-zinc-800">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
                className="h-full bg-[#7CB518] rounded-full"
              />
            </div>
          </div>

          {/* Verification Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-sans">
            <div className="p-3 rounded-lg bg-[#151817] border border-zinc-800 flex items-center gap-2 text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-[#7CB518] shrink-0" />
              <span>Multi-Channel Audio</span>
            </div>
            <div className="p-3 rounded-lg bg-[#151817] border border-zinc-800 flex items-center gap-2 text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-[#7CB518] shrink-0" />
              <span>SOC2 Encrypted</span>
            </div>
            <div className="p-3 rounded-lg bg-[#151817] border border-zinc-800 flex items-center gap-2 text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-[#7CB518] shrink-0" />
              <span>5 Speakers Detected</span>
            </div>
          </div>
        </div>

        {/* Right Side: Connected Enterprise Bots & Integration Status */}
        <div className="lg:col-span-5 space-y-4 font-sans">
          <div className="p-6 rounded-xl bg-[#0F1110] border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2 font-heading">
                <Bot className="w-4 h-4 text-[#7CB518]" />
                Live Bot Auto-Capture Status
              </h3>
              <span className="text-[10px] font-sans text-[#7CB518] bg-[#7CB518]/10 px-2 py-0.5 rounded border border-[#7CB518]/20 font-semibold">
                ACTIVE
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-[#151817] border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#7CB518]/10 text-[#7CB518] border border-[#7CB518]/20">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-heading">Zoom Enterprise Bot</div>
                    <div className="text-[10px] text-zinc-400">Auto-Joined Meeting Room #802-914</div>
                  </div>
                </div>
                <span className="text-[10px] font-sans text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-medium">
                  Connected
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#151817] border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#7CB518]/10 text-[#7CB518] border border-[#7CB518]/20">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-heading">Google Meet Streamer</div>
                    <div className="text-[10px] text-zinc-400">Real-Time Audio Sync Enabled</div>
                  </div>
                </div>
                <span className="text-[10px] font-sans text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-medium">
                  Connected
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#151817] border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#7CB518]/10 text-[#7CB518] border border-[#7CB518]/20">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-heading">MS Teams Companion</div>
                    <div className="text-[10px] text-zinc-400">Webhook WebSockets Live</div>
                  </div>
                </div>
                <span className="text-[10px] font-sans text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-medium">
                  Connected
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0F1110] border border-zinc-800 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#7CB518]/10 text-[#7CB518] border border-[#7CB518]/20 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong className="text-white block font-semibold mb-0.5 font-heading">Instant Ingestion Pipeline</strong>
              Zero buffering required. ExecFlow starts multi-agent analysis as soon as the first audio byte hits the secure container.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
