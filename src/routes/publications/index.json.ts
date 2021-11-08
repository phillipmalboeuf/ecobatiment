import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'

// @ts-ignore
export const get: RequestHandler = async ({ params, query }) => {
  const locale = query.get('locale')
	const [publications, themes] = await Promise.all([
    entries('publication', locale, { 'order': '-fields.date' }),
    entries('theme', locale)
  ])

  return {
    body: {
      publications,
      themes
    }
  }
}