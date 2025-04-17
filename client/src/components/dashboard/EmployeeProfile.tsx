import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Briefcase, DollarSign } from 'lucide-react';

interface EmployeeProfileProps {
  employeeId: string;
}

const EmployeeProfile = ({ employeeId }: EmployeeProfileProps) => {
  const [employeeDetails, setEmployeeDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEmployeeDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      // Use the /api/users/me endpoint instead of /api/employees/:id
      const response = await fetch(`/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch employee details');
      }
      
      const data = await response.json();
      setEmployeeDetails(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!employeeDetails) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-400">Could not load employee details</p>
      </div>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-full p-3 mr-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-2xl">
                {employeeDetails.employee.name}
              </CardTitle>
              <CardDescription className="text-gray-400 flex items-center mt-1">
                <Mail className="h-4 w-4 mr-1" />
                {employeeDetails.employee.email}
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-green-600 self-start md:self-auto">Employee</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-blue-400" />
                Project Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-3 rounded-md">
                  <p className="text-gray-400 text-sm">Total Projects</p>
                  <p className="text-xl font-bold text-white">
                    {employeeDetails.payoutDetails.totalProjects}
                  </p>
                </div>
                <div className="bg-gray-800 p-3 rounded-md">
                  <p className="text-gray-400 text-sm">Completed Projects</p>
                  <p className="text-xl font-bold text-white">
                    {employeeDetails.payoutDetails.completedProjects}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-400" />
                Payout Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-3 rounded-md">
                  <p className="text-gray-400 text-sm">Payout Percentage</p>
                  <p className="text-xl font-bold text-white">
                    {employeeDetails.payoutDetails.payoutPercentage}%
                  </p>
                </div>
                <div className="bg-gray-800 p-3 rounded-md">
                  <p className="text-gray-400 text-sm">Total Payout</p>
                  <p className="text-xl font-bold text-white">
                    ₹{employeeDetails.payoutDetails.totalPayout.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-3">My Projects</h3>
            {employeeDetails.projectDetails.length === 0 ? (
              <div className="bg-gray-700 p-6 rounded-lg text-center">
                <p className="text-gray-400">You don't have any projects assigned yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {employeeDetails.projectDetails.map((project: any) => (
                  <div key={project.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white">{project.projectName}</h4>
                      <Badge className={
                        project.status === 'completed' ? 'bg-green-600' :
                        project.status === 'in_progress' ? 'bg-yellow-600' :
                        project.status === 'received' ? 'bg-blue-600' : 'bg-red-600'
                      }>
                        {project.status.replace('_', ' ').charAt(0).toUpperCase() + project.status.replace('_', ' ').slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">Customer: {project.customerName}</p>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-600">
                      <span className="text-sm text-gray-400">Budget:</span>
                      <span className="font-medium text-white">₹{project.budget.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-2">Payout Structure</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• First project: 20% of project budget</li>
              <li>• Second project: 25% of project budget</li>
              <li>• Third to sixth project: 30% of project budget</li>
              <li>• Seventh to ninth project: 35% of project budget</li>
              <li>• Tenth project and above: 40% of project budget</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeProfile;