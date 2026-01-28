import { contentful } from '$lib/clients/contentful'
import type { PageDocument } from '$lib/components/Page.svelte'
import type { Entry } from 'contentful'

export async function load() {
	const [accueil] = await Promise.all([
		contentful.getEntry('E9D3f7VUjSrwHAMTde2lC', { include: 3 })
	])

	console.log(accueil)

	return {
		accueil: accueil as Entry<PageDocument>
	}
}
