'use client';

import { useRouter } from 'next/navigation';

import { useUser } from '@/contexts/UserContext';

import ProfilePictureUpload from '@/components/profilePicturePicker';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProfilePictureViewProps {
  currentViewIndex: number;
  setCurrentViewIndex: (view: number) => void;
}

export default function ProfilePictureView({
  currentViewIndex,
  setCurrentViewIndex,
}: ProfilePictureViewProps) {
  const router = useRouter();
  const { user, setOnboardingCompletedDate } = useUser();

  const avatarUrl = user?.avatarUrl ?? '';

  const handleFinishPress = async () => {
    setOnboardingCompletedDate();
    router.refresh();
  };

  return (
    <section className="w-full space-y-10 flex flex-col items-center">
      <Card className="flex px-24 py-32">
        <ProfilePictureUpload />
      </Card>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          className="w-44"
          onClick={() => setCurrentViewIndex(currentViewIndex - 1)}
        >
          Back
        </Button>
        <Button
          variant={avatarUrl ? 'default' : 'secondary'}
          className="w-44"
          onClick={() => handleFinishPress()}
        >
          {avatarUrl ? 'Finish' : 'Skip'}
        </Button>
      </div>
    </section>
  );
}
