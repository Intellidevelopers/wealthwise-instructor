
import React, { useState } from 'react';
import Register from '@/components/Register';
import OTPVerification from '@/components/OTPVerification';
import Login from '@/components/Login';
import ForgotPassword from '@/components/ForgotPassword';
import ResetPassword from '@/components/ResetPassword';
import Dashboard from './Dashboard';

type AuthStep = 'login' | 'register' | 'otp' | 'forgot-password' | 'reset-password' | 'dashboard';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');

  const handleAuthComplete = () => {
    setCurrentStep('dashboard');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'register':
        return <Register onNext={() => setCurrentStep('otp')} />;
      case 'otp':
        return <OTPVerification onNext={handleAuthComplete} />;
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
      default:
        return (
          <Login 
            onLogin={handleAuthComplete}
            onSignUp={() => setCurrentStep('register')}
            onForgotPassword={() => setCurrentStep('forgot-password')}
          />
        );
    }
  };

  return renderCurrentStep();
};

export default Index;
