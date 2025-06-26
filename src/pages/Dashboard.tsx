
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { DashboardStats } from '@/components/DashboardStats';
import { RecentActivity } from '@/components/RecentActivity';
import { UpcomingTasks } from '@/components/UpcomingTasks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar, Users, DollarSign } from 'lucide-react';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity - Takes 2 columns on desktop */}
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>

          {/* Upcoming Tasks */}
          <div>
            <UpcomingTasks />
          </div>
        </div>

        {/* Additional Dashboard Cards */}
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
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Course Completion</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Student Engagement</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Revenue Goal</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
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
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sessions Conducted</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Assignments Graded</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Messages Replied</span>
                  <span className="font-semibold">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Course Updates</span>
                  <span className="font-semibold">6</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
