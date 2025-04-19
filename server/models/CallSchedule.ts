import mongoose, { Document, Schema } from 'mongoose';

export enum CallStatus {
  SCHEDULED = 'scheduled',
  SPOKEN = 'spoken',
  SPOKEN_INTERESTED = 'spoken_interested',
  SPOKEN_NOT_INTERESTED = 'spoken_not_interested',
  NOT_SPOKEN = 'not_spoken'
}

export interface ICallSchedule extends Document {
  customerName: string;
  customerEmail: string;
  timeZone: string;
  scheduledTime: Date;
  assignedTo: mongoose.Types.ObjectId;
  status: CallStatus;
  notes?: string;
}

const CallScheduleSchema = new Schema<ICallSchedule>({
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  timeZone: {
    type: String,
    required: true
  },
  scheduledTime: {
    type: Date,
    required: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: Object.values(CallStatus),
    default: CallStatus.SCHEDULED
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

export const CallSchedule = mongoose.model<ICallSchedule>('CallSchedule', CallScheduleSchema);