import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Plus, Upload, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getCategories, createCourse } from '@/api/auth.api';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  type CourseFormData = {
    title: string;
    description: string;
    price: string;
    duration: string;
    thumbnail: string;
    video: string;
    category: string;
    thumbnailFile: File | null;
  };

  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    price: '',
    duration: '',
    thumbnail: '',
    video: '',
    category: '',
    thumbnailFile: null,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load categories', variant: 'destructive' });
      }
    };

    fetchCategories();
  }, [toast]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

const handleSubmit = async () => {
  const { title, description, price, duration, video, category, thumbnailFile } = formData;

  if (!title || !description || !price || !duration || !thumbnailFile || !video || !category) {
    toast({ title: 'Missing Fields', description: 'Please fill out all fields.', variant: 'destructive' });
    return;
  }

  try {
    const courseData = new FormData();
    courseData.append('title', title);
    courseData.append('description', description);
    courseData.append('price', price);
    courseData.append('duration', duration);
    courseData.append('video', video);
    courseData.append('category', category);
    courseData.append('thumbnail', thumbnailFile); // 👈 file must go in as 'thumbnail'

    await createCourse(courseData);

    toast({ title: 'Success', description: 'Course created successfully!' });
    navigate('/courses');
  } catch (error) {
    console.error(error);
    toast({ title: 'Error', description: 'Failed to create course', variant: 'destructive' });
  }
};


  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Course Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter course title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter course description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="0.00"
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (e.g., '4 hours')</label>
                <Input
                  value={formData.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                  placeholder="Enter duration"
                />
              </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  setFormData(prev => ({
                    ...prev,
                    thumbnailFile: file || null,
                    thumbnail: file ? file.name : '',
                  }));
                }}
              />
              {formData.thumbnail && (
                <span className="text-xs text-gray-500 mt-1 block">{formData.thumbnail}</span>
              )}
            </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
              <Input
                value={formData.video}
                onChange={(e) => handleChange('video', e.target.value)}
                placeholder="https://example.com/video.mp4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" type="button">Save as Draft</Button>
              <Button onClick={handleSubmit} type="button" className="bg-wealthwise-700 hover:bg-wealthwise-800">
                Publish Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CreateCourse;
