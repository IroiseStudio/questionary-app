import Link from 'next/link'
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export type SuggestedItem = {
	id: string
	title: string
	tags?: string[]
	count?: number // question count (optional)
}

type Props = {
	items: SuggestedItem[]
	/** base route for Start/Details; defaults to `/survey` so links are `/survey/:id` */
	baseHref?: string
	onStart?: (id: string) => void
}

export default function SuggestedList({
	items,
	baseHref = '/survey',
	onStart,
}: Props) {
	return (
		<div className="grid grid-cols-1 gap-3">
			{items.map((s) => (
				<Card key={s.id}>
					<CardHeader>
						<CardTitle className="line-clamp-1">{s.title}</CardTitle>
					</CardHeader>

					<CardContent>
						<div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
							{s.tags?.map((t) => (
								<span
									key={t}
									className="rounded-full bg-white/5 px-2 py-1 border border-white/10"
								>
									#{t}
								</span>
							))}
							{typeof s.count === 'number' && (
								<span className="ml-auto">{s.count} questions</span>
							)}
						</div>
					</CardContent>

					<CardFooter className="flex items-center gap-2">
						<Link href={`${baseHref}/${s.id}`} onClick={() => onStart?.(s.id)}>
							<Button variant="continue" size="md">
								Start
							</Button>
						</Link>
						<Link
							href={{
								pathname: `${baseHref}/${s.id}`,
								query: { view: 'details' },
							}}
							className="text-sm text-muted-foreground hover:underline"
						>
							Details
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	)
}
