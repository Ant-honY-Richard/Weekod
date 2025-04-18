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
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerCompany: '',
    serviceRequired: '',
    projectDetails: '',
    budget: 0,
    expenses: 0,
    status: 'received',
    assignedTo: 'unassigned',
    referredBy: 'web'
  });
  const { toast } = useToast();

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = employeeId 
        ? `/api/tasks?assignedTo=${employeeId}` 
        : '/api/tasks';
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      console.log('Fetched tasks:', data);
      
      // Log the first task to check if it has the budget calculator fields
      if (data.length > 0) {
        console.log('First task details:', {
          id: data[0]._id,
          websiteType: data[0].websiteType,
          complexity: data[0].complexity,
          features: data[0].features,
          supportPlan: data[0].supportPlan,
          projectSummary: data[0].projectSummary
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
              console.error('Error parsing projectSummary:', e);
            }
          }
        }
      }
      
      setTasks(data);
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
      [name]: name === 'budget' || name === 'expenses' ? parseFloat(value) : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
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
      assignedTo: 'unassigned',
      referredBy: 'web'
    });
  };

  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      
      toast({
        title: 'Success',
        description: 'Task added successfully',
      });
      
      setIsAddDialogOpen(false);
      resetForm();
      fetchTasks();
    } catch (error: any) {
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
      const response = await fetch(`/api/tasks/${currentTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
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
    // Store the complete task object for reference (including budget calculator details)
    setCurrentTask(task);
    
    // Set form data for editable fields
    setFormData({
      customerName: task.customerName,
      customerEmail: task.customerEmail,
      customerCompany: task.customerCompany || '',
      serviceRequired: task.serviceRequired,
      projectDetails: task.projectDetails,
      budget: task.budget,
      expenses: task.expenses,
      status: task.status,
      assignedTo: task.assignedTo?._id || 'unassigned',
      referredBy: task.referredBy || 'web'
    });
    
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (task: any) => {
    setCurrentTask(task);
    setIsDeleteDialogOpen(true);
  };
  
  const viewFeatures = (task: any) => {
    console.log('View Features called with task:', task);
    console.log('Task features:', task.features);
    console.log('Task projectSummary:', task.projectSummary);
    
    // Create a copy of the task to avoid modifying the original
    const taskCopy = { ...task };
    
    // If budget calculator fields are missing but projectSummary is present,
    // try to extract the data from projectSummary
    if ((!taskCopy.websiteType || !taskCopy.complexity || !taskCopy.features || !taskCopy.supportPlan) && taskCopy.projectSummary) {
      try {
        console.log('Trying to extract data from projectSummary');
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
        console.error('Error parsing projectSummary:', e);
      }
    }
    
    setCurrentTask(taskCopy);
    try {
      if (taskCopy.features) {
        console.log('Parsing features:', taskCopy.features);
        const features = JSON.parse(taskCopy.features);
        console.log('Parsed features:', features);
        setCurrentFeatures(features);
      } else if (taskCopy.projectSummary) {
        // Try to extract features from projectSummary as a fallback
        try {
          const projectSummary = JSON.parse(taskCopy.projectSummary);
          if (projectSummary.features) {
            console.log('Extracted features from projectSummary:', projectSummary.features);
            setCurrentFeatures(projectSummary.features);
          } else {
            console.log('No features found in projectSummary');
            setCurrentFeatures([]);
          }
        } catch (e) {
          console.error('Error parsing projectSummary for features:', e);
          setCurrentFeatures([]);
        }
      } else {
        console.log('No features or projectSummary found in task');
        setCurrentFeatures([]);
      }
    } catch (e) {
      console.error('Error parsing features:', e);
      setCurrentFeatures([]);
    }
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
              <TableHead>Website Type</TableHead>
              <TableHead>Complexity</TableHead>
              <TableHead>Support Plan</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Expenses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Referred By</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center py-8 text-gray-400">
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
                  <TableCell>{task.websiteType || '-'}</TableCell>
                  <TableCell>{task.complexity || '-'}</TableCell>
                  <TableCell>{task.supportPlan || '-'}</TableCell>
                  <TableCell>₹{task.budget.toLocaleString()}</TableCell>
                  <TableCell>₹{task.expenses.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>{task.referredBy || 'web'}</TableCell>
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
                        className="text-blue-500 border-blue-500 hover:bg-blue-950"
                        onClick={() => viewFeatures(task)}
                      >
                        View Features
                      </Button>
                      {isAdmin && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 border-red-500 hover:bg-red-950"
                          onClick={() => openDeleteDialog(task)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      {!isAdmin && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-blue-500 border-blue-500 hover:bg-blue-950 mr-2"
                            onClick={() => {
                              console.log('Task details:', task);
                              toast({
                                title: 'Task Details',
                                description: `Type: ${task.websiteType || 'N/A'}, Complexity: ${task.complexity || 'N/A'}, Support: ${task.supportPlan || 'N/A'}, Features: ${task.features ? 'Yes' : 'No'}`,
                              });
                            }}
                          >
                            Debug
                          </Button>
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
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
                />
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
            </div>
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
            
            {/* Budget Calculator Details Section */}
            {currentTask && (currentTask.websiteType || currentTask.complexity || currentTask.features || currentTask.supportPlan) && (
              <div className="mt-6 space-y-4 border border-gray-600 rounded-md p-4 bg-gray-700/50">
                <h3 className="text-lg font-semibold border-b border-gray-600 pb-2">Budget Calculator Details</h3>
                
                {currentTask.websiteType && (
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-gray-300">Website Type:</p>
                    <p className="font-medium">{currentTask.websiteType}</p>
                  </div>
                )}
                
                {currentTask.complexity && (
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-gray-300">Complexity Level:</p>
                    <p className="font-medium">{currentTask.complexity}</p>
                  </div>
                )}
                
                {currentTask.features && (
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-gray-300">Selected Features:</p>
                    <div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-500 border-blue-500 hover:bg-blue-950"
                        onClick={() => viewFeatures(currentTask)}
                      >
                        View All Features
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentTask.supportPlan && (
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-gray-300">Support Plan:</p>
                    <p className="font-medium">{currentTask.supportPlan}</p>
                  </div>
                )}
                
                {currentTask.budget > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-gray-300">Estimated Budget:</p>
                    <p className="font-medium">${currentTask.budget.toFixed(2)}</p>
                  </div>
                )}
                
                {currentTask.estimatedTimeline > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-gray-300">Estimated Timeline:</p>
                    <p className="font-medium">{currentTask.estimatedTimeline} days</p>
                  </div>
                )}
                
                {currentTask.estimatedDeliveryDate && (
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-gray-300">Estimated Delivery Date:</p>
                    <p className="font-medium">{currentTask.estimatedDeliveryDate}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTask}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Task Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this task? This action cannot be undone.</p>
            {currentTask && (
              <div className="mt-4 p-4 bg-gray-700 rounded-md">
                <p><strong>Customer:</strong> {currentTask.customerName}</p>
                <p><strong>Service:</strong> {currentTask.serviceRequired}</p>
                {currentTask.budget > 0 && (
                  <p><strong>Budget:</strong> ${currentTask.budget.toFixed(2)}</p>
                )}
                {currentTask.websiteType && (
                  <p><strong>Website Type:</strong> {currentTask.websiteType}</p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
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
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Selected Features</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {currentTask && (
              <div>
                <p className="mb-4">
                  <strong>Website Type:</strong> {currentTask.websiteType || 'Not specified'}
                </p>
                <p className="mb-4">
                  <strong>Complexity Level:</strong> {currentTask.complexity || 'Not specified'}
                </p>
                <p className="mb-4">
                  <strong>Support Plan:</strong> {currentTask.supportPlan || 'Not specified'}
                </p>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Features:</h3>
                  {currentTask.features ? (
                    currentFeatures.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {currentFeatures.map((feature, index) => (
                          <li key={index} className="text-gray-200">{feature}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400">Features data present but couldn't be parsed: {currentTask.features}</p>
                    )
                  ) : (
                    <p className="text-gray-400">No features data available for this task</p>
                  )}
                </div>
                <div className="mt-4 p-4 bg-gray-700 rounded-md">
                  <p><strong>Estimated Budget:</strong> ₹{currentTask.budget?.toLocaleString() || '0'}</p>
                  <p><strong>Estimated Timeline:</strong> {currentTask.estimatedTimeline || '0'} days</p>
                  {currentTask.estimatedDeliveryDate && (
                    <p><strong>Estimated Delivery:</strong> {currentTask.estimatedDeliveryDate}</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
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