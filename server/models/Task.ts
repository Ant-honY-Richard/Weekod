import mongoose, { Document, Schema } from 'mongoose';

export enum TaskStatus {
  RECEIVED = 'received',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected'
}

export interface ITask extends Document {
  customerName: string;
  customerEmail: string;
  customerCompany: string;
  serviceRequired: string;
  projectDetails: string;
  budget: number;
  expenses: number;
  status: TaskStatus;
  assignedTo?: mongoose.Types.ObjectId;
  referredBy: string; // 'web' or employee name/id
}

const TaskSchema = new Schema<ITask>({
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerCompany: {
    type: String,
    default: ''
  },
  serviceRequired: {
    type: String,
    required: true
  },
  projectDetails: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  expenses: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.RECEIVED
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  referredBy: {
    type: String,
    default: 'web'
  }
}, {
  timestamps: true
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);