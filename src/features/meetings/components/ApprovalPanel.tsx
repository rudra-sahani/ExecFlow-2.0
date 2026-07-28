import React, { useState } from 'react';
import { ApprovalRequest } from '../../../types/approval';
import { Icons } from '../../../components/ui/Icons';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Card, CardContent } from '../../../components/ui/Card';

interface ApprovalPanelProps {
  approvals: ApprovalRequest[];
  onDecide: (approvalId: string, approved: boolean, reason?: string) => void;
  isLoading?: boolean;
}

export const ApprovalPanel: React.FC<ApprovalPanelProps> = ({
  approvals,
  onDecide,
  isLoading,
}) => {
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  if (isLoading) {
    return (
      <div className="p-4 space-y-3 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-full"></div>
        <div className="h-28 bg-slate-100 rounded w-full"></div>
      </div>
    );
  }

  const pendingList = approvals.filter(a => a.status === 'PENDING');

  if (pendingList.length === 0) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 pb-1">
          <Icons.ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-semibold text-slate-900">Pending Approvals</h3>
        </div>
        <div className="text-center py-6 text-slate-400 space-y-1 bg-white border border-dashed border-slate-200 rounded-lg">
          <Icons.CheckCircle className="w-6 h-6 mx-auto text-emerald-500 opacity-60" />
          <p className="text-xs font-medium">All tool execution requests approved.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="approval-panel-container" className="space-y-3">
      <div className="flex items-center gap-2 pb-1">
        <Icons.ShieldAlert className="w-4 h-4 text-amber-600" />
        <h3 className="text-xs font-semibold text-slate-900">Pending Approvals</h3>
        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
          {pendingList.length}
        </span>
      </div>

      {pendingList.map(app => {
        const action = app.proposedAction;
        const isRejecting = rejectingId === app.id;

        return (
          <Card key={app.id} variant="default" className="border-amber-200 bg-amber-50/30">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Icons.Key className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-xs font-bold text-slate-900">{action.actionType}</span>
                </div>
                <Badge variant="danger" className="text-[10px] py-0 font-mono">
                  {action.riskLevel} RISK
                </Badge>
              </div>

              <div className="text-[11px] text-slate-600 space-y-1">
                <div><strong>Tool:</strong> {action.toolName}</div>
                <div><strong>Target:</strong> {action.targetService}</div>
                <div className="bg-white p-1.5 rounded border border-amber-200 font-mono text-[10px] text-slate-800 overflow-x-auto">
                  {JSON.stringify(action.parameters)}
                </div>
                <p className="text-slate-500 italic">{action.explanation}</p>
              </div>

              {/* Rejection Input Box */}
              {isRejecting ? (
                <div className="space-y-1.5 pt-1">
                  <input
                    type="text"
                    placeholder="Reason for rejection..."
                    value={rejectionReason}
                    onChange={e => setRejectionReason(e.target.value)}
                    className="w-full text-xs px-2 py-1 border border-red-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                    autoFocus
                  />
                  <div className="flex gap-1 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setRejectingId(null)}
                      className="h-6 text-[11px] px-2"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        onDecide(app.id, false, rejectionReason);
                        setRejectingId(null);
                        setRejectionReason('');
                      }}
                      className="h-6 text-[11px] px-2 bg-red-600 text-white hover:bg-red-700"
                    >
                      Confirm Reject
                    </Button>
                  </div>
                </div>
              ) : (
                /* Approve / Reject Controls */
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    size="sm"
                    onClick={() => onDecide(app.id, true)}
                    className="flex-1 h-7 text-xs bg-emerald-600 text-white hover:bg-emerald-700 gap-1"
                  >
                    <Icons.CheckCircle className="w-3.5 h-3.5" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRejectingId(app.id)}
                    className="flex-1 h-7 text-xs text-red-600 border-red-200 hover:bg-red-50 gap-1"
                  >
                    <Icons.XCircle className="w-3.5 h-3.5" />
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
