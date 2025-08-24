'use client'

import * as React from 'react'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Screen from '@/components/ui/screen'
import Container from '@/components/ui/container'
import AppHeader from '@/components/layout/app-header'
import AppMenu from '@/components/layout/app-menu/app-menu'
import SectionHeader from '@/components/common/section-header'
import ContinueCard from '@/components/blocks/surveys/continue-card'
import LibraryCarousel from '@/components/blocks/surveys/library-carousel'
import IdeasCard from '@/components/blocks/surveys/ideas-card'
import SearchBar from '@/components/blocks/surveys/search-bar'
import { Sparkles, ListChecks } from 'lucide-react'
import SuggestedList from '@/components/blocks/surveys/suggested-list'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
	const router = useRouter()
	const [q, setQ] = useState('')
	const [menuOpen, setMenuOpen] = useState(false)

	// TODO: replace mocks with Supabase queries
	const suggested = useMemo(
		() => [
			{
				id: 'imagination',
				title: 'Imagination Style',
				tags: ['personality', 'creative'],
				count: 12,
			},
			{
				id: 'career-interests',
				title: 'Career Interests (RIASEC)',
				tags: ['career', 'student'],
				count: 18,
			},
			{
				id: 'growth-mindset',
				title: 'Growth Mindset',
				tags: ['learning'],
				count: 10,
			},
		],
		[]
	)

	const library = useMemo(
		() => [
			{ id: 'love-languages', title: 'Love Languages', count: 15 },
			{ id: 'focus-habits', title: 'Focus & Habits', count: 10 },
			{ id: 'wellbeing', title: 'Well‑Being Snapshot', count: 8 },
			{ id: 'decision-style', title: 'Decision Style', count: 9 },
			{ id: 'risk-tolerance', title: 'Risk Tolerance', count: 7 },
		],
		[]
	)

	const inProgress = useMemo(
		() => ({ id: 'imagination', title: 'Imagination Style', progress: 0.45 }),
		[]
	)

	async function handleLogout() {
		await supabase.auth.signOut()
		router.push('/auth/login')
	}

	function onNavigate(href: string) {
		setMenuOpen(false)
		router.push(href)
	}

	return (
		<Screen>
			{/* Header / Burger */}
			<AppHeader onBurger={() => setMenuOpen(true)} />

			{/* Global search */}
			<SearchBar value={q} onChange={setQ} actionHref="/search" />

			<Container>
				{/* Continue section */}
				{inProgress && (
					<ContinueCard
						id={inProgress.id}
						title={inProgress.title}
						progress={inProgress.progress}
					/>
				)}

				{/* Suggested for you */}
				<SectionHeader
					title="Suggested for you"
					subtitle="Based on your profile and history"
					icon={<Sparkles className="h-4 w-4" />}
				/>
				<SuggestedList items={suggested} />

				{/* From the library */}
				<SectionHeader
					title="From the library"
					subtitle="Reusable, science‑backed surveys"
					icon={<ListChecks className="h-4 w-4" />}
				/>
				<LibraryCarousel items={library} />

				{/* Give me ideas */}
				<IdeasCard seed={q} />

				{/* Footer hint */}
				<footer className="pt-2 text-center text-xs text-muted-foreground">
					Tip: Save or share results with a QR code after you finish a survey.
				</footer>
			</Container>

			{/* Slide-out Menu */}
			<AppMenu
				open={menuOpen}
				onClose={() => setMenuOpen(false)}
				onNavigate={onNavigate}
				onLogout={handleLogout}
			/>
		</Screen>
	)
}
