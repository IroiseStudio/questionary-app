import { cn } from '@/components/ui/cn'
import { ButtonHTMLAttributes } from 'react'

type Variant =
	| 'continue'
	| 'validate'
	| 'close'
	| 'delete'
	| 'cancel'
	| 'accent'

type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant
	size?: Size
	full?: boolean
}

const variantClasses: Record<Variant, string> = {
	continue: 'bg-grad-continue text-white hover:opacity-90',
	validate: 'bg-grad-validate text-white hover:opacity-90',
	close: 'bg-grad-close text-white hover:opacity-90',
	delete: 'bg-grad-delete text-white hover:opacity-90',
	cancel: 'bg-grad-cancel text-white hover:opacity-90',
	accent: 'bg-grad-accent text-white hover:opacity-90',
}

const sizeClasses: Record<Size, string> = {
	sm: 'px-3 py-1 text-sm rounded-md',
	md: 'px-4 py-2 text-base rounded-lg',
	lg: 'px-6 py-3 text-lg rounded-xl',
}

export function Button({
	className,
	variant = 'continue',
	size = 'md',
	full,
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(
				'font-medium transition-all shadow-md',
				variantClasses[variant],
				sizeClasses[size],
				full && 'w-full',
				className
			)}
			{...props}
		/>
	)
}

Button.displayName = 'Button'
