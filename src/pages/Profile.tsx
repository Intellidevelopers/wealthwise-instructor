
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { User, Camera, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Profile Photo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="w-32 h-32 bg-wealthwise-100 rounded-full mx-auto flex items-center justify-center">
                <User className="w-16 h-16 text-wealthwise-700" />
              </div>
              <Button variant="outline" className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <Input defaultValue="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <Input defaultValue="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input defaultValue="john.doe@example.com" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <Input defaultValue="+1 (555) 123-4567" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <Textarea 
                  defaultValue="Experienced financial instructor with over 10 years in the industry. Passionate about teaching practical investment strategies and financial planning."
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <Input defaultValue="Financial Planning, Investment Strategies" />
              </div>
              <div className="flex justify-end">
                <Button className="bg-wealthwise-700 hover:bg-wealthwise-800">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
