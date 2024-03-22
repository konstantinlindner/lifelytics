'use client'

import { useRouter } from 'next/navigation'

import { createBrowserClient } from '@supabase/ssr'

import type { Database } from '@/types/supabase.types'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'

interface SignOutButtonProps {
	isMenuItem?: boolean
}

export default function SignOutButton({
	isMenuItem = false,
}: SignOutButtonProps) {
	const router = useRouter()
	const supabase = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	)

	const handleSignOut = async () => {
		try {
			const { error } = await supabase.auth.signOut({})

			if (error) {
				console.log(error)
				toast(error.message)
			}

			router.refresh()
		} catch (error) {
			console.log(error)
		}
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
