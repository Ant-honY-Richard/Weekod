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
import { Edit, Trash2, Plus, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface CallScheduleTableProps {
  isAdmin: boolean;
  employeeId?: string;
}

const CallScheduleTable = ({ isAdmin, employeeId }: CallScheduleTableProps) => {
  const [callSchedules, setCallSchedules] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCall, setCurrentCall] = useState<any>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    timeZone: '',
    scheduledTime: '',
    assignedTo: '',
    status: 'scheduled',
    notes: ''
  });
  const { toast } = useToast();

  const fetchCallSchedules = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = employeeId 
        ? `/api/call-schedules?assignedTo=${employeeId}` 
        : '/api/call-schedules';
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch call schedules');
      }
      
      const data = await response.json();
      setCallSchedules(data);
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
    fetchCallSchedules();
    fetchEmployees();
  }, [isAdmin, employeeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
      timeZone: '',
      scheduledTime: '',
      assignedTo: '',
      status: 'scheduled',
      notes: ''
    });
  };

  const handleAddCallSchedule = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/call-schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add call schedule');
      }
      
      toast({
        title: 'Success',
        description: 'Call schedule added successfully',
      });
      
      setIsAddDialogOpen(false);
      resetForm();
      fetchCallSchedules();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEditCallSchedule = async () => {
    if (!currentCall) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/call-schedules/${currentCall._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update call schedule');
      }
      
      toast({
        title: 'Success',
        description: 'Call schedule updated successfully',
      });
      
      setIsEditDialogOpen(false);
      setCurrentCall(null);
      fetchCallSchedules();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteCallSchedule = async () => {
    if (!currentCall) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/call-schedules/${currentCall._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete call schedule');
      }
      
      toast({
        title: 'Success',
        description: 'Call schedule deleted successfully',
      });
      
      setIsDeleteDialogOpen(false);
      setCurrentCall(null);
      fetchCallSchedules();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (call: any) => {
    setCurrentCall(call);
    setFormData({
      customerName: call.customerName,
      customerEmail: call.customerEmail,
      timeZone: call.timeZone,
      scheduledTime: new Date(call.scheduledTime).toISOString().slice(0, 16),
      assignedTo: call.assignedTo?._id || '',
      status: call.status,
      notes: call.notes || ''
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (call: any) => {
    setCurrentCall(call);
    setIsDeleteDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case 'spoken':
        return <Badge className="bg-green-500">Spoken</Badge>;
      case 'not_spoken':
        return <Badge className="bg-red-500">Not Spoken</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return 'Invalid date';
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
          {isAdmin ? 'All Call Schedules' : 'My Call Schedules'}
        </h2>
        <Button 
          onClick={() => {
            resetForm();
            setIsAddDialogOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Call Schedule
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Customer Email</TableHead>
              <TableHead>Time Zone</TableHead>
              <TableHead>Scheduled Time</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {callSchedules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                  No call schedules found
                </TableCell>
              </TableRow>
            ) : (
              callSchedules.map((call) => (
                <TableRow key={call._id}>
                  <TableCell>{call.customerName}</TableCell>
                  <TableCell>{call.customerEmail}</TableCell>
                  <TableCell>{call.timeZone}</TableCell>
                  <TableCell>{formatDateTime(call.scheduledTime)}</TableCell>
                  <TableCell>{call.assignedTo?.name || 'Unassigned'}</TableCell>
                  <TableCell>{getStatusBadge(call.status)}</TableCell>
                  <TableCell>
                    {isAdmin ? (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openEditDialog(call)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 border-red-500 hover:bg-red-950"
                          onClick={() => openDeleteDialog(call)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Select
                        value={call.status}
                        onValueChange={(value) => {
                          // Update call status
                          const token = localStorage.getItem('token');
                          fetch(`/api/call-schedules/${call._id}`, {
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
                                description: 'Call status has been updated successfully',
                              });
                              fetchCallSchedules();
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
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="spoken">Spoken</SelectItem>
                          <SelectItem value="not_spoken">Not Spoken</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Call Schedule Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Add New Call Schedule</DialogTitle>
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
                <label htmlFor="timeZone">Time Zone</label>
                <Input
                  id="timeZone"
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                  placeholder="e.g., IST, EST, GMT+5:30"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="scheduledTime">Scheduled Time</label>
                <Input
                  id="scheduledTime"
                  name="scheduledTime"
                  type="datetime-local"
                  value={formData.scheduledTime}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                    {employees.map((employee) => (
                      <SelectItem key={employee._id} value={employee._id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="spoken">Spoken</SelectItem>
                    <SelectItem value="not_spoken">Not Spoken</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="notes">Notes</label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCallSchedule}>Add Call Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Call Schedule Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Edit Call Schedule</DialogTitle>
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
                <label htmlFor="edit-timeZone">Time Zone</label>
                <Input
                  id="edit-timeZone"
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-scheduledTime">Scheduled Time</label>
                <Input
                  id="edit-scheduledTime"
                  name="scheduledTime"
                  type="datetime-local"
                  value={formData.scheduledTime}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                    {employees.map((employee) => (
                      <SelectItem key={employee._id} value={employee._id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="spoken">Spoken</SelectItem>
                    <SelectItem value="not_spoken">Not Spoken</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-notes">Notes</label>
              <Textarea
                id="edit-notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCallSchedule}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Call Schedule Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this call schedule? This action cannot be undone.</p>
            {currentCall && (
              <div className="mt-4 p-4 bg-gray-700 rounded-md">
                <p><strong>Customer:</strong> {currentCall.customerName}</p>
                <p><strong>Scheduled Time:</strong> {formatDateTime(currentCall.scheduledTime)}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteCallSchedule}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CallScheduleTable;