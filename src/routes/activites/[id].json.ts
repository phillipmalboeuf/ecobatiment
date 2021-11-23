import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'
import json from 'json-complete'

// @ts-ignore
export const get: RequestHandler = async ({ params, query }) => {
  const locale = query.get('locale')
	const [activites] = await Promise.all([
    entries('activite', locale, { 'fields.id': params.id }),
    // entries('theme', locale)
  ])

  if (activites.items.length) {
    return {
      body: json.encode({
        activite: activites.items[0]
      })
    }
  }
}