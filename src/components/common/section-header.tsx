import * as React from 'react'

type Props = {
	title: string
	subtitle?: string
	icon?: React.ReactNode
	right?: React.ReactNode
	className?: string
}

export default function SectionHeader({
	title,
	subtitle,
	icon,
	right,
	className,
}: Props) {
	return (
		<div
			className={`mb-2 flex items-center justify-between ${className ?? ''}`}
		>
			<div className="flex items-center gap-2">
				{icon}
				<h2 className="text-base font-semibold">{title}</h2>
			</div>
			{right ? (
				right
			) : subtitle ? (
				<span className="text-xs text-muted-foreground">{subtitle}</span>
			) : null}
		</div>
	)
}
