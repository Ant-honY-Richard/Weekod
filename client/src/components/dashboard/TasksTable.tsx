import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TasksTableProps {
  isAdmin: boolean;
  employeeId?: string;
}

const TasksTable = ({ isAdmin, employeeId }: TasksTableProps) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFeaturesDialogOpen, setIsFeaturesDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [currentFeatures, setCurrentFeatures] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  // Predefined features for website development with days estimation
  const availableFeatures = [
    "Responsive Design",
    "Contact Form",
    "Image Gallery",
    "Blog Section",
    "E-commerce Functionality",
    "User Authentication",
    "Admin Dashboard",
    "Payment Gateway Integration",
    "Social Media Integration",
    "SEO Optimization",
    "Newsletter Subscription",
    "Live Chat Support",
    "Multi-language Support",
    "Booking/Appointment System",
    "Custom Domain Setup",
    "SSL Certificate",
    "Google Analytics Integration",
    "Content Management System (CMS)",
    "Mobile App Integration",
    "Video Integration"
  ];
  
  // Feature days mapping (how many days each feature takes)
  const featureDaysMap = {
    "Responsive Design": 3,
    "Contact Form": 1,
    "Image Gallery": 2,
    "Blog Section": 4,
    "E-commerce Functionality": 7,
    "User Authentication": 5,
    "Admin Dashboard": 6,
    "Payment Gateway Integration": 4,
    "Social Media Integration": 2,
    "SEO Optimization": 3,
    "Newsletter Subscription": 2,
    "Live Chat Support": 3,
    "Multi-language Support": 4,
    "Booking/Appointment System": 5,
    "Custom Domain Setup": 1,
    "SSL Certificate": 1,
    "Google Analytics Integration": 1,
    "Content Management System (CMS)": 5,
    "Mobile App Integration": 6,
    "Video Integration": 2
  };
  
  // Website type base days
  const websiteTypeDays = {
    "Landing Page": 7,
    "Business Website": 14,
    "E-commerce": 30,
    "Web Application": 45,
    "Blog": 10,
    "Portfolio": 12
  };
  
  // Complexity multipliers
  const complexityMultiplier = {
    "Basic": 1,
    "Standard": 1.3,
    "Advanced": 1.7,
    "Premium": 2
  };
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerCompany: '',
    serviceRequired: '',
    projectDetails: '',
    budget: 0,
    expenses: 0,
    status: 'received',
    assignedTo: isAdmin ? 'unassigned' : '', // For employees, this will be set by the server
    referredBy: 'web',
    websiteType: '',
    complexity: '',
    features: '',
    supportPlan: '',
    estimatedDeliveryDate: ''
  });
  const { toast } = useToast();

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // For employee dashboard, don't pass the employeeId parameter
      // The server will use the authenticated user's ID
      const url = isAdmin 
        ? '/api/tasks' 
        : '/api/tasks';
      
      console.log('Fetching tasks from URL:', url);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch tasks:', errorText);
        throw new Error(`Failed to fetch tasks: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Tasks fetched:', data);
      
      // Debug the assignedTo field for each task
      data.forEach((task: any, index: number) => {
        console.log(`Task ${index + 1} - ID: ${task._id}`);
        console.log(`Task ${index + 1} - Customer: ${task.customerName}`);
        console.log(`Task ${index + 1} - assignedTo:`, task.assignedTo);
      });
      
      // If budget calculator fields are missing but projectSummary is present,
      // try to extract the data from projectSummary
      for (const task of data) {
        if ((!task.websiteType || !task.complexity || !task.features || !task.supportPlan) && task.projectSummary) {
          try {
            const projectSummary = JSON.parse(task.projectSummary);
            if (!task.websiteType && projectSummary.websiteType) {
              task.websiteType = projectSummary.websiteType;
            }
            if (!task.complexity && projectSummary.complexity) {
              task.complexity = projectSummary.complexity;
            }
            if (!task.features && projectSummary.features) {
              task.features = JSON.stringify(projectSummary.features);
            }
            if (!task.supportPlan && projectSummary.supportPlan) {
              task.supportPlan = projectSummary.supportPlan;
            }
          } catch (e) {
            // Silently handle parsing errors
          }
        }
      }
      
      setTasks(data);
    } catch (error: any) {
      console.error('Error fetching tasks:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    if (!isAdmin) return;
    
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
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, [isAdmin, employeeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'budget' || name === 'expenses'
        ? parseFloat(value) || 0 
        : value
    });
  };

  // Calculate estimated delivery date based on website type, complexity, and features
  const calculateEstimatedDeliveryDate = () => {
    let totalDays = 0;
    
    // Add base days from website type
    if (formData.websiteType && websiteTypeDays[formData.websiteType as keyof typeof websiteTypeDays]) {
      totalDays += websiteTypeDays[formData.websiteType as keyof typeof websiteTypeDays];
    }
    
    // Add days for each selected feature
    if (selectedFeatures.length > 0) {
      selectedFeatures.forEach(feature => {
        if (featureDaysMap[feature as keyof typeof featureDaysMap]) {
          totalDays += featureDaysMap[feature as keyof typeof featureDaysMap];
        }
      });
    }
    
    // Apply complexity multiplier
    if (formData.complexity && complexityMultiplier[formData.complexity as keyof typeof complexityMultiplier]) {
      totalDays = Math.round(totalDays * complexityMultiplier[formData.complexity as keyof typeof complexityMultiplier]);
    }
    
    // Calculate delivery date
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + totalDays);
    
    // Format date as Month Day, Year
    return deliveryDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Update estimated delivery date when website type or complexity changes
    if (name === 'websiteType' || name === 'complexity') {
      setTimeout(() => {
        const estimatedDate = calculateEstimatedDeliveryDate();
        setFormData(prev => ({
          ...prev,
          estimatedDeliveryDate: estimatedDate
        }));
      }, 0);
    }
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => {
      let newFeatures;
      if (prev.includes(feature)) {
        // Remove feature if already selected
        newFeatures = prev.filter(f => f !== feature);
      } else {
        // Add feature if not already selected
        newFeatures = [...prev, feature];
      }
      
      // Update formData with the new features string
      setFormData(prevFormData => ({
        ...prevFormData,
        features: JSON.stringify(newFeatures)
      }));
      
      // Update estimated delivery date after features change
      setTimeout(() => {
        const estimatedDate = calculateEstimatedDeliveryDate();
        setFormData(prevFormData => ({
          ...prevFormData,
          estimatedDeliveryDate: estimatedDate
        }));
      }, 0);
      
      return newFeatures;
    });
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      customerEmail: '',
      customerCompany: '',
      serviceRequired: '',
      projectDetails: '',
      budget: 0,
      expenses: 0,
      status: 'received',
      assignedTo: isAdmin ? 'unassigned' : '', // For employees, this will be set by the server
      referredBy: 'web',
      websiteType: '',
      complexity: '',
      features: '',
      supportPlan: '',
      estimatedDeliveryDate: ''
    });
    setSelectedFeatures([]);
  };

  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // For employees, don't send the assignedTo field
      // The server will automatically assign it to the current user
      const dataToSend = { ...formData };
      if (!isAdmin) {
        // If not admin, remove the assignedTo field
        delete dataToSend.assignedTo;
      }
      
      console.log('Sending task data:', dataToSend);
      
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to add task:', errorText);
        throw new Error(`Failed to add task: ${response.status} ${errorText}`);
      }
      
      toast({
        title: 'Success',
        description: 'Task added successfully',
      });
      
      setIsAddDialogOpen(false);
      resetForm();
      fetchTasks();
    } catch (error: any) {
      console.error('Error adding task:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEditTask = async () => {
    if (!currentTask) return;
    
    try {
      const token = localStorage.getItem('token');
      
      // Prepare the data to send based on user role
      let dataToSend;
      
      if (isAdmin) {
        // Admin can update all fields
        dataToSend = formData;
      } else {
        // Employees can only update status, website type, complexity, features, support plan, and estimated delivery date
        dataToSend = {
          status: formData.status,
          websiteType: formData.websiteType,
          complexity: formData.complexity,
          supportPlan: formData.supportPlan,
          estimatedDeliveryDate: formData.estimatedDeliveryDate
        };
        
        // Only include features if they exist in the form data
        if (formData.features) {
          dataToSend.features = formData.features;
        }
      }
      
      const response = await fetch(`/api/tasks/${currentTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      
      toast({
        title: 'Success',
        description: 'Task updated successfully',
      });
      
      setIsEditDialogOpen(false);
      setCurrentTask(null);
      fetchTasks();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteTask = async () => {
    if (!currentTask) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/tasks/${currentTask._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
      });
      
      setIsDeleteDialogOpen(false);
      setCurrentTask(null);
      fetchTasks();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (task: any) => {
    // Create a copy of the task to avoid modifying the original
    const taskCopy = { ...task };
    
    // If budget calculator fields are missing but projectSummary is present,
    // try to extract the data from projectSummary
    if ((!taskCopy.websiteType || !taskCopy.complexity || !taskCopy.features || !taskCopy.supportPlan) && taskCopy.projectSummary) {
      try {
        const projectSummary = JSON.parse(taskCopy.projectSummary);
        
        if (!taskCopy.websiteType && projectSummary.websiteType) {
          taskCopy.websiteType = projectSummary.websiteType;
        }
        if (!taskCopy.complexity && projectSummary.complexity) {
          taskCopy.complexity = projectSummary.complexity;
        }
        if (!taskCopy.features && projectSummary.features) {
          taskCopy.features = JSON.stringify(projectSummary.features);
        }
        if (!taskCopy.supportPlan && projectSummary.supportPlan) {
          taskCopy.supportPlan = projectSummary.supportPlan;
        }
      } catch (e) {
        // Silently handle parsing errors
      }
    }
    
    // Store the complete task object for reference (including budget calculator details)
    setCurrentTask(taskCopy);
    
    // Parse features if they exist
    let parsedFeatures: string[] = [];
    if (taskCopy.features) {
      try {
        parsedFeatures = JSON.parse(taskCopy.features);
        if (!Array.isArray(parsedFeatures)) {
          // If features is not an array, try to split it by comma
          parsedFeatures = taskCopy.features.split(',').map(f => f.trim());
        }
      } catch (e) {
        // If parsing fails, try to split by comma
        parsedFeatures = taskCopy.features.split(',').map(f => f.trim());
      }
    }
    setSelectedFeatures(parsedFeatures);
    
    // Set form data for editable fields
    setFormData({
      customerName: taskCopy.customerName,
      customerEmail: taskCopy.customerEmail,
      customerCompany: taskCopy.customerCompany || '',
      serviceRequired: taskCopy.serviceRequired,
      projectDetails: taskCopy.projectDetails,
      budget: taskCopy.budget,
      expenses: taskCopy.expenses,
      status: taskCopy.status,
      assignedTo: taskCopy.assignedTo?._id || 'unassigned',
      referredBy: taskCopy.referredBy || 'web',
      websiteType: taskCopy.websiteType || '',
      complexity: taskCopy.complexity || '',
      features: taskCopy.features || '',
      supportPlan: taskCopy.supportPlan || '',
      estimatedDeliveryDate: taskCopy.estimatedDeliveryDate || ''
    });
    
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (task: any) => {
    setCurrentTask(task);
    setIsDeleteDialogOpen(true);
  };
  
  const viewFeatures = (task: any) => {
    // Create a copy of the task to avoid modifying the original
    const taskCopy = { ...task };
    
    // If budget calculator fields are missing but projectSummary is present,
    // try to extract the data from projectSummary
    if ((!taskCopy.websiteType || !taskCopy.complexity || !taskCopy.features || !taskCopy.supportPlan) && taskCopy.projectSummary) {
      try {
        const projectSummary = JSON.parse(taskCopy.projectSummary);
        
        if (!taskCopy.websiteType && projectSummary.websiteType) {
          taskCopy.websiteType = projectSummary.websiteType;
        }
        if (!taskCopy.complexity && projectSummary.complexity) {
          taskCopy.complexity = projectSummary.complexity;
        }
        if (!taskCopy.features && projectSummary.features) {
          taskCopy.features = JSON.stringify(projectSummary.features);
        }
        if (!taskCopy.supportPlan && projectSummary.supportPlan) {
          taskCopy.supportPlan = projectSummary.supportPlan;
        }
      } catch (e) {
        // Silently handle parsing errors
      }
    }
    
    setCurrentTask(taskCopy);
    
    // Parse features if they exist
    let features: string[] = [];
    if (taskCopy.features) {
      try {
        const parsedFeatures = JSON.parse(taskCopy.features);
        if (Array.isArray(parsedFeatures)) {
          features = parsedFeatures;
        } else if (typeof parsedFeatures === 'object') {
          // Handle case where features is an object with boolean values
          features = Object.entries(parsedFeatures)
            .filter(([_, value]) => value === true)
            .map(([key]) => key);
        }
      } catch (e) {
        // If parsing fails, try to split by comma
        features = taskCopy.features.split(',').map(f => f.trim());
      }
    } else if (taskCopy.projectSummary) {
      // Try to extract features from projectSummary as a fallback
      try {
        const projectSummary = JSON.parse(taskCopy.projectSummary);
        if (projectSummary.features) {
          if (Array.isArray(projectSummary.features)) {
            features = projectSummary.features;
          } else if (typeof projectSummary.features === 'object') {
            features = Object.entries(projectSummary.features)
              .filter(([_, value]) => value === true)
              .map(([key]) => key);
          }
        }
      } catch (e) {
        // Silently handle parsing errors
      }
    }
    
    setCurrentFeatures(features);
    setIsFeaturesDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'received':
        return <Badge className="bg-blue-500">Received</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">
          {isAdmin ? 'All Tasks' : 'My Assigned Tasks'}
        </h2>
        <Button 
          onClick={() => {
            resetForm();
            setIsAddDialogOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Customer Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Project Details</TableHead>
              <TableHead>Website Type</TableHead>
              <TableHead>Complexity</TableHead>
              <TableHead>Support Plan</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Expenses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Referred By</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={13} className="text-center py-8 text-gray-400">
                  No tasks found
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.customerName}</TableCell>
                  <TableCell>{task.customerEmail}</TableCell>
                  <TableCell>{task.customerCompany || '-'}</TableCell>
                  <TableCell>{task.serviceRequired}</TableCell>
                  <TableCell>
                    {task.projectDetails ? (
                      <span className="text-gray-300">Available</span>
                    ) : '-'}
                  </TableCell>
                  <TableCell>{task.websiteType || '-'}</TableCell>
                  <TableCell>{task.complexity || '-'}</TableCell>
                  <TableCell>{task.supportPlan || '-'}</TableCell>
                  <TableCell>₹{task.budget.toLocaleString()}</TableCell>
                  <TableCell>₹{task.expenses.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>{task.referredBy || 'web'}</TableCell>
                  <TableCell>
                    {task.assignedTo ? (
                      typeof task.assignedTo === 'object' && task.assignedTo.name 
                        ? task.assignedTo.name 
                        : 'Employee'
                    ) : 'Unassigned'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openEditDialog(task)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-500 border-blue-500 hover:bg-blue-950 mx-2"
                        onClick={() => viewFeatures(task)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 border-red-500 hover:bg-red-950"
                        onClick={() => openDeleteDialog(task)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {!isAdmin && (
                        <>
                          <Select
                            value={task.status}
                            onValueChange={(value) => {
                              // Update task status
                              const token = localStorage.getItem('token');
                              fetch(`/api/tasks/${task._id}`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ status: value })
                              })
                                .then(response => {
                                  if (!response.ok) throw new Error('Failed to update status');
                                  return response.json();
                                })
                                .then(() => {
                                  toast({
                                    title: 'Status Updated',
                                    description: 'Task status has been updated successfully',
                                  });
                                  fetchTasks();
                                })
                                .catch(error => {
                                  toast({
                                  title: 'Error',
                                  description: error.message,
                                  variant: 'destructive',
                                });
                              });
                          }}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="received">Received</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Task Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-h-[90vh] overflow-y-auto max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 pb-16">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="customerName">Customer Name</label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="customerEmail">Customer Email</label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                />{/*  */}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="customerCompany">Company</label>
                <Input
                  id="customerCompany"
                  name="customerCompany"
                  value={formData.customerCompany}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="serviceRequired">Service Required</label>
                <Input
                  id="serviceRequired"
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="projectDetails">Project Details</label>
              <Textarea
                id="projectDetails"
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="budget">Budget (₹)</label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="expenses">Expenses (₹)</label>
                <Input
                  id="expenses"
                  name="expenses"
                  type="number"
                  value={formData.expenses}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="status">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {isAdmin && (
                <div className="space-y-2">
                  <label htmlFor="assignedTo">Assign To</label>
                  <Select
                    value={formData.assignedTo}
                    onValueChange={(value) => handleSelectChange('assignedTo', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {employees.map((employee) => (
                        <SelectItem key={employee._id} value={employee._id}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="referredBy">Referred By</label>
              <Select
                value={formData.referredBy}
                onValueChange={(value) => handleSelectChange('referredBy', value)}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Select referral source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Website</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="referral">Client Referral</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Budget Calculator Details Section */}
            <div className="mt-6 space-y-4 border border-gray-600 rounded-md p-4 bg-gray-700/50">
              <h3 className="text-lg font-semibold border-b border-gray-600 pb-2">Budget Calculator Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="websiteType">Website Type</label>
                  <Select
                    value={formData.websiteType}
                    onValueChange={(value) => handleSelectChange('websiteType', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select website type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Landing Page">Landing Page</SelectItem>
                      <SelectItem value="Business Website">Business Website</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Web Application">Web Application</SelectItem>
                      <SelectItem value="Blog">Blog</SelectItem>
                      <SelectItem value="Portfolio">Portfolio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="complexity">Complexity Level</label>
                  <Select
                    value={formData.complexity}
                    onValueChange={(value) => handleSelectChange('complexity', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="features">Features</label>
                <div className="bg-gray-700 border border-gray-600 rounded-md p-2 max-h-60 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {availableFeatures.map((feature) => (
                      <div 
                        key={feature} 
                        className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                          selectedFeatures.includes(feature) 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                        onClick={() => toggleFeature(feature)}
                      >
                        <div className="flex-1">{feature}</div>
                        {selectedFeatures.includes(feature) && (
                          <div className="w-5 h-5 flex items-center justify-center bg-blue-700 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {selectedFeatures.length > 0 && (
                  <div className="mt-2 text-sm text-gray-400">
                    Selected: {selectedFeatures.length} feature{selectedFeatures.length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="supportPlan">Support Plan</label>
                <Select
                  value={formData.supportPlan}
                  onValueChange={(value) => handleSelectChange('supportPlan', value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select support plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic Support</SelectItem>
                    <SelectItem value="Standard">Standard Support</SelectItem>
                    <SelectItem value="Premium">Premium Support</SelectItem>
                    <SelectItem value="None">No Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="estimatedDeliveryDate">Estimated Delivery Date</label>
                <div className="relative">
                  <Input
                    id="estimatedDeliveryDate"
                    name="estimatedDeliveryDate"
                    type="text"
                    value={formData.estimatedDeliveryDate || ''}
                    readOnly
                    className="bg-gray-700 border-gray-600 cursor-default"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Auto-calculated based on website type, complexity, and features
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 bg-gray-800 pt-2 border-t border-gray-700">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-h-[90vh] overflow-y-auto max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 pb-16">
            {isAdmin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-customerName">Customer Name</label>
                    <Input
                      id="edit-customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-customerEmail">Customer Email</label>
                    <Input
                      id="edit-customerEmail"
                      name="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-customerCompany">Company</label>
                    <Input
                      id="edit-customerCompany"
                      name="customerCompany"
                      value={formData.customerCompany}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-serviceRequired">Service Required</label>
                    <Input
                      id="edit-serviceRequired"
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-projectDetails">Project Details</label>
                  <Textarea
                    id="edit-projectDetails"
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-budget">Budget (₹)</label>
                    <Input
                      id="edit-budget"
                      name="budget"
                      type="number"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-expenses">Expenses (₹)</label>
                    <Input
                      id="edit-expenses"
                      name="expenses"
                      type="number"
                      value={formData.expenses}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
              </>
            )}
            
            {!isAdmin && currentTask && (
              <div className="mb-4 p-4 bg-gray-700/30 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Task Details</h3>
                <p><strong>Customer:</strong> {currentTask.customerName}</p>
                <p><strong>Service:</strong> {currentTask.serviceRequired}</p>
                <p><strong>Budget:</strong> ₹{currentTask.budget?.toLocaleString() || '0'}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="edit-status">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {isAdmin && (
                <div className="space-y-2">
                  <label htmlFor="edit-assignedTo">Assign To</label>
                  <Select
                    value={formData.assignedTo}
                    onValueChange={(value) => handleSelectChange('assignedTo', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {employees.map((employee) => (
                        <SelectItem key={employee._id} value={employee._id}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            {isAdmin && (
              <div className="space-y-2">
                <label htmlFor="edit-referredBy">Referred By</label>
                <Select
                  value={formData.referredBy}
                  onValueChange={(value) => handleSelectChange('referredBy', value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select referral source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Website</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="referral">Client Referral</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* Budget Calculator Details Section */}
            <div className="mt-6 space-y-4 border border-gray-600 rounded-md p-4 bg-gray-700/50">
              <h3 className="text-lg font-semibold border-b border-gray-600 pb-2">Budget Calculator Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-websiteType">Website Type</label>
                  <Select
                    value={formData.websiteType}
                    onValueChange={(value) => handleSelectChange('websiteType', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select website type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Landing Page">Landing Page</SelectItem>
                      <SelectItem value="Business Website">Business Website</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Web Application">Web Application</SelectItem>
                      <SelectItem value="Blog">Blog</SelectItem>
                      <SelectItem value="Portfolio">Portfolio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-complexity">Complexity Level</label>
                  <Select
                    value={formData.complexity}
                    onValueChange={(value) => handleSelectChange('complexity', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-supportPlan">Support Plan</label>
                <Select
                  value={formData.supportPlan}
                  onValueChange={(value) => handleSelectChange('supportPlan', value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select support plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic Support</SelectItem>
                    <SelectItem value="Standard">Standard Support</SelectItem>
                    <SelectItem value="Premium">Premium Support</SelectItem>
                    <SelectItem value="None">No Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-features">Features</label>
                <div className="bg-gray-700 border border-gray-600 rounded-md p-2 max-h-60 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {availableFeatures.map((feature) => (
                      <div 
                        key={feature} 
                        className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                          selectedFeatures.includes(feature) 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                        onClick={() => toggleFeature(feature)}
                      >
                        <div className="flex-1">{feature}</div>
                        {selectedFeatures.includes(feature) && (
                          <div className="w-5 h-5 flex items-center justify-center bg-blue-700 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {selectedFeatures.length > 0 && (
                  <div className="mt-2 text-sm text-gray-400">
                    Selected: {selectedFeatures.length} feature{selectedFeatures.length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
                
                {currentTask && currentTask.budget > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-gray-300">Estimated Budget:</p>
                    <p className="font-medium">₹{currentTask.budget.toLocaleString()}</p>
                  </div>
                )}
                
                {currentTask && currentTask.estimatedDeliveryDate && (
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-gray-300">Estimated Delivery Date:</p>
                    <p className="font-medium">{currentTask.estimatedDeliveryDate}</p>
                  </div>
                )}
              </div>
          </div>
          <DialogFooter className="sticky bottom-0 bg-gray-800 pt-2 border-t border-gray-700">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTask}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Task Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-h-[90vh] overflow-y-auto max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4 pb-16">
            <p>Are you sure you want to delete this task? This action cannot be undone.</p>
            {currentTask && (
              <div className="mt-4 p-4 bg-gray-700 rounded-md">
                <p><strong>Customer:</strong> {currentTask.customerName}</p>
                <p><strong>Service:</strong> {currentTask.serviceRequired}</p>
                {currentTask.budget > 0 && (
                  <p><strong>Budget:</strong> ₹{currentTask.budget.toLocaleString()}</p>
                )}
                {currentTask.websiteType && (
                  <p><strong>Website Type:</strong> {currentTask.websiteType}</p>
                )}
              </div>
            )}
          </div>
          <DialogFooter className="sticky bottom-0 bg-gray-800 pt-2 border-t border-gray-700">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteTask}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Features Dialog */}
      <Dialog open={isFeaturesDialogOpen} onOpenChange={setIsFeaturesDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-h-[90vh] overflow-y-auto max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
          </DialogHeader>
          <div className="py-4 pb-16">
            {currentTask && (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Customer</h3>
                      <p className="text-lg">{currentTask.customerName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Email</h3>
                      <p className="text-lg">{currentTask.customerEmail}</p>
                    </div>
                    {currentTask.customerCompany && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Company</h3>
                        <p className="text-lg">{currentTask.customerCompany}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Service Required</h3>
                      <p className="text-lg">{currentTask.serviceRequired}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Status</h3>
                      <div className="mt-1">{getStatusBadge(currentTask.status)}</div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Budget</h3>
                      <p className="text-lg">₹{currentTask.budget?.toLocaleString() || '0'}</p>
                    </div>
                  </div>
                </div>
                
                {currentTask.projectDetails && (
                  <div className="mb-6 p-4 bg-gray-700/30 rounded-md">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Project Details</h3>
                    <p className="text-gray-200 whitespace-pre-wrap">{currentTask.projectDetails}</p>
                  </div>
                )}
                
                <div className="border-t border-gray-700 pt-6 mt-6">
                  <h2 className="text-xl font-semibold mb-4">Website Specifications</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Website Type</h3>
                      <p className="text-lg">{currentTask.websiteType || 'Not specified'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Complexity Level</h3>
                      <p className="text-lg">{currentTask.complexity || 'Not specified'}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Support Plan</h3>
                    <p className="text-lg">{currentTask.supportPlan || 'Not specified'}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Selected Features</h3>
                    {currentTask.features ? (
                      currentFeatures.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1 bg-gray-700/50 p-4 rounded-md">
                          {currentFeatures.map((feature, index) => (
                            <li key={index} className="text-gray-200">{feature}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400 italic">No features could be parsed from the data</p>
                      )
                    ) : (
                      <p className="text-gray-400 italic">No features data available for this task</p>
                    )}
                  </div>
                  
                  <div className="bg-gray-700/50 p-4 rounded-md space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Estimated Budget:</span>
                      <span className="font-medium">₹{currentTask.budget?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Estimated Timeline:</span>
                      <span className="font-medium">{currentTask.estimatedTimeline || '0'} days</span>
                    </div>
                    {currentTask.estimatedDeliveryDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Estimated Delivery:</span>
                        <span className="font-medium">{currentTask.estimatedDeliveryDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="sticky bottom-0 bg-gray-800 pt-2 border-t border-gray-700">
            <Button onClick={() => setIsFeaturesDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TasksTable;