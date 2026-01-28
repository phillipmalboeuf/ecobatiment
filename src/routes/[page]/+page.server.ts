import { entries } from '$lib/clients/contentful'
import type { PageDocument } from '$lib/components/Page.svelte'
import type { Entry } from 'contentful'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ params, url }) => {
	const locale = url.searchParams.get('locale')
	const [pages] = await Promise.all([
		entries('page', locale, { 'fields.id': params.page })
	])

	if (pages.items.length) {
		return {
			page: pages.items[0] as Entry<PageDocument>
		}
	}

	throw new Error('Page not found')
}
