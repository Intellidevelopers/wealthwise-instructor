import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { getLessonsByCourse } from '@/api/auth.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Lesson {
  _id: string;
  title: string;
  description: string;
  duration: string;
  video: string;
}

const CourseLessons = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getLessonsByCourse(courseId!);
        setLessons(data);
      } catch (err) {
        console.error('Failed to fetch lessons', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Lessons</h1>

        {loading ? (
          <p>Loading lessons...</p>
        ) : lessons.length === 0 ? (
          <p>No lessons found for this course.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessons.map((lesson) => (
              <Card key={lesson._id}>
                <CardHeader>
                  <CardTitle>{lesson.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{lesson.description}</p>
                  <p className="text-xs text-gray-500 mt-2">Duration: {lesson.duration}</p>
                  <video
                    controls
                    src={lesson.video}
                    className="w-full rounded mt-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CourseLessons;
