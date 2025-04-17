import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee'
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.EMPLOYEE
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);

// Function to seed initial users
export async function seedUsers() {
  try {
    const count = await User.countDocuments();
    console.log(`Current user count: ${count}`);
    
    if (count === 0) {
      console.log('No users found, seeding initial users...');
      
      // Create users one by one to ensure password hashing works correctly
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

      for (const userData of users) {
        const user = new User(userData);
        await user.save();
        console.log(`User created: ${userData.email}`);
      }
      
      console.log('Initial users seeded successfully');
    } else {
      console.log('Users already exist, skipping seed');
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}