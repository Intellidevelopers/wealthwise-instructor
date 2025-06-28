import React, { useEffect, useState, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { User, Camera, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getInstructorProfile, updateInstructorProfile } from '@/api/auth.api';
import { useToast } from '@/hooks/use-toast';

interface InstructorProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  specialization?: string;
  avatar?: string;
  avatarFile?: File; // 👉 temporary upload file
}



const Profile = () => {
  const [profile, setProfile] = useState<InstructorProfile | null>(null);
  const [formData, setFormData] = useState<InstructorProfile | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getInstructorProfile();
        setProfile(data);
        setFormData(data);
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to load profile',
          variant: 'destructive',
        });
      }
    };

    fetchProfile();
  }, [toast]);

  const handleChange = (field: keyof InstructorProfile) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [field]: e.target.value });
  };


const handleSubmit = async () => {
  if (!formData) return;

  const data = new FormData();
  data.append('firstName', formData.firstName);
  data.append('lastName', formData.lastName);
  data.append('phone', formData.phone || '');
  data.append('bio', formData.bio || '');
  data.append('specialization', formData.specialization || '');

  if (formData.avatarFile) {
    data.append('avatar', formData.avatarFile);
  }

  try {
    const response = await updateInstructorProfile(data); // 👈 use FormData
    setFormData(response.user);
    toast({ title: 'Success', description: 'Profile updated successfully' });
  } catch (err) {
    toast({ title: 'Error', description: 'Failed to update profile', variant: 'destructive' });
  }
};


  if (!formData) {
    return (
      <DashboardLayout>
        <p className="text-center text-gray-500 mt-10">Loading profile...</p>
      </DashboardLayout>
    );
  }

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
                <div className="w-32 h-32 bg-wealthwise-100 rounded-full mx-auto overflow-hidden">
                  {formData?.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-16 h-16 text-wealthwise-700 mx-auto mt-8" />
                  )}
                </div>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData((prev) => ({ ...prev, avatarFile: file })); // 👇 handle preview or Cloudinary
                    }
                  }}
                />
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
                  <Input value={formData.firstName} onChange={handleChange('firstName')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <Input value={formData.lastName} onChange={handleChange('lastName')} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input value={formData.email} disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <Input value={formData.phone || ''} onChange={handleChange('phone')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <Textarea value={formData.bio || ''} onChange={handleChange('bio')} rows={4} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <Input
                  value={formData.specialization || ''}
                  onChange={handleChange('specialization')}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSubmit} className="bg-wealthwise-700 hover:bg-wealthwise-800">
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

