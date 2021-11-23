import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'
import json from 'json-complete'

// @ts-ignore
export const get: RequestHandler = async ({ params, query }) => {
  const locale = query.get('locale')
	const [publications, themes] = await Promise.all([
    entries('publication', locale, { 'order': '-fields.date' }),
    entries('theme', locale)
  ])

  return {
    body: json.encode({
      publications,
      themes
    })
  }
}