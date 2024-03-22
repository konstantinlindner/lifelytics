import { ReactNode } from 'react'

import { Metadata } from 'next'

import { SettingsTopbar } from './components/settings-topbar'

export const metadata: Metadata = {
	title: 'Settings',
}

export default function SettingsLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col">
			<div className="flex justify-center pb-4">
				<SettingsTopbar />
			</div>
			<div className="flex flex-col">{children}</div>
		</div>
	)
}
