'use client'

import Image from 'next/image'
import { cn } from '@/components/ui/cn'

type LogoProps = {
	variant?: 'full' | 'icon' // default = full
	size?: number // width in px, auto scales height
	className?: string
}

export function Logo({ variant = 'full', size = 160, className }: LogoProps) {
	const src = variant === 'icon' ? '/icon.png' : '/logo.png'
	const alt = variant === 'icon' ? 'Questionary Icon' : 'Questionary Logo'

	return (
		<Image
			src={src}
			alt={alt}
			width={size}
			height={size}
			priority
			className={cn('h-auto w-auto', className)}
		/>
	)
}
