import React from 'react';
import { AuthCard } from '../components/AuthCard';
import { LoginForm } from '../components/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to your ExecFlow workspace."
      badge="Workspace Access"
    >
      <LoginForm />
    </AuthCard>
  );
};

export default LoginPage;
