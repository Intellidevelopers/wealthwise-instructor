
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Settings as SettingsIcon, Bell, Shield, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Course Enrollments</h4>
                  <p className="text-sm text-gray-600">Notify when students enroll</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">New Messages</h4>
                  <p className="text-sm text-gray-600">Notify for new student messages</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Weekly Reports</h4>
                  <p className="text-sm text-gray-600">Receive weekly analytics</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-gray-600">Update your account password</p>
                <Button variant="outline">Change Password</Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Login Sessions</h4>
                <p className="text-sm text-gray-600">Manage your active sessions</p>
                <Button variant="outline">View Sessions</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dark Mode</h4>
                  <p className="text-sm text-gray-600">Use dark theme</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Language</h4>
                <p className="text-sm text-gray-600">Choose your preferred language</p>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="w-5 h-5" />
                <span>Account</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Export Data</h4>
                <p className="text-sm text-gray-600">Download your account data</p>
                <Button variant="outline">Export Data</Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-gray-600 text-red-600">Permanently delete your account</p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
