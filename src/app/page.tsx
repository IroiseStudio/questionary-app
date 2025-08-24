import Screen from '@/components/ui/screen'
import Container from '@/components/ui/container'
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Logo from '@/components/ui/logo'

export default function Home() {
	return (
		<Screen>
			<Container className="space-y-5">
				<Logo />
				<Logo variant="icon" />
				{/* Top profile card (like image style) */}
				<Card className="pt-6">
					<CardHeader>
						<CardTitle>Profile</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="mx-auto h-28 w-28 rounded-full bg-gradient-to-tr from-primary to-primary-2 neon grid place-items-center">
							<span className="text-sm font-semibold text-white/90">0:00</span>
						</div>
						<div className="grid grid-cols-2 gap-3 pt-3">
							{['Instagram', 'Twitter', 'Facebook', 'Other'].map((label, i) => (
								<div
									key={label}
									className={`rounded-2xl p-4 border border-white/10 ${
										i === 1
											? 'grad-primary text-white shadow-neon'
											: 'bg-card-2'
									}`}
								>
									<div className="text-xs text-muted">{label}</div>
									<div className="text-lg font-semibold">0:00</div>
								</div>
							))}
						</div>
					</CardContent>
					<CardFooter>
						<Button variant="continue" size="md" full>
							Accept
						</Button>
					</CardFooter>
				</Card>

				{/* Options / sliders placeholder */}
				<Card>
					<CardHeader>
						<CardTitle>Options</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-24 grid grid-cols-7 gap-2">
							{Array.from({ length: 7 }).map((_, i) => (
								<div key={i} className="relative flex items-end justify-center">
									<div className="w-2 rounded-full bg-white/10">
										<div className="w-2 rounded-full grad-primary h-16"></div>
									</div>
								</div>
							))}
						</div>
						<div className="space-y-3 pt-2">
							{Array.from({ length: 4 }).map((_, i) => (
								<div
									key={i}
									className="flex items-center justify-between rounded-2xl bg-card-2 p-3"
								>
									<div className="text-sm text-muted">Lorem Ipsum</div>
									<div className="h-6 w-11 rounded-full bg-white/10 relative">
										<div className="absolute right-0 top-0 h-6 w-6 rounded-full grad-primary"></div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Dashboard actions */}
				<Card>
					<CardHeader>
						<CardTitle>Dashboard</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="flex items-center justify-between rounded-2xl bg-card-2 p-3">
							<div className="flex items-center gap-3">
								<div className="h-9 w-9 rounded-full bg-white/10" />
								<div>
									<div className="text-sm">Lorem Ipsum</div>
									<div className="text-xs text-muted">Subtitle</div>
								</div>
							</div>
							<Button variant="validate" size="sm">
								Optimize
							</Button>
						</div>

						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className="flex items-center justify-between rounded-2xl bg-card-2 p-3"
							>
								<div className="text-sm">Lorem Ipsum</div>
								<div className="text-xs text-muted">•••••</div>
							</div>
						))}
					</CardContent>
				</Card>
			</Container>
		</Screen>
	)
}
