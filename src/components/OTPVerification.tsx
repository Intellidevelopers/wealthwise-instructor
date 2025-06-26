
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import AuthLayout from './AuthLayout';
import { useToast } from '@/hooks/use-toast';

const OTPVerification = ({ onNext }: { onNext: () => void }) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Verification Successful",
      description: "Your account has been verified"
    });
    onNext();
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    toast({
      title: "OTP Sent",
      description: "A new OTP has been sent to your email"
    });
  };

  return (
    <AuthLayout 
      title="Verify Your Email" 
      subtitle="Enter the 6-digit code sent to your email"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
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
            <p className="text-sm text-gray-600">
              Resend code in {timeLeft}s
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
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
