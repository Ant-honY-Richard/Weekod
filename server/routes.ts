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
      console.log("Contact form submission received:", req.body);
      
      const { 
        name, 
        email, 
        company, 
        service, 
        budget, 
        message, 
        projectSummary, 
        estimatedTimeline, 
        estimatedDeliveryDate,
        // Extract individual calculator fields
        websiteType,
        complexity,
        features,
        supportPlan
      } = req.body;
      
      log(`Contact form submission received from: ${name} (${email})`, 'contact');
      log(`Form data: ${JSON.stringify(req.body)}`, 'contact');
      
      // Log detailed budget calculator information
      log(`Budget Calculator Details:`, 'contact');
      log(`Website Type: ${websiteType}`, 'contact');
      log(`Complexity: ${complexity}`, 'contact');
      log(`Selected Features: ${features}`, 'contact');
      log(`Support Plan: ${supportPlan}`, 'contact');
      log(`Estimated Budget: $${budget}`, 'contact');
      log(`Estimated Timeline: ${estimatedTimeline} days`, 'contact');
      log(`Estimated Delivery Date: ${estimatedDeliveryDate}`, 'contact');
      
      // Validate required fields
      if (!name || !email || !message) {
        log('Contact form validation failed: Missing required fields', 'contact');
        log(`Received: name=${name}, email=${email}, message=${message}`, 'contact');
        return res.status(400).json({ message: 'Name, email, and message are required' });
      }
      
      try {
        // Save contact form as a task with detailed budget calculator information
        const task = new Task({
          customerName: name,
          customerEmail: email,
          customerCompany: company || '',
          serviceRequired: service || 'General Inquiry',
          projectDetails: message,
          budget: parseFloat(budget) || 0,
          status: TaskStatus.RECEIVED,
          referredBy: 'web',
          projectSummary: projectSummary || '',
          estimatedTimeline: parseInt(estimatedTimeline) || 0,
          estimatedDeliveryDate: estimatedDeliveryDate || '',
          // Add detailed budget calculator fields
          websiteType: websiteType || '',
          complexity: complexity || '',
          features: features || '[]',
          supportPlan: supportPlan || ''
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
  
  // Public API route for scheduling calls from the website
  app.post('/api/schedule-call', async (req: Request, res: Response) => {
    try {
      // Log the entire request body for debugging
      log(`Call schedule request body: ${JSON.stringify(req.body)}`, 'call-schedule');
      
      const { customerName, customerEmail, phoneNumber, scheduledTime, message } = req.body;
      
      log(`Call schedule request received from: ${customerName} (${customerEmail})`, 'call-schedule');
      
      // Log all fields for debugging
      log(`Validating fields: 
        customerName: ${customerName ? 'present' : 'missing'}
        customerEmail: ${customerEmail ? 'present' : 'missing'}
        phoneNumber: ${phoneNumber ? 'present' : 'missing'} (${phoneNumber})
        scheduledTime: ${scheduledTime ? 'present' : 'missing'} (${scheduledTime})
      `, 'call-schedule');
      
      // Validate required fields with detailed logging
      if (!customerName) {
        log('Call schedule validation failed: Missing customerName', 'call-schedule');
        return res.status(400).json({ message: 'Customer name is required' });
      }
      if (!customerEmail) {
        log('Call schedule validation failed: Missing customerEmail', 'call-schedule');
        return res.status(400).json({ message: 'Customer email is required' });
      }
      if (!phoneNumber) {
        log('Call schedule validation failed: Missing phoneNumber', 'call-schedule');
        return res.status(400).json({ message: 'Phone number is required' });
      }
      if (!scheduledTime) {
        log('Call schedule validation failed: Missing scheduledTime', 'call-schedule');
        return res.status(400).json({ message: 'Scheduled time is required' });
      }
      
      // Accept any 10-digit number for now
      if (phoneNumber && phoneNumber.length !== 10) {
        log(`Call schedule validation failed: Phone number must be 10 digits: ${phoneNumber}`, 'call-schedule');
        return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
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
        
        // Find the employee with the fewest assigned calls for better distribution
        let assignedEmployee = employees[0];
        
        try {
          // Count calls for each employee
          const employeeCallCounts = await Promise.all(
            employees.map(async (employee) => {
              const count = await CallSchedule.countDocuments({ assignedTo: employee._id });
              return { employee, count };
            })
          );
          
          // Sort by count (ascending) and get the employee with the fewest calls
          const sortedEmployees = employeeCallCounts.sort((a, b) => a.count - b.count);
          assignedEmployee = sortedEmployees[0].employee;
          
          log(`Assigned call to ${assignedEmployee.name} who has ${sortedEmployees[0].count} calls`, 'call-schedule');
        } catch (err) {
          log(`Error finding employee with fewest calls, using default: ${err}`, 'call-schedule');
          // Fall back to first employee if there's an error
        }
        
        // Create call schedule
        const callSchedule = new CallSchedule({
          customerName,
          customerEmail,
          phoneNumber,
          scheduledTime: new Date(scheduledTime),
          assignedTo: assignedEmployee._id,
          status: CallStatus.SCHEDULED,
          notes: message || ''
        });
        
        await callSchedule.save();
        log(`Call scheduled with ID: ${callSchedule._id}, assigned to: ${assignedEmployee.name}`, 'call-schedule');
        
        // We're no longer creating a task for call schedules
        // This ensures call schedules only appear in the Call Schedules tab
        log(`Call schedule created successfully without creating a task`, 'call-schedule');
        
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
