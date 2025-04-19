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
    
    // If assignedTo is provided and is a valid ObjectId, filter by it
    if (assignedTo && assignedTo !== 'undefined') {
      // Log the assignedTo value for debugging
      log(`Received assignedTo parameter: ${assignedTo}`, 'tasks');
      
      // Check if it's a valid MongoDB ObjectId
      if (/^[0-9a-fA-F]{24}$/.test(assignedTo as string)) {
        query = { assignedTo };
        log(`Fetching tasks for employee: ${assignedTo}`, 'tasks');
      } else {
        log(`Invalid ObjectId format for assignedTo: ${assignedTo}`, 'tasks');
        // If not a valid ObjectId, return empty result
        return res.status(200).json([]);
      }
    } else if (req.user.role !== 'admin') {
      // If not admin, only show tasks assigned to the user
      query = { assignedTo: req.user._id };
      log(`Employee ${req.user.name} fetching their assigned tasks`, 'tasks');
    } else {
      log('Admin fetching all tasks', 'tasks');
    }
    
    // Make sure to return all fields including budget calculator details
    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    
    // If budget calculator fields are missing, try to update them from projectSummary
    if (tasks.length > 0) {
      for (const task of tasks) {
        if ((!task.websiteType || !task.complexity || !task.features || !task.supportPlan) && task.projectSummary) {
          try {
            const summary = JSON.parse(task.projectSummary);
            
            // Update task with data from projectSummary
            if (!task.websiteType && summary.websiteType) {
              task.websiteType = summary.websiteType;
            }
            if (!task.complexity && summary.complexity) {
              task.complexity = summary.complexity;
            }
            if (!task.features && summary.features) {
              task.features = JSON.stringify(summary.features);
            }
            if (!task.supportPlan && summary.supportPlan) {
              task.supportPlan = summary.supportPlan;
            }
            
            // Also update the database
            await Task.updateOne(
              { _id: task._id },
              { 
                websiteType: task.websiteType,
                complexity: task.complexity,
                features: task.features,
                supportPlan: task.supportPlan
              }
            );
          } catch (e) {
            // Silently handle parsing errors
          }
        }
      }
    }
    
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
      referredBy,
      projectSummary,
      estimatedTimeline,
      estimatedDeliveryDate,
      websiteType,
      complexity,
      features,
      supportPlan
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
    
    // Handle the assignedTo field properly
    let taskAssignedTo = null;
    
    // If assignedTo is provided and not "unassigned"
    if (assignedTo && assignedTo !== 'unassigned' && assignedTo !== 'undefined') {
      // Check if it's a valid MongoDB ObjectId
      if (/^[0-9a-fA-F]{24}$/.test(assignedTo)) {
        taskAssignedTo = assignedTo;
      } else {
        log(`Invalid ObjectId format for assignedTo: ${assignedTo}`, 'tasks');
      }
    } else if (req.user.role === 'employee') {
      // If employee is creating the task, assign it to themselves
      taskAssignedTo = req.user._id;
      log(`Employee ${req.user.name} assigning task to themselves`, 'tasks');
    }
    
    log(`Setting assignedTo to: ${taskAssignedTo}`, 'tasks');
    
    const task = new Task({
      customerName,
      customerEmail,
      customerCompany: customerCompany || '',
      serviceRequired,
      projectDetails,
      budget: parseFloat(budget) || 0,
      expenses: parseFloat(expenses) || 0,
      status: status || TaskStatus.RECEIVED,
      assignedTo: taskAssignedTo,
      referredBy: taskReferredBy,
      projectSummary: projectSummary || '',
      estimatedTimeline: parseInt(estimatedTimeline) || 0,
      estimatedDeliveryDate: estimatedDeliveryDate || '',
      websiteType: websiteType || '',
      complexity: complexity || '',
      features: features || '',
      supportPlan: supportPlan || ''
    });
    
    await task.save();
    log(`Task created with ID: ${task._id}, referred by: ${taskReferredBy}`, 'tasks');
    
    // Populate the assignedTo field before returning the task
    const populatedTask = await Task.findById(task._id).populate('assignedTo', 'name email');
    log(`Task assigned to: ${populatedTask.assignedTo ? populatedTask.assignedTo.name : 'Unassigned'}`, 'tasks');
    
    res.status(201).json(populatedTask);
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
      
      // Allow employees to update status, website type, complexity, features, support plan, and estimated delivery date
      const allowedFields = ['status', 'websiteType', 'complexity', 'features', 'supportPlan', 'estimatedDeliveryDate'];
      const requestedFields = Object.keys(req.body);
      
      // Check if employee is trying to update fields they're not allowed to
      const hasInvalidFields = requestedFields.some(field => !allowedFields.includes(field));
      
      if (hasInvalidFields) {
        log(`Invalid update: Employee tried to update restricted fields`, 'tasks');
        return res.status(403).json({ 
          message: 'You can only update the status, website type, complexity, features, support plan, and estimated delivery date' 
        });
      }
      
      log(`Employee ${req.user.name} updating task`, 'tasks');
      
      // Update allowed fields
      if (req.body.status) task.status = req.body.status;
      if (req.body.websiteType !== undefined) task.websiteType = req.body.websiteType;
      if (req.body.complexity !== undefined) task.complexity = req.body.complexity;
      if (req.body.features !== undefined) task.features = req.body.features;
      if (req.body.supportPlan !== undefined) task.supportPlan = req.body.supportPlan;
      if (req.body.estimatedDeliveryDate !== undefined) task.estimatedDeliveryDate = req.body.estimatedDeliveryDate;
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
        assignedTo,
        projectSummary,
        estimatedTimeline,
        estimatedDeliveryDate
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
      if (projectSummary !== undefined) task.projectSummary = projectSummary;
      if (estimatedTimeline !== undefined) task.estimatedTimeline = parseInt(estimatedTimeline);
      if (estimatedDeliveryDate !== undefined) task.estimatedDeliveryDate = estimatedDeliveryDate;
    }
    
    await task.save();
    log(`Task ${id} updated successfully`, 'tasks');
    
    res.status(200).json(task);
  } catch (error) {
    log(`Error updating task: ${error}`, 'tasks');
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a task (admin or assigned employee)
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findById(id);
    
    if (!task) {
      log(`Task not found: ${id}`, 'tasks');
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check permissions
    if (req.user.role !== 'admin') {
      // Employees can only delete tasks assigned to them
      if (!task.assignedTo || task.assignedTo.toString() !== req.user._id.toString()) {
        log(`Access denied: Employee ${req.user.name} tried to delete task not assigned to them`, 'tasks');
        return res.status(403).json({ message: 'Access denied' });
      }
      log(`Employee ${req.user.name} deleting their assigned task ${id}`, 'tasks');
    } else {
      log(`Admin ${req.user.name} deleting task ${id}`, 'tasks');
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