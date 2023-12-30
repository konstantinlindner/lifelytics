import { useState } from 'react';

import { useUser } from '@/contexts/UserContext';

import DatePicker from '@/components/datePicker';

import { Button } from '@/components/ui/button';

interface ProfilePictureViewProps {
  currentViewIndex: number;
  setCurrentViewIndex: (view: number) => void;
}

export default function BirthDateView({
  currentViewIndex,
  setCurrentViewIndex,
}: ProfilePictureViewProps) {
  const { setBirthDate } = useUser();

  const [date, setDate] = useState<Date | undefined>(undefined);

  function handleDateChange(date: Date) {
    setDate(date);
  }

  function handleNextPress() {
    setCurrentViewIndex(currentViewIndex + 1);

    if (!date) {
      return;
    }

    setBirthDate(date);
  }

  return (
    <section className="w-full space-y-10 flex flex-col items-center">
      <DatePicker
        fromYear={1900}
        toYear={2024}
        handleDateChange={handleDateChange}
      />

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
          onClick={() => handleNextPress()}
        >
          {date ? 'Next' : 'Skip'}
        </Button>
      </div>
    </section>
  );
}
