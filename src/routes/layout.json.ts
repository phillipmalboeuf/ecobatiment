import { contentful } from '$lib/clients/contentful';

export async function get({ params }) {

	const [navigation, accueil] = await Promise.all([
    contentful.getEntry('g2kGRhWh41xvnW9Bf0mJz', { include: 2 }),
    // contentful.getEntry('E9D3f7VUjSrwHAMTde2lC', { include: 3 })
  ])


  return {
    body: {
      navigation,
      // accueil
    }
  }
}