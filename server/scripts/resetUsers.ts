import mongoose from 'mongoose';
import { User, UserRole } from '../models/User';

const MONGODB_URI = 'mongodb://localhost:27017/weekod';

async function resetUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Delete all existing users
    await User.deleteMany({});
    console.log('Deleted all existing users');
    
    // Create new users with plain text passwords
    const users = [
      {
        email: 'anthony@weekod.com',
        password: 'anthony@123',
        name: 'Anthony',
        role: UserRole.ADMIN
      },
      {
        email: 'surya@weekod.com',
        password: 'surya@123',
        name: 'Surya',
        role: UserRole.ADMIN
      },
      {
        email: 'margreat@weekod.com',
        password: 'margreat@123',
        name: 'Margreat',
        role: UserRole.EMPLOYEE
      },
      {
        email: 'sanjana@weekod.com',
        password: 'sanjana@123',
        name: 'Sanjana',
        role: UserRole.EMPLOYEE
      }
    ];
    
    // Insert users directly with plain text passwords for testing
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`User created: ${userData.email}`);
    }
    
    console.log('Users reset successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting users:', error);
    process.exit(1);
  }
}

resetUsers();