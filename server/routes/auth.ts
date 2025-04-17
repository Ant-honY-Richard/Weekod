import express, { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../middleware/auth';
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

export default router;