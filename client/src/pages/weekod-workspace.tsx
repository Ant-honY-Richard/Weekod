import { useEffect } from 'react';
import { useLocation } from 'wouter';

const WeekodWorkspace = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to login page
    setLocation('/login');
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default WeekodWorkspace;