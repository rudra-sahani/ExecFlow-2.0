import React from 'react';
import { AuthCard } from '../components/AuthCard';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <AuthCard
      title="Create Account"
      subtitle="Start your workspace and deploy autonomous agents."
      badge="Workspace Registration"
    >
      <RegisterForm />
    </AuthCard>
  );
};

export default RegisterPage;
