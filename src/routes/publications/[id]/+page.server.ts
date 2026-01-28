import { entries } from '$lib/clients/contentful'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ params, url }) => {
	const locale = url.searchParams.get('locale')
	const [publications] = await Promise.all([
		entries('publication', locale, { 'fields.id': params.id })
	])

	if (publications.items.length) {
		return {
			publication: publications.items[0]
		}
	}

	throw new Error('Publication not found')
}
