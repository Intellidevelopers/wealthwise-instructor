
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AuthLayout from './AuthLayout';
import { useToast } from '@/hooks/use-toast';

interface LoginProps {
  onLogin: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

const Login = ({ onLogin, onSignUp, onForgotPassword }: LoginProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Login Successful",
      description: "Welcome back to WealthWise!"
    });
    onLogin();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your instructor account"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={formData.rememberMe}
              onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>
          <button 
            type="button" 
            onClick={onForgotPassword}
            className="text-sm text-wealthwise-700 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <Button type="submit" className="w-full bg-wealthwise-700 hover:bg-wealthwise-800">
          Sign In
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              type="button" 
              onClick={onSignUp}
              className="text-wealthwise-700 font-medium hover:underline"
            >
              Create Account
            </button>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
