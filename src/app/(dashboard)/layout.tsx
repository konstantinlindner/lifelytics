'use client'

import { useEffect, useState } from 'react'

import { InitializeStore } from '@/store/store-helper'

import { Toaster } from '@/components/ui/sonner'

import LoadingIndicator from '@/components/loading-indicator'

// todo figure out better way to initialize store

export default function OuterDashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			await InitializeStore()
			setLoading(false)
			console.log('InitializeStore called from layout.tsx')
		}

		fetchData()
	}, [])

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<LoadingIndicator size="lg" />
			</div>
		)
	}

	return (
		<>
			{children}
			<Toaster />
		</>
	)
}
