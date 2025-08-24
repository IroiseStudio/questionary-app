'use client'

import * as React from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/logo'
import { MenuIcon } from '@/components/icons/custom-icons'

type Props = { onBurger: () => void }

export default function AppHeader({ onBurger }: Props) {
	return (
		<header className="mb-3 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<Link
					href="/"
					aria-label="Go to home"
					className="inline-flex items-center gap-2"
				>
					<Logo variant="word" width={140} height={36} priority />
				</Link>
				<div className="sr-only">Questionary</div>
			</div>

			<button
				onClick={onBurger}
				aria-label="Open menu"
				className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
			>
				<MenuIcon className="h-5 w-5" />
			</button>
		</header>
	)
}
