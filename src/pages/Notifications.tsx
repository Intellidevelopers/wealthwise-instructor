import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Bell, Send, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { sendStudentNotification, getInstructorNotifications } from '@/api/auth.api';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
  recipientCount: number;
}

const Notifications = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error('Both subject and message are required.');
      return;
    }

    try {
      setLoading(true);
      await sendStudentNotification(title, message);
      toast.success('Notification sent to your students.');
      setTitle('');
      setMessage('');
      fetchNotifications(); // Refresh list
    } catch (error) {
      toast.error('Failed to send notification.');
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const data = await getInstructorNotifications();
      setNotifications(data);
    } catch (error) {
      toast.error('Failed to load recent notifications.');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Send Notifications</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Send Notification Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Send New Notification</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <Input
                  placeholder="Enter notification subject"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea
                  placeholder="Enter notification message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Save Draft</Button>
                <Button
                  className="bg-wealthwise-700 hover:bg-wealthwise-800"
                  onClick={handleSend}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Now'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Fetched Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Recent Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-600">No notifications sent yet.</p>
              ) : (
                notifications.map((notif) => (
                  <div key={notif._id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{notif.title}</h4>
                      <span className="text-xs text-gray-500">
                        {dayjs(notif.createdAt).fromNow()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{notif.message}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500">
                        {notif.recipientCount} recipients
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
