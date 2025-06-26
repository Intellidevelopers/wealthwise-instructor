
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AuthLayout from './AuthLayout';
import { useToast } from '@/hooks/use-toast';

const Register = ({ onNext }: { onNext: () => void }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
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

    if (!formData.agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Registration Successful",
      description: "OTP sent to your email address"
    });
    onNext();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join WealthWise as an instructor"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

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
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
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

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={formData.agreeTerms}
            onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm">
            I agree to the <span className="text-wealthwise-700 cursor-pointer">Terms and Conditions</span>
          </Label>
        </div>

        <Button type="submit" className="w-full bg-wealthwise-700 hover:bg-wealthwise-800">
          Create Account
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
            <button type="button" className="text-wealthwise-700 font-medium hover:underline">
              Sign In
            </button>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
