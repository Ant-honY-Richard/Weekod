import { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  User, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

interface EmployeeNavbarProps {
  user: {
    name: string;
    email: string;
  };
}

const EmployeeNavbar = ({ user }: EmployeeNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLocation('/login');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <User className="h-8 w-8 text-green-500 mr-2" />
            <span className="text-xl font-bold text-white">Weekod Employee</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-300">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2 border-t border-gray-700">
          <div className="flex flex-col space-y-2 pb-3 pt-2">
            <div className="text-left mb-2">
              <p className="text-sm text-gray-300">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default EmployeeNavbar;