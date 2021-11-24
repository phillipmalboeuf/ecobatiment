import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'
import json from 'json-complete'

['Livre', 'Fiche informative', 'Article', 'Outil']

// @ts-ignore
export const get: RequestHandler = async ({ params, query }) => {
  const locale = query.get('locale')
  const checked = query.get('q')
  const page = query.get('p')

	const [publications, themes] = await Promise.all([
    entries('publication', locale, { 'order': '-fields.date', ...checked && {
      ...checked.includes('futur') && { 'fields.futur': true },
      ...checked.includes('dispo') && { 'fields.shopifyHandle[exists]': true },
      ...checked.includes('Livre') && { 'fields.type': 'Livre' },
      ...checked.includes('Fiche informative') && { 'fields.type': 'Fiche informative' },
      ...checked.includes('Article') && { 'fields.type': 'Article' },
      ...checked.includes('Outil') && { 'fields.type': 'Outil' },
      ...checked.replace('dispo', '').replace('futur', '')
        .replace('Livre', '')
        .replace('Fiche informative', '')
        .replace('Article', '')
        .replace('Outil', '').length > 0 && {
        'fields.themes.sys.id[in]': (await entries<{ id: string }>('theme', locale, { 'fields.id[in]': checked }))
          .items.map(theme => theme.sys.id).join(',')
      }
    } }, 2, page && parseInt(page)),
    entries('theme', locale)
  ])

  return {
    body: json.encode({
      publications,
      themes
    })
  }
}