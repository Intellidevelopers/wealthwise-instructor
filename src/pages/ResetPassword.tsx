import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '../components/AuthLayout';
import { useToast } from '@/hooks/use-toast';
import { resetPassword as apiResetPassword } from '@/api/auth.api';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get token from URL query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    if (!t) {
      toast({
        title: "Invalid Link",
        description: "Password reset link is missing or invalid",
        variant: "destructive"
      });
    }
    setToken(t || '');
  }, [toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const res = await apiResetPassword(token, formData.password, formData.confirmPassword);
      toast({
        title: "Success",
        description: res.message
      });
      navigate('/login'); // redirect user to login page
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to reset password",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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

        <Button 
          type="submit" 
          className="w-full bg-wealthwise-700 hover:bg-wealthwise-800"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
