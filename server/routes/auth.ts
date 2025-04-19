import express, { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken, authenticate } from '../middleware/auth';
import { Task } from '../models/Task';
import { log } from '../vite';

const router = express.Router();

// Login route
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    log(`Login attempt for email: ${email}`, 'auth');
    
    // Validate input
    if (!email || !password) {
      log('Login failed: Email and password are required', 'auth');
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      log(`Login failed: User not found for email: ${email}`, 'auth');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    log(`User found: ${user.name}, role: ${user.role}`, 'auth');
    
    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      log('Login failed: Password does not match', 'auth');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = generateToken(user._id.toString());
    
    log(`Login successful for user: ${user.name}`, 'auth');
    
    // Return user info and token
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    log(`Login error: ${error}`, 'auth');
    res.status(500).json({ message: 'Server error' });
  }
});

// Test route to check if users exist
router.get('/check-users', async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ 
      count: users.length,
      users: users.map(u => ({ name: u.name, email: u.email, role: u.role }))
    });
  } catch (error) {
    console.error('Error checking users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user profile
router.get('/users/me', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    log(`User ${req.user.name} fetching their profile`, 'auth');
    
    // Get user details
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      log(`User not found: ${userId}`, 'auth');
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get tasks assigned to this user if they're an employee
    const tasks = await Task.find({ assignedTo: userId });
    log(`Found ${tasks.length} tasks assigned to user`, 'auth');
    
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
    
    log(`Calculated payout: ${totalPayout} (${payoutPercentage * 100}%)`, 'auth');
    
    // Format project details
    const projectDetails = tasks.map(task => ({
      id: task._id,
      projectName: task.serviceRequired,
      customerName: task.customerName,
      budget: task.budget,
      status: task.status
    }));
    
    res.status(200).json({
      employee: user,
      projectDetails,
      payoutDetails: {
        totalProjects,
        completedProjects: completedTasks.length,
        payoutPercentage: payoutPercentage * 100,
        totalPayout
      }
    });
  } catch (error) {
    log(`Error fetching user profile: ${error}`, 'auth');
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;