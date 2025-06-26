
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const activities = [
  {
    id: 1,
    type: 'enrollment',
    message: 'New student enrolled in "React Masterclass"',
    student: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    time: '2 hours ago',
    status: 'new'
  },
  {
    id: 2,
    type: 'assignment',
    message: 'Assignment submitted for "JavaScript Fundamentals"',
    student: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
    time: '4 hours ago',
    status: 'pending'
  },
  {
    id: 3,
    type: 'completion',
    message: 'Course completed: "HTML & CSS Basics"',
    student: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    time: '1 day ago',
    status: 'completed'
  },
  {
    id: 4,
    type: 'question',
    message: 'New question posted in "Python for Beginners"',
    student: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    time: '2 days ago',
    status: 'question'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'question': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Avatar className="w-10 h-10">
                <AvatarImage src={activity.avatar} />
                <AvatarFallback>{activity.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 mb-1">
                  <span className="font-medium">{activity.student}</span>
                </p>
                <p className="text-sm text-gray-600 mb-2">{activity.message}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
