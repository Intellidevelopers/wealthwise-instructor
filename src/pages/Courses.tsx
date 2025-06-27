import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Calendar,
  Users,
  DollarSign,
  MoreVertical,
  Pencil,
  Trash,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { getCourses } from '@/api/auth.api';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

interface Course {
  _id: string;
  title: string;
  duration: string;
  description: string;
  price: number;
  thumbnail: string;
  students?: number;
  status?: 'Published' | 'Draft';
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [courseToDelete, setCourseToDelete] = useState<string | null>(null);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('instructorToken');
      await axios.delete(`https://wealthwise-api.onrender.com/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({ title: 'Deleted', description: 'Course deleted successfully.' });
      setCourses(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Failed to delete course',
        variant: 'destructive',
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
          <Button
            onClick={() => navigate('/create-course')}
            className="bg-wealthwise-700 hover:bg-wealthwise-800"
          >
            Create New Course
          </Button>
        </div>

        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course._id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => navigate(`/update-course/${course._id}`)}
                          className="cursor-pointer"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCourseToDelete(course._id);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 cursor-pointer"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>

                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{course.students || 0} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span>${course.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        course.status === 'Published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {course.status || 'Draft'}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/update-course/${course._id}`)}
                    >
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      {showDeleteModal && courseToDelete && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white rounded-md shadow-lg p-6 max-w-sm w-full">
      <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
      <p className="text-sm text-gray-700 mb-6">
        Are you sure you want to delete this course? This action cannot be undone.
      </p>
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => {
            setShowDeleteModal(false);
            setCourseToDelete(null);
          }}
        >
          Cancel
        </Button>
        <Button
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={async () => {
            await handleDelete(courseToDelete);
            setShowDeleteModal(false);
            setCourseToDelete(null);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  </div>
)}

    </DashboardLayout>
  );
};

export default Courses;
