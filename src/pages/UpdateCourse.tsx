import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { getCategories, updateCourse, getCourseById } from '@/api/auth.api'; // ✅ updated


const UpdateCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    video: '',
    category: '',
    thumbnailFile: null as File | null,
  });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
const [loading, setLoading] = useState(true); // 👈 add this

  // Fetch categories and course data

// ...

useEffect(() => {
  const fetchInitialData = async () => {
    try {
      setLoading(true); // 👈 start loading
      const [catData, courseData] = await Promise.all([
        getCategories(),
        getCourseById(courseId!),
      ]);
      setCategories(catData);
      const c = courseData;
      setFormData({
        title: c.title,
        description: c.description,
        price: String(c.price),
        duration: c.duration,
        video: c.video,
        category: c.category,
        thumbnailFile: null,
      });
      setImagePreview(c.thumbnail);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to load data.', variant: 'destructive' });
    } finally {
      setLoading(false); // 👈 stop loading
    }
  };

  fetchInitialData();
}, [courseId, toast]);



  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
  try {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('duration', formData.duration);
    data.append('video', formData.video);
    data.append('category', formData.category);
    if (formData.thumbnailFile) {
      data.append('thumbnail', formData.thumbnailFile);
    }

    // 🚨 Debug log
    for (const [key, value] of data.entries()) {
      console.log(key, value);
    }

    await updateCourse(courseId!, data);

    toast({ title: 'Course Updated', description: 'Course updated successfully!' });
    navigate('/courses');
  } catch (error) {
    console.error(error);
    toast({ title: 'Error', description: 'Failed to update course.', variant: 'destructive' });
  }
};

if (loading) {
  return (
    <DashboardLayout>
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600" />
      </div>
    </DashboardLayout>
  );
}
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Update Course</h1>

        <Card>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Course Title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
              />
              <Input
                placeholder="Duration"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
              />
            </div>

            <Input
              placeholder="Video URL"
              value={formData.video}
              onChange={(e) => handleChange('video', e.target.value)}
            />

            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.title}</option>
              ))}
            </select>

            <div>
              <label className="block mb-2 text-sm">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData(prev => ({ ...prev, thumbnailFile: file }));
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 h-32 object-cover rounded-md" />
              )}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleUpdate} className="bg-wealthwise-700 hover:bg-wealthwise-800">
                Update Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UpdateCourse;
