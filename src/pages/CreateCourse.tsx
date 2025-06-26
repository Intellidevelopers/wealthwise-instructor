
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Plus, Upload, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CreateCourse = () => {
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
              <Input placeholder="Enter course title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea placeholder="Enter course description" rows={4} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input placeholder="0.00" className="pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                <Input placeholder="Enter duration" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Thumbnail</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-wealthwise-700 hover:bg-wealthwise-800">Publish Course</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CreateCourse;
