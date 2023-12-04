import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Landmark,
  CircleDollarSign,
  Receipt,
  Gift,
  Percent,
  Coins,
  Undo2,
  UtensilsCrossed,
  Home,
  Car,
  Drama,
  Heart,
  ShoppingBag,
  RotateCw,
} from 'lucide-react';

import AddTransactionDialogContentButton from './addTransactionDialogContentButton';
import AddTransactionDialogContentInputs from './addTransactionDialogContentInputs';
import { allScreens, ScreenType } from './addTransactionConstants';

interface AddTransactionDialogContentProps {
  screen: ScreenType;
  setScreen: (newScreen: ScreenType) => void;
}

export default function AddTransactionDialogContent({
  screen,
  setScreen,
}: AddTransactionDialogContentProps) {
  const currentScreen = allScreens.find((s) => s.screen === screen);

  if (!currentScreen) {
    return;
  }

  const { title, description } = currentScreen;
  const isEndScreen = !currentScreen.buttonChildren.length;

  return (
    <DialogContent className="max-w-xl overflow-y-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <main className="mx-auto py-7">
        {!isEndScreen && (
          <div
            className={
              currentScreen.buttonChildren.length < 3
                ? 'grid gap-4 grid-cols-2'
                : 'grid gap-4 grid-cols-3'
            }
          >
            {currentScreen.buttonChildren.map((child, index) => (
              <AddTransactionDialogContentButton
                key={index}
                icon={child.icon}
                text={child.title}
                shortcut={String(index + 1)}
                setScreen={setScreen}
                toScreen={child.screen}
              />
            ))}
          </div>
        )}
        {isEndScreen && <AddTransactionDialogContentInputs />}
      </main>
    </DialogContent>
  );
}
