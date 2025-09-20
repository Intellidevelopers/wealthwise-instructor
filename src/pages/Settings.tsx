import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Settings as SettingsIcon, Bell, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface InstructorSettings {
  emailNotifications: boolean;
  courseEnrollments: boolean;
  newMessages: boolean;
}

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<InstructorSettings>({
    emailNotifications: true,
    courseEnrollments: true,
    newMessages: true,
  });
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  // Replace with your actual token source (e.g., from localStorage, context, or cookie)
  const token = localStorage.getItem('instructorToken') || '';
const [deleteModalOpen, setDeleteModalOpen] = useState(false); // ✅ modal state
  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('https://wealthwise-api.onrender.com/api/instructor/settings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // 👈 add bearer token
          },
        });
        if (!res.ok) throw new Error('Failed to fetch settings');
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        console.error(err);
        toast({
          title: 'Error',
          description: 'Failed to fetch settings',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [toast, token]);

  // Toggle a setting
  const toggleSetting = async (key: keyof InstructorSettings) => {
    try {
      const updatedValue = !settings[key];
      const res = await fetch('https://wealthwise-api.onrender.com/api/instructor/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 👈 add bearer token
        },
        body: JSON.stringify({ [key]: updatedValue }),
      });
      if (!res.ok) throw new Error('Failed to update setting');
      const data = await res.json();
      setSettings(data);
      toast({
        title: 'Success',
        description: `${key} updated successfully`,
        variant: 'default',
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Failed to update setting',
        variant: 'destructive',
      });
    }
  };

  // ✅ Delete account handler
// ✅ Delete account handler
  const handleDeleteAccount = async () => {
    try {
      const res = await fetch('https://wealthwise-api.onrender.com/api/instructor/delete-account', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to delete account');

      toast({ title: 'Account Deleted', description: 'Your account has been deleted.', variant: 'default' });

      localStorage.removeItem('instructorToken');
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast({ title: 'Error', description: 'Failed to delete account.', variant: 'destructive' });
    }
  };


  if (loading) return <p className="text-center text-gray-500">Loading settings...</p>;

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
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={() => toggleSetting('emailNotifications')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Course Enrollments</h4>
                  <p className="text-sm text-gray-600">Notify when students enroll</p>
                </div>
                <Switch
                  checked={settings.courseEnrollments}
                  onCheckedChange={() => toggleSetting('courseEnrollments')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">New Messages</h4>
                  <p className="text-sm text-gray-600">Notify for new student messages</p>
                </div>
                <Switch
                  checked={settings.newMessages}
                  onCheckedChange={() => toggleSetting('newMessages')}
                />
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
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-gray-600 text-red-600">Permanently delete your account</p>
                <Button variant="destructive" onClick={() => setDeleteModalOpen(true)}>Delete Account</Button>
              </div>
            </CardContent>
          </Card>

          <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Account Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <DialogFooter className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                Yes, Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>

    </div>
    </DashboardLayout>
  );
};

export default Settings;
