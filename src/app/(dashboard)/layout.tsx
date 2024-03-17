'use client'

import { useEffect } from 'react'

import { InitializeStore } from '@/store/StoreHelper'

import { Toaster } from '@/components/ui/sonner'

// todo figure out better way to call SetStore

export default function OuterDashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	useEffect(() => {
		console.log('ran SetStore')
		InitializeStore()
	}, [])

	return (
		<>
			{children}
			<Toaster />
		</>
	)
}
