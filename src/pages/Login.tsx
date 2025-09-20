import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import AuthLayout from './../components/AuthLayout';
import { loginInstructor } from '@/api/auth.api';
import { useNavigate } from 'react-router-dom';


interface LoginProps {
  onLogin: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

const Login = ({ onLogin, onSignUp, onForgotPassword }: LoginProps) => {
    const navigate = useNavigate(); // ✅ React Router
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const { token, user } = await loginInstructor(formData.email, formData.password);

    // ✅ Check if user has the "instructor" role
    if (user.role !== 'instructor') {
      toast({
        title: 'Access Denied',
        description: 'Only instructors are allowed to log in here.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    // ✅ Save data if role is valid
    localStorage.setItem('instructorToken', token);
    localStorage.setItem('instructorData', JSON.stringify(user));

    toast({
      title: 'Login Successful',
      description: `Welcome back, ${user.firstName}!`,
    });

    navigate('/dashboard'); // ✅ Proceed to dashboard

  } catch (error) {
    toast({
      title: 'Login Failed',
      description: error?.response?.data?.message || 'Invalid email or password',
      variant: 'destructive',
    });
  } finally {
    setIsLoading(false);
  }
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
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-wealthwise-700 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-wealthwise-700 hover:bg-wealthwise-800"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/register')}

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
