'use client'

type SpinnerProps = {
	size?: 'sm' | 'md' | 'lg'
	label?: string
	className?: string
}

const sizeMap = {
	sm: 'h-4 w-4 border-2',
	md: 'h-6 w-6 border-2',
	lg: 'h-10 w-10 border-3',
}

export default function Spinner({
	size = 'md',
	label,
	className = '',
}: SpinnerProps) {
	return (
		<span
			role="status"
			aria-live="polite"
			className={`inline-flex items-center gap-2 ${className}`}
		>
			<span
				className={`inline-block animate-spin rounded-full border-current border-t-transparent ${sizeMap[size]} 
          text-green-500 dark:text-green-400`}
				aria-hidden="true"
			/>
			{label ? (
				<span className="text-sm text-gray-600 dark:text-gray-300">
					{label}
				</span>
			) : null}
		</span>
	)
}
