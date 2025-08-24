import * as React from 'react'
import { cn } from '@/components/ui/cn'

type Props = {
	icon: React.ReactNode
	label: string
	onClick?: () => void
	href?: string
	variant?: 'default' | 'destructive'
}

export default function MenuItem({
	icon,
	label,
	onClick,
	href,
	variant = 'default',
}: Props) {
	const className = cn(
		'w-full flex items-center gap-3 rounded-lg px-3 py-3 text-sm',
		variant === 'destructive' ? 'text-red-600' : 'text-zinc-900'
	)

	if (href) {
		return (
			<a href={href} className={className} onClick={onClick}>
				{icon}
				<span className="font-medium">{label}</span>
			</a>
		)
	}

	return (
		<button type="button" className={className} onClick={onClick}>
			{icon}
			<span className="font-medium">{label}</span>
		</button>
	)
}
