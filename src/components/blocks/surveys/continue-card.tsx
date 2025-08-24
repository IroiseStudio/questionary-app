import Link from 'next/link'
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'

type Props = {
	id: string
	title: string
	progress: number // 0–1
}

export default function ContinueCard({ id, title, progress }: Props) {
	return (
		<Card className="bg-grad-accent/10 border border-white/10">
			<CardHeader className="items-start gap-2">
				<div className="flex items-center gap-2">
					<Clock className="h-4 w-4" />
					<CardTitle>Continue where you left off</CardTitle>
				</div>
			</CardHeader>

			<CardContent>
				<div className="flex items-center justify-between">
					<div>
						<p className="font-medium">{title}</p>
						<p className="text-sm text-muted-foreground">
							{Math.round(progress * 100)}% complete
						</p>
					</div>
					<div className="w-28 h-2 rounded-full bg-white/10 overflow-hidden">
						<div
							className="h-full bg-grad-continue"
							style={{ width: `${progress * 100}%` }}
						/>
					</div>
				</div>
			</CardContent>

			<CardFooter>
				<Link href={`/attempt/${id}`}>
					<Button variant="continue">Resume</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
