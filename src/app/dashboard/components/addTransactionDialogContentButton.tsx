import { ReactNode } from "react";

import { ScreenType } from "./addTransactionDialog";

interface AddTransactionDialogContentButtonProps {
  icon: ReactNode;
  text: string;
  shortcut: string;
  changeScreen: (newScreen: ScreenType) => void;
  toScreen: ScreenType;
}

export default function AddTransactionDialogContentButton({
  icon,
  text,
  shortcut,
  changeScreen,
  toScreen,
}: AddTransactionDialogContentButtonProps) {
  return (
    <button
      onClick={() => changeScreen(toScreen)}
      className="inline-flex flex-col items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground relative duration-300 w-40 h-40 cursor-pointer"
    >
      <p className="text-sm absolute top-2 left-3">{shortcut}</p>
      {icon}
      <h1 className="p-2">{text}</h1>
    </button>
  );
}
