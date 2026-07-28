import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { User, Lock, Building, CheckCircle2, ArrowRight } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { ROUTES } from '../../../utils/constants';
import toast from 'react-hot-toast';

export const AcceptInviteForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const workspaceName = searchParams.get('workspace') || 'Acme Engineering';
  const inviterName = searchParams.get('inviter') || 'Sarah Chen (VP of Eng)';
  const emailParam = searchParams.get('email') || 'alex@company.com';

  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success(`Joined ${workspaceName} workspace!`);
    }, 600);
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4 font-sans">
        <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white font-heading">
          Welcome to {workspaceName}!
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
          Your invitation has been accepted. You now have full access to team meeting workspaces and AI execution pipelines.
        </p>

        <Button
          variant="primary"
          size="lg"
          className="w-full font-semibold mt-2 shadow-xs"
          onClick={() => navigate(ROUTES.DASHBOARD)}
        >
          <span>Go to Workspace Dashboard</span>
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-sans">
      {/* Invitation Context Header Box */}
      <div className="p-3.5 rounded-xl bg-[#151817] border border-zinc-800 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 shrink-0">
          <Building className="w-4 h-4" />
        </div>
        <div className="text-xs font-sans">
          <p className="text-zinc-400 font-medium">{inviterName} invited you to join</p>
          <p className="text-white font-bold font-heading text-sm mt-0.5">{workspaceName}</p>
          <p className="text-zinc-500 font-sans text-[11px] mt-0.5">Assigned email: {emailParam}</p>
        </div>
      </div>

      <Input
        label="Full Name"
        type="text"
        placeholder="Alex Morgan"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        leftIcon={<User className="w-4 h-4" />}
        required
      />

      <Input
        label="Set Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leftIcon={<Lock className="w-4 h-4" />}
        required
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full mt-2 font-semibold shadow-xs"
      >
        Accept Invitation & Join Workspace
      </Button>

      <div className="text-center text-xs text-zinc-400 font-sans pt-1">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-[#7CB518] hover:text-[#8DC621] font-medium">
          Sign In instead
        </Link>
      </div>
    </form>
  );
};
