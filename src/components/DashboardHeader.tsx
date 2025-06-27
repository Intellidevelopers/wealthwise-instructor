import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, MessageSquare, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function DashboardHeader() {
  const [instructorName, setInstructorName] = useState('Instructor');

  useEffect(() => {
    const stored = localStorage.getItem('instructorData');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setInstructorName(`${user.firstName}`);
      } catch (error) {
        console.error('Failed to parse instructor data:', error);
      }
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
            Good morning, {instructorName}!
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Ready to inspire your students today?
          </p>
        </div>

        <div className="flex items-center space-x-3">

          {/* Messages */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="relative">
              <MessageSquare className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                5
              </Badge>
            </Button>
          </div>

          {/* Avatar */}
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150" />
            <AvatarFallback>
              {instructorName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
