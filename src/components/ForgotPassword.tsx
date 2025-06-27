
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { useToast } from '@/hooks/use-toast';

interface ForgotPasswordProps {
  onBack: () => void;
  onNext: () => void;
}

const ForgotPassword = ({ onBack, onNext }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Reset Link Sent",
      description: "Check your email for password reset instructions"
    });
    onNext();
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email to receive reset instructions"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
            placeholder="Enter your email address"
          />
        </div>

        <Button type="submit" className="w-full bg-wealthwise-700 hover:bg-wealthwise-800">
          Send Reset Link
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="w-full flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-wealthwise-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
