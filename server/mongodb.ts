import mongoose from 'mongoose';
import { log } from './vite';

const MONGODB_URI = 'mongodb://localhost:27017/weekod';

export async function connectToMongoDB() {
  try {
    // Set strictQuery to false to prepare for Mongoose 7
    mongoose.set('strictQuery', false);
    
    await mongoose.connect(MONGODB_URI);
    log('Connected to MongoDB', 'mongodb');
    
    // Check connection status
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 1) {
      log('MongoDB connection is open and ready', 'mongodb');
    } else {
      log(`MongoDB connection state: ${connectionState}`, 'mongodb');
    }
  } catch (error) {
    log(`MongoDB connection error: ${error}`, 'mongodb');
    // Don't exit the process, just log the error
    // process.exit(1);
  }
}

mongoose.connection.on('disconnected', () => {
  log('MongoDB disconnected', 'mongodb');
});

mongoose.connection.on('error', (err) => {
  log(`MongoDB error: ${err}`, 'mongodb');
});

mongoose.connection.on('connected', () => {
  log('MongoDB connected successfully', 'mongodb');
});