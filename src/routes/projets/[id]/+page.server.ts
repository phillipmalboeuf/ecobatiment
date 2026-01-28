import { entries } from '$lib/clients/contentful'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ params, url }) => {
	const locale = url.searchParams.get('locale')
	const [projets] = await Promise.all([
		entries('projet', locale, { 'fields.id': params.id })
	])

	if (projets.items.length) {
		return {
			projet: projets.items[0]
		}
	}

	throw new Error('Projet not found')
}
