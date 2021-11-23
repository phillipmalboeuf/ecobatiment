import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'
import json from 'json-complete'

// @ts-ignore
export const get: RequestHandler = async ({ params, query }) => {
  const locale = query.get('locale')
  const checked = query.get('q')

	const [activites, themes] = await Promise.all([
    entries('activite', locale, { 'order': '-fields.date', ...checked && {
      ...checked.includes('futur') && { 'fields.date[gte]': new Date().toISOString() },
      ...checked.includes('archived') && { 'fields.archived': true },
      ...checked.includes('Conférence') && { 'fields.type': 'Conférence' },
      ...checked.includes('Visite terrain') && { 'fields.type': 'Visite terrain' },
      ...checked.includes('Écobâtiment y sera') && { 'fields.type': 'Écobâtiment y sera' },
      ...checked.replace('archived', '').replace('futur', '')
        .replace('Conférence', '')
        .replace('Visite terrain', '')
        .replace('Écobâtiment y sera', '').length > 0 && {
        'fields.themes.sys.id[in]': (await entries<{ id: string }>('theme', locale, { 'fields.id[in]': checked }))
          .items.map(theme => theme.sys.id).join(',')
      }
    } }),
    entries('theme', locale)
  ])

  return {
    body: json.encode({
      activites,
      themes
    })
  }
}