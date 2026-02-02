import { entries } from '$lib/clients/contentful'
import type { PageDocument } from '$lib/components/Page.svelte'
import type { Entry } from 'contentful'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ params, url }) => {
	const locale = url.searchParams.get('locale')
	const [activites] = await Promise.all([
		entries('activite', locale, { 'fields.id': params.id })
	])

	if (activites.items.length) {
		return {
			activite: activites.items[0] as Entry<PageDocument>
		}
	}

	throw new Error('Activite not found')
}
