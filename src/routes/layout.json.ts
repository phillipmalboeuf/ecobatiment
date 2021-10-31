import { contentful } from '$lib/clients/contentful';


export async function get({ params }) {

	const navigation = await contentful.getEntry('g2kGRhWh41xvnW9Bf0mJz', { include: 2 })

  return {
    body: {
      navigation
    }
  }
}