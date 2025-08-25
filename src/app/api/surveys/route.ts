import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'
import { listSurveys } from '@/server/survey'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
	const supabase = await createSupabaseServer()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

	const { searchParams } = new URL(req.url)
	const query = searchParams.get('query') ?? undefined

	const data = await listSurveys(supabase, query)
	return NextResponse.json(
		{ data },
		{ headers: { 'Cache-Control': 'private, no-store' } }
	)
}
