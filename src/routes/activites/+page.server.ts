import { entries } from '$lib/clients/contentful'
import type { EntryCollection } from 'contentful'
import type { Item } from '$lib/components/Collection.svelte'
import type { Theme } from '$lib/components/Themes.svelte'
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ url }) => {
	const locale = url.searchParams.get('locale')
	const checked = url.searchParams.get('q')
	const page = url.searchParams.get('p')

	const [activites, themes] = await Promise.all([
		entries('activite', locale, {
			'order': '-fields.date',
			...(checked && {
				...(checked.includes('futur') && { 'fields.date[gte]': new Date().toISOString() }),
				...(checked.includes('archived') && { 'fields.archived': true }),
				...(checked.includes('Conférence') && { 'fields.type': 'Conférence' }),
				...(checked.includes('Visite terrain') && { 'fields.type': 'Visite terrain' }),
				...(checked.includes('Écobâtiment y sera') && { 'fields.type': 'Écobâtiment y sera' }),
				...(checked.replace('archived', '').replace('futur', '')
					.replace('Conférence', '')
					.replace('Visite terrain', '')
					.replace('Écobâtiment y sera', '').length > 0 && {
					'fields.themes.sys.id[in]': (await entries<{ id: string }>('theme', locale, { 'fields.id[in]': checked }))
						.items.map(theme => theme.sys.id).join(',')
				})
			}
		}, 2, page && parseInt(page)),
		entries('theme', locale)
	])

	return {
		activites: activites as EntryCollection<Item>,
		themes: themes as EntryCollection<Theme>
	}
}
