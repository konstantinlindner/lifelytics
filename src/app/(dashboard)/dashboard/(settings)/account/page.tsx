'use client'

import { useUser } from '@/store/store'
import dayjs from 'dayjs'
import { toast } from 'sonner'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import SignOutButton from '../../components/sign-out-button'

export default function Account() {
	function handleAccountDeletion() {
		toast('Not yet implemented')
	}

	return (
		<main>
			<div className="flex flex-col">
				<div className="flex w-full max-w-xs flex-col space-y-4">
					<p>
						Member since{' '}
						{dayjs(useUser((state) => state.createdAt)).format(
							'MMMM YYYY',
						)}
					</p>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive">
								Delete account
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will
									permanently delete your account and remove
									your data from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleAccountDeletion}
								>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<SignOutButton />
				</div>
			</div>
		</main>
	)
}
