'use client'

import { useEffect, useState } from 'react'
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
import { useSearchParams } from 'next/navigation'

export default function UpdatePasswordPage() {
	const supabase = useMemo(() => createSupabaseBrowser(), [])
	const qp = useSearchParams()
	const router = useRouter()
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		;(async () => {
			const code = qp.get('code')
			if (code) {
				// exchange if the provider sent the user straight here
				await supabase.auth.exchangeCodeForSession(code)
			}
		})()
	}, [qp, supabase])

	async function handleUpdate(e?: React.FormEvent) {
		e?.preventDefault()
		if (loading || !password) return
		setLoading(true)
		setError(null)

		const { error } = await supabase.auth.updateUser({ password })
		if (error) {
			setError(error.message)
			setLoading(false)
			return
		}

		setMessage('Password updated successfully. Redirecting to login…')
		setTimeout(() => router.push('/auth/login'), 1200)
		setLoading(false)
	}

	return (
		<Screen className="flex items-center justify-center">
			<Card className="w-full max-w-md p-6 glass">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">Set New Password</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleUpdate} className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="password" className="text-sm text-muted">
								New password
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
							variant={
								message ? 'validate' : 'continue'
							} /* green after success */
							full
							disabled={loading || !!message}
						>
							{message
								? 'Success! Redirecting…'
								: loading
								? 'Updating…'
								: 'Update Password'}
						</Button>
					</form>
				</CardContent>

				<CardFooter className="flex justify-center">
					{/* Optional: a safe exit back to login */}
					<a
						href="/auth/login"
						className="text-sm text-primary hover:opacity-90"
					>
						← Back to login
					</a>
				</CardFooter>
			</Card>
		</Screen>
	)
}
