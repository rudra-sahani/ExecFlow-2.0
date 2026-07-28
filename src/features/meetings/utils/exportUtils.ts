import { Meeting, TranscriptSegment } from '../../../types/meeting';
import { Task } from '../../../types/task';

export function downloadFile(content: string, fileName: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportMeetingAsJSON(meeting: Meeting, transcript: TranscriptSegment[], tasks: Task[]) {
  const data = {
    meeting,
    transcript,
    tasks,
    exportedAt: new Date().toISOString(),
  };
  const content = JSON.stringify(data, null, 2);
  const filename = `${meeting.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-summary.json`;
  downloadFile(content, filename, 'application/json');
}

export function exportMeetingAsMarkdown(meeting: Meeting, transcript: TranscriptSegment[], tasks: Task[]) {
  const summary = meeting.summary;
  let md = `# ${meeting.title}\n\n`;
  md += `**Date:** ${new Date(meeting.scheduledStartTime).toLocaleDateString()} ${new Date(meeting.scheduledStartTime).toLocaleTimeString()}\n`;
  md += `**Status:** ${meeting.status}\n`;
  md += `**Organizer:** ${meeting.organizer.name} (${meeting.organizer.email || ''})\n\n`;

  if (meeting.description) {
    md += `## Description\n${meeting.description}\n\n`;
  }

  if (summary) {
    md += `## Executive Summary\n${summary.executiveSummary || summary.overview}\n\n`;

    if (summary.meetingGoal) {
      md += `### Goal\n${summary.meetingGoal}\n\n`;
    }

    if (summary.keyOutcomes && summary.keyOutcomes.length > 0) {
      md += `### Key Outcomes\n`;
      summary.keyOutcomes.forEach(o => (md += `- ${o}\n`));
      md += `\n`;
    }

    if (summary.keyDecisions && summary.keyDecisions.length > 0) {
      md += `### Key Decisions\n`;
      summary.keyDecisions.forEach(d => (md += `- ${d}\n`));
      md += `\n`;
    }

    if (summary.nextSteps && summary.nextSteps.length > 0) {
      md += `### Next Steps\n`;
      summary.nextSteps.forEach(n => (md += `- ${n}\n`));
      md += `\n`;
    }

    if (summary.openQuestions && summary.openQuestions.length > 0) {
      md += `### Open Questions\n`;
      summary.openQuestions.forEach(q => (md += `- ${q}\n`));
      md += `\n`;
    }
  }

  if (tasks.length > 0) {
    md += `## Assigned Tasks\n`;
    tasks.forEach(t => {
      md += `- [${t.status === 'COMPLETED' ? 'x' : ' '}] **${t.title}** (${t.priority}) - Assignee: ${t.assignee?.name || 'Unassigned'}\n`;
    });
    md += `\n`;
  }

  if (transcript.length > 0) {
    md += `## Full Transcript\n\n`;
    transcript.forEach(seg => {
      const time = `${Math.floor(seg.startTime / 60)}:${String(Math.floor(seg.startTime % 60)).padStart(2, '0')}`;
      md += `**[${time}] ${seg.speakerName}:** ${seg.text}\n\n`;
    });
  }

  const filename = `${meeting.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-notes.md`;
  downloadFile(md, filename, 'text/markdown');
}

export function exportMeetingAsCSV(meeting: Meeting, tasks: Task[]) {
  let csv = `Type,Title/Content,Owner/Assignee,Status,Priority/Severity,Details\n`;

  // Add Summary Decisions
  if (meeting.summary?.decisionsDetail) {
    meeting.summary.decisionsDetail.forEach(d => {
      const cleanDec = d.decision.replace(/"/g, '""');
      const cleanReason = d.reason.replace(/"/g, '""');
      csv += `"Decision","${cleanDec}","${d.decisionMaker}","COMPLETED","N/A","${cleanReason}"\n`;
    });
  }

  // Add Risks
  if (meeting.summary?.risks) {
    meeting.summary.risks.forEach(r => {
      const cleanTitle = r.title.replace(/"/g, '""');
      const cleanMit = r.mitigation.replace(/"/g, '""');
      csv += `"Risk","${cleanTitle}","${r.owner}","OPEN","${r.severity}","${cleanMit}"\n`;
    });
  }

  // Add Tasks
  tasks.forEach(t => {
    const cleanTitle = t.title.replace(/"/g, '""');
    const cleanDesc = (t.description || '').replace(/"/g, '""');
    csv += `"Task","${cleanTitle}","${t.assignee?.name || 'Unassigned'}","${t.status}","${t.priority}","${cleanDesc}"\n`;
  });

  const filename = `${meeting.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-action-items.csv`;
  downloadFile(csv, filename, 'text/csv');
}

export function exportMeetingAsDOCX(meeting: Meeting, transcript: TranscriptSegment[], tasks: Task[]) {
  const summary = meeting.summary;
  let html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head><title>${meeting.title}</title>
  <style>
    body { font-family: Calibri, sans-serif; font-size: 11pt; color: #111827; margin: 1in; }
    h1 { font-size: 20pt; color: #1e1b4b; margin-bottom: 10pt; }
    h2 { font-size: 14pt; color: #3730a3; margin-top: 15pt; border-bottom: 1px solid #e5e7eb; padding-bottom: 4pt; }
    p { margin-bottom: 8pt; line-height: 1.4; }
    ul { margin-left: 15pt; }
    li { margin-bottom: 4pt; }
    .badge { background: #e0e7ff; color: #3730a3; padding: 2pt 6pt; font-size: 9pt; font-weight: bold; border-radius: 3pt; }
  </style>
  </head>
  <body>
    <h1>${meeting.title}</h1>
    <p><strong>ExecFlow AI Enterprise Intelligence Report</strong></p>
    <p><strong>Date:</strong> ${new Date(meeting.scheduledStartTime).toLocaleString()} &nbsp;|&nbsp; <strong>Status:</strong> ${meeting.status}</p>
    ${summary ? `<h2>Executive Summary</h2><p>${summary.executiveSummary || summary.overview}</p>` : ''}
    ${summary?.keyOutcomes?.length ? `<h2>Key Outcomes</h2><ul>${summary.keyOutcomes.map(o => `<li>${o}</li>`).join('')}</ul>` : ''}
    ${summary?.keyDecisions?.length ? `<h2>Key Decisions</h2><ul>${summary.keyDecisions.map(d => `<li>${d}</li>`).join('')}</ul>` : ''}
    ${tasks.length ? `<h2>Action Items</h2><ul>${tasks.map(t => `<li>[${t.status}] <strong>${t.title}</strong> (${t.priority}) - Assignee: ${t.assignee?.name || 'Unassigned'}</li>`).join('')}</ul>` : ''}
    ${transcript.length ? `<h2>Transcript</h2>${transcript.map(s => `<p><strong>[${Math.floor(s.startTime / 60)}:${String(Math.floor(s.startTime % 60)).padStart(2, '0')}] ${s.speakerName}:</strong> ${s.text}</p>`).join('')}` : ''}
  </body>
  </html>`;

  const filename = `${meeting.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-report.doc`;
  downloadFile(html, filename, 'application/msword');
}

export function exportMeetingAsPDF(meeting: Meeting, transcript: TranscriptSegment[], tasks: Task[]) {
  // Triggers printable document formatted layout
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const summary = meeting.summary;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${meeting.title} - ExecFlow Intelligence Report</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 40px; color: #0f172a; line-height: 1.6; }
          h1 { font-size: 24px; color: #1e1b4b; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
          h2 { font-size: 18px; color: #312e81; margin-top: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; }
          .meta { font-size: 13px; color: #64748b; margin-bottom: 20px; }
          .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; background: #e0e7ff; color: #3730a3; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
          ul { padding-left: 20px; }
          li { margin-bottom: 6px; }
          .transcript-seg { margin-bottom: 12px; font-size: 14px; }
          .speaker { font-weight: 600; color: #4338ca; }
          .timestamp { font-size: 11px; color: #94a3b8; margin-right: 8px; }
        </style>
      </head>
      <body>
        <h1>${meeting.title}</h1>
        <div class="meta">
          <strong>Date:</strong> ${new Date(meeting.scheduledStartTime).toLocaleString()} &nbsp;|&nbsp;
          <strong>Status:</strong> <span class="badge">${meeting.status}</span> &nbsp;|&nbsp;
          <strong>Organizer:</strong> ${meeting.organizer.name}
        </div>

        ${
          summary
            ? `
          <div class="card">
            <h2>Executive Summary</h2>
            <p>${summary.executiveSummary || summary.overview}</p>
            ${summary.meetingGoal ? `<p><strong>Goal:</strong> ${summary.meetingGoal}</p>` : ''}
          </div>

          ${
            summary.keyOutcomes?.length
              ? `
            <h2>Key Outcomes</h2>
            <ul>${summary.keyOutcomes.map(o => `<li>${o}</li>`).join('')}</ul>
          `
              : ''
          }

          ${
            summary.keyDecisions?.length
              ? `
            <h2>Key Decisions</h2>
            <ul>${summary.keyDecisions.map(d => `<li>${d}</li>`).join('')}</ul>
          `
              : ''
          }
        `
            : ''
        }

        ${
          tasks.length > 0
            ? `
          <h2>Action Items & Tasks</h2>
          <ul>
            ${tasks.map(t => `<li><strong>${t.title}</strong> (${t.priority}) - Assigned to ${t.assignee?.name || 'Unassigned'} [${t.status}]</li>`).join('')}
          </ul>
        `
            : ''
        }

        ${
          transcript.length > 0
            ? `
          <h2>Transcript</h2>
          <div>
            ${transcript
              .map(
                seg => `
              <div class="transcript-seg">
                <span class="timestamp">[${Math.floor(seg.startTime / 60)}:${String(Math.floor(seg.startTime % 60)).padStart(2, '0')}]</span>
                <span class="speaker">${seg.speakerName}:</span>
                ${seg.text}
              </div>
            `
              )
              .join('')}
          </div>
        `
            : ''
        }

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
