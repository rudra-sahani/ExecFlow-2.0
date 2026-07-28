import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Mail,
  GitPullRequest,
  Bell,
  Globe,
  Sliders,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { ApprovalRule, RiskLevel } from '../../../types/automation';
import { MOCK_APPROVAL_RULES } from '../../../services/automationService';
import { cn } from '../../../lib/cn';
import toast from 'react-hot-toast';

export const ApprovalRules: React.FC = () => {
  const [rules, setRules] = useState<ApprovalRule[]>(MOCK_APPROVAL_RULES);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Rule Form State
  const [newRuleName, setNewRuleName] = useState('');
  const [newActionType, setNewActionType] = useState('create_github_issue');
  const [newRiskThreshold, setNewRiskThreshold] = useState<RiskLevel>('MEDIUM');
  const [newApproverRole, setNewApproverRole] = useState('Engineering Manager');
  const [newAutoApprove, setNewAutoApprove] = useState(false);
  const [newDescription, setNewDescription] = useState('');

  const handleToggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              autoApproveEnabled: !r.autoApproveEnabled,
            }
          : r
      )
    );
    toast.success('Approval rule policy updated');
  };

  const handleDeleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
    toast.success('Approval rule removed');
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName) return;

    const rule: ApprovalRule = {
      id: `rule-${Date.now()}`,
      name: newRuleName,
      triggerType: 'meeting_completed',
      actionType: newActionType,
      condition: 'risk >= ' + newRiskThreshold,
      riskLevelThreshold: newRiskThreshold,
      approverRole: newApproverRole,
      autoApproveEnabled: newAutoApprove,
      status: 'active',
      description: newDescription || 'Custom security approval policy',
      appliedCount: 0,
    };

    setRules((prev) => [rule, ...prev]);
    setShowAddModal(false);
    setNewRuleName('');
    setNewDescription('');
    toast.success('New approval rule established!');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" /> Human Approval & Security Governance Policies
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure automated approval triggers and risk thresholds before dispatching integrations
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Approval Rule
        </button>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md border',
                    rule.riskLevelThreshold === 'HIGH' && 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
                    rule.riskLevelThreshold === 'MEDIUM' && 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
                    rule.riskLevelThreshold === 'LOW' && 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                  )}
                >
                  {rule.riskLevelThreshold} Risk Threshold
                </span>

                <button
                  onClick={() => handleToggleRule(rule.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  {rule.autoApproveEnabled ? (
                    <>
                      <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">Auto-Approve ON</span>
                      <ToggleRight className="w-6 h-6 text-emerald-600" />
                    </>
                  ) : (
                    <>
                      <span className="text-rose-600 dark:text-rose-400 text-[11px]">Human Approval Gate</span>
                      <ToggleLeft className="w-6 h-6 text-slate-400" />
                    </>
                  )}
                </button>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{rule.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {rule.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Designated Approver:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{rule.approverRole}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Target Action:</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">{rule.actionType}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px]">
              <span className="text-slate-400 font-mono">Applied {rule.appliedCount} times</span>

              <button
                onClick={() => handleDeleteRule(rule.id)}
                className="text-rose-600 dark:text-rose-400 hover:underline font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove Policy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Approval Rule */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <form
            onSubmit={handleCreateRule}
            className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4"
          >
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Create New Approval Rule Policy
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Rule Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Require approval before creating GitHub issues"
                value={newRuleName}
                onChange={(e) => setNewRuleName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Integration Action
                </label>
                <select
                  value={newActionType}
                  onChange={(e) => setNewActionType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                >
                  <option value="create_github_issue">Create GitHub Issue</option>
                  <option value="create_jira_ticket">Create Jira Ticket</option>
                  <option value="send_email">Send Email</option>
                  <option value="webhook_call">Webhook Call</option>
                  <option value="create_reminder">Create Reminder</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Risk Level Threshold
                </label>
                <select
                  value={newRiskThreshold}
                  onChange={(e) => setNewRiskThreshold(e.target.value as RiskLevel)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Designated Approver Role
              </label>
              <input
                type="text"
                required
                value={newApproverRole}
                onChange={(e) => setNewApproverRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Policy Description
              </label>
              <textarea
                rows={2}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Explain the security requirement for this approval gate..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="autoApproveCheck"
                checked={newAutoApprove}
                onChange={(e) => setNewAutoApprove(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="autoApproveCheck" className="text-xs text-slate-700 dark:text-slate-300">
                Enable Auto-Approval (Skip human gate if condition passes)
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Save Approval Policy
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
