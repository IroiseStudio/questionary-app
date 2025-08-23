'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
	const [dark, setDark] = useState(false)

	useEffect(() => {
		const root = document.documentElement
		if (dark) root.classList.add('dark')
		else root.classList.remove('dark')
	}, [dark])

	return (
		<button
			onClick={() => setDark((d) => !d)}
			className="rounded border px-4 py-2"
		>
			Toggle {dark ? 'Light' : 'Dark'}
		</button>
	)
}
