import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'

// @ts-ignore
export const get: RequestHandler = async ({ params, query }) => {
  const locale = query.get('locale')
	const [publications] = await Promise.all([
    entries('publication', locale, { 'fields.id': params.id }),
    // entries('theme', locale)
  ])

  if (publications.items.length) {
    return {
      body: {
        publication: publications.items[0]
      }
    }
  }
}