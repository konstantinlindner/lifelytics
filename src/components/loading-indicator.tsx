import { Loader2Icon } from 'lucide-react'

type LoadingIndicatorProps = {
	text?: string
	size?: 'sm' | 'base' | 'lg'
}

export default function LoadingIndicator({
	text,
	size = 'base',
}: LoadingIndicatorProps) {
	const svgSize = (() => {
		switch (size) {
			case 'sm':
				return 6
			case 'base':
				return 8
			case 'lg':
				return 12
		}
	})()

	return (
		<div className="flex items-center gap-2">
			<Loader2Icon className={`animate-spin size-${svgSize}`} />

			{text && <p className={`text-${size}`}>{text}</p>}
		</div>
	)
}
