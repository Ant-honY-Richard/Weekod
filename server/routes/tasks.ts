import express, { Request, Response } from 'express';
import { Task, TaskStatus } from '../models/Task';
import { authenticate, authorizeAdmin } from '../middleware/auth';
import { log } from '../vite';

const router = express.Router();

// Get all tasks (admin) or assigned tasks (employee)
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { assignedTo } = req.query;
    let query = {};
    
    // If assignedTo is provided, filter by it
    if (assignedTo) {
      query = { assignedTo };
      log(`Fetching tasks for employee: ${assignedTo}`, 'tasks');
    } else if (req.user.role !== 'admin') {
      // If not admin, only show tasks assigned to the user
      query = { assignedTo: req.user._id };
      log(`Employee ${req.user.name} fetching their assigned tasks`, 'tasks');
    } else {
      log('Admin fetching all tasks', 'tasks');
    }
    
    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    
    log(`Returned ${tasks.length} tasks`, 'tasks');
    res.status(200).json(tasks);
  } catch (error) {
    log(`Error fetching tasks: ${error}`, 'tasks');
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new task (admin or employee)
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const {
      customerName,
      customerEmail,
      customerCompany,
      serviceRequired,
      projectDetails,
      budget,
      expenses,
      status,
      assignedTo,
      referredBy
    } = req.body;
    
    // Set the referredBy field based on who is creating the task
    let taskReferredBy = referredBy || 'web';
    if (!referredBy) {
      taskReferredBy = req.user.role === 'admin' ? 'admin:' + req.user.name : 'employee:' + req.user.name;
    }
    
    log(`User ${req.user.name} creating new task for customer: ${customerName}`, 'tasks');
    
    // Validate required fields
    if (!customerName || !customerEmail || !serviceRequired || !projectDetails) {
      log('Task creation failed: Required fields missing', 'tasks');
      return res.status(400).json({ message: 'Required fields missing' });
    }
    
    const task = new Task({
      customerName,
      customerEmail,
      customerCompany: customerCompany || '',
      serviceRequired,
      projectDetails,
      budget: parseFloat(budget) || 0,
      expenses: parseFloat(expenses) || 0,
      status: status || TaskStatus.RECEIVED,
      assignedTo: assignedTo || null,
      referredBy: taskReferredBy
    });
    
    await task.save();
    log(`Task created with ID: ${task._id}, referred by: ${taskReferredBy}`, 'tasks');
    
    res.status(201).json(task);
  } catch (error) {
    log(`Error creating task: ${error}`, 'tasks');
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a task
router.put('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    log(`Updating task ${id} by user ${req.user.name}`, 'tasks');
    
    const task = await Task.findById(id);
    
    if (!task) {
      log(`Task not found: ${id}`, 'tasks');
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check permissions
    if (req.user.role !== 'admin') {
      // Employees can only update status of their assigned tasks
      if (!task.assignedTo || task.assignedTo.toString() !== req.user._id.toString()) {
        log(`Access denied: Employee ${req.user.name} tried to update task not assigned to them`, 'tasks');
        return res.status(403).json({ message: 'Access denied' });
      }
      
      // Only allow status updates for employees
      if (Object.keys(req.body).length > 1 || !req.body.status) {
        log(`Invalid update: Employee tried to update more than status`, 'tasks');
        return res.status(403).json({ message: 'You can only update the status' });
      }
      
      log(`Employee ${req.user.name} updating task status to: ${req.body.status}`, 'tasks');
      task.status = req.body.status;
    } else {
      // Admin can update all fields
      const {
        customerName,
        customerEmail,
        customerCompany,
        serviceRequired,
        projectDetails,
        budget,
        expenses,
        status,
        assignedTo
      } = req.body;
      
      log(`Admin ${req.user.name} updating task details`, 'tasks');
      
      if (customerName) task.customerName = customerName;
      if (customerEmail) task.customerEmail = customerEmail;
      if (customerCompany !== undefined) task.customerCompany = customerCompany;
      if (serviceRequired) task.serviceRequired = serviceRequired;
      if (projectDetails) task.projectDetails = projectDetails;
      if (budget !== undefined) task.budget = parseFloat(budget);
      if (expenses !== undefined) task.expenses = parseFloat(expenses);
      if (status) task.status = status;
      if (assignedTo !== undefined) task.assignedTo = assignedTo || null;
    }
    
    await task.save();
    log(`Task ${id} updated successfully`, 'tasks');
    
    res.status(200).json(task);
  } catch (error) {
    log(`Error updating task: ${error}`, 'tasks');
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a task (admin only)
router.delete('/:id', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    log(`Admin ${req.user.name} attempting to delete task ${id}`, 'tasks');
    
    const task = await Task.findById(id);
    
    if (!task) {
      log(`Task not found: ${id}`, 'tasks');
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await task.deleteOne();
    log(`Task ${id} deleted successfully`, 'tasks');
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    log(`Error deleting task: ${error}`, 'tasks');
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;