
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, Users, DollarSign, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction to Financial Planning",
      students: 24,
      revenue: 1200,
      status: "Published",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Investment Strategies for Beginners",
      students: 18,
      revenue: 900,
      status: "Draft",
      thumbnail: "/placeholder.svg"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
          <Button className="bg-wealthwise-700 hover:bg-wealthwise-800">
            Create New Course
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-gray-500">Course Thumbnail</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span>${course.revenue}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    course.status === 'Published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {course.status}
                  </span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Courses;
