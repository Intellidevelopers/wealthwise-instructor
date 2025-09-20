import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, MessageSquare, Menu, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  getInstructorProfile,
  getUnreadMessageCounts,
  getRecentUnreadMessages,
} from '@/api/auth.api';
import { useToast } from '@/hooks/use-toast';
import io, { Socket } from 'socket.io-client';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

interface InstructorProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  specialization?: string;
  avatar?: string;
}

interface MessagePreview {
  _id: string;
  text: string;
  createdAt: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  conversationId: string;
}

interface Notification {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}



export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [instructorName, setInstructorName] = useState('Instructor');
  const [profile, setProfile] = useState<InstructorProfile | null>(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [recentMessages, setRecentMessages] = useState<MessagePreview[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { toast } = useToast();
  const socket = useRef<Socket | null>(null);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('instructorData');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setInstructorName(user.firstName || 'Instructor');
      } catch (err) {
        console.error('Invalid user data:', err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getInstructorProfile();
        setProfile(data);
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to load profile',
          variant: 'destructive',
        });
      }
    };

    const fetchUnread = async () => {
      try {
        const counts = await getUnreadMessageCounts();
        const total = counts.reduce((acc, c) => acc + c.count, 0);
        setUnreadMessages(total);
      } catch (err) {
        console.error('Unread count error:', err);
      }
    };

    const fetchRecent = async () => {
      try {
        const data = await getRecentUnreadMessages();
        setRecentMessages(data);
      } catch (err) {
        console.error('Recent message fetch error:', err);
      }
    };

    fetchProfile();
    fetchUnread();
    fetchRecent();

    socket.current = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');

    socket.current.on('connect', () => {
      console.log('🟢 Socket connected (Header)');
    });

    socket.current.on('refreshConversations', () => {
      fetchUnread();
      fetchRecent();
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [toast]);

  const handleMessageClick = (msg: MessagePreview) => {
    setShowDropdown(false);
    navigate(`/messages/${msg.sender._id}?name=${msg.sender.firstName} ${msg.sender.lastName}`);
  };

  const fetchActivities = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/instructor/activities`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('instructorToken')}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch activities');
    const data = await res.json();

    // Map activities to notification format
    const activityNotifications: Notification[] = data.map((act) => ({
      _id: act._id,
      title: `${act.student.firstName} ${act.student.lastName}`,
      body: `${act.action} in course ${act.courseTitle || ''}`, // example field
      createdAt: act.createdAt,
      read: false,
    }));

    setNotifications(activityNotifications);
  } catch (err) {
    console.error('Activity fetch error:', err);
  }
};


  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="lg:hidden">
          <button onClick={onMenuClick} className="p-2 rounded-md hover:bg-gray-100">
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
            Good morning, {instructorName}!
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Ready to inspire your students today?
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Message Dropdown */}
          <Popover open={showDropdown} onOpenChange={setShowDropdown}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <MessageSquare className="w-5 h-5" />
                {unreadMessages > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                    {unreadMessages}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-96 max-h-96 overflow-auto z-50 p-3 space-y-3">
              <h4 className="text-sm font-medium text-gray-800">Unread Messages</h4>
              {recentMessages.length === 0 ? (
                <p className="text-sm text-gray-500">No unread messages</p>
              ) : (
                recentMessages.map((msg) => (
                  <div
                    key={msg._id}
                    onClick={() => handleMessageClick(msg)}
                    className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={msg.sender.avatar} />
                      <AvatarFallback>
                        {msg.sender.firstName[0]}
                        {msg.sender.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {msg.sender.firstName} {msg.sender.lastName}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">{msg.text}</p>
                      <p className="text-xs text-gray-400">
                        {moment(msg.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </PopoverContent>
          </Popover>

          {/* Avatar *{/* Notifications */}
<Popover open={showNotifDropdown} onOpenChange={setShowNotifDropdown}>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="sm" className="relative">
      <Bell className="w-5 h-5" />
      {notifications.filter(n => !n.read).length > 0 && (
        <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
          {notifications.filter(n => !n.read).length}
        </Badge>
      )}
    </Button>
  </PopoverTrigger>
  <PopoverContent align="end" className="w-96 max-h-96 overflow-auto p-3 space-y-3">
  <h4 className="text-sm font-medium text-gray-800">Notifications & Activities</h4>
  {notifications.length === 0 ? (
    <p className="text-sm text-gray-500">No new notifications</p>
  ) : (
    notifications.map((notif) => (
      <div
        key={notif._id}
        className={`p-2 rounded-md cursor-pointer ${!notif.read ? 'bg-gray-100' : ''}`}
        onClick={() => {
          // Mark as read
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/instructor/notifications/${notif._id}/read`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('instructorToken')}` },
          });
          setNotifications(prev => prev.map(n => n._id === notif._id ? { ...n, read: true } : n));
        }}
      >
        <p className="text-sm font-semibold text-gray-900">{notif.title}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{notif.body}</p>
        <p className="text-xs text-gray-400">{moment(notif.createdAt).fromNow()}</p>
      </div>
    ))
  )}
</PopoverContent>

</Popover>

{/* Avatar */}
<Avatar
  className="w-8 h-8 cursor-pointer"
  onClick={() => navigate('/profile')}
>
  {profile?.avatar ? (
    <AvatarImage src={profile.avatar} alt="Avatar" />
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
