import { entries } from '$lib/clients/contentful'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params, url }) => {
	const locale = url.searchParams.get('locale')
	const [publications] = await Promise.all([
		entries('publication', locale, { 'fields.id': params.id })
	])

	if (publications.items.length) {
		return json({
			publication: publications.items[0]
		})
	}

	return json({ error: 'Publication not found' }, { status: 404 })
}
