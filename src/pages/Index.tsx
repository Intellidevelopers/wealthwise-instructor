import React, { useState } from 'react';
import Register from '@/components/Register';
import OTPVerification from '@/components/OTPVerification';
import Login from '@/pages/Login';
import ForgotPassword from '@/components/ForgotPassword';
import ResetPassword from '@/components/ResetPassword';
import Dashboard from '@/pages/Dashboard'; // make sure path is correct

type AuthStep = 'login' | 'register' | 'otp' | 'forgot-password' | 'reset-password' | 'dashboard';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const handleAuthComplete = () => {
    setCurrentStep('dashboard'); // move to dashboard after login or OTP
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'register':
        return (
          <Register
            onNext={(email?: string) => {
              if (email) setRegisteredEmail(email);
              setCurrentStep('otp');
            }}
            onSignIn={() => setCurrentStep('login')}
          />
        );

      case 'otp':
        return (
          <OTPVerification
            email={registeredEmail || localStorage.getItem('instructorEmail') || ''}
            onNext={handleAuthComplete}
            onBack={() => setCurrentStep('register')}
          />
        );

      case 'forgot-password':
        return (
          <ForgotPassword
            onBack={() => setCurrentStep('login')}
            onNext={() => setCurrentStep('reset-password')}
          />
        );

      case 'reset-password':
        return <ResetPassword onComplete={() => setCurrentStep('login')} />;

      case 'dashboard':
        return <Dashboard />;

      default: // login
        return (
          <Login
            onLogin={handleAuthComplete}
            onSignUp={() => setCurrentStep('register')}
            onForgotPassword={() => setCurrentStep('forgot-password')}
          />
        );
    }
  };

  return renderStep();
};

export default Index;
