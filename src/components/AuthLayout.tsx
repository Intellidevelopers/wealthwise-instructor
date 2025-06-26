
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wealthwise-50 to-wealthwise-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-wealthwise-700 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">W</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">WealthWise</h1>
          <p className="text-gray-600">Learning Management System</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && (
              <p className="text-gray-600">{subtitle}</p>
            )}
          </div>

          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            © 2024 WealthWise. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
