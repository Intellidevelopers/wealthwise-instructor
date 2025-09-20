import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Wallet, Bell, TrendingUp, TrendingDown, BookCheck } from 'lucide-react';
import { getInstructorStats } from '../api/auth.api'; // ✅ import function
import { toast } from 'sonner';

export function DashboardStats() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalEnrollments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getInstructorStats();
        setStats(data);
      } catch (err) {
        toast.error('Failed to load dashboard stats');
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      change: 'Total published courses',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: 'up',
    },
    {
      title: 'Students Enrolled',
      value: stats.totalStudents,
      change: 'Total enrolled students',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: 'up',
    },
    {
      title: 'Total Enrollments',
      value: `${stats.totalEnrollments}`,
      change: 'Enrollments steady',
      icon: BookCheck,
      color: 'text-wealthwise-600',
      bgColor: 'bg-wealthwise-100',
      trend: 'up',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {cards.map((stat, index) => (
        <Card key={index} className="hover-lift w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="flex items-center text-xs text-gray-600">
              {stat.trend === 'up' ? (
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
              )}
              {stat.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
