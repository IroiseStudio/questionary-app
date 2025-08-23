import { cn } from './cn'

type Props = React.HTMLAttributes<HTMLDivElement> & {
	variant?: 'solid' | 'glass'
}

export function Card({ className, variant = 'glass', ...rest }: Props) {
	return (
		<div
			className={cn(
				'rounded-2xl p-4',
				variant === 'glass'
					? 'glass'
					: 'bg-card shadow-soft border border-white/5',
				className
			)}
			{...rest}
		/>
	)
}

export function CardHeader({
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('mb-2 flex items-center justify-between', className)}
			{...rest}
		/>
	)
}

export function CardTitle({
	className,
	...rest
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return <h3 className={cn('text-lg font-semibold', className)} {...rest} />
}

export function CardContent({
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('space-y-3', className)} {...rest} />
}

export function CardFooter({
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('mt-4', className)} {...rest} />
}
