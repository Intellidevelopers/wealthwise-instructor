import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import AuthLayout from './AuthLayout';
import { useToast } from '@/hooks/use-toast';
import { verifyOtp } from '@/api/auth.api';

interface OTPVerificationProps {
  onNext: () => void;
}

const OTPVerification = ({ onNext }: OTPVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate(); // ✅ React Router

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast({
        title: 'Error',
        description: 'Please enter a valid 6-digit OTP',
        variant: 'destructive',
      });
      return;
    }

    const email = localStorage.getItem('instructorEmail');
    if (!email) {
      toast({
        title: 'Missing Email',
        description: 'Email not found. Please restart registration.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await verifyOtp({ email, otp });

      toast({
        title: 'Verification Successful',
        description: 'Your account has been verified',
      });

      navigate('/login'); // ✅ Navigate to login screen
    } catch (error) {
      toast({
        title: 'Verification Failed',
        description: error?.response?.data?.message || 'Invalid OTP',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthLayout title="Verify Your Email" subtitle="Enter the 6-digit code sent to your email">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="submit"
          className="w-full bg-wealthwise-700 hover:bg-wealthwise-800"
          disabled={otp.length !== 6}
        >
          Verify & Continue
        </Button>

        <div className="text-center">
          {!canResend ? (
            <p className="text-sm text-gray-600">Resend code in {timeLeft}s</p>
          ) : (
            <button
              type="button"
              // onClick={handleResend}
              className="text-sm text-wealthwise-700 font-medium hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

        <div className="text-center">
          <button type="button" className="text-sm text-gray-500 hover:underline">
            Change email address
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default OTPVerification;
