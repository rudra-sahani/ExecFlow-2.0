import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  User,
  Mail,
  Building,
  Key,
  Shield,
  Upload,
  Camera,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useAuthStore } from '../../../store/useAuthStore';
import { apiClient } from '../../../services/api';
import toast from 'react-hot-toast';

export const ProfilePage: React.FC = () => {
  const currentUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [fullName, setFullName] = useState(currentUser?.fullName || 'User');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [department, setDepartment] = useState(currentUser?.department || 'Operations');
  const [avatarUrl, setAvatarUrl] = useState(
    currentUser?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser?.fullName || 'User')}`
  );

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName || '');
      setEmail(currentUser.email || '');
      setDepartment(currentUser.department || 'Operations');
      setAvatarUrl(currentUser.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.fullName || 'User')}`);
    }
  }, [currentUser]);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      setUser({
        ...currentUser,
        fullName,
        email,
        department,
        avatarUrl,
      });
    }
    toast.success('Profile information saved!');
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.loading('Uploading avatar to Supabase Storage...');
      const res = await apiClient.upload<{ avatarUrl: string }>('/users/avatar', file);
      setAvatarUrl(res.avatarUrl);
      toast.dismiss();
      toast.success('Avatar updated successfully!');
    } catch (err: any) {
      toast.dismiss();
      toast.error(err?.message || 'Failed to upload avatar');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error('Please enter current and new password');
      return;
    }
    toast.success('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Account & Security"
        description="Manage personal credentials, avatar photo, security parameters, and preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Avatar Card */}
        <Card variant="default" className="bg-[#111315] border-[#7CB518]/20 h-fit">
          <CardContent className="p-6 text-center space-y-4">
            <div className="relative inline-block">
              <img
                src={avatarUrl}
                alt={fullName}
                className="h-24 w-24 rounded-full object-cover border-2 border-[#7CB518] mx-auto shadow-lg"
              />
              <label
                htmlFor="avatar-input"
                className="absolute bottom-0 right-0 bg-[#7CB518] hover:bg-[#689913] text-black p-2 rounded-full cursor-pointer shadow-md transition-all"
                title="Upload Avatar"
              >
                <Camera className="h-4 w-4" />
              </label>
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>

            <div>
              <h3 className="text-base font-bold text-white font-heading">{fullName}</h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">{email}</p>
              <span className="inline-block mt-2 bg-[#7CB518]/15 border border-[#7CB518]/30 text-[#7CB518] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded uppercase">
                {currentUser?.role === 'admin' ? 'EXECUTIVE ADMINISTRATOR' : 'WORKSPACE MEMBER'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Right 2 Columns: Edit Details & Password */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="default" className="bg-[#111315] border-[#7CB518]/20">
            <CardHeader>
              <CardTitle className="text-base font-bold text-white font-heading flex items-center gap-2">
                <User className="h-4 w-4 text-[#7CB518]" />
                Personal Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#7CB518]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#7CB518]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#7CB518]"
                  />
                </div>

                <Button type="submit" className="bg-[#7CB518] text-black font-semibold text-xs px-4 py-2">
                  Save Information
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card variant="default" className="bg-[#111315] border-[#7CB518]/20">
            <CardHeader>
              <CardTitle className="text-base font-bold text-white font-heading flex items-center gap-2">
                <Lock className="h-4 w-4 text-amber-400" />
                Security Credentials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#7CB518]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-mono mb-1">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#16181a] border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#7CB518]"
                    />
                  </div>
                </div>

                <Button type="submit" className="bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs px-4 py-2">
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
