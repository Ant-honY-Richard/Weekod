import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import TasksTable from '@/components/dashboard/TasksTable';
import CallScheduleTable from '@/components/dashboard/CallScheduleTable';
import EmployeeProfile from '@/components/dashboard/EmployeeProfile';
import EmployeeNavbar from '@/components/dashboard/EmployeeNavbar';

const EmployeeDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      setLocation('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [setLocation, toast]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <EmployeeNavbar user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-gray-400">View your assigned tasks and call schedules</p>
        </motion.div>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="calls">My Call Schedules</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tasks">
            <TasksTable isAdmin={false} employeeId={user._id} />
          </TabsContent>
          
          <TabsContent value="calls">
            <CallScheduleTable isAdmin={false} employeeId={user._id} />
          </TabsContent>
          
          <TabsContent value="profile">
            <EmployeeProfile employeeId={user._id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default EmployeeDashboard;