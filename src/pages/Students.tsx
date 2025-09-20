import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Users, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getInstructorEnrolledStudents } from '@/api/auth.api';
import { useToast } from '@/hooks/use-toast';

interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  courseTitle: string;
  enrolledAt: string;
  avatar?: string; // 👈 new
}


const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // 👈 search
  const [filterCourse, setFilterCourse] = useState(''); // 👈 filter by course
  const studentsPerPage = 10;
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getInstructorEnrolledStudents();
        setStudents(data);
      } catch (err) {
        console.error(err);
        toast({
          title: 'Error',
          description: 'Failed to fetch students',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [toast]);

  // Filtered and searched students
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const email = student.email.toLowerCase();
    const course = student.courseTitle.toLowerCase();

    return (
      (fullName.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase())) &&
      (filterCourse ? course === filterCourse.toLowerCase() : true)
    );
  });

  // Pagination logic
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Manage Students</h1>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">All Courses</option>
              {[...new Set(students.map((s) => s.courseTitle))].map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table and pagination */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Student List</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500 text-center">Loading students...</p>
            ) : filteredStudents.length === 0 ? (
              <p className="text-gray-500 text-center">No students found.</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Email</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Course</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Enrolled Date</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentStudents.map((student) => (
                        <tr key={student.studentId + student.courseTitle}>
                          <td className="px-4 py-2 whitespace-nowrap flex items-center gap-3">
                            <div className="w-9 h-9">
                              <img
                                src={student.avatar || `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}`}
                                alt={`${student.firstName} ${student.lastName}`}
                                className="w-9 h-9 rounded-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{student.firstName} {student.lastName}</p>
                            </div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">{student.email}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{student.courseTitle}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{new Date(student.enrolledAt).toLocaleDateString()}</td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <Button size="sm" variant="outline">View Details</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </p>
                  <div className="space-x-2">
                    <Button
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      variant="outline"
                      size="sm"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      size="sm"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
export default Students;