import { contentful } from '$lib/clients/contentful';

export async function get({ params }) {

	const [navigation, sousNavigation, contact, panier] = await Promise.all([
    contentful.getEntry('g2kGRhWh41xvnW9Bf0mJz', { include: 2 }),
    contentful.getEntry('6VX0auTfvFxX5HjBUj6g1O', { include: 2 }),
    contentful.getEntry('4xifr3jW1omUxYra89IT8P'),
    contentful.getEntry('4RlupX9uREv7Uj1NUcWEDn')
  ])


  return {
    body: {
      navigation,
      sousNavigation,
      contact,
      panier
    }
  }
}