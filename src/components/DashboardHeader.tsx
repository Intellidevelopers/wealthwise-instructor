
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, MessageSquare, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Good morning, Sarah!</h1>
          <p className="text-sm text-gray-600 mt-1">Ready to inspire your students today?</p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Quick Actions - Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button size="sm" className="bg-wealthwise-700 hover:bg-wealthwise-800">
              <Plus className="w-4 h-4 mr-2" />
              New Course
            </Button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="relative">
              <MessageSquare className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>
          </div>

          <div className="relative">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                5
              </Badge>
            </Button>
          </div>

          {/* Profile */}
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
