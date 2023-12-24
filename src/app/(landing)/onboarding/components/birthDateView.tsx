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

import { Calendar as CalendarIcon } from 'lucide-react';

interface ProfilePictureViewProps {
  currentViewIndex: number;
  setCurrentViewIndex: (view: number) => void;
}

export default function BirthDateView({
  currentViewIndex,
  setCurrentViewIndex,
}: ProfilePictureViewProps) {
  const [date, setDate] = useState<Date>();

  return (
    <section className="w-full space-y-10 flex flex-col items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          className="w-44"
          onClick={() => setCurrentViewIndex(currentViewIndex - 1)}
        >
          Back
        </Button>
        <Button
          variant={date ? 'default' : 'secondary'}
          className="w-44"
          onClick={() => setCurrentViewIndex(currentViewIndex + 1)}
        >
          {date ? 'Next' : 'Skip'}
        </Button>
      </div>
    </section>
  );
}
