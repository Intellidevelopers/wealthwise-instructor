import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { DashboardStats } from '@/components/DashboardStats';
import { RecentActivity } from '@/components/RecentActivity';
import { UpcomingTasks } from '@/components/UpcomingTasks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar, Users, DollarSign } from 'lucide-react';
import { logoutInstructor } from '@/api/auth.api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Instructor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  [key: string]: unknown; // allow extra fields
}

const Dashboard = () => {
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('instructorData');
    const storedToken = localStorage.getItem('instructorToken');

    if (storedUser && storedToken) {
      try {
        setInstructor(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (err) {
        console.error('Error parsing instructor data', err);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logoutInstructor();
      localStorage.removeItem('instructorToken');
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Logout failed');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome message */}
        

        {/* Stats Cards */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <UpcomingTasks />
          </div>
        </div>

        {/* Additional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Monthly Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Monthly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ProgressRow label="Course Completion" value={78} />
                <ProgressRow label="Student Engagement" value={92} />
                <ProgressRow label="Revenue Goal" value={65} />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-wealthwise-700 hover:bg-wealthwise-800">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Message Students
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  View Earnings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceRow label="Sessions Conducted" value={12} />
              <PerformanceRow label="Assignments Graded" value={45} />
              <PerformanceRow label="Messages Replied" value={28} />
              <PerformanceRow label="Course Updates" value={6} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

// Reusable subcomponents
const ProgressRow = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <Progress value={value} className="h-2" />
  </div>
);

const PerformanceRow = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between items-center mb-2">
    <span className="text-sm text-gray-600">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);
