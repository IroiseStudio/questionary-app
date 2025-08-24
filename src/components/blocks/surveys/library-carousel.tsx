import Link from 'next/link'
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export type LibraryItem = {
	id: string
	title: string
	count?: number
}

type Props = {
	items: LibraryItem[]
	baseHref?: string // default "/survey"
}

export default function LibraryCarousel({
	items,
	baseHref = '/survey',
}: Props) {
	return (
		<div className="-mx-4 overflow-x-auto px-4">
			<div className="flex gap-3">
				{items.map((s) => (
					<Link
						key={s.id}
						href={`${baseHref}/${s.id}`}
						className="min-w-[220px]"
					>
						<Card className="h-full">
							<CardHeader>
								<CardTitle className="line-clamp-1">{s.title}</CardTitle>
							</CardHeader>
							<CardContent>
								{typeof s.count === 'number' && (
									<p className="text-sm text-muted-foreground">
										{s.count} questions
									</p>
								)}
							</CardContent>
							<CardFooter>
								<Button size="sm" variant="accent">
									Open
								</Button>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>
		</div>
	)
}
