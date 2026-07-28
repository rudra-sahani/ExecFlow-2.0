import React from 'react';
import { AuthCard } from '../components/AuthCard';
import { ResetPasswordForm } from '../components/ResetPasswordForm';

export const ResetPasswordPage: React.FC = () => {
  return (
    <AuthCard
      title="Set New Password"
      subtitle="Create a new strong password for your account."
      badge="Account Recovery"
    >
      <ResetPasswordForm />
    </AuthCard>
  );
};

export default ResetPasswordPage;
