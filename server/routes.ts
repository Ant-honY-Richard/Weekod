import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { connectToMongoDB } from "./mongodb";
import { User, seedUsers, UserRole } from "./models/User";
import { Task, TaskStatus } from "./models/Task";
import { CallSchedule, CallStatus } from "./models/CallSchedule";
import { log } from "./vite";

// Import routes
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import callScheduleRoutes from "./routes/callSchedules";
import employeeRoutes from "./routes/employees";

export async function registerRoutes(app: Express): Promise<Server> {
  // Connect to MongoDB
  try {
    await connectToMongoDB();
    log('MongoDB connection successful', 'startup');
    
    // Seed initial users
    await seedUsers();
    log('User seeding process completed', 'startup');
  } catch (error) {
    log(`Error during startup: ${error}`, 'startup');
  }
  
  // Register API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/tasks', taskRoutes);
  app.use('/api/call-schedules', callScheduleRoutes);
  app.use('/api/employees', employeeRoutes);
  
  // API routes for contact form
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const { name, email, company, service, budget, message } = req.body;
      
      log(`Contact form submission received from: ${name} (${email})`, 'contact');
      
      // Validate required fields
      if (!name || !email || !message) {
        log('Contact form validation failed: Missing required fields', 'contact');
        return res.status(400).json({ message: 'Name, email, and message are required' });
      }
      
      try {
        // Save contact form as a task
        const task = new Task({
          customerName: name,
          customerEmail: email,
          customerCompany: company || '',
          serviceRequired: service || 'General Inquiry',
          projectDetails: message,
          budget: parseFloat(budget) || 0,
          status: TaskStatus.RECEIVED,
          referredBy: 'web'
        });
        
        await task.save();
        log(`Contact form saved as task with ID: ${task._id}`, 'contact');
        
        res.status(200).json({ 
          success: true, 
          message: 'Your message has been sent successfully!' 
        });
      } catch (saveError) {
        log(`Error saving contact form as task: ${saveError}`, 'contact');
        throw saveError;
      }
    } catch (error) {
      console.error('Error processing contact form:', error);
      log(`Contact form error: ${error}`, 'contact');
      res.status(500).json({ 
        success: false, 
        message: 'There was an error processing your request. Please try again later.' 
      });
    }
  });
  
  // API route for scheduling calls from the website
  app.post('/api/schedule-call', async (req: Request, res: Response) => {
    try {
      const { customerName, customerEmail, timeZone, scheduledTime, message } = req.body;
      
      log(`Call schedule request received from: ${customerName} (${customerEmail})`, 'call-schedule');
      
      // Validate required fields
      if (!customerName || !customerEmail || !timeZone || !scheduledTime) {
        log('Call schedule validation failed: Missing required fields', 'call-schedule');
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      try {
        // Find an employee to assign the call to (simple round-robin)
        const employees = await User.find({ role: 'employee' });
        
        if (employees.length === 0) {
          log('No employees found to assign call to', 'call-schedule');
          return res.status(500).json({ 
            success: false, 
            message: 'Unable to schedule call at this time. Please try again later.' 
          });
        }
        
        // Simple assignment - first employee in the list
        const assignedEmployee = employees[0];
        
        // Create call schedule
        const callSchedule = new CallSchedule({
          customerName,
          customerEmail,
          timeZone,
          scheduledTime: new Date(scheduledTime),
          assignedTo: assignedEmployee._id,
          status: CallStatus.SCHEDULED,
          notes: message || ''
        });
        
        await callSchedule.save();
        log(`Call scheduled with ID: ${callSchedule._id}, assigned to: ${assignedEmployee.name}`, 'call-schedule');
        
        // Also create a task for this customer
        const task = new Task({
          customerName,
          customerEmail,
          customerCompany: '',
          serviceRequired: 'Call Requested',
          projectDetails: message || `Customer requested a call on ${new Date(scheduledTime).toLocaleString()} (${timeZone})`,
          budget: 0,
          status: TaskStatus.RECEIVED,
          referredBy: 'web'
        });
        
        await task.save();
        log(`Task created from call schedule with ID: ${task._id}`, 'call-schedule');
        
        res.status(200).json({ 
          success: true, 
          message: 'Your call has been scheduled successfully!' 
        });
      } catch (saveError) {
        log(`Error saving call schedule: ${saveError}`, 'call-schedule');
        throw saveError;
      }
    } catch (error) {
      console.error('Error scheduling call:', error);
      log(`Call schedule error: ${error}`, 'call-schedule');
      res.status(500).json({ 
        success: false, 
        message: 'There was an error scheduling your call. Please try again later.' 
      });
    }
  });

  // Test route to check if the server is running
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
