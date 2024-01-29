import {
	Car,
	CircleDollarSign,
	Coins,
	Drama,
	Gift,
	Heart,
	Home,
	Landmark,
	Percent,
	Receipt,
	RotateCw,
	ShoppingBag,
	Undo2,
	UtensilsCrossed,
} from 'lucide-react'

const expenseChildren = [
	{
		screen: 'home',
		title: 'Home',
		description: 'Enter the details below.',
		icon: <Home />,
		buttonChildren: [],
		inputFields: [],
	},
	{
		screen: 'food-and-drink',
		title: 'Food and drink',
		description: 'Enter the details below.',
		icon: <UtensilsCrossed />,
		buttonChildren: [],
		inputFields: [],
	},
	{
		screen: 'transportation',
		title: 'Transportation',
		description: 'Enter the details below.',
		icon: <Car />,
		buttonChildren: [],
		inputFields: [],
	},
	{
		screen: 'entertainment',
		title: 'Entertainment',
		description: 'Enter the details below.',
		icon: <Drama />,
		buttonChildren: [],
		inputFields: [],
	},
	{
		screen: 'health-and-wellness',
		title: 'Health and wellness',
		description: 'Enter the details below.',
		icon: <Heart />,
		buttonChildren: [],
		inputFields: [],
	},
	{
		screen: 'shopping',
		title: 'Shopping',
		description: 'Enter the details below.',
		icon: <ShoppingBag />,
		buttonChildren: [],
		inputFields: [],
	},
	{
		screen: 'savings-and-investments',
		title: 'Savings and investments',
		description: 'Enter the details below.',
		icon: <Percent />,
		buttonChildren: [],
		inputFields: [],
	},
	{
		screen: 'subscriptions',
		title: 'Subscriptions',
		description: 'Enter the details below.',
		icon: <RotateCw />,
		buttonChildren: [],
		inputFields: [],
	},
	{
		screen: 'other-expenses',
		title: 'Other expenses',
		description: 'Enter the details below.',
		icon: <CircleDollarSign />,
		buttonChildren: [],
		inputFields: [],
	},
]

const incomeChildren = [
	{
		screen: 'salary',
		title: 'Salary',
		description: 'Enter the details below.',
		icon: <Coins />,
		buttonChildren: [],
		inputFields: [],
	},
	{
		screen: 'sale',
		title: 'Sale',
		description: 'Enter the details below.',
		icon: <Receipt />,
		buttonChildren: [],
		inputFields: [],
	},
	{
		screen: 'gift',
		title: 'Gift',
		description: 'Enter the details below.',
		icon: <Gift />,
		buttonChildren: [],
		inputFields: [],
	},
	{
		screen: 'tax-return',
		title: 'Tax return',
		description: 'Enter the details below.',
		icon: <Undo2 />,
		buttonChildren: [],
		inputFields: [],
	},
	{
		screen: 'realized-investment',
		title: 'Realized investment',
		description: 'Enter the details below.',
		icon: <Percent />,
		buttonChildren: [],
		inputFields: [],
	},
	{
		screen: 'other-income',
		title: 'Other income',
		description: 'Enter the details below.',
		icon: <CircleDollarSign />,
		buttonChildren: [],
		inputFields: [],
	},
]

const incomeExpense = [
	{
		screen: 'income',
		title: 'Income',
		description: 'What type of income is this transaction?',
		icon: <Landmark />,
		buttonChildren: incomeChildren,
	},
	{
		screen: 'expense',
		title: 'Expense',
		description: 'What type of expense is this transaction?',
		icon: <CircleDollarSign />,
		buttonChildren: expenseChildren,
	},
]

const start = [
	{
		screen: 'new-record',
		title: 'New record',
		description:
			'Follow the prompts to add a new record. You can use the number on your keyboard to speed up the entering process.',
		icon: null,
		buttonChildren: incomeExpense,
	},
]

export const allScreens = [
	...start,
	...incomeExpense,
	...incomeChildren,
	...expenseChildren,
] as const

export type ScreenType = (typeof allScreens)[number]['screen']
