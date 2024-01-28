import { useState } from 'react';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CommandItem } from '@/components/ui/command';

import { Plus, Coins } from 'lucide-react';

import AddTransactionDialogContent from './addTransactionDialogContent';
import { ScreenType } from './addTransactionConstants';

interface addTransactionDialogProps {
  openingScreen: ScreenType;
  showButton?: boolean;
  showCommandItem?: boolean;
}

export default function AddTransactionDialog({
  openingScreen,
  showButton,
  showCommandItem,
}: addTransactionDialogProps) {
  const [screen, setScreen] = useState<ScreenType>(openingScreen);

  return (
    <main>
      <Dialog
        onOpenChange={(isOpen) => {
          if (isOpen) {
            setScreen(openingScreen);
          }
        }}
      >
        {showButton && (
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-5 w-5" /> Add
            </Button>
          </DialogTrigger>
        )}
        {showCommandItem && (
          <DialogTrigger asChild>
            <button className="w-full">
              <CommandItem key="1" value="add-transaction">
                <Coins className="mr-2 h-4 w-4" />
                <span>Add transaction</span>
              </CommandItem>
            </button>
          </DialogTrigger>
        )}

        <AddTransactionDialogContent screen={screen} setScreen={setScreen} />
      </Dialog>
    </main>
  );
}