import React from 'react';
import { Cpu, Server, Database, Zap, BarChart3, Layers, ArrowRight, Bot, Sparkles } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture" className="py-24 bg-[#050505] text-white relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#39FF14] text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" /> High-Performance Infrastructure
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            End-To-End System Architecture.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-mono">
            Built on a distributed cloud architecture with sub-second agent processing and high availability.
          </p>
        </div>

        {/* Architecture Flow Diagram Container */}
        <div className="p-8 rounded-xl bg-[#0F1110] border border-[#7CB518]/30 space-y-8 shadow-2xl overflow-x-auto font-mono">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center min-w-[700px]">
            {/* Step 1 */}
            <div className="p-5 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-3 text-center">
              <div className="p-3 rounded-lg bg-[#7CB518]/15 text-[#39FF14] w-fit mx-auto">
                <Server className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#39FF14]">INGESTION LAYER</div>
              <div className="text-sm font-bold text-white font-heading">Zoom / Meet / MP4</div>
              <p className="text-[11px] text-zinc-400 font-mono">Real-time WebSocket & Audio Chunks</p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-lg bg-[#050505] border border-[#7CB518] space-y-3 text-center relative shadow-lg shadow-[#7CB518]/10">
              <div className="p-3 rounded-lg bg-[#7CB518]/20 text-[#39FF14] w-fit mx-auto">
                <Bot className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#39FF14]">AGENTIC REASONING</div>
              <div className="text-sm font-bold text-white font-heading">Gemini 2.5 Multi-Swarm</div>
              <p className="text-[11px] text-zinc-400 font-mono">Planner, Task & Reflection Engine</p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-3 text-center">
              <div className="p-3 rounded-lg bg-[#7CB518]/15 text-[#39FF14] w-fit mx-auto">
                <Database className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#39FF14]">VECTOR MEMORY</div>
              <div className="text-sm font-bold text-white font-heading">Knowledge Store</div>
              <p className="text-[11px] text-zinc-400 font-mono">Semantic Vector Embeddings</p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-3 text-center">
              <div className="p-3 rounded-lg bg-[#95D600]/15 text-[#95D600] w-fit mx-auto">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#95D600]">EXECUTION BUS</div>
              <div className="text-sm font-bold text-white font-heading">Tool Dispatches</div>
              <p className="text-[11px] text-zinc-400 font-mono">Jira, GitHub, Slack Webhooks</p>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-lg bg-[#050505] border border-[#7CB518]/20 space-y-3 text-center">
              <div className="p-3 rounded-lg bg-[#39FF14]/15 text-[#39FF14] w-fit mx-auto">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono font-bold text-[#39FF14]">EXECUTIVE BI</div>
              <div className="text-sm font-bold text-white font-heading">Analytics Hub</div>
              <p className="text-[11px] text-zinc-400 font-mono">Decision Velocity & Risk Heatmap</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
