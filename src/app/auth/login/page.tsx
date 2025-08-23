'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

import Screen from '@/components/ui/screen'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function handleLogin(e?: React.FormEvent) {
		e?.preventDefault()
		if (loading) return

		setLoading(true)
		setError(null)

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			setError(error.message)
			setLoading(false)
			return
		}

		router.push('/dashboard')
	}

	return (
		<Screen className="flex items-center justify-center">
			<Card className="w-full max-w-md p-6 glass">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">Login</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleLogin} className="space-y-4">
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
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full rounded-lg bg-card-2 text-text placeholder:text-muted border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60"
								placeholder="••••••••"
							/>
							<div className="text-right text-sm">
								<Link
									href="/auth/reset"
									className="text-primary hover:opacity-90"
								>
									Forgot password?
								</Link>
							</div>
						</div>

						{error && (
							<p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
								{error}
							</p>
						)}

						<Button
							type="submit"
							variant="continue" // blue → cyan gradient
							full
							disabled={loading}
						>
							{loading ? 'Logging in…' : 'Log In'}
						</Button>
					</form>
				</CardContent>

				<CardFooter className="flex justify-center">
					<p className="text-sm text-muted">
						Don’t have an account?{' '}
						<Link href="/auth/signup" className="text-primary hover:opacity-90">
							Sign up
						</Link>
					</p>
				</CardFooter>
			</Card>
		</Screen>
	)
}
