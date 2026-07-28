/**
 * Responsive HTML Email Templates for ExecFlow AI
 * Styled with ExecFlow AI dark slate / emerald brand identity.
 */

export function wrapInEmailLayout(title: string, bodyContent: string, preheaderText = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0B0C0E;
      color: #E2E8F0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #0B0C0E;
      padding: 32px 16px;
    }
    .container {
      max-width: 580px;
      margin: 0 auto;
      background-color: #111315;
      border: 1px solid #1E2225;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    .header {
      padding: 28px 32px;
      background-color: #16181A;
      border-bottom: 1px solid #1E2225;
      text-align: left;
    }
    .brand-logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }
    .brand-badge {
      background-color: rgba(124, 181, 24, 0.15);
      border: 1px solid rgba(124, 181, 24, 0.3);
      color: #7CB518;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .brand-name {
      color: #FFFFFF;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .brand-highlight {
      color: #7CB518;
    }
    .content {
      padding: 36px 32px;
      line-height: 1.6;
    }
    h1 {
      color: #FFFFFF;
      font-size: 22px;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 16px;
      letter-spacing: -0.01em;
    }
    p {
      color: #94A3B8;
      font-size: 14px;
      margin-top: 0;
      margin-bottom: 20px;
      line-height: 1.65;
    }
    .btn {
      display: inline-block;
      background-color: #7CB518;
      color: #050505 !important;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 8px;
      margin: 16px 0;
      text-align: center;
      box-shadow: 0 4px 12px rgba(124, 181, 24, 0.25);
    }
    .code-box {
      background-color: #181B1D;
      border: 1px solid #282C30;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      margin: 24px 0;
    }
    .code-digits {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 32px;
      font-weight: 800;
      letter-spacing: 10px;
      color: #7CB518;
    }
    .info-card {
      background-color: #181A1C;
      border: 1px solid #24282B;
      border-left: 4px solid #7CB518;
      border-radius: 8px;
      padding: 16px 20px;
      margin: 20px 0;
    }
    .alert-card {
      background-color: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-left: 4px solid #EF4444;
      border-radius: 8px;
      padding: 16px 20px;
      margin: 20px 0;
    }
    .field-label {
      font-size: 12px;
      font-weight: 600;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
    .field-value {
      font-size: 14px;
      font-weight: 600;
      color: #F1F5F9;
    }
    .footer {
      padding: 24px 32px;
      background-color: #0E1011;
      border-top: 1px solid #1E2225;
      text-align: center;
      font-size: 12px;
      color: #64748B;
    }
    .footer a {
      color: #7CB518;
      text-decoration: none;
    }
  </style>
</head>
<body>
  ${preheaderText ? `<div style="display:none;font-size:1px;color:#0B0C0E;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheaderText}</div>` : ''}
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <div class="brand-logo">
                <span class="brand-name">ExecFlow<span class="brand-highlight">.AI</span></span>
                <span class="brand-badge">Autonomous Executive System</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="content">
        ${bodyContent}
      </div>
      <div class="footer">
        <p style="margin-bottom: 8px; color: #64748B;">
          &copy; ${new Date().getFullYear()} ExecFlow AI Inc. Autonomous Enterprise Operating System.
        </p>
        <p style="margin: 0; color: #475569; font-size: 11px;">
          This automated transactional notification was issued securely via Resend.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function getVerificationEmailTemplate(data: {
  fullName: string;
  verificationLink: string;
  code: string;
  expiresInHours?: number;
}): { subject: string; html: string; text: string } {
  const expiresIn = data.expiresInHours || 24;
  const subject = 'Verify your ExecFlow AI email address';
  const html = wrapInEmailLayout(
    subject,
    `
    <h1>Verify Your Work Email</h1>
    <p>Hello ${data.fullName},</p>
    <p>Welcome to ExecFlow AI. Please confirm your email address to activate your autonomous AI workspace and start orchestrating meeting intelligence.</p>
    
    <div class="code-box">
      <div style="font-size: 12px; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">Your Verification Security Code</div>
      <div class="code-digits">${data.code}</div>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${data.verificationLink}" class="btn" target="_blank">Verify Email Address &rarr;</a>
    </div>

    <div class="info-card">
      <p style="margin: 0; font-size: 12px; color: #94A3B8;">
        <strong>Security Notice:</strong> This verification link and code will expire in <strong>${expiresIn} hours</strong>. If you did not create an ExecFlow AI account, you can safely ignore this message.
      </p>
    </div>

    <p style="font-size: 12px; color: #64748B; word-break: break-all;">
      Or copy and paste this link into your browser:<br>
      <a href="${data.verificationLink}" style="color: #7CB518;">${data.verificationLink}</a>
    </p>
    `,
    `Your verification code is ${data.code}`
  );

  const text = `Hello ${data.fullName},\n\nWelcome to ExecFlow AI. Your 6-digit verification code is: ${data.code}\n\nVerify your email by clicking: ${data.verificationLink}\n\nThis code expires in ${expiresIn} hours.`;
  return { subject, html, text };
}

export function getWelcomeEmailTemplate(data: {
  fullName: string;
  workspaceName: string;
  dashboardUrl: string;
}): { subject: string; html: string; text: string } {
  const subject = `Welcome to ExecFlow AI – Workspace "${data.workspaceName}" Activated`;
  const html = wrapInEmailLayout(
    subject,
    `
    <h1>Account Verified & Workspace Ready</h1>
    <p>Hello ${data.fullName},</p>
    <p>Your work email has been verified! Workspace <strong>${data.workspaceName}</strong> is now live with full AI agent orchestration enabled.</p>
    
    <div class="info-card">
      <div style="font-weight: 700; color: #FFFFFF; font-size: 15px; margin-bottom: 10px;">Quick Start Guide:</div>
      <ul style="margin: 0; padding-left: 20px; color: #94A3B8; font-size: 13px; line-height: 1.8;">
        <li><strong>Meeting Agent:</strong> Record or upload meeting transcripts for auto-summaries.</li>
        <li><strong>Task Extraction Agent:</strong> Automatically convert discussion items into structured tasks.</li>
        <li><strong>Governance Guard:</strong> Approve or decline high-risk database actions with 1-click.</li>
        <li><strong>Memory Index:</strong> Search semantic vector summaries across past sessions.</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${data.dashboardUrl}" class="btn" target="_blank">Launch ExecFlow Dashboard &rarr;</a>
    </div>

    <p style="font-size: 13px; color: #94A3B8;">
      If you need assistance configuring workspace integrations, reply directly to this email or visit settings.
    </p>
    `
  );

  const text = `Hello ${data.fullName},\n\nYour ExecFlow AI account and workspace "${data.workspaceName}" have been verified.\n\nAccess your dashboard here: ${data.dashboardUrl}`;
  return { subject, html, text };
}

export function getPasswordResetTemplate(data: {
  fullName: string;
  resetLink: string;
  expiresInMinutes?: number;
}): { subject: string; html: string; text: string } {
  const expiresIn = data.expiresInMinutes || 60;
  const subject = 'Reset your ExecFlow AI password';
  const html = wrapInEmailLayout(
    subject,
    `
    <h1>Reset Account Password</h1>
    <p>Hello ${data.fullName},</p>
    <p>We received a request to reset the password for your ExecFlow AI account. Click the button below to specify a new password.</p>
    
    <div style="text-align: center; margin: 28px 0;">
      <a href="${data.resetLink}" class="btn" target="_blank">Reset Password Now &rarr;</a>
    </div>

    <div class="info-card">
      <p style="margin: 0; font-size: 12px; color: #94A3B8;">
        <strong>Expiration Notice:</strong> This password reset link is valid for <strong>${expiresIn} minutes</strong> only.
      </p>
    </div>

    <p style="font-size: 12px; color: #64748B;">
      If you did not request a password reset, please secure your account or disregard this email.
    </p>
    <p style="font-size: 12px; color: #64748B; word-break: break-all;">
      Link: <a href="${data.resetLink}" style="color: #7CB518;">${data.resetLink}</a>
    </p>
    `
  );

  const text = `Hello ${data.fullName},\n\nReset your ExecFlow AI password by visiting: ${data.resetLink}\n\nThis link expires in ${expiresIn} minutes.`;
  return { subject, html, text };
}

export function getLoginAlertTemplate(data: {
  fullName: string;
  browser: string;
  ip: string;
  location: string;
  time: string;
}): { subject: string; html: string; text: string } {
  const subject = 'Security Alert: New sign-in to ExecFlow AI';
  const html = wrapInEmailLayout(
    subject,
    `
    <h1>Security Alert: New Sign-in Detected</h1>
    <p>Hello ${data.fullName},</p>
    <p>Your ExecFlow AI account was just accessed from a new device or browser session.</p>

    <div class="alert-card">
      <div style="display: table; width: 100%;">
        <div style="display: table-row;">
          <div style="display: table-cell; padding-bottom: 8px;">
            <div class="field-label">Time & Date</div>
            <div class="field-value">${data.time}</div>
          </div>
          <div style="display: table-cell; padding-bottom: 8px;">
            <div class="field-label">Browser / Client</div>
            <div class="field-value">${data.browser}</div>
          </div>
        </div>
        <div style="display: table-row;">
          <div style="display: table-cell;">
            <div class="field-label">IP Address</div>
            <div class="field-value">${data.ip}</div>
          </div>
          <div style="display: table-cell;">
            <div class="field-label">Location</div>
            <div class="field-value">${data.location}</div>
          </div>
        </div>
      </div>
    </div>

    <p style="font-size: 13px; color: #94A3B8;">
      If this was you, no action is required. If you did not recognize this activity, please change your password immediately.
    </p>
    `
  );

  const text = `Security Alert for ${data.fullName}:\nNew sign-in detected.\nTime: ${data.time}\nBrowser: ${data.browser}\nIP: ${data.ip}\nLocation: ${data.location}`;
  return { subject, html, text };
}

export function getTeamInviteTemplate(data: {
  inviterName: string;
  workspaceName: string;
  inviteLink: string;
}): { subject: string; html: string; text: string } {
  const subject = `${data.inviterName} invited you to join "${data.workspaceName}" on ExecFlow AI`;
  const html = wrapInEmailLayout(
    subject,
    `
    <h1>Team Workspace Invitation</h1>
    <p><strong>${data.inviterName}</strong> has invited you to collaborate in the ExecFlow AI workspace <strong>"${data.workspaceName}"</strong>.</p>
    
    <div class="info-card">
      <p style="margin: 0; font-size: 13px; color: #E2E8F0;">
        ExecFlow AI helps teams automate meeting summaries, task extractions, and multi-agent workflow dispatches securely.
      </p>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${data.inviteLink}" class="btn" target="_blank">Accept Workspace Invitation &rarr;</a>
    </div>

    <p style="font-size: 12px; color: #64748B; word-break: break-all;">
      Or paste this link: <a href="${data.inviteLink}" style="color: #7CB518;">${data.inviteLink}</a>
    </p>
    `
  );

  const text = `${data.inviterName} invited you to join workspace "${data.workspaceName}" on ExecFlow AI.\nAccept invitation: ${data.inviteLink}`;
  return { subject, html, text };
}

export function getApprovalRequiredTemplate(data: {
  agentName: string;
  actionDescription: string;
  riskLevel: string;
  approvalUrl: string;
  parametersPayload?: string;
}): { subject: string; html: string; text: string } {
  const isCritical = data.riskLevel === 'CRITICAL' || data.riskLevel === 'HIGH';
  const subject = `[APPROVAL REQUIRED] ${data.riskLevel} Risk Action requested by ${data.agentName}`;
  const html = wrapInEmailLayout(
    subject,
    `
    <h1>Governance Approval Required</h1>
    <p>The autonomous agent <strong>${data.agentName}</strong> requested authorization to execute an action classified as <strong>${data.riskLevel} RISK</strong>.</p>

    <div class="${isCritical ? 'alert-card' : 'info-card'}">
      <div class="field-label">Proposed Action</div>
      <div class="field-value" style="font-size: 15px; margin-bottom: 12px;">${data.actionDescription}</div>
      
      <div class="field-label">Risk Level</div>
      <div class="field-value" style="color: ${isCritical ? '#EF4444' : '#F59E0B'};">${data.riskLevel}</div>

      ${data.parametersPayload ? `
        <div class="field-label" style="margin-top: 12px;">Parameters</div>
        <pre style="background:#0F1113; padding:10px; border-radius:6px; color:#A1A1AA; font-size:11px; overflow-x:auto;">${data.parametersPayload}</pre>
      ` : ''}
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${data.approvalUrl}" class="btn" target="_blank">Review & Authorize Action &rarr;</a>
    </div>

    <p style="font-size: 12px; color: #64748B;">
      Human-in-the-Loop policy prohibits execution until an authorized team member approves this request.
    </p>
    `
  );

  const text = `Approval Required:\nAgent: ${data.agentName}\nAction: ${data.actionDescription}\nRisk: ${data.riskLevel}\nReview request: ${data.approvalUrl}`;
  return { subject, html, text };
}

export function getTaskNotificationTemplate(data: {
  taskTitle: string;
  eventType: 'ASSIGNED' | 'UPDATED' | 'COMPLETED' | 'DEADLINE';
  assignerName?: string;
  dueDate?: string;
  taskUrl: string;
}): { subject: string; html: string; text: string } {
  const titles = {
    ASSIGNED: `New Task Assigned: "${data.taskTitle}"`,
    UPDATED: `Task Updated: "${data.taskTitle}"`,
    COMPLETED: `Task Completed: "${data.taskTitle}"`,
    DEADLINE: `Deadline Approaching: "${data.taskTitle}"`,
  };

  const subject = titles[data.eventType] || `Task Notification: ${data.taskTitle}`;
  const html = wrapInEmailLayout(
    subject,
    `
    <h1>Task Update Notification</h1>
    <p>There is an update on task <strong>"${data.taskTitle}"</strong>.</p>

    <div class="info-card">
      <div class="field-label">Event Type</div>
      <div class="field-value" style="color:#7CB518; text-transform:uppercase;">${data.eventType}</div>

      ${data.assignerName ? `<div class="field-label" style="margin-top:10px;">Assigned / Triggered By</div><div class="field-value">${data.assignerName}</div>` : ''}
      ${data.dueDate ? `<div class="field-label" style="margin-top:10px;">Due Date</div><div class="field-value">${data.dueDate}</div>` : ''}
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${data.taskUrl}" class="btn" target="_blank">View Task in ExecFlow &rarr;</a>
    </div>
    `
  );

  const text = `Task Notification (${data.eventType}): ${data.taskTitle}\nView task: ${data.taskUrl}`;
  return { subject, html, text };
}

export function getMeetingEmailTemplate(data: {
  meetingTitle: string;
  eventType: 'SCHEDULED' | 'REMINDER' | 'SUMMARY' | 'TRANSCRIPT_READY';
  meetingUrl: string;
  summaryText?: string;
}): { subject: string; html: string; text: string } {
  const subjects = {
    SCHEDULED: `Meeting Scheduled: "${data.meetingTitle}"`,
    REMINDER: `Reminder: Upcoming Meeting "${data.meetingTitle}"`,
    SUMMARY: `AI Summary Ready for "${data.meetingTitle}"`,
    TRANSCRIPT_READY: `Transcript Processed for "${data.meetingTitle}"`,
  };

  const subject = subjects[data.eventType] || `Meeting Update: ${data.meetingTitle}`;
  const html = wrapInEmailLayout(
    subject,
    `
    <h1>Meeting Update</h1>
    <p>Update for meeting session: <strong>"${data.meetingTitle}"</strong></p>

    ${data.summaryText ? `
      <div class="info-card">
        <div class="field-label">AI Executive Summary</div>
        <p style="color:#E2E8F0; font-size:13px; margin-top:6px; margin-bottom:0;">${data.summaryText}</p>
      </div>
    ` : ''}

    <div style="text-align: center; margin: 28px 0;">
      <a href="${data.meetingUrl}" class="btn" target="_blank">Open Meeting Hub &rarr;</a>
    </div>
    `
  );

  const text = `Meeting (${data.eventType}): ${data.meetingTitle}\nOpen link: ${data.meetingUrl}`;
  return { subject, html, text };
}

export function getDocumentProcessedTemplate(data: {
  documentName: string;
  summaryReady: boolean;
  memoryIndexed: boolean;
  tasksCount: number;
  risksCount: number;
  documentUrl: string;
}): { subject: string; html: string; text: string } {
  const subject = `Document Processed: "${data.documentName}"`;
  const html = wrapInEmailLayout(
    subject,
    `
    <h1>Document Processing Complete</h1>
    <p>ExecFlow AI agents finished processing document <strong>"${data.documentName}"</strong>.</p>

    <div class="info-card">
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span class="field-label">Executive Summary</span>
        <span style="color:${data.summaryReady ? '#7CB518' : '#64748B'}; font-weight:bold; font-size:12px;">${data.summaryReady ? 'READY' : 'PENDING'}</span>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span class="field-label">Vector Memory Index</span>
        <span style="color:${data.memoryIndexed ? '#7CB518' : '#64748B'}; font-weight:bold; font-size:12px;">${data.memoryIndexed ? 'INDEXED' : 'PENDING'}</span>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span class="field-label">Extracted Tasks</span>
        <span class="field-value">${data.tasksCount} Tasks</span>
      </div>
      <div style="display:flex; justify-content:space-between;">
        <span class="field-label">Identified Risks</span>
        <span class="field-value">${data.risksCount} Risks</span>
      </div>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${data.documentUrl}" class="btn" target="_blank">View Document Insights &rarr;</a>
    </div>
    `
  );

  const text = `Document Processed: ${data.documentName}\nTasks: ${data.tasksCount}, Risks: ${data.risksCount}\nView document: ${data.documentUrl}`;
  return { subject, html, text };
}
