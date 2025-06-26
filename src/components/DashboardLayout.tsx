
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { MobileNavigation } from './MobileNavigation';
import { DashboardHeader } from './DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <AppSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          <DashboardHeader />
          
          <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
            {children}
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <MobileNavigation />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
