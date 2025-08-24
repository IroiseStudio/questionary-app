'use client'

import * as React from 'react'
import { cn } from '@/components/ui/cn'
import MenuItem from './menu-item'
import Logo from '@/components/ui/logo'
import {
	BookmarkIcon,
	BarChart3Icon,
	User2Icon,
	LogOutIcon,
	XIcon,
} from '@/components/icons/custom-icons'

type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>

type MenuItemDef = {
	label: string
	href: string
	Icon: IconCmp
}

const MENU_ITEMS: MenuItemDef[] = [
	{ label: 'Saved Qys', href: '/saved', Icon: BookmarkIcon },
	{ label: 'Results', href: '/results', Icon: BarChart3Icon },
	{ label: 'Profile', href: '/profile', Icon: User2Icon },
]

type Props = {
	open: boolean
	onClose: () => void
	onNavigate: (href: string) => void
	onLogout: () => void
}

export default function AppMenu({
	open,
	onClose,
	onNavigate,
	onLogout,
}: Props) {
	React.useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') onClose()
		}
		if (open) window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [open, onClose])

	return (
		<div
			aria-hidden={!open}
			className={cn(
				'fixed inset-0 z-50',
				open ? 'pointer-events-auto' : 'pointer-events-none'
			)}
		>
			{/* Overlay */}
			<div
				onClick={onClose}
				className={cn(
					'absolute inset-0 bg-black/50 transition-opacity',
					open ? 'opacity-100' : 'opacity-0'
				)}
			/>

			{/* Top drop-down panel (full width, rounded bottom) */}
			<aside
				role="dialog"
				aria-modal="true"
				className={cn(
					'absolute inset-x-0 top-0 w-full bg-white text-zinc-900 shadow-2xl border-b border-black/10',
					'rounded-b-2xl pt-10',
					'transform transition-transform duration-200 ease-out will-change-transform',
					open ? 'translate-y-0' : '-translate-y-full'
				)}
			>
				{/* Header row with dark logo and close */}
				<div className="flex items-center justify-between px-4 py-3 ">
					{/* Force black wordmark: pass same src for light/dark so it stays dark on the white sheet */}
					<Logo
						variant="word"
						width={140}
						height={36}
						lightSrc="/logo-black.png"
						darkSrc="/logo-black.png"
						priority
					/>
					<button
						onClick={onClose}
						aria-label="Close menu"
						className="p-2 rounded-md hover:bg-black/5"
					>
						<XIcon className="h-5 w-5 text-zinc-900" />
					</button>
				</div>

				<nav className="px-4 py-2 border-t border-black/10">
					{MENU_ITEMS.map(({ label, href, Icon }) => (
						<MenuItem
							key={href}
							icon={<Icon className="h-5 w-5" />}
							label={label}
							onClick={() => onNavigate(href)}
						/>
					))}
				</nav>

				<div className="mt-2 px-4 py-3 border-t border-black/10">
					<MenuItem
						icon={<LogOutIcon className="h-5 w-5" />}
						label="Log out"
						variant="destructive"
						onClick={onLogout}
					/>
				</div>
			</aside>
		</div>
	)
}
