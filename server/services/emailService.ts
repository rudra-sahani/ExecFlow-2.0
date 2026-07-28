import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import {
  getVerificationEmailTemplate,
  getWelcomeEmailTemplate,
  getPasswordResetTemplate,
  getLoginAlertTemplate,
  getTeamInviteTemplate,
  getApprovalRequiredTemplate,
  getTaskNotificationTemplate,
  getMeetingEmailTemplate,
  getDocumentProcessedTemplate,
} from '../templates/emailTemplates.js';

let resendClient: Resend | null = null;
let smtpTransporter: nodemailer.Transporter | null = null;

function getSmtpTransporter(): nodemailer.Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    if (!smtpTransporter) {
      const port = Number(process.env.SMTP_PORT) || 587;
      smtpTransporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
    }
    return smtpTransporter;
  }
  return null;
}

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  if (!resendClient) {
    try {
      resendClient = new Resend(apiKey);
    } catch (err: any) {
      console.error('[EmailService Error] Failed to initialize Resend client:', err.message);
      return null;
    }
  }
  return resendClient;
}

function getFromAddress(): string {
  return process.env.SMTP_FROM || process.env.EMAIL_FROM || 'ExecFlow AI <w3b.rudra@gmail.com>';
}

function getAppUrl(): string {
  return process.env.APP_URL || 'http://localhost:3000';
}

export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  provider?: 'SMTP' | 'RESEND';
  resendResponse?: any;
}

/**
 * Core raw email sender supporting Gmail SMTP (Nodemailer) and Resend SDK with automatic retry logic.
 */
export async function sendEmail(payload: SendEmailPayload, retries = 2): Promise<SendEmailResult> {
  const transporter = getSmtpTransporter();
  const resend = getResendClient();
  const from = getFromAddress();

  if (!transporter && !resend) {
    console.error(`[EmailService Error] Cannot send email to "${payload.to}". Neither SMTP nor RESEND_API_KEY is configured.`);
    return {
      success: false,
      error: 'No email transport configured (missing SMTP_PASS or RESEND_API_KEY).',
    };
  }

  let attempt = 0;
  let lastError: any = null;

  if (resend) {
    while (attempt <= retries) {
      attempt++;
      try {
        console.log(`[EmailService Resend] Dispatching email to: ${payload.to} | Subject: "${payload.subject}"`);
        const resendFrom = process.env.RESEND_FROM || 'ExecFlow AI <onboarding@resend.dev>';
        
        const response = await resend.emails.send({
          from: resendFrom,
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
          text: payload.text || payload.subject,
        });

        if (response.error) {
          const errObj = response.error;
          const errMsg = errObj.message || JSON.stringify(errObj);
          lastError = errMsg;

          const isDomainRestriction = 
            errObj.name === 'validation_error' ||
            errObj.statusCode === 403 ||
            errMsg.includes('testing emails') ||
            errMsg.includes('verify a domain');

          if (isDomainRestriction) {
            console.warn(`[EmailService Resend Sandbox Restriction] Cannot send to external recipient "${payload.to}". Resend test API keys only deliver to the account owner email.`);
            break; // Stop immediately, do not retry non-retryable domain restriction error
          } else {
            console.error(`[EmailService Resend Error] Attempt ${attempt} failed:`, errMsg);
          }
        } else {
          console.log(`[EmailService Success - Resend] Email delivered to ${payload.to}. ID: ${response.data?.id}`);
          return {
            success: true,
            messageId: response.data?.id,
            provider: 'RESEND',
            resendResponse: response.data,
          };
        }
      } catch (err: any) {
        console.error(`[EmailService Exception] Attempt ${attempt} thrown error:`, err.message || err);
        lastError = err.message || 'Error during Resend dispatch.';
      }

      if (attempt <= retries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }

    if (lastError && (lastError.includes('testing emails') || lastError.includes('verify a domain') || lastError.includes('validation_error'))) {
      return {
        success: false,
        error: lastError,
        provider: 'RESEND',
      };
    }
  }

  if (transporter) {
    attempt = 0;
    while (attempt <= retries) {
      attempt++;
      try {
        console.log(`[EmailService SMTP] Sending email (Attempt ${attempt}/${retries + 1}) to: ${payload.to} | Subject: "${payload.subject}"`);
        const info = await transporter.sendMail({
          from,
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
          text: payload.text || payload.subject,
        });

        console.log(`[EmailService Success - SMTP] Email sent successfully to ${payload.to}. MessageId: ${info.messageId}`);
        return {
          success: true,
          messageId: info.messageId,
          provider: 'SMTP',
        };
      } catch (smtpErr: any) {
        console.error(`[EmailService SMTP Error] Attempt ${attempt} failed:`, smtpErr.message || smtpErr);
        lastError = smtpErr.message || 'SMTP sending failed';
        if (smtpErr.code === 'EAUTH' || (smtpErr.message && smtpErr.message.includes('535'))) {
          break; // Stop retrying on invalid credentials
        }
      }

      if (attempt <= retries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  return {
    success: false,
    error: `Failed to send email after ${retries + 1} attempts. Error: ${lastError}`,
  };
}

// SPECIFIC TRANSACTIONAL EMAIL WORKFLOWS

export async function sendVerificationEmail(data: {
  email: string;
  fullName: string;
  token: string;
  code: string;
}): Promise<SendEmailResult> {
  const appUrl = getAppUrl();
  const verificationLink = `${appUrl}/verify-email?token=${data.token}&email=${encodeURIComponent(data.email)}`;
  
  console.log(`[VERIFICATION EMAIL GENERATED] To: ${data.email} | Code: ${data.code} | Link: ${verificationLink}`);

  const template = getVerificationEmailTemplate({
    fullName: data.fullName,
    verificationLink,
    code: data.code,
    expiresInHours: 24,
  });

  return sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

export async function sendWelcomeEmail(data: {
  email: string;
  fullName: string;
  workspaceName?: string;
}): Promise<SendEmailResult> {
  const appUrl = getAppUrl();
  const dashboardUrl = `${appUrl}/dashboard`;

  const template = getWelcomeEmailTemplate({
    fullName: data.fullName,
    workspaceName: data.workspaceName || 'ExecFlow Primary',
    dashboardUrl,
  });

  return sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

export async function sendPasswordResetEmail(data: {
  email: string;
  fullName: string;
  token: string;
}): Promise<SendEmailResult> {
  const appUrl = getAppUrl();
  const resetLink = `${appUrl}/reset-password?token=${data.token}`;

  const template = getPasswordResetTemplate({
    fullName: data.fullName,
    resetLink,
    expiresInMinutes: 60,
  });

  return sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

export async function sendLoginAlertEmail(data: {
  email: string;
  fullName: string;
  browser: string;
  ip: string;
  location?: string;
  time?: string;
}): Promise<SendEmailResult> {
  const template = getLoginAlertTemplate({
    fullName: data.fullName,
    browser: data.browser,
    ip: data.ip,
    location: data.location || 'Unknown Location',
    time: data.time || new Date().toUTCString(),
  });

  return sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

export async function sendTeamInviteEmail(data: {
  email: string;
  inviterName: string;
  workspaceName: string;
  token: string;
}): Promise<SendEmailResult> {
  const appUrl = getAppUrl();
  const inviteLink = `${appUrl}/accept-invite?token=${data.token}`;

  const template = getTeamInviteTemplate({
    inviterName: data.inviterName,
    workspaceName: data.workspaceName,
    inviteLink,
  });

  return sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

export async function sendApprovalRequiredEmail(data: {
  email: string;
  agentName: string;
  actionDescription: string;
  riskLevel: string;
  approvalId: string;
  parameters?: Record<string, unknown>;
}): Promise<SendEmailResult> {
  const appUrl = getAppUrl();
  const approvalUrl = `${appUrl}/approvals?id=${data.approvalId}`;

  const template = getApprovalRequiredTemplate({
    agentName: data.agentName,
    actionDescription: data.actionDescription,
    riskLevel: data.riskLevel,
    approvalUrl,
    parametersPayload: data.parameters ? JSON.stringify(data.parameters, null, 2) : undefined,
  });

  return sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

export async function sendTaskNotificationEmail(data: {
  email: string;
  taskTitle: string;
  eventType: 'ASSIGNED' | 'UPDATED' | 'COMPLETED' | 'DEADLINE';
  taskId?: string;
  assignerName?: string;
  dueDate?: string;
}): Promise<SendEmailResult> {
  const appUrl = getAppUrl();
  const taskUrl = `${appUrl}/tasks${data.taskId ? `?id=${data.taskId}` : ''}`;

  const template = getTaskNotificationTemplate({
    taskTitle: data.taskTitle,
    eventType: data.eventType,
    assignerName: data.assignerName,
    dueDate: data.dueDate,
    taskUrl,
  });

  return sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

export async function sendMeetingEmail(data: {
  email: string;
  meetingTitle: string;
  eventType: 'SCHEDULED' | 'REMINDER' | 'SUMMARY' | 'TRANSCRIPT_READY';
  meetingId?: string;
  summaryText?: string;
}): Promise<SendEmailResult> {
  const appUrl = getAppUrl();
  const meetingUrl = `${appUrl}/meetings${data.meetingId ? `/${data.meetingId}` : ''}`;

  const template = getMeetingEmailTemplate({
    meetingTitle: data.meetingTitle,
    eventType: data.eventType,
    meetingUrl,
    summaryText: data.summaryText,
  });

  return sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

export async function sendDocumentProcessedEmail(data: {
  email: string;
  documentName: string;
  summaryReady: boolean;
  memoryIndexed: boolean;
  tasksCount: number;
  risksCount: number;
}): Promise<SendEmailResult> {
  const appUrl = getAppUrl();
  const documentUrl = `${appUrl}/memory`;

  const template = getDocumentProcessedTemplate({
    documentName: data.documentName,
    summaryReady: data.summaryReady,
    memoryIndexed: data.memoryIndexed,
    tasksCount: data.tasksCount,
    risksCount: data.risksCount,
    documentUrl,
  });

  return sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}
