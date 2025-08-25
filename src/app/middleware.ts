import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseMiddlewareClient } from '@/lib/supabase/middleware'

export async function middleware(req: NextRequest) {
	// Prepare a response we can write refreshed cookies into
	const res = NextResponse.next()

	// Supabase client bound to req/res cookies (new getAll/setAll API)
	const supabase = createSupabaseMiddlewareClient(req, res)

	// Protect these paths
	const needsAuth =
		req.nextUrl.pathname.startsWith('/home') ||
		req.nextUrl.pathname.startsWith('/api')

	// Always allow auth pages themselves to avoid loops
	const isAuthRoute =
		req.nextUrl.pathname.startsWith('/auth') ||
		req.nextUrl.pathname.startsWith('/api/auth')

	if (!needsAuth || isAuthRoute) return res

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		const url = req.nextUrl.clone()
		url.pathname = '/auth/login'
		url.searchParams.set('redirect', req.nextUrl.pathname + req.nextUrl.search)
		return NextResponse.redirect(url)
	}

	return res
}

export const config = {
	matcher: [
		'/home/:path*',
		'/api/:path*',
		// optionally exclude webhooks or public APIs:
		// '/api((?!/webhooks).*)'
	],
}
