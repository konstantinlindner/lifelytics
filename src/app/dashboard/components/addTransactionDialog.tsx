import { useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { PlusSquare } from "lucide-react";

import AddTransactionDialogContent from "./addTransactionDialogContent";
import { ScreenType } from "./addTransactionConstants";

export default function AddTransactionDialog() {
  const [screen, setScreen] = useState<ScreenType>("new-record");

  const changeScreen = (newScreen: ScreenType) => {
    setScreen(newScreen);
  };

  return (
    <main>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <PlusSquare className="mr-2 h-5 w-5" /> New
          </Button>
        </DialogTrigger>
        <AddTransactionDialogContent
          screen={screen}
          changeScreen={changeScreen}
        />
      </Dialog>
    </main>
  );
}
