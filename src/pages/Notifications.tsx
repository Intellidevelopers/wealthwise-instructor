
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Bell, Send, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const Notifications = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Send Notifications</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Send New Notification</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>All Students</option>
                  <option>Specific Course</option>
                  <option>Individual Student</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <Input placeholder="Enter notification subject" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea placeholder="Enter notification message" rows={4} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Save Draft</Button>
                <Button className="bg-wealthwise-700 hover:bg-wealthwise-800">Send Now</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Recent Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Assignment Reminder</h4>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <p className="text-sm text-gray-600">Sent to Financial Planning students</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-500">24 recipients</span>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">New Course Available</h4>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                <p className="text-sm text-gray-600">Sent to all students</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-500">152 recipients</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
