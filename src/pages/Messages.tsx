
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { MessageSquare, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Messages = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <span className="text-xs text-gray-500">2m ago</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Thanks for the feedback on my assignment...</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Mike Chen</h4>
                  <span className="text-xs text-gray-500">1h ago</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Could you clarify the concept of...</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Sarah Johnson</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <div className="flex-1 space-y-4 mb-4">
                <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                  <p className="text-sm">Hi! I have a question about the investment module.</p>
                  <span className="text-xs text-gray-500">10:30 AM</span>
                </div>
                <div className="bg-wealthwise-700 text-white p-3 rounded-lg max-w-xs ml-auto">
                  <p className="text-sm">Sure! What would you like to know?</p>
                  <span className="text-xs text-wealthwise-200">10:32 AM</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button className="bg-wealthwise-700 hover:bg-wealthwise-800">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
