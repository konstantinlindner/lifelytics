import { Loader2Icon } from 'lucide-react'

type LoadingIndicatorProps = {
	text?: string
	size?: 'sm' | 'base' | 'lg'
}

export default function LoadingIndicator({
	text,
	size = 'base',
}: LoadingIndicatorProps) {
	const sizeMap = {
		sm: 6,
		base: 8,
		lg: 12,
	}

	const svgSize = sizeMap[size]

	return (
		<div className="flex items-center gap-2">
			<Loader2Icon className={`animate-spin w-${svgSize} h-${svgSize}`} />

			{text && <p className={`text-${size}`}>{text}</p>}
		</div>
	)
}
