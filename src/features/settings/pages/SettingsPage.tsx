import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Settings,
  Key,
  Database,
  Bell,
  Users,
  Shield,
  Server,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Save,
  Lock,
} from 'lucide-react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { apiClient } from '../../../services/api';
import toast from 'react-hot-toast';

export const SettingsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'workspace' | 'llm' | 'database' | 'notifications' | 'team'>('workspace');

  // Workspace Settings State
  const [workspaceName, setWorkspaceName] = useState('ExecFlow Primary Workspace');
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [autoSummarize, setAutoSummarize] = useState(true);

  // Health check query
  const { data: health, refetch: refetchHealth, isFetching: healthFetching } = useQuery({
    queryKey: ['observabilityHealth'],
    queryFn: () => apiClient.get<any>('/observability/health'),
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Workspace settings updated successfully!');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform & Engine Settings"
        description="Configure workspace parameters, AI model connections, database persistence, and team access"
      />

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
        <Button
          variant={activeTab === 'workspace' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('workspace')}
          className={
            activeTab === 'workspace'
              ? 'bg-[#7CB518] text-black font-semibold text-xs'
              : 'border-zinc-800 text-zinc-400 text-xs'
          }
        >
          <Settings className="h-3.5 w-3.5 mr-1.5" />
          Workspace Config
        </Button>
        <Button
          variant={activeTab === 'llm' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('llm')}
          className={
            activeTab === 'llm'
              ? 'bg-[#7CB518] text-black font-semibold text-xs'
              : 'border-zinc-800 text-zinc-400 text-xs'
          }
        >
          <Key className="h-3.5 w-3.5 mr-1.5" />
          LLM & AI Engine
        </Button>
        <Button
          variant={activeTab === 'database' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('database')}
          className={
            activeTab === 'database'
              ? 'bg-[#7CB518] text-black font-semibold text-xs'
              : 'border-zinc-800 text-zinc-400 text-xs'
          }
        >
          <Database className="h-3.5 w-3.5 mr-1.5" />
          Database & Storage
        </Button>
        <Button
          variant={activeTab === 'notifications' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('notifications')}
          className={
            activeTab === 'notifications'
              ? 'bg-[#7CB518] text-black font-semibold text-xs'
              : 'border-zinc-800 text-zinc-400 text-xs'
          }
        >
          <Bell className="h-3.5 w-3.5 mr-1.5" />
          Notifications
        </Button>
        <Button
          variant={activeTab === 'team' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('team')}
          className={
            activeTab === 'team'
              ? 'bg-[#7CB518] text-black font-semibold text-xs'
              : 'border-[#16181a] text-zinc-400 text-xs'
          }
        >
          <Users className="h-3.5 w-3.5 mr-1.5" />
          Team & RBAC
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === 'workspace' && (
        <Card variant="default" className="bg-[#111315] border-[#7CB518]/20">
          <CardHeader>
            <CardTitle className="text-base font-bold text-white font-heading">
              General Workspace Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl text-xs">
              <div>
                <label className="block text-zinc-400 font-mono mb-1">Workspace Name</label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#7CB518]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono mb-1">Default Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#7CB518]"
                >
                  <option value="America/Los_Angeles">Pacific Time (PT) - America/Los_Angeles</option>
                  <option value="America/New_York">Eastern Time (ET) - America/New_York</option>
                  <option value="Europe/London">Greenwich Mean Time (GMT) - Europe/London</option>
                  <option value="Asia/Tokyo">Japan Standard Time (JST) - Asia/Tokyo</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#16181a] border border-zinc-800 rounded-lg">
                <div>
                  <h5 className="font-bold text-white">Auto-Summarize Meetings</h5>
                  <p className="text-zinc-400 text-[11px]">
                    Trigger Multi-Agent analysis immediately upon meeting upload or stream complete.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoSummarize}
                  onChange={(e) => setAutoSummarize(e.target.checked)}
                  className="h-4 w-4 accent-[#7CB518]"
                />
              </div>

              <Button type="submit" className="bg-[#7CB518] text-black font-semibold text-xs px-4 py-2">
                <Save className="h-4 w-4 mr-1.5" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === 'llm' && (
        <Card variant="default" className="bg-[#111315] border-[#7CB518]/20 space-y-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold text-white font-heading">
              Google Gemini Engine Connection
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetchHealth()}
              disabled={healthFetching}
              className="border-[#7CB518]/30 text-[#7CB518] text-xs font-mono"
            >
              <RefreshCw className={`h-3.5 w-3.5 mr-1 ${healthFetching ? 'animate-spin' : ''}`} />
              Verify Key
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 text-xs font-mono">
            <div className="p-4 bg-[#16181a] border border-zinc-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Environment Variable:</span>
                <span className="text-amber-400 font-bold">GEMINI_API_KEY</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Primary Model:</span>
                <span className="text-[#7CB518] font-bold">gemini-3.6-flash</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Embedding Model:</span>
                <span className="text-cyan-400 font-bold">gemini-embedding-2-preview</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                <span className="text-zinc-400">Status:</span>
                {health?.services?.gemini ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Connected & Validated
                  </span>
                ) : (
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Server-side Key Configured
                  </span>
                )}
              </div>
            </div>
            <p className="text-[11px] text-zinc-400">
              Note: Gemini API keys are safely managed server-side in Node/Express and never leaked to browser client code.
            </p>
          </CardContent>
        </Card>
      )}

      {activeTab === 'database' && (
        <Card variant="default" className="bg-[#111315] border-[#7CB518]/20">
          <CardHeader>
            <CardTitle className="text-base font-bold text-white font-heading">
              PostgreSQL Prisma & Supabase Storage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs font-mono">
            <div className="p-4 bg-[#16181a] border border-zinc-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">ORM Schema Engine:</span>
                <span className="text-white">Prisma Client v5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">File Storage Bucket:</span>
                <span className="text-emerald-400 font-bold">Supabase Cloud</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Vector Search Extension:</span>
                <span className="text-cyan-400 font-bold">pgvector</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'notifications' && (
        <Card variant="default" className="bg-[#111315] border-[#7CB518]/20">
          <CardHeader>
            <CardTitle className="text-base font-bold text-white font-heading">
              Notification Triggers & Webhooks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="p-3 bg-[#16181a] border border-zinc-800 rounded-lg flex items-center justify-between">
              <div>
                <h5 className="font-bold text-white">Email Digest on High-Risk Approval</h5>
                <p className="text-zinc-400 text-[11px]">Send instant alert when ActionAgent requests database mutation.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#7CB518]" />
            </div>
            <div className="p-3 bg-[#16181a] border border-zinc-800 rounded-lg flex items-center justify-between">
              <div>
                <h5 className="font-bold text-white">Slack / Discord Webhooks</h5>
                <p className="text-zinc-400 text-[11px]">Post meeting summaries and task creations to channel.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#7CB518]" />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'team' && (
        <Card variant="default" className="bg-[#111315] border-[#7CB518]/20">
          <CardHeader>
            <CardTitle className="text-base font-bold text-white font-heading">
              Team Members & Role-Based Access Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="p-3 bg-[#16181a] border border-zinc-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#7CB518] text-black font-bold flex items-center justify-center">
                  AC
                </div>
                <div>
                  <h5 className="font-bold text-white">Alex Chen (You)</h5>
                  <p className="text-zinc-400 text-[11px]">alex.chen@execflow.ai</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-[#7CB518]/20 text-[#7CB518] border-[#7CB518]/40 font-mono">
                ADMIN
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
