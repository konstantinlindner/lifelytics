import { ReactNode } from 'react'

import { SettingsTopbar } from './components/settingsTopbar'

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
