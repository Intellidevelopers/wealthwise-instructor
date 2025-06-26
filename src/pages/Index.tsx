
import React, { useState } from 'react';
import Register from '@/components/Register';
import OTPVerification from '@/components/OTPVerification';
import Login from '@/components/Login';
import Dashboard from './Dashboard';

type AuthStep = 'login' | 'register' | 'otp' | 'dashboard';

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
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Login onLogin={handleAuthComplete} />;
    }
  };

  return renderCurrentStep();
};

export default Index;
