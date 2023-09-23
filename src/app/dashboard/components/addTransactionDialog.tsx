import { useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  PlusSquare,
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
} from "lucide-react";

import AddTransactionDialogContent from "./addTransactionDialogContent";

const expenseChildren = [
  {
    screen: "home",
    title: "Home",
    description: "Enter the details below.",
    icon: <Home />,
    children: [],
  },
  {
    screen: "food-and-drink",
    title: "Food and Drink",
    description: "Enter the details below.",
    icon: <UtensilsCrossed />,
    children: [],
  },
  {
    screen: "transportation",
    title: "Transportation",
    description: "Enter the details below.",
    icon: <Car />,
    children: [],
  },
  {
    screen: "entertainment",
    title: "Entertainment",
    description: "Enter the details below.",
    icon: <Drama />,
    children: [],
  },
  {
    screen: "health-and-wellness",
    title: "Health and wellness",
    description: "Enter the details below.",
    icon: <Heart />,
    children: [],
  },
  {
    screen: "shopping",
    title: "Shopping",
    description: "Enter the details below.",
    icon: <ShoppingBag />,
    children: [],
  },
  {
    screen: "savings-and-investments",
    title: "Savings and investments",
    description: "Enter the details below.",
    icon: <Percent />,
    children: [],
  },
  {
    screen: "subscriptions",
    title: "Subscriptions",
    description: "Enter the details below.",
    icon: <RotateCw />,
    children: [],
  },
  {
    screen: "other-expense",
    title: "Other expenses",
    description: "Enter the details below.",
    icon: <CircleDollarSign />,
    children: [],
  },
];

const incomeChildren = [
  {
    screen: "salary",
    title: "Salary",
    description: "Enter the details below.",
    icon: <Coins />,
    children: [],
  },
  {
    screen: "sale",
    title: "Sale",
    description: "Enter the details below.",
    icon: <Receipt />,
    children: [],
  },
  {
    screen: "gift",
    title: "Gift",
    description: "Enter the details below.",
    icon: <Gift />,
    children: [],
  },
  {
    screen: "tax-return",
    title: "Tax return",
    description: "Enter the details below.",
    icon: <Undo2 />,
    children: [],
  },
  {
    screen: "realized-investments",
    title: "Realized investments",
    description: "Enter the details below.",
    icon: <Percent />,
    children: [],
  },
  {
    screen: "other-income",
    title: "Other income",
    description: "Enter the details below.",
    icon: <CircleDollarSign />,
    children: [],
  },
];

const incomeExpense = [
  {
    screen: "income",
    title: "Income",
    description: "What type of income is this transaction?",
    icon: <Landmark />,
    children: incomeChildren,
  },
  {
    screen: "expense",
    title: "Expense",
    description: "What type of expense is this transaction?",
    icon: <CircleDollarSign />,
    children: expenseChildren,
  },
];

const start = [
  {
    screen: "new-record",
    title: "New record",
    description:
      "Follow the prompts to add a new record. You can use the number on your keyboard to speed up the entering process.",
    icon: null,
    children: incomeExpense,
  },
];

export const allScreens = [
  ...start,
  ...incomeExpense,
  ...incomeChildren,
  ...expenseChildren,
] as const;

export type ScreenType = (typeof allScreens)[number]["screen"];

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
