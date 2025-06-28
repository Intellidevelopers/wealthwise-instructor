import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getInstructorActivities } from '../api/auth.api'; // adjust path if needed
import { toast } from 'sonner';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'question': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface Activity {
  _id: string;
  student: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  message: string;
  type: string;
  createdAt: string;
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getInstructorActivities();
        setActivities(data);
      } catch (error) {
        toast.error('Failed to fetch instructor activities');
      }
    };

    fetchActivities();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const fullName = `${activity.student.firstName} ${activity.student.lastName}`;
            const initials = `${activity.student.firstName[0]}${activity.student.lastName[0]}`;
            const timeAgo = new Date(activity.createdAt).toLocaleString(); // Optional: Replace with relative time lib

            return (
              <div
                key={activity._id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Avatar className="w-10 h-10">
                  {/* AvatarImage not used since no avatar in response */}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-1">
                    <span className="font-medium">{fullName}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-2">{activity.message}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={getStatusColor('new')}>
                      {activity.type}
                    </Badge>
                    <span className="text-xs text-gray-500">{timeAgo}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
