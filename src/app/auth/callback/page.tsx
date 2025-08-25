'use client'
import { useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseBrowser } from '@/lib/supabase/browser'

export default function AuthCallback() {
	const supabase = useMemo(() => createSupabaseBrowser(), [])
	const router = useRouter()
	const qp = useSearchParams()

	useEffect(() => {
		;(async () => {
			const code = qp.get('code')
			const error = qp.get('error')
			const error_description = qp.get('error_description')
			const next = qp.get('next') || '/home'

			if (error) {
				// optional: show a toast or route to /auth/login with error_description
				console.error('OAuth error:', error_description || error)
				router.replace('/auth/login')
				return
			}

			if (!code) {
				// no code in URL — go somewhere sensible
				router.replace('/auth/login')
				return
			}

			const { error: exErr } = await supabase.auth.exchangeCodeForSession(code)
			if (exErr) {
				console.error(exErr.message)
				router.replace('/auth/login')
				return
			}

			router.replace(next)
		})()
	}, [qp, router, supabase])

	return null
}
