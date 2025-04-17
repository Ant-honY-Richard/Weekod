import express, { Request, Response } from 'express';
import { User, UserRole } from '../models/User';
import { Task } from '../models/Task';
import { authenticate, authorizeAdmin } from '../middleware/auth';
import { log } from '../vite';

const router = express.Router();

// Get all employees
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    log(`User ${req.user.name} fetching employees list`, 'employees');
    
    // Only admins can see all employees, employees can only see themselves
    if (req.user.role !== UserRole.ADMIN) {
      log(`Employee ${req.user.name} attempted to access all employees list`, 'employees');
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const employees = await User.find({ role: UserRole.EMPLOYEE }).select('-password');
    log(`Returned ${employees.length} employees`, 'employees');
    
    res.status(200).json(employees);
  } catch (error) {
    log(`Error fetching employees: ${error}`, 'employees');
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new employee (admin only)
router.post('/', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    
    log(`Admin ${req.user.name} creating new employee: ${name}`, 'employees');
    
    // Validate required fields
    if (!name || !email || !password) {
      log('Employee creation failed: Required fields missing', 'employees');
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      log(`Employee creation failed: Email ${email} already exists`, 'employees');
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    // Create new employee
    const newEmployee = new User({
      name,
      email,
      password,
      role: UserRole.EMPLOYEE // Force role to be employee for security
    });
    
    await newEmployee.save();
    log(`Employee created with ID: ${newEmployee._id}`, 'employees');
    
    // Return employee without password
    const employeeToReturn = newEmployee.toObject();
    delete employeeToReturn.password;
    
    res.status(201).json(employeeToReturn);
  } catch (error) {
    log(`Error creating employee: ${error}`, 'employees');
    res.status(500).json({ message: 'Server error' });
  }
});

// Get employee details with projects
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    log(`Fetching details for employee ID: ${id}`, 'employees');
    
    // Check if user is admin or the employee themselves
    if (req.user.role !== UserRole.ADMIN && req.user._id.toString() !== id) {
      log(`Access denied: User ${req.user.name} tried to access employee ${id} details`, 'employees');
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const employee = await User.findById(id).select('-password');
    
    if (!employee) {
      log(`Employee not found: ${id}`, 'employees');
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    log(`Found employee: ${employee.name}`, 'employees');
    
    // Get tasks assigned to this employee
    const tasks = await Task.find({ assignedTo: id });
    log(`Found ${tasks.length} tasks assigned to employee`, 'employees');
    
    // Calculate payout based on number of completed projects
    const completedTasks = tasks.filter(task => task.status === 'completed');
    const totalProjects = tasks.length;
    
    let payoutPercentage = 0;
    if (totalProjects === 1) {
      payoutPercentage = 0.2; // 20%
    } else if (totalProjects === 2) {
      payoutPercentage = 0.25; // 25%
    } else if (totalProjects >= 3 && totalProjects <= 6) {
      payoutPercentage = 0.3; // 30%
    } else if (totalProjects >= 7 && totalProjects <= 9) {
      payoutPercentage = 0.35; // 35%
    } else if (totalProjects >= 10) {
      payoutPercentage = 0.4; // 40%
    }
    
    // Calculate total payout
    const totalBudget = completedTasks.reduce((sum, task) => sum + task.budget, 0);
    const totalPayout = Math.round(totalBudget * payoutPercentage);
    
    log(`Calculated payout: ${totalPayout} (${payoutPercentage * 100}%)`, 'employees');
    
    // Format project details
    const projectDetails = tasks.map(task => ({
      id: task._id,
      projectName: task.serviceRequired,
      customerName: task.customerName,
      budget: task.budget,
      status: task.status
    }));
    
    res.status(200).json({
      employee,
      projectDetails,
      payoutDetails: {
        totalProjects,
        completedProjects: completedTasks.length,
        payoutPercentage: payoutPercentage * 100,
        totalPayout
      }
    });
  } catch (error) {
    log(`Error fetching employee details: ${error}`, 'employees');
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;