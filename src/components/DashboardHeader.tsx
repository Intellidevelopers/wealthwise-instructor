import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, MessageSquare, Plus, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getInstructorProfile, updateInstructorProfile } from '@/api/auth.api';
import { useToast } from '@/hooks/use-toast';



interface InstructorProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  specialization?: string;
  avatar?: string;
  avatarFile?: File; // 👉 temporary upload file
}


export function DashboardHeader() {
  const [instructorName, setInstructorName] = useState('Instructor');
    const [formData, setFormData] = useState<InstructorProfile | null>(null);
    const [profile, setProfile] = useState<InstructorProfile | null>(null);
  const { toast } = useToast();
  

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

    // Fetch profile on mount
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const data = await getInstructorProfile();
          setProfile(data);
          setFormData(data);
        } catch (err) {
          toast({
            title: 'Error',
            description: 'Failed to load profile',
            variant: 'destructive',
          });
        }
      };
  
      fetchProfile();
    }, [toast]);

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
          {formData?.avatar ? (
            <AvatarImage src={formData.avatar} />
            ) : (
            <User className="w-16 h-16 text-wealthwise-700 mx-auto mt-8" />
          )}
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
