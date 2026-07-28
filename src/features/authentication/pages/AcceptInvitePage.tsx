import React from 'react';
import { AuthCard } from '../components/AuthCard';
import { AcceptInviteForm } from '../components/AcceptInviteForm';

export const AcceptInvitePage: React.FC = () => {
  return (
    <AuthCard
      title="Join Workspace"
      subtitle="Accept your invitation to collaborate in ExecFlow."
      badge="Workspace Invitation"
    >
      <AcceptInviteForm />
    </AuthCard>
  );
};

export default AcceptInvitePage;
