'use client'

import { useState } from 'react'
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

export default function ResetRequestPage() {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function handleReset(e?: React.FormEvent) {
		e?.preventDefault()
		if (loading) return

		setError(null)
		setMessage(null)
		setLoading(true)

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/auth/update-password`,
		})

		if (error) setError(error.message)
		else setMessage('Check your email for the reset link.')

		setLoading(false)
	}

	return (
		<Screen className="flex items-center justify-center">
			<Card className="w-full max-w-md p-6 glass">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">Reset Password</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleReset} className="space-y-4">
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

						{error && (
							<p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
								{error}
							</p>
						)}
						{message && (
							<p className="text-sm text-green-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 text-center">
								{message}
							</p>
						)}

						<Button
							type="submit"
							variant="validate" // teal→green gradient for confirm/validate actions
							full // full-width per your API
							disabled={loading}
						>
							{loading ? 'Sending…' : 'Send Reset Link'}
						</Button>
					</form>
				</CardContent>

				<CardFooter className="flex justify-center">
					<Link
						href="/auth/login"
						className="text-sm text-primary hover:opacity-90"
					>
						← Back to login
					</Link>
				</CardFooter>
			</Card>
		</Screen>
	)
}
