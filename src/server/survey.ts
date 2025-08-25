import type { SupabaseClient } from '@supabase/supabase-js'

export type SurveyListItem = {
	id: string
	slug: string
	title: string
	tags?: string[]
	question_count?: number
	// created_at?: string // add if your view exposes it and you want to order by it
}

export async function listSurveys(
	supabase: SupabaseClient,
	query?: string
): Promise<SurveyListItem[]> {
	let q = supabase
		.from('surveys_catalog')
		.select('id, slug, title, tags, question_count')

	// If your view has created_at, you can order by it:
	// q = q.order('created_at', { ascending: false })

	if (query?.trim()) {
		q = q.ilike('title', `%${query}%`)
	}

	const { data, error } = await q
	if (error) throw error
	return (data ?? []) as SurveyListItem[]
}

export async function getSurvey(supabase: SupabaseClient, idOrSlug: string) {
	const isUuid =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
			idOrSlug
		)

	const base = supabase.from('surveys').select('*').limit(1)

	const query = isUuid ? base.eq('id', idOrSlug) : base.eq('slug', idOrSlug)

	const { data, error } = await query.single()
	if (error) throw error
	return data
}
