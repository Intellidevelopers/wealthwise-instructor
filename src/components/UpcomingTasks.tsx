
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Users, CheckCircle } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'Grade JavaScript Quiz',
    course: 'JavaScript Fundamentals',
    dueDate: 'Today, 3:00 PM',
    priority: 'high',
    type: 'grading',
    studentCount: 45
  },
  {
    id: 2,
    title: 'Live Session: React Hooks',
    course: 'React Masterclass',
    dueDate: 'Tomorrow, 10:00 AM',
    priority: 'medium',
    type: 'session',
    studentCount: 28
  },
  {
    id: 3,
    title: 'Review Course Content',
    course: 'Python for Beginners',
    dueDate: 'Dec 28, 2:00 PM',
    priority: 'low',
    type: 'review',
    studentCount: 0
  },
  {
    id: 4,
    title: 'Send Weekly Newsletter',
    course: 'All Courses',
    dueDate: 'Dec 30, 9:00 AM',
    priority: 'medium',
    type: 'communication',
    studentCount: 156
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getTaskIcon = (type: string) => {
  switch (type) {
    case 'grading': return CheckCircle;
    case 'session': return Calendar;
    case 'review': return Clock;
    case 'communication': return Users;
    default: return Clock;
  }
};

export function UpcomingTasks() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Tasks</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => {
            const TaskIcon = getTaskIcon(task.type);
            return (
              <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <TaskIcon className="w-4 h-4 text-gray-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{task.course}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {task.dueDate}
                    </div>
                    {task.studentCount > 0 && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        {task.studentCount} students
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
