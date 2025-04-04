import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for contact form
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const { name, email, company, service, budget, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required' });
      }
      
      // Here you would typically save the contact form submission to a database
      // or send an email notification
      
      // For now, we'll just log it and return success
      console.log('Contact form submission:', {
        name,
        email,
        company,
        service,
        budget,
        message,
        timestamp: new Date().toISOString()
      });
      
      res.status(200).json({ 
        success: true, 
        message: 'Your message has been sent successfully!' 
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ 
        success: false, 
        message: 'There was an error processing your request. Please try again later.' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
