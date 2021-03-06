import { contentful, entries } from '$lib/clients/contentful'
import type { RequestHandler } from '@sveltejs/kit'
import type { Entry } from 'contentful'
import json from 'json-complete'


export const get: RequestHandler = async ({ params, url }) => {
  const locale = url.searchParams.get('locale')
	const [pages] = await Promise.all([
    entries('page', locale, { 'fields.id': params.page }),
    // entries('theme', locale)
  ])

  if (pages.items.length) {
    return {
      body: json.encode({
        page: pages.items[0]
      })
    }
  }
}