import { type NextRequest, type NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export function createSupabaseMiddlewareClient(
	req: NextRequest,
	res: NextResponse
) {
	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll: () => req.cookies.getAll(),
				setAll: (cookies) => {
					cookies.forEach(({ name, value, ...options }) => {
						res.cookies.set({ name, value, ...options })
					})
				},
			},
		}
	)
}
