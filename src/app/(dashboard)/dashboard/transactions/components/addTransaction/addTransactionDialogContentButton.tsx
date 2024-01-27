import { ReactNode } from 'react';

import { ScreenType } from './addTransactionConstants';

interface AddTransactionDialogContentButtonProps {
  icon: ReactNode;
  text: string;
  shortcut: string;
  setScreen: (newScreen: ScreenType) => void;
  toScreen: ScreenType;
}

export default function AddTransactionDialogContentButton({
  icon,
  text,
  shortcut,
  setScreen,
  toScreen,
}: AddTransactionDialogContentButtonProps) {
  return (
    <button
      onClick={() => setScreen(toScreen)}
      className="inline-flex flex-col items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground relative duration-300 w-40 h-40 cursor-pointer"
    >
      <kbd className="absolute top-3 left-4 h-5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">{shortcut}</span>
      </kbd>
      {icon}
      <h1 className="p-2">{text}</h1>
    </button>
  );
}
