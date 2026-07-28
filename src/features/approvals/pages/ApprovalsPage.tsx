import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  User,
  Terminal,
  FileCode,
  Edit2,
  Lock,
} from 'lucide-react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { approvalService } from '../../../services/approvalService';
import toast from 'react-hot-toast';

export const ApprovalsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [rejectReasonModalId, setRejectReasonModalId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const { data: approvalsData, isLoading } = useQuery({
    queryKey: ['approvalsPage'],
    queryFn: () => approvalService.getPendingApprovals({ pageSize: 50 }),
  });

  const decideMutation = useMutation({
    mutationFn: ({ id, approved, reason }: { id: string; approved: boolean; reason?: string }) =>
      approvalService.decideApproval(id, { approved, reason }),
    onSuccess: (_, variables) => {
      toast.success(`Approval request ${variables.approved ? 'APPROVED' : 'REJECTED'}`);
      setRejectReasonModalId(null);
      setRejectReason('');
      queryClient.invalidateQueries({ queryKey: ['approvalsPage'] });
      queryClient.invalidateQueries({ queryKey: ['approvalsDashboard'] });
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to update approval status');
    },
  });

  const approvals = approvalsData?.items || [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Human-in-the-Loop Governance & Approvals"
        description="Audit, modify, authorize, or reject high-risk AI agent proposals and database mutations"
      />

      {/* Governance Summary Banner */}
      <Card variant="default" className="bg-[#111315] border-[#7CB518]/20">
        <CardContent className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-heading">
                Automated Approval Bounds Policy Active
              </h4>
              <p className="text-xs text-zinc-400">
                Any tool execution attempting database mutations, financial dispatches, or role changes requires administrator consent.
              </p>
            </div>
          </div>
          <Badge variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-xs font-mono shrink-0">
            {approvals.length} PENDING AUTHORIZATIONS
          </Badge>
        </CardContent>
      </Card>

      {/* Approval Requests List */}
      {isLoading ? (
        <div className="text-center py-12 text-zinc-500 font-mono text-xs">Loading pending approvals...</div>
      ) : approvals.length === 0 ? (
        <Card variant="default" className="bg-[#111315] border-[#7CB518]/20 py-12 text-center space-y-3">
          <ShieldCheck className="mx-auto h-10 w-10 text-emerald-400" />
          <h4 className="text-sm font-bold text-white font-heading">All Clear</h4>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            There are no pending agent action authorization requests. High-risk executions are fully protected.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {approvals.map((req) => (
            <Card key={req.id} variant="default" className="bg-[#111315] border-amber-500/30">
              <CardContent className="p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        req.proposedAction?.riskLevel === 'HIGH' || req.proposedAction?.riskLevel === 'CRITICAL'
                          ? 'bg-red-500/15 text-red-400 border-red-500/30 text-xs font-mono'
                          : 'bg-amber-500/15 text-amber-400 border-amber-500/30 text-xs font-mono'
                      }
                    >
                      {req.proposedAction?.riskLevel || 'HIGH'} RISK
                    </Badge>
                    <span className="text-xs font-bold text-white font-mono">{req.requestedByAgent}</span>
                    <span className="text-xs text-zinc-500 font-mono">({req.proposedAction?.actionType || 'TOOL_CALL'})</span>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Requested {new Date(req.requestedAt).toLocaleTimeString()}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white font-heading">{req.proposedAction?.explanation}</h4>
                  <div className="bg-[#16181a] border border-zinc-800 rounded-lg p-3 text-xs font-mono text-amber-300 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
                    <div>
                      <span className="font-bold">Potential Impact: </span>
                      <span>{req.proposedAction?.potentialImpact || 'Action pending consent'}</span>
                    </div>
                  </div>
                </div>

                {/* Parameters JSON */}
                {req.proposedAction?.parameters && Object.keys(req.proposedAction.parameters).length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">
                      Proposed Parameters Payload:
                    </span>
                    <pre className="bg-[#16181a] border border-zinc-800 rounded-lg p-3 text-[11px] text-zinc-300 font-mono overflow-x-auto max-h-32">
                      {JSON.stringify(req.proposedAction.parameters, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Action Controls */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setRejectReasonModalId(req.id)}
                    className="border-red-500/40 hover:bg-red-500/10 text-red-400 text-xs px-3 py-1.5 h-auto flex items-center gap-1.5"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject Action
                  </Button>
                  <Button
                    onClick={() => decideMutation.mutate({ id: req.id, approved: true })}
                    disabled={decideMutation.isPending}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-1.5 h-auto flex items-center gap-1.5"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Authorize & Execute
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Reject Reason Modal */}
      {rejectReasonModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111315] border border-red-500/40 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-heading">Reject Proposal</h3>
            <p className="text-xs text-zinc-400">Provide an optional reason for the audit trail.</p>
            <textarea
              rows={3}
              placeholder="e.g. Action exceeds current Q3 budget bounds or requires manual oversight..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-red-500"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setRejectReasonModalId(null)} className="text-xs">
                Cancel
              </Button>
              <Button
                onClick={() =>
                  decideMutation.mutate({
                    id: rejectReasonModalId,
                    approved: false,
                    reason: rejectReason,
                  })
                }
                className="bg-red-600 hover:bg-red-500 text-white font-semibold text-xs"
              >
                Confirm Rejection
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
