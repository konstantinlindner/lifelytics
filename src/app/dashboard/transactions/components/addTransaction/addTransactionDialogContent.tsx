import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import AddTransactionDialogContentButton from './addTransactionDialogContentButton';
import AddTransactionDialogContentInputs from './addTransactionDialogContentInputs';
import { allScreens, ScreenType } from './addTransactionConstants';

interface AddTransactionDialogContentProps {
  screen: ScreenType;
  changeScreen: (newScreen: ScreenType) => void;
}

export default function AddTransactionDialogContent({
  screen,
  changeScreen,
}: AddTransactionDialogContentProps) {
  const currentScreen = allScreens.find((s) => s.screen === screen);

  if (!currentScreen) {
    return;
  }

  const { title, description } = currentScreen;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <main className="mx-auto py-7">
        <AddTransactionDialogContentInputs />

        {currentScreen.buttonChildren && (
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
                changeScreen={changeScreen}
                toScreen={child.screen}
              />
            ))}
          </div>
        )}
      </main>
    </DialogContent>
  );
}
