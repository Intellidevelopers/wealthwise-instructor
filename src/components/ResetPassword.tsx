
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from './AuthLayout';
import { useToast } from '@/hooks/use-toast';

interface ResetPasswordProps {
  onComplete: () => void;
}

const ResetPassword = ({ onComplete }: ResetPasswordProps) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Password Reset Successful",
      description: "Your password has been updated successfully"
    });
    onComplete();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <AuthLayout 
      title="Create New Password" 
      subtitle="Enter your new password below"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="mt-1"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="mt-1"
            placeholder="Confirm new password"
          />
        </div>

        <Button type="submit" className="w-full bg-wealthwise-700 hover:bg-wealthwise-800">
          Update Password
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
