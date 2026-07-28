import React, { useState } from 'react';
import { Download, FileText, Table, FileCode, Check, Loader2 } from 'lucide-react';
import { AnalyticsReport } from '../../../types/analytics';

interface ExportCenterProps {
  report: AnalyticsReport;
}

export const ExportCenter: React.FC<ExportCenterProps> = ({ report }) => {
  const [exportingFormat, setExportingFormat] = useState<string | null>(null);
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  const handleExport = (format: 'pdf' | 'csv' | 'excel' | 'json') => {
    setExportingFormat(format);
    setTimeout(() => {
      let content = '';
      let fileName = `ExecFlow-Executive-Report-${new Date().toISOString().slice(0, 10)}`;
      let mimeType = 'text/plain';

      if (format === 'json') {
        content = JSON.stringify(report, null, 2);
        fileName += '.json';
        mimeType = 'application/json';
      } else if (format === 'csv') {
        const rows = [
          ['Metric', 'Value'],
          ['Total Meetings', report.overview.totalMeetings],
          ['Total Hours Recorded', report.overview.totalHoursRecorded],
          ['Tasks Generated', report.overview.tasksGenerated],
          ['Task Completion Rate', `${report.overview.tasksCompletedRate}%`],
          ['Time Saved (Hours)', report.overview.timeSavedHours],
          ['Average Agent Confidence', `${(report.overview.averageAgentConfidence * 100).toFixed(1)}%`],
          ['Total Decisions', report.overview.totalDecisions],
          ['Total Risks Identified', report.overview.totalRisks],
        ];
        content = rows.map((r) => r.join(',')).join('\n');
        fileName += '.csv';
        mimeType = 'text/csv';
      } else if (format === 'excel') {
        content = `Executive Analytics Report Summary\nGenerated: ${new Date().toLocaleString()}\n\nMeetings: ${report.overview.totalMeetings}\nTasks Completed Rate: ${report.overview.tasksCompletedRate}%\nTime Saved: ${report.overview.timeSavedHours} hrs`;
        fileName += '.xlsx';
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      } else {
        content = `EXECFLOW EXECUTIVE REPORT\n\nExecutive Overview\n- Total Meetings: ${report.overview.totalMeetings}\n- Hours Recorded: ${report.overview.totalHoursRecorded} hrs\n- Tasks Generated: ${report.overview.tasksGenerated}\n- Completion Rate: ${report.overview.tasksCompletedRate}%\n- Time Saved: ${report.overview.timeSavedHours} hrs\n- Agent Confidence: ${(report.overview.averageAgentConfidence * 100).toFixed(1)}%\n\nPredictive Observations:\n${(report.predictiveInsights || []).map((i) => `- [${i.impactScore}] ${i.title}: ${i.description}`).join('\n')}`;
        fileName += '.pdf';
        mimeType = 'application/pdf';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setExportingFormat(null);
      setDownloadedFormat(format);
      setTimeout(() => setDownloadedFormat(null), 3000);
    }, 800);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => handleExport('pdf')}
        disabled={!!exportingFormat}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all disabled:opacity-50"
      >
        {exportingFormat === 'pdf' ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : downloadedFormat === 'pdf' ? (
          <Check className="w-3.5 h-3.5 text-emerald-300" />
        ) : (
          <FileText className="w-3.5 h-3.5" />
        )}
        Executive PDF
      </button>

      <button
        onClick={() => handleExport('csv')}
        disabled={!!exportingFormat}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all disabled:opacity-50"
      >
        {exportingFormat === 'csv' ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : downloadedFormat === 'csv' ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Table className="w-3.5 h-3.5" />
        )}
        CSV Export
      </button>

      <button
        onClick={() => handleExport('excel')}
        disabled={!!exportingFormat}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all disabled:opacity-50"
      >
        {exportingFormat === 'excel' ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : downloadedFormat === 'excel' ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Download className="w-3.5 h-3.5" />
        )}
        Excel
      </button>

      <button
        onClick={() => handleExport('json')}
        disabled={!!exportingFormat}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all disabled:opacity-50"
      >
        {exportingFormat === 'json' ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : downloadedFormat === 'json' ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <FileCode className="w-3.5 h-3.5" />
        )}
        JSON
      </button>
    </div>
  );
};
