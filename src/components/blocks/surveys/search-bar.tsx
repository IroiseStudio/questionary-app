'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { cn } from '@/components/ui/cn'

type Props = {
	value: string
	onChange: (v: string) => void
	actionHref?: string // default "/search?query="
	className?: string
}

export default function SearchBar({
	value,
	onChange,
	actionHref = '/search',
	className,
}: Props) {
	const router = useRouter()

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		const q = value.trim()
		if (!q) return
		const url = `${actionHref}?query=${encodeURIComponent(q)}`
		router.push(url)
	}

	return (
		<form onSubmit={onSubmit} className={cn('mb-4', className)}>
			<label className="relative block">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
				<input
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Find a survey…"
					className={cn(
						'w-full rounded-xl bg-white/5 px-10 py-3 text-sm outline-none',
						'placeholder:text-muted-foreground/70 border border-white/10 focus:border-white/30'
					)}
					aria-label="Search surveys"
				/>
			</label>
		</form>
	)
}
