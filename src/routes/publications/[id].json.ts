import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'
import json from 'json-complete'

export const get: RequestHandler = async ({ params, url }) => {
  const locale = url.searchParams.get('locale')
	const [publications] = await Promise.all([
    entries('publication', locale, { 'fields.id': params.id }),
    // entries('theme', locale)
  ])

  if (publications.items.length) {
    return {
      body: json.encode({
        publication: publications.items[0]
      })
    }
  }
}