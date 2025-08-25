'use client'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowser } from '@/lib/supabase/browser'

export function useLogout() {
	const supabase = useMemo(() => createSupabaseBrowser(), [])
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	async function handleLogout() {
		if (loading) return
		setLoading(true)
		try {
			await supabase.auth.signOut()
			router.push('/auth/login')
		} finally {
			setLoading(false)
		}
	}

	return { handleLogout, loading }
}
