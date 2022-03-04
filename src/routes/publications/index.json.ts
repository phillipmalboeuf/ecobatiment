import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'
import json from 'json-complete'

['Livre', 'Fiche informative', 'Article', 'Outil']

export const get: RequestHandler = async ({ params, url }) => {
  const locale = url.searchParams.get('locale')
  const checked = url.searchParams.get('q')
  const page = url.searchParams.get('p')

	const [publications, themes] = await Promise.all([
    entries('publication', locale, { 'order': '-fields.date', ...checked && {
      ...checked.includes('futur') && { 'fields.futur': true },
      ...checked.includes('dispo') && { 'fields.futur': false },
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