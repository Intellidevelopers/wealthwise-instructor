
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Users, 
  Wallet, 
  User
} from 'lucide-react';

const navItems = [
  { title: 'Home', url: '/dashboard', icon: Home },
  { title: 'Courses', url: '/courses', icon: Calendar },
  { title: 'Students', url: '/students', icon: Users },
  { title: 'Wallet', url: '/wallet', icon: Wallet },
  { title: 'Profile', url: '/profile', icon: User },
];

export function MobileNavigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg min-w-0 ${
              isActive(item.url)
                ? 'text-wealthwise-700'
                : 'text-gray-500'
            }`}
          >
            <item.icon className={`w-5 h-5 ${isActive(item.url) ? 'text-wealthwise-700' : ''}`} />
            <span className={`text-xs font-medium ${isActive(item.url) ? 'text-wealthwise-700' : ''}`}>
              {item.title}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
