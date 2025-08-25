'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Screen from '@/components/ui/screen'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useMemo } from 'react'
import { createSupabaseBrowser } from '@/lib/supabase/browser'

export default function SignupPage() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState<string | null>(null)
	const supabase = useMemo(() => createSupabaseBrowser(), [])

	async function handleSignup(e?: React.FormEvent) {
		e?.preventDefault()
		if (loading) return
		setLoading(true)
		setError(null)
		setMessage(null)

		const origin = window.location.origin
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: `${origin}/auth/callback` },
		})

		if (error) {
			setError(error.message)
			setLoading(false)
			return
		}

		if (data.user && !data.session) {
			setMessage('Check your email to confirm your account.')
			setLoading(false)
			return
		}

		router.push('/home')
	}

	return (
		<Screen className="flex items-center justify-center">
			<Card className="w-full max-w-md p-6 glass">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">Create account</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSignup} className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="email" className="text-sm text-muted">
								Email
							</label>
							<input
								id="email"
								type="email"
								inputMode="email"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full rounded-lg bg-card-2 text-text placeholder:text-muted border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60"
								placeholder="you@example.com"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="password" className="text-sm text-muted">
								Password
							</label>
							<input
								id="password"
								type="password"
								autoComplete="new-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full rounded-lg bg-card-2 text-text placeholder:text-muted border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60"
								placeholder="••••••••"
							/>
						</div>

						{error && (
							<p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
								{error}
							</p>
						)}
						{message && (
							<p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 text-center">
								{message}
							</p>
						)}

						<Button
							type="submit"
							variant="continue" // forward/progression gradient
							full // full-width
							disabled={loading}
						>
							{loading ? 'Signing up…' : 'Sign Up'}
						</Button>
					</form>
				</CardContent>

				<CardFooter className="flex justify-center">
					<p className="text-sm text-muted">
						Already have an account?{' '}
						<Link href="/auth/login" className="text-primary hover:opacity-90">
							Log in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</Screen>
	)
}
