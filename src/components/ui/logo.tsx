import Image from 'next/image'

type Props = {
	variant?: 'word' | 'icon'
	// Wordmark defaults (override if you want)
	width?: number
	height?: number
	// Icon defaults (override with size)
	size?: number
	className?: string
	priority?: boolean
	// Optional overrides for file names
	lightSrc?: string
	darkSrc?: string
}

/**
 * Renders light/dark versions of the logo using Tailwind's `dark:` class.
 * Defaults assume these files exist in /public:
 * - wordmark: /logo-black.png (light) and /logo.png (dark)
 * - icon:     /icon-black.png (light) and /icon.png (dark)
 */
export default function Logo({
	variant = 'word',
	width,
	height,
	size = 32,
	className,
	priority,
	lightSrc,
	darkSrc,
}: Props) {
	const defaults =
		variant === 'word'
			? {
					light: '/logo-black.png',
					dark: '/logo.png',
					w: width ?? 140,
					h: height ?? 36,
			  }
			: { light: '/icon-black.png', dark: '/icon.png', w: size, h: size }

	const light = lightSrc ?? defaults.light
	const dark = darkSrc ?? defaults.dark
	const w = defaults.w
	const h = defaults.h

	return (
		<span className={className}>
			{/* Light theme */}
			<Image
				src={light}
				alt="Questionary"
				width={w}
				height={h}
				className="block dark:hidden"
				priority={priority}
			/>
			{/* Dark theme */}
			<Image
				src={dark}
				alt="Questionary"
				width={w}
				height={h}
				className="hidden dark:block"
				priority={priority}
			/>
		</span>
	)
}
