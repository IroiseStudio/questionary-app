import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'
import { getSurvey } from '@/server/survey'

export const dynamic = 'force-dynamic'

export async function GET(_: Request, { params }: { params: { id: string } }) {
	const supabase = await createSupabaseServer()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

	try {
		const data = await getSurvey(supabase, params.id)
		return NextResponse.json(
			{ data },
			{ headers: { 'Cache-Control': 'private, no-store' } }
		)
	} catch {
		return NextResponse.json({ error: 'Not found' }, { status: 404 })
	}
}
