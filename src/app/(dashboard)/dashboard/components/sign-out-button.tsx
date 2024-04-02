'use client'

import { useRouter } from 'next/navigation'

import { SignOut } from '@/store/store-helper'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'

type SignOutButtonProps = {
	isMenuItem?: boolean
}

export default function SignOutButton({ isMenuItem }: SignOutButtonProps) {
	const router = useRouter()

	const handleSignOut = async () => {
		const error = await SignOut()

		if (error) {
			console.error('Something went wrong signing out', error)
			toast(error.message)
			return
		}

		router.refresh()
	}

	return isMenuItem ? (
		<DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
			Sign out
			<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
		</DropdownMenuItem>
	) : (
		<Button onClick={handleSignOut}>Sign out</Button>
	)
}
