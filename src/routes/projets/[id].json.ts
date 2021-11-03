import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'

// @ts-ignore
export const get: RequestHandler = async ({ params, query }) => {
  const locale = query.get('locale')
	const [projets] = await Promise.all([
    entries('projet', locale, { 'fields.id': params.id }),
    // entries('theme', locale)
  ])

  if (projets.items.length) {
    return {
      body: {
        projet: projets.items[0]
      }
    }
  }
}