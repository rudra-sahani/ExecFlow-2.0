import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { BlankLayout } from '../layouts/BlankLayout';
import { ProtectedRoute } from '../routes/ProtectedRoute';
import { PublicRoute } from '../routes/PublicRoute';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
  AcceptInvitePage,
  AuthCallbackPage,
} from '../features/authentication';
import { LandingPage } from '../features/landing';
import { DemoPage } from '../features/demo/pages/DemoPage';
import { MeetingWorkspacePage } from '../features/meetings';
import { AgentMonitorPage } from '../features/agent-monitor';
import { MemoryExplorerPage } from '../features/memory';
import { AnalyticsPage } from '../features/analytics';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { MeetingsListPage } from '../features/meetings/pages/MeetingsListPage';
import { TasksPage } from '../features/tasks/pages/TasksPage';
import { ApprovalsPage } from '../features/approvals/pages/ApprovalsPage';
import { SettingsPage } from '../features/settings/pages/SettingsPage';
import { ProfilePage } from '../features/profile/pages/ProfilePage';
import { AutomationPage } from '../features/automation/pages/AutomationPage';
import { NotFoundPage } from '../routes/Placeholders';
import { ROUTES } from '../utils/constants';

export const router = createBrowserRouter([
  // Public SaaS Landing Page
  {
    path: '/',
    element: <LandingPage />,
  },

  // Interactive Demo Experience
  {
    path: '/demo',
    element: <DemoPage />,
  },

  // Public Auth Routes
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.LOGIN, element: <LoginPage /> },
          { path: ROUTES.REGISTER, element: <RegisterPage /> },
          { path: ROUTES.ACCEPT_INVITE, element: <AcceptInvitePage /> },
          { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
          { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
          { path: ROUTES.VERIFY_EMAIL, element: <VerifyEmailPage /> },
          { path: ROUTES.AUTH_CALLBACK, element: <AuthCallbackPage /> },
        ],
      },
    ],
  },

  // Protected App Routes (Dashboard Layout)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
          { path: ROUTES.MEETINGS, element: <MeetingsListPage /> },
          { path: ROUTES.MEETING_DETAIL, element: <MeetingWorkspacePage /> },
          { path: ROUTES.TASKS, element: <TasksPage /> },
          { path: ROUTES.ANALYTICS, element: <AnalyticsPage /> },
          { path: '/ai-insights', element: <Navigate to={ROUTES.ANALYTICS} replace /> },
          { path: ROUTES.MEMORY, element: <MemoryExplorerPage /> },
          { path: ROUTES.APPROVAL, element: <ApprovalsPage /> },
          { path: ROUTES.AGENT_MONITOR, element: <AgentMonitorPage /> },
          { path: ROUTES.AUTOMATION, element: <AutomationPage /> },
          { path: ROUTES.SETTINGS, element: <SettingsPage /> },
          { path: ROUTES.PROFILE, element: <ProfilePage /> },
        ],
      },
    ],
  },

  // 404 Catch All Route
  {
    element: <BlankLayout />,
    children: [{ path: '*', element: <NotFoundPage /> }],
  },
]);
