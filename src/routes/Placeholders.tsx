import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardContent } from '../components/ui/Card';
import { Icons } from '../lib/icons';

export const DashboardPlaceholder: React.FC = () => (
  <div className="space-y-6">
    <PageHeader
      title="Dashboard Foundation"
      description="ExecFlow Multi-Agent Meeting Intelligence & Automated Execution Workflows"
    />
    <Card variant="default">
      <CardContent className="pt-6 text-center space-y-3">
        <Icons.Dashboard className="mx-auto h-10 w-10 text-[#7CB518]" />
        <h3 className="text-base font-semibold text-white font-heading">Dashboard Route Ready</h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          The dashboard routing, layout, state stores, and API client layers are fully configured and connected to the backend.
        </p>
      </CardContent>
    </Card>
  </div>
);

export const MeetingsPlaceholder: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Meetings Intelligence Engine" description="Select a meeting to enter the Notion/Linear/Cursor style workspace" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <a href="/meetings/mtg_01" className="block bg-[#111315] border border-[#7CB518]/20 hover:border-[#7CB518]/60 rounded-xl p-5 shadow-sm transition-all hover:scale-[1.01] group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#39FF14] bg-[#7CB518]/15 border border-[#7CB518]/30 px-2 py-0.5 rounded font-mono">COMPLETED</span>
          <span className="text-xs text-zinc-400 font-mono">3,240s duration</span>
        </div>
        <h3 className="text-base font-bold text-white group-hover:text-[#95D600] transition-colors font-heading">
          Q3 Product Roadmap & Architecture Strategy
        </h3>
        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
          Alignment on core AI execution engine, vector memory layer, and microservice infrastructure for Q3.
        </p>
        <div className="mt-4 pt-3 border-t border-[#7CB518]/15 flex items-center justify-between text-xs text-[#7CB518] font-semibold">
          <span>Open Meeting Workspace →</span>
          <span className="text-zinc-400 text-[11px] font-mono">4 Action Items</span>
        </div>
      </a>

      <a href="/meetings/mtg_02" className="block bg-[#111315] border border-[#7CB518]/20 hover:border-[#7CB518]/60 rounded-xl p-5 shadow-sm transition-all hover:scale-[1.01] group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#39FF14] bg-[#7CB518]/15 border border-[#7CB518]/30 px-2 py-0.5 rounded font-mono">COMPLETED</span>
          <span className="text-xs text-zinc-400 font-mono">1,750s duration</span>
        </div>
        <h3 className="text-base font-bold text-white group-hover:text-[#95D600] transition-colors font-heading">
          Weekly Executive Leadership Standup
        </h3>
        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
          Cross-functional review of active customer deployments, team bandwidth, and strategic partner integrations.
        </p>
        <div className="mt-4 pt-3 border-t border-[#7CB518]/15 flex items-center justify-between text-xs text-[#7CB518] font-semibold">
          <span>Open Meeting Workspace →</span>
          <span className="text-zinc-400 text-[11px] font-mono">2 Action Items</span>
        </div>
      </a>
    </div>
  </div>
);

export const MeetingDetailPlaceholder: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Meeting Details & Agent Insights" description="Deep transcript analysis, decision graphs, and risk breakdown" />
    <Card variant="default">
      <CardContent className="pt-6 text-center space-y-3">
        <Icons.Transcript className="mx-auto h-10 w-10 text-[#7CB518]" />
        <h3 className="text-base font-semibold text-white font-heading">Meeting Detail Route Ready</h3>
      </CardContent>
    </Card>
  </div>
);

export const TasksPlaceholder: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Task Execution Engine" description="AI-extracted action items and automated tool integrations" />
    <Card variant="default">
      <CardContent className="pt-6 text-center space-y-3">
        <Icons.Tasks className="mx-auto h-10 w-10 text-[#7CB518]" />
        <h3 className="text-base font-semibold text-white font-heading">Tasks Route Ready</h3>
      </CardContent>
    </Card>
  </div>
);

export const AnalyticsPlaceholder: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Analytics & Metrics" description="Meeting volume, token efficiency, time saved, and agent performance" />
    <Card variant="default">
      <CardContent className="pt-6 text-center space-y-3">
        <Icons.Analytics className="mx-auto h-10 w-10 text-[#7CB518]" />
        <h3 className="text-base font-semibold text-white font-heading">Analytics Route Ready</h3>
      </CardContent>
    </Card>
  </div>
);

export const MemoryPlaceholder: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Vector Memory System" description="Cross-meeting semantic search and context retrieval engine" />
    <Card variant="default">
      <CardContent className="pt-6 text-center space-y-3">
        <Icons.Memory className="mx-auto h-10 w-10 text-[#7CB518]" />
        <h3 className="text-base font-semibold text-white font-heading">Memory Route Ready</h3>
      </CardContent>
    </Card>
  </div>
);

export const ApprovalPlaceholder: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Human-in-the-Loop Approvals" description="Review, explain, approve, or reject high-risk AI agent action proposals" />
    <Card variant="default">
      <CardContent className="pt-6 text-center space-y-3">
        <Icons.Approval className="mx-auto h-10 w-10 text-[#7CB518]" />
        <h3 className="text-base font-semibold text-white font-heading">Approval Route Ready</h3>
      </CardContent>
    </Card>
  </div>
);

export const AgentMonitorPlaceholder: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Agent Observability Platform" description="Trace execution DAG graphs, span timelines, latency metrics, and health" />
    <Card variant="default">
      <CardContent className="pt-6 text-center space-y-3">
        <Icons.AgentMonitor className="mx-auto h-10 w-10 text-[#7CB518]" />
        <h3 className="text-base font-semibold text-white font-heading">Agent Monitor Route Ready</h3>
      </CardContent>
    </Card>
  </div>
);

export const SettingsPlaceholder: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="Platform Settings" description="Workspace configuration, API keys, and system preferences" />
    <Card variant="default">
      <CardContent className="pt-6 text-center space-y-3">
        <Icons.Settings className="mx-auto h-10 w-10 text-[#7CB518]" />
        <h3 className="text-base font-semibold text-white font-heading">Settings Route Ready</h3>
      </CardContent>
    </Card>
  </div>
);

export const ProfilePlaceholder: React.FC = () => (
  <div className="space-y-6">
    <PageHeader title="User Profile" description="Manage account credentials, preferences, and security settings" />
    <Card variant="default">
      <CardContent className="pt-6 text-center space-y-3">
        <Icons.Profile className="mx-auto h-10 w-10 text-[#7CB518]" />
        <h3 className="text-base font-semibold text-white font-heading">Profile Route Ready</h3>
      </CardContent>
    </Card>
  </div>
);

export const LoginPlaceholder: React.FC = () => (
  <div className="space-y-4">
    <div className="text-center space-y-1">
      <h2 className="text-lg font-bold text-white font-heading">Sign In to ExecFlow</h2>
      <p className="text-xs text-zinc-400">Authentication route foundation ready for API integration</p>
    </div>
  </div>
);

export const RegisterPlaceholder: React.FC = () => (
  <div className="space-y-4">
    <div className="text-center space-y-1">
      <h2 className="text-lg font-bold text-white font-heading">Create an Account</h2>
      <p className="text-xs text-zinc-400">Registration route foundation ready for API integration</p>
    </div>
  </div>
);

export const NotFoundPage: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-5 font-sans">
    <div className="h-16 w-16 rounded-full bg-[#111315] border border-[#7CB518]/30 flex items-center justify-center text-[#7CB518] shadow-lg">
      <Icons.AlertCircle className="h-8 w-8 text-[#7CB518]" />
    </div>
    <div className="space-y-1.5">
      <h2 className="text-2xl font-bold text-white font-heading">404 - Page Not Found</h2>
      <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
        The requested page or route could not be located in the ExecFlow application.
      </p>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
      <a
        href="/dashboard"
        className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#7CB518] text-black hover:bg-[#8DC621] transition-all shadow-md"
      >
        Go to Dashboard
      </a>
      <a
        href="/login"
        className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#151817] border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
      >
        Sign In
      </a>
    </div>
  </div>
);
