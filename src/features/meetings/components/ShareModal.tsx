import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Icons } from '../../../components/ui/Icons';

interface ShareModalProps {
  meetingTitle: string;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ meetingTitle, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [accessLevel, setAccessLevel] = useState<'VIEW' | 'COMMENT' | 'EDIT'>('VIEW');
  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.Share className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Share Meeting Workspace</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <p className="text-xs text-slate-600">
          Share full transcript, decisions, risks, and task graph for <strong>"{meetingTitle}"</strong>.
        </p>

        {/* Link Copy Box */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-700">Workspace URL</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 text-xs px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md font-mono text-slate-700 select-all"
            />
            <Button
              size="sm"
              onClick={handleCopy}
              className="h-8 text-xs bg-indigo-600 text-white hover:bg-indigo-700 shrink-0 gap-1"
            >
              {copied ? <Icons.Check className="w-3.5 h-3.5" /> : <Icons.Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>

        {/* Access Level Selector */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <label className="text-[11px] font-semibold text-slate-700">Link Permission</label>
          <select
            value={accessLevel}
            onChange={e => setAccessLevel(e.target.value as 'VIEW' | 'COMMENT' | 'EDIT')}
            className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800"
          >
            <option value="VIEW">Can View (Transcript, AI Summary & Tasks)</option>
            <option value="COMMENT">Can Comment & Chat with Copilot</option>
            <option value="EDIT">Full Edit Access & Human-in-the-Loop Approvals</option>
          </select>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
