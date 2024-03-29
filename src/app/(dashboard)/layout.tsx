'use client'

import { useEffect } from 'react'

import { InitializeStore } from '@/store/store-helper'

import { Toaster } from '@/components/ui/sonner'

// todo figure out better way to call SetStore

export default function OuterDashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	useEffect(() => {
		console.log('InitializeStore called from layout.tsx')
		InitializeStore()
	}, [])

	return (
		<>
			{children}
			<Toaster />
		</>
	)
}
