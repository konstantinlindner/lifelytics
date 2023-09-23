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
} from "lucide-react";

const expenseChildren = [
  {
    screen: "home",
    title: "Home",
    description: "Enter the details below.",
    icon: <Home />,
    buttonChildren: [],
  },
  {
    screen: "food-and-drink",
    title: "Food and drink",
    description: "Enter the details below.",
    icon: <UtensilsCrossed />,
    buttonChildren: [],
  },
  {
    screen: "transportation",
    title: "Transportation",
    description: "Enter the details below.",
    icon: <Car />,
    buttonChildren: [],
  },
  {
    screen: "entertainment",
    title: "Entertainment",
    description: "Enter the details below.",
    icon: <Drama />,
    buttonChildren: [],
  },
  {
    screen: "health-and-wellness",
    title: "Health and wellness",
    description: "Enter the details below.",
    icon: <Heart />,
    buttonChildren: [],
  },
  {
    screen: "shopping",
    title: "Shopping",
    description: "Enter the details below.",
    icon: <ShoppingBag />,
    buttonChildren: [],
  },
  {
    screen: "savings-and-investments",
    title: "Savings and investments",
    description: "Enter the details below.",
    icon: <Percent />,
    buttonChildren: [],
  },
  {
    screen: "subscriptions",
    title: "Subscriptions",
    description: "Enter the details below.",
    icon: <RotateCw />,
    buttonChildren: [],
  },
  {
    screen: "other-expense",
    title: "Other expenses",
    description: "Enter the details below.",
    icon: <CircleDollarSign />,
    buttonChildren: [],
  },
];

const incomeChildren = [
  {
    screen: "salary",
    title: "Salary",
    description: "Enter the details below.",
    icon: <Coins />,
    buttonChildren: [],
  },
  {
    screen: "sale",
    title: "Sale",
    description: "Enter the details below.",
    icon: <Receipt />,
    buttonChildren: [],
  },
  {
    screen: "gift",
    title: "Gift",
    description: "Enter the details below.",
    icon: <Gift />,
    buttonChildren: [],
  },
  {
    screen: "tax-return",
    title: "Tax return",
    description: "Enter the details below.",
    icon: <Undo2 />,
    buttonChildren: [],
  },
  {
    screen: "realized-investments",
    title: "Realized investments",
    description: "Enter the details below.",
    icon: <Percent />,
    buttonChildren: [],
  },
  {
    screen: "other-income",
    title: "Other income",
    description: "Enter the details below.",
    icon: <CircleDollarSign />,
    buttonChildren: [],
  },
];

const incomeExpense = [
  {
    screen: "income",
    title: "Income",
    description: "What type of income is this transaction?",
    icon: <Landmark />,
    buttonChildren: incomeChildren,
  },
  {
    screen: "expense",
    title: "Expense",
    description: "What type of expense is this transaction?",
    icon: <CircleDollarSign />,
    buttonChildren: expenseChildren,
  },
];

const start = [
  {
    screen: "new-record",
    title: "New record",
    description:
      "Follow the prompts to add a new record. You can use the number on your keyboard to speed up the entering process.",
    icon: null,
    buttonChildren: incomeExpense,
  },
];

export const allScreens = [
  ...start,
  ...incomeExpense,
  ...incomeChildren,
  ...expenseChildren,
] as const;

export type ScreenType = (typeof allScreens)[number]["screen"];
