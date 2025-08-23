import { cn } from './cn'

type Props = React.PropsWithChildren<{ className?: string }>

/** Mobile-first page wrapper with safe area, max width */
export default function Screen({ className, children }: Props) {
	return (
		<div
			className={cn(
				'min-h-screen bg-bg text-text',
				'px-4 pb-8 pt-6 sm:px-6',
				'flex flex-col items-center',
				className
			)}
		>
			{/* phone-sized column, but flexible */}
			<div className="w-full max-w-md">{children}</div>
		</div>
	)
}
