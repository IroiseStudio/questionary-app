import { cn } from './cn'

type Props = React.HTMLAttributes<HTMLDivElement>

export default function Container({ className, ...rest }: Props) {
	return <div className={cn('space-y-4', className)} {...rest} />
}
