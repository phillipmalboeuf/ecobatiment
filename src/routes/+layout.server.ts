import { contentful } from '$lib/clients/contentful'
import type { Entry } from 'contentful'
import type { Lien } from '$lib/components/Link.svelte'

export async function load() {
	const [navigation, sousNavigation, contact, panier] = await Promise.all([
		contentful.getEntry('g2kGRhWh41xvnW9Bf0mJz', { include: 2 }),
		contentful.getEntry('6VX0auTfvFxX5HjBUj6g1O', { include: 2 }),
		contentful.getEntry('4xifr3jW1omUxYra89IT8P'),
		contentful.getEntry('4RlupX9uREv7Uj1NUcWEDn')
	])

	return {
		navigation: navigation as Entry<{ liens: Entry<Lien>[] }>,
		sousNavigation: sousNavigation as Entry<{ liens: Entry<Lien>[] }>,
		contact: contact as Entry<any>,
		panier: panier as Entry<any>
	}
}
