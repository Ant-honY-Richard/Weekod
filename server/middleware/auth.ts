import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../models/User';
import { log } from '../vite';

const JWT_SECRET = process.env.JWT_SECRET || 'weekod-secret-key';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from Authorization header or from query string (for testing)
    let token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token && req.query.token) {
      token = req.query.token as string;
    }
    
    if (!token) {
      log('Authentication failed: No token provided', 'auth');
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      const user = await User.findById(decoded.id);
      
      if (!user) {
        log(`Authentication failed: User not found for id: ${decoded.id}`, 'auth');
        return res.status(401).json({ message: 'User not found' });
      }
      
      log(`Authenticated user: ${user.name}, role: ${user.role}`, 'auth');
      req.user = user;
      next();
    } catch (jwtError) {
      log(`JWT verification failed: ${jwtError}`, 'auth');
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    log(`Authentication error: ${error}`, 'auth');
    res.status(401).json({ message: 'Authentication failed' });
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === UserRole.ADMIN) {
    log(`Admin authorization successful for user: ${req.user.name}`, 'auth');
    next();
  } else {
    log(`Admin authorization failed for user: ${req.user?.name || 'unknown'}`, 'auth');
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};