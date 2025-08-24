import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wand2 } from 'lucide-react'

type Props = {
	seed?: string
	href?: string // default "/ideas"
}

export default function IdeasCard({ seed, href = '/ideas' }: Props) {
	const query = seed?.trim() ? { seed } : undefined

	return (
		<Card variant="glass" className="border border-white/10">
			<CardHeader className="gap-2">
				<div className="flex items-center gap-2">
					<Wand2 className="h-4 w-4" />
					<CardTitle>Give me ideas</CardTitle>
				</div>
				<p className="text-sm text-muted-foreground">
					Not sure what to take? We can suggest a few topics tailored to you.
				</p>
			</CardHeader>
			<CardFooter>
				<Link href={{ pathname: href, query }}>
					<Button variant="accent">
						<Wand2 className="mr-2 h-4 w-4" />
						Generate suggestions
					</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
