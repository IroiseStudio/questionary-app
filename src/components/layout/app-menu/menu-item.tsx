import * as React from 'react'
import { cn } from '@/components/ui/cn'

type Props = {
	icon: React.ReactNode
	label: string
	onClick?: () => void
	href?: string
	variant?: 'default' | 'destructive'
	right?: React.ReactNode // NEW
	disabled?: boolean // NEW
}

export default function MenuItem({
	icon,
	label,
	onClick,
	href,
	variant = 'default',
	right,
	disabled,
}: Props) {
	const base = cn(
		'w-full flex items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm',
		'text-[hsl(var(--background))]',
		variant === 'destructive'
			? 'hover:bg-red-50 text-red-600'
			: 'hover:bg-black/5',
		disabled && 'opacity-60 cursor-not-allowed'
	)

	const content = (
		<>
			<span className="flex items-center gap-3">
				{icon}
				<span className="font-medium">{label}</span>
			</span>
			{right ?? null}
		</>
	)

	if (href) {
		return (
			<a
				href={href}
				className={base}
				onClick={disabled ? undefined : onClick}
				aria-disabled={disabled}
			>
				{content}
			</a>
		)
	}

	return (
		<button
			type="button"
			className={base}
			onClick={onClick}
			disabled={disabled}
			aria-busy={disabled}
		>
			{content}
		</button>
	)
}
