
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Users, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Students = () => {
  const students = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      course: "Financial Planning",
      progress: 75,
      joined: "2024-01-15"
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@example.com",
      course: "Investment Strategies",
      progress: 45,
      joined: "2024-02-01"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Manage Students</h1>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input placeholder="Search students..." className="pl-10 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Student List</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-wealthwise-100 rounded-full flex items-center justify-center">
                      <span className="text-wealthwise-700 font-medium">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{student.name}</h3>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium">{student.course}</p>
                      <p className="text-xs text-gray-500">Course</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{student.progress}%</p>
                      <p className="text-xs text-gray-500">Progress</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Students;
