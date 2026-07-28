import React from 'react';
import { AuthCard } from '../components/AuthCard';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthCard
      title="Reset Password"
      subtitle="Enter your work email to receive password recovery instructions."
      badge="Account Recovery"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
};

export default ForgotPasswordPage;
