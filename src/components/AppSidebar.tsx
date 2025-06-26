
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  Home, 
  Calendar, 
  Users, 
  Bell, 
  Wallet, 
  User, 
  Settings,
  Plus,
  MessageSquare
} from 'lucide-react';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Create Course', url: '/create-course', icon: Plus },
  { title: 'Manage Courses', url: '/courses', icon: Calendar },
  { title: 'Students', url: '/students', icon: Users },
  { title: 'Messages', url: '/messages', icon: MessageSquare },
  { title: 'Notifications', url: '/notifications', icon: Bell },
  { title: 'Wallet', url: '/wallet', icon: Wallet },
  { title: 'Profile', url: '/profile', icon: User },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={`${collapsed ? 'w-16' : 'w-64'} border-r bg-white shadow-sm`}>
      <SidebarContent>
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-wealthwise-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-gray-900">WealthWise</h1>
                <p className="text-xs text-gray-500">Instructor Portal</p>
              </div>
            )}
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
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive(item.url)
                          ? 'bg-wealthwise-100 text-wealthwise-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
