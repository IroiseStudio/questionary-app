import { useEffect, useState } from 'react'

export function useSurvey(idOrSlug: string) {
	const [survey, setSurvey] = useState<unknown>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let off = false
		setLoading(true)
		setError(null)
		fetch(`/api/surveys/${idOrSlug}`)
			.then((r) =>
				r.ok ? r.json() : Promise.reject(new Error('Failed to fetch'))
			)
			.then(({ survey }) => {
				if (!off) setSurvey(survey)
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
	}, [idOrSlug])

	return { survey, loading, error }
}
