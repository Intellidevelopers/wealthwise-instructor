import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { DashboardHeader } from './DashboardHeader';
import { Toaster } from 'react-hot-toast';
import { Menu } from 'lucide-react';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Calendar,
  Users,
  Bell,
  Wallet,
  User,
  Settings,
  Plus,
  MessageSquare,
  LogOut,
} from 'lucide-react';
import { logoutInstructor } from '@/api/auth.api';
import { toast } from 'sonner';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Create Course', url: '/create-course', icon: Plus },
  { title: 'Manage Courses', url: '/courses', icon: Calendar },
  { title: 'Students', url: '/students', icon: Users },
  { title: 'Messages', url: '/messages', icon: MessageSquare },
  { title: 'Notifications', url: '/notifications', icon: Bell },
  // { title: 'Wallet', url: '/wallet', icon: Wallet },
  { title: 'Profile', url: '/profile', icon: User },
  { title: 'Settings', url: '/settings', icon: Settings },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logoutInstructor();
      localStorage.removeItem('instructorToken');
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error('Failed to logout');
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 relative">
        {/* 🔹 Mobile Menu Button */}

        {/* 🔹 Desktop Sidebar */}
        <div className="hidden lg:block">
          <AppSidebar />
        </div>

        {/* 🔹 Mobile Sidebar Drawer */}
        {isMobileSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-md transition-transform duration-300">
              <SidebarContent>
                {/* Logo */}
                <div className="p-6 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-wealthwise-700 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">W</span>
                    </div>
                    <div>
                      <h1 className="font-bold text-gray-900">WealthWise</h1>
                      <p className="text-xs text-gray-500">Instructor Portal</p>
                    </div>
                  </div>
                </div>

                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-1 p-4">
                      {menuItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              onClick={() => setIsMobileSidebarOpen(false)} // 👈 Close drawer after click
                              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                                isActive(item.url)
                                  ? 'bg-wealthwise-100 text-wealthwise-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                              }`}
                            >
                              <item.icon className="w-5 h-5" />
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </div>
          </>
        )}

        {/* 🔹 Main Content */}
        <div className="flex-1 flex flex-col">
          <DashboardHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />

          <Toaster position="top-right" reverseOrder={false} />
          <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
