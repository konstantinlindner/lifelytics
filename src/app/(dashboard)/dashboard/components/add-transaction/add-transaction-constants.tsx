import {
	BaggageClaimIcon,
	BriefcaseBusinessIcon,
	CarIcon,
	CircleDollarSignIcon,
	CoinsIcon,
	CreditCardIcon,
	DramaIcon,
	GiftIcon,
	HeartIcon,
	HomeIcon,
	LandmarkIcon,
	PercentIcon,
	ReceiptIcon,
	RotateCwIcon,
	ShoppingBagIcon,
	Undo2Icon,
	UtensilsCrossedIcon,
} from 'lucide-react'

export type Screen = {
	id: number
	parent: number | null
	title: string
	subtitle: string
	transactionCategoryId: number | null
	icon: JSX.Element | null
}

export const screens = [
	{
		id: 1,
		parent: null,
		title: 'New transaction',
		subtitle: 'Follow the prompts to add a new record.',
		transactionCategoryId: null,
		icon: null,
	},
	{
		id: 2,
		parent: 1,
		title: 'Income',
		subtitle: 'What type of income is this transaction?',
		transactionCategoryId: null,
		icon: <LandmarkIcon />,
	},
	{
		id: 3,
		parent: 1,
		title: 'Expense',
		subtitle: 'What type of expense is this transaction?',
		transactionCategoryId: null,
		icon: <CircleDollarSignIcon />,
	},
	{
		id: 4,
		parent: 2,
		title: 'Salary',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 10,
		icon: <CoinsIcon />,
	},
	{
		id: 5,
		parent: 2,
		title: 'Consulting',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 16,
		icon: <BriefcaseBusinessIcon />,
	},
	{
		id: 6,
		parent: 2,
		title: 'Sale',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 11,
		icon: <ReceiptIcon />,
	},
	{
		id: 7,
		parent: 2,
		title: 'Gift',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 12,
		icon: <GiftIcon />,
	},
	{
		id: 8,
		parent: 2,
		title: 'Tax return',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 13,
		icon: <Undo2Icon />,
	},
	{
		id: 9,
		parent: 2,
		title: 'Realized investment',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 14,
		icon: <PercentIcon />,
	},
	{
		id: 10,
		parent: 2,
		title: 'Insurance claim',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 18,
		icon: <BaggageClaimIcon />,
	},
	{
		id: 11,
		parent: 2,
		title: 'Cashback',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 17,
		icon: <CreditCardIcon />,
	},
	{
		id: 12,
		parent: 2,
		title: 'Other income',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 15,
		icon: <CircleDollarSignIcon />,
	},
	// expenses
	{
		id: 13,
		parent: 3,
		title: 'Home',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 1,
		icon: <HomeIcon />,
	},
	{
		id: 14,
		parent: 3,
		title: 'Food and drink',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 2,
		icon: <UtensilsCrossedIcon />,
	},
	{
		id: 15,
		parent: 3,
		title: 'Transportation',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 3,
		icon: <CarIcon />,
	},
	{
		id: 16,
		parent: 3,
		title: 'Entertainment',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 4,
		icon: <DramaIcon />,
	},
	{
		id: 17,
		parent: 3,
		title: 'Health and wellness',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 5,
		icon: <HeartIcon />,
	},
	{
		id: 18,
		parent: 3,
		title: 'Shopping',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 6,
		icon: <ShoppingBagIcon />,
	},
	{
		id: 19,
		parent: 3,
		title: 'Savings and investments',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 7,
		icon: <PercentIcon />,
	},
	{
		id: 20,
		parent: 3,
		title: 'Subscriptions',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 8,
		icon: <RotateCwIcon />,
	},
	{
		id: 21,
		parent: 3,
		title: 'Other expenses',
		subtitle: 'Enter the details below.',
		transactionCategoryId: 9,
		icon: <CircleDollarSignIcon />,
	},
] as Screen[]