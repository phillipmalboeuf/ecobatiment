import { contentful } from '$lib/clients/contentful';
import json from 'json-complete'

export async function get({ params }) {

	const [accueil] = await Promise.all([
    contentful.getEntry('E9D3f7VUjSrwHAMTde2lC', { include: 3 })
  ])


  return {
    body: json.encode({
      accueil,
      // accueil
    })
  }
}