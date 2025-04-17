import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, X, Check, Phone } from 'lucide-react';
import { Button } from './button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './dialog';
import { Input } from './input';
import { Label } from './label';
import { Calendar } from './calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

// Available time slots
const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

// Available timezones (simplified list)
const TIMEZONES = [
  { value: 'UTC-8', label: 'Pacific Time (PT)' },
  { value: 'UTC-7', label: 'Mountain Time (MT)' },
  { value: 'UTC-6', label: 'Central Time (CT)' },
  { value: 'UTC-5', label: 'Eastern Time (ET)' },
  { value: 'UTC+0', label: 'Greenwich Mean Time (GMT)' },
  { value: 'UTC+1', label: 'Central European Time (CET)' },
  { value: 'UTC+2', label: 'Eastern European Time (EET)' },
  { value: 'UTC+5:30', label: 'Indian Standard Time (IST)' },
  { value: 'UTC+8', label: 'China Standard Time (CST)' },
  { value: 'UTC+9', label: 'Japan Standard Time (JST)' },
  { value: 'UTC+10', label: 'Australian Eastern Time (AET)' }
];

// Detect user's timezone
const getUserTimezone = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // Map timezone to our simplified list (default to ET if not found)
  const mapping: Record<string, string> = {
    'America/Los_Angeles': 'UTC-8',
    'America/Denver': 'UTC-7',
    'America/Chicago': 'UTC-6',
    'America/New_York': 'UTC-5',
    'Europe/London': 'UTC+0',
    'Europe/Paris': 'UTC+1',
    'Europe/Athens': 'UTC+2',
    'Asia/Kolkata': 'UTC+5:30',
    'Asia/Shanghai': 'UTC+8',
    'Asia/Tokyo': 'UTC+9',
    'Australia/Sydney': 'UTC+10'
  };
  
  // Try to find a match, otherwise default to Eastern Time
  for (const [key, value] of Object.entries(mapping)) {
    if (timezone.includes(key)) return value;
  }
  return 'UTC-5'; // Default to Eastern Time
};

type Step = 'info' | 'date' | 'time' | 'confirmation' | 'success';

export function CallScheduler() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('info');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [timezone, setTimezone] = useState(getUserTimezone());
  const [isButtonGlowing, setIsButtonGlowing] = useState(true);

  // Toggle button glow effect
  useState(() => {
    const interval = setInterval(() => {
      setIsButtonGlowing(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  });

  const resetForm = () => {
    setStep('info');
    setDate(undefined);
    setTime(undefined);
    setName('');
    setEmail('');
    setTimezone(getUserTimezone());
  };

  const handleOpen = () => {
    setOpen(true);
    resetForm();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = async () => {
    if (step === 'info') {
      setStep('date');
    } else if (step === 'date') {
      setStep('time');
    } else if (step === 'time') {
      setStep('confirmation');
    } else if (step === 'confirmation') {
      try {
        // Format the date and time for the API
        const scheduledDateTime = new Date(date!);
        const [hours, minutes, period] = time!.match(/(\d+):(\d+)\s+([AP]M)/)!.slice(1);
        let hour = parseInt(hours);
        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;
        
        scheduledDateTime.setHours(hour, parseInt(minutes), 0);
        
        // Send the data to the backend
        const response = await fetch('/api/schedule-call', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerName: name,
            customerEmail: email,
            timeZone: timezone,
            scheduledTime: scheduledDateTime.toISOString(),
            message: `Call scheduled from website for ${name} (${email})`
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to schedule call');
        }
        
        setStep('success');
      } catch (error) {
        console.error('Error scheduling call:', error);
        // Show error but stay on confirmation page
        alert('There was an error scheduling your call. Please try again.');
      }
    }
  };

  const handleBack = () => {
    if (step === 'date') {
      setStep('info');
    } else if (step === 'time') {
      setStep('date');
    } else if (step === 'confirmation') {
      setStep('time');
    }
  };

  const isNextDisabled = () => {
    if (step === 'info') {
      return !name || !email || !email.includes('@');
    } else if (step === 'date') {
      return !date;
    } else if (step === 'time') {
      return !time;
    }
    return false;
  };

  return (
    <>
      {/* Call Scheduler Button */}
      <button
        onClick={handleOpen}
        className="btn-6 w-full whitespace-nowrap"
      >
        <span>
          <Phone className="inline-block mr-2 h-4 w-4" />
          Schedule a Call
        </span>
      </button>

      {/* Call Scheduler Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              {step === 'success' ? 'Call Scheduled!' : 'Schedule a Call'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {step === 'info' && "Let's get to know you first."}
              {step === 'date' && "Select a date for your call."}
              {step === 'time' && "Choose a time that works for you."}
              {step === 'confirmation' && "Please confirm your booking details."}
              {step === 'success' && "We're looking forward to speaking with you!"}
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step 1: User Info */}
              {step === 'info' && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="bg-gray-800 border-gray-700 focus-visible:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="bg-gray-800 border-gray-700 focus-visible:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Your Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 focus:ring-purple-500">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {TIMEZONES.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Date Selection */}
              {step === 'date' && (
                <div className="py-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border border-gray-700 bg-gray-800"
                    // Disable past dates, weekends, and next 2 months
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const twoMonthsLater = new Date();
                      twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
                      
                      return (
                        date < today ||
                        date > twoMonthsLater ||
                        date.getDay() === 0 ||
                        date.getDay() === 6
                      );
                    }}
                  />
                </div>
              )}

              {/* Step 3: Time Selection */}
              {step === 'time' && (
                <div className="py-4 space-y-4">
                  <p className="text-sm text-gray-400 flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'EEEE, MMMM do, yyyy') : 'Select a date'}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <Button
                        key={slot}
                        type="button"
                        variant={time === slot ? 'default' : 'outline'}
                        className={cn(
                          "justify-start",
                          time === slot 
                            ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white" 
                            : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                        )}
                        onClick={() => setTime(slot)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 'confirmation' && (
                <div className="py-4 space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="font-medium">{name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="font-medium">{email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date:</span>
                      <span className="font-medium">{date ? format(date, 'MMMM do, yyyy') : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time:</span>
                      <span className="font-medium">{time} ({timezone})</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    By confirming, you agree to our scheduling policy. You'll receive a confirmation email with details and a calendar invite.
                  </p>
                </div>
              )}

              {/* Step 5: Success */}
              {step === 'success' && (
                <div className="py-6 flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-medium">Your call is scheduled!</h3>
                    <p className="text-gray-400">
                      {date && time ? `${format(date, 'MMMM do, yyyy')} at ${time}` : 'Your selected time'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      We've sent a confirmation to {email} with all the details.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            {step !== 'success' && (
              <>
                {step !== 'info' && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="mt-2 sm:mt-0 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className={cn(
                    "bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white",
                    isNextDisabled() && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {step === 'confirmation' ? 'Confirm Booking' : 'Next'}
                </Button>
              </>
            )}
            {step === 'success' && (
              <Button
                type="button"
                onClick={handleClose}
                className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600 text-white"
              >
                Done
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}