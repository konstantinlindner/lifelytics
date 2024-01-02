import { useState } from 'react';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

import { Calendar as CalendarIcon } from 'lucide-react';

interface ProfilePictureViewProps {
  fromYear: number;
  toYear: number;
  initialDate?: Date;
  handleDateChange: (date: Date) => void;
}

export default function DatePicker({
  initialDate,
  fromYear,
  toYear,
  handleDateChange,
}: ProfilePictureViewProps) {
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [stringDate, setStringDate] = useState(
    initialDate ? format(initialDate, 'PPP') : '',
  );
  // const [errorMessage, setErrorMessage] = useState<string>('');

  function handleDateChangeInternal(date: Date) {
    setDate(date);
    handleDateChange(date);
  }

  return (
    <Popover key={date?.getDate()}>
      <div className="relative w-[280px]">
        <Input
          type="string"
          value={stringDate}
          onFocus={() => {
            if (date) setStringDate(format(date, 'MM/dd/yyyy'));
          }}
          onChange={(e) => {
            if (date) setStringDate('');
            setStringDate(e.target.value);
          }}
          onBlur={(e) => {
            const parsedDate = new Date(e.target.value);
            if (parsedDate.toString() === 'Invalid Date') {
              // setErrorMessage('Invalid Date');
              console.log('Invalid date');
            } else {
              // setErrorMessage('');
              handleDateChangeInternal(parsedDate);
              setStringDate(format(parsedDate, 'PPP'));
            }
          }}
        />
        {/* {errorMessage !== '' && (
          <div className="absolute bottom-[-1.75rem] left-0 text-red-400 text-sm">
            {errorMessage}
          </div>
        )} */}
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent align="end" className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={date}
          defaultMonth={date}
          onSelect={(selectedDate) => {
            if (!selectedDate) return;
            handleDateChangeInternal(selectedDate);
            setStringDate(format(selectedDate, 'PPP'));
            // setErrorMessage('');
          }}
          fromYear={fromYear}
          toYear={toYear}
        />
      </PopoverContent>
    </Popover>
  );
}
