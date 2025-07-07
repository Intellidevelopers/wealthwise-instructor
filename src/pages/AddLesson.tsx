// src/pages/AddLesson.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { addLessonToCourseWithProgress } from '@/api/auth.api';

const AddLesson = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setIsLoading(true);
    setUploadProgress(0);

    if (!videoFile) {
      toast({
        title: 'Error',
        description: 'Please upload a video.',
        variant: 'destructive',
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('duration', duration);
    formData.append('video', videoFile);

    await addLessonToCourseWithProgress(courseId!, formData, (event) => {
      const percent = Math.round((event.loaded * 100) / event.total);
      setUploadProgress(percent);
    });

    toast({
      title: 'Success',
      description: 'Lesson added successfully',
    });

    navigate(`/courses/${courseId}/lessons`); // ✅ Correct route
  } catch (err) {
    console.error(err);
    toast({
      title: 'Error',
      description: 'Failed to upload lesson',
      variant: 'destructive',
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <DashboardLayout>
      <div className="max-w-lg mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6">Add Lesson</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Duration (e.g., 15:30)</label>
            <Input value={duration} onChange={(e) => setDuration(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Video File</label>
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            />
          </div>

          {isLoading && (
  <div className="w-full">
    <div className="bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full"
        style={{ width: `${uploadProgress}%` }}
      />
    </div>
    <p className="text-sm text-gray-500 mt-2 mb-6">
      {uploadProgress}% uploaded
    </p>
  </div>
)}


          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Add Lesson'}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddLesson;
