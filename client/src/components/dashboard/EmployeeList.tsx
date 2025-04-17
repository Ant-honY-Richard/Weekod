import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Briefcase, DollarSign, Plus, UserPlus } from 'lucide-react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [employeeDetails, setEmployeeDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee'
  });
  const { toast } = useToast();

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/employees', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      
      const data = await response.json();
      setEmployees(data);
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

  const fetchEmployeeDetails = async (id: string) => {
    setDetailsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/employees/${id}`, {
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
      setDetailsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value
    });
  };

  const handleAddEmployee = async () => {
    try {
      // Validate inputs
      if (!newEmployee.name || !newEmployee.email || !newEmployee.password) {
        toast({
          title: 'Error',
          description: 'All fields are required',
          variant: 'destructive',
        });
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newEmployee)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add employee');
      }
      
      toast({
        title: 'Success',
        description: 'Employee added successfully',
      });
      
      setIsAddDialogOpen(false);
      setNewEmployee({
        name: '',
        email: '',
        password: '',
        role: 'employee'
      });
      fetchEmployees();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">Employees</CardTitle>
                <CardDescription className="text-gray-400">
                  Select an employee to view details
                </CardDescription>
              </div>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {employees.length === 0 ? (
                  <p className="text-gray-400">No employees found</p>
                ) : (
                  employees.map((employee) => (
                    <div 
                      key={employee._id}
                      className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                        employeeDetails?.employee?._id === employee._id
                          ? 'bg-blue-900 hover:bg-blue-800'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                      onClick={() => fetchEmployeeDetails(employee._id)}
                    >
                      <div className="flex items-center">
                        <div className="bg-gray-600 rounded-full p-2 mr-3">
                          <User className="h-5 w-5 text-gray-300" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{employee.name}</p>
                          <p className="text-sm text-gray-400">{employee.email}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          fetchEmployeeDetails(employee._id);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {detailsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : employeeDetails ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-2xl">
                      {employeeDetails.employee.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 flex items-center mt-1">
                      <Mail className="h-4 w-4 mr-1" />
                      {employeeDetails.employee.email}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-600">Employee</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
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

                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Project Details</h3>
                    {employeeDetails.projectDetails.length === 0 ? (
                      <p className="text-gray-400">No projects assigned yet</p>
                    ) : (
                      <div className="space-y-3">
                        {employeeDetails.projectDetails.map((project: any) => (
                          <div key={project.id} className="bg-gray-700 p-3 rounded-md">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-white">{project.projectName}</p>
                                <p className="text-sm text-gray-400">Customer: {project.customerName}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <Badge className={
                                  project.status === 'completed' ? 'bg-green-600' :
                                  project.status === 'in_progress' ? 'bg-yellow-600' :
                                  project.status === 'received' ? 'bg-blue-600' : 'bg-red-600'
                                }>
                                  {project.status.replace('_', ' ').charAt(0).toUpperCase() + project.status.replace('_', ' ').slice(1)}
                                </Badge>
                                <p className="text-sm text-gray-400 mt-1">₹{project.budget.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-800 border-gray-700 h-64 flex items-center justify-center">
              <CardContent>
                <p className="text-gray-400 text-center">
                  Select an employee to view their details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name">Full Name</label>
              <Input
                id="name"
                name="name"
                value={newEmployee.name}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newEmployee.email}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                value={newEmployee.password}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddEmployee}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployeeList;