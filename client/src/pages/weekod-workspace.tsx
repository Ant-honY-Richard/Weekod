import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

const WeekodWorkspace = () => {
  const [, setLocation] = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        // Redirect based on role
        if (userData.role === 'admin') {
          setLocation('/admin/dashboard');
        } else {
          setLocation('/employee/dashboard');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        // If there's an error, redirect to login
        setLocation('/login');
      }
    } else {
      // If not logged in, redirect to login page
      setLocation('/login');
    }
    
    setIsChecking(false);
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default WeekodWorkspace;

