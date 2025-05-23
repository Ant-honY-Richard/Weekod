import express, { Request, Response } from 'express';
import { CallSchedule, CallStatus } from '../models/CallSchedule';
import { authenticate, authorizeAdmin } from '../middleware/auth';
import { log } from '../vite';

const router = express.Router();

// Get all call schedules (admin) or assigned call schedules (employee)
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { assignedTo } = req.query;
    let query = {};
    
    // If assignedTo is provided and is a valid ObjectId, filter by it
    if (assignedTo && assignedTo !== 'undefined') {
      // Log the assignedTo value for debugging
      log(`Received assignedTo parameter: ${assignedTo}`, 'call-schedules');
      
      // Check if it's a valid MongoDB ObjectId
      if (/^[0-9a-fA-F]{24}$/.test(assignedTo as string)) {
        query = { assignedTo };
        log(`Fetching call schedules for employee: ${assignedTo}`, 'call-schedules');
      } else {
        log(`Invalid ObjectId format for assignedTo: ${assignedTo}`, 'call-schedules');
        // If not a valid ObjectId, return empty result
        return res.status(200).json([]);
      }
    } else if (req.user.role !== 'admin') {
      // If not admin, only show calls assigned to the user
      query = { assignedTo: req.user._id };
      log(`Employee ${req.user.name} fetching their assigned call schedules`, 'call-schedules');
    } else {
      log('Admin fetching all call schedules', 'call-schedules');
    }
    
    const callSchedules = await CallSchedule.find(query)
      .populate('assignedTo', 'name email')
      .sort({ scheduledTime: 1 });
    
    log(`Returned ${callSchedules.length} call schedules`, 'call-schedules');
    res.status(200).json(callSchedules);
  } catch (error) {
    log(`Error fetching call schedules: ${error}`, 'call-schedules');
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new call schedule (admin and employees)
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const {
      customerName,
      customerEmail,
      phoneNumber,
      scheduledTime,
      assignedTo,
      status,
      notes
    } = req.body;
    
    // For employees, they can only create call schedules assigned to themselves
    let finalAssignedTo = assignedTo;
    
    if (req.user.role !== 'admin') {
      // If employee, force assignedTo to be their own ID
      finalAssignedTo = req.user._id;
      log(`Employee ${req.user.name} creating new call schedule for customer: ${customerName}`, 'call-schedules');
    } else {
      log(`Admin ${req.user.name} creating new call schedule for customer: ${customerName}`, 'call-schedules');
    }
    
    // Validate required fields
    if (!customerName || !customerEmail || !phoneNumber || !scheduledTime) {
      log('Call schedule creation failed: Required fields missing', 'call-schedules');
      return res.status(400).json({ message: 'Required fields missing' });
    }
    
    // Validate phone number is exactly 10 digits (Indian format)
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      log(`Call schedule creation failed: Invalid phone number format: ${phoneNumber}`, 'call-schedules');
      return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
    }
    
    const callSchedule = new CallSchedule({
      customerName,
      customerEmail,
      phoneNumber,
      scheduledTime: new Date(scheduledTime),
      assignedTo: finalAssignedTo,
      status: status || CallStatus.SCHEDULED,
      notes: notes || ''
    });
    
    await callSchedule.save();
    log(`Call schedule created with ID: ${callSchedule._id}`, 'call-schedules');
    
    res.status(201).json(callSchedule);
  } catch (error) {
    log(`Error creating call schedule: ${error}`, 'call-schedules');
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a call schedule
router.put('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    log(`Updating call schedule ${id} by user ${req.user.name}`, 'call-schedules');
    
    const callSchedule = await CallSchedule.findById(id);
    
    if (!callSchedule) {
      log(`Call schedule not found: ${id}`, 'call-schedules');
      return res.status(404).json({ message: 'Call schedule not found' });
    }
    
    // Check permissions
    if (req.user.role !== 'admin') {
      // Employees can only update status and notes of their assigned calls
      if (!callSchedule.assignedTo || callSchedule.assignedTo.toString() !== req.user._id.toString()) {
        log(`Access denied: Employee ${req.user.name} tried to update call not assigned to them`, 'call-schedules');
        return res.status(403).json({ message: 'Access denied' });
      }
      
      // Only allow status and notes updates for employees
      const allowedUpdates = ['status', 'notes'];
      const requestedUpdates = Object.keys(req.body);
      const isValidOperation = requestedUpdates.every(update => allowedUpdates.includes(update));
      
      if (!isValidOperation) {
        log(`Invalid update: Employee tried to update more than status/notes`, 'call-schedules');
        return res.status(403).json({ message: 'You can only update the status and notes' });
      }
      
      log(`Employee ${req.user.name} updating call status to: ${req.body.status}`, 'call-schedules');
      if (req.body.status) callSchedule.status = req.body.status;
      if (req.body.notes !== undefined) callSchedule.notes = req.body.notes;
    } else {
      // Admin can update all fields
      const {
        customerName,
        customerEmail,
        phoneNumber,
        scheduledTime,
        assignedTo,
        status,
        notes
      } = req.body;
      
      log(`Admin ${req.user.name} updating call schedule details`, 'call-schedules');
      
      if (customerName) callSchedule.customerName = customerName;
      if (customerEmail) callSchedule.customerEmail = customerEmail;
      if (phoneNumber) callSchedule.phoneNumber = phoneNumber;
      if (scheduledTime) callSchedule.scheduledTime = new Date(scheduledTime);
      if (assignedTo !== undefined) callSchedule.assignedTo = assignedTo;
      if (status) callSchedule.status = status;
      if (notes !== undefined) callSchedule.notes = notes;
    }
    
    await callSchedule.save();
    log(`Call schedule ${id} updated successfully`, 'call-schedules');
    
    res.status(200).json(callSchedule);
  } catch (error) {
    log(`Error updating call schedule: ${error}`, 'call-schedules');
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a call schedule (admin or assigned employee)
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const callSchedule = await CallSchedule.findById(id);
    
    if (!callSchedule) {
      log(`Call schedule not found: ${id}`, 'call-schedules');
      return res.status(404).json({ message: 'Call schedule not found' });
    }
    
    // Check permissions
    if (req.user.role !== 'admin') {
      // Employees can only delete calls assigned to them
      if (!callSchedule.assignedTo || callSchedule.assignedTo.toString() !== req.user._id.toString()) {
        log(`Access denied: Employee ${req.user.name} tried to delete call not assigned to them`, 'call-schedules');
        return res.status(403).json({ message: 'Access denied' });
      }
      log(`Employee ${req.user.name} deleting their assigned call ${id}`, 'call-schedules');
    } else {
      log(`Admin ${req.user.name} deleting call schedule ${id}`, 'call-schedules');
    }
    
    await callSchedule.deleteOne();
    log(`Call schedule ${id} deleted successfully`, 'call-schedules');
    
    res.status(200).json({ message: 'Call schedule deleted successfully' });
  } catch (error) {
    log(`Error deleting call schedule: ${error}`, 'call-schedules');
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;