import { useEffect, useState } from 'react'
import type { SurveyListItem } from '@/server/survey'

export function useSurveys(query = '') {
	const [data, setData] = useState<SurveyListItem[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let off = false
		setLoading(true)
		setError(null)

		const url = `/api/surveys${
			query ? `?query=${encodeURIComponent(query)}` : ''
		}`
		fetch(url, { cache: 'no-store' })
			.then(async (r) => {
				if (!r.ok) throw new Error(`Failed to fetch (${r.status})`)
				const json = await r.json()
				const arr = Array.isArray(json) ? json : json?.data
				if (!Array.isArray(arr)) throw new Error('Bad response shape')
				if (!off) setData(arr as SurveyListItem[])
			})
			.catch((e) => {
				if (!off) setError(String(e))
			})
			.finally(() => {
				if (!off) setLoading(false)
			})

		return () => {
			off = true
		}
	}, [query])

	return { data, loading, error }
}
