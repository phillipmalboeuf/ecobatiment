import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'
import json from 'json-complete'

// @ts-ignore
export const get: RequestHandler = async ({ params, query }) => {
  const locale = query.get('locale')
  const checked = query.get('q')

	const [projets, themes] = await Promise.all([
    entries('projet', locale, { 'order': '-fields.date', ...checked && {
      ...checked.includes('futur') && { 'fields.futur': true },
      ...checked.includes('archived') && { 'fields.archived': true },
      ...checked.replace('archived', '').replace('futur', '').length > 0 && {
        'fields.themes.sys.id[in]': (await entries<{ id: string }>('theme', locale, { 'fields.id[in]': checked }))
          .items.map(theme => theme.sys.id).join(',')
      }
    } }),
    entries('theme', locale)
  ])

  return {
    body: json.encode({
      projets,
      themes
    })
  }
}