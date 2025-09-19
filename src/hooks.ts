/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

	const response = await resolve(event)
	response.headers.set('Link', '<https://images.ctfassets.net>; rel="preconnect", <https://fonts.googleapis.com>; rel="preconnect", <https://fonts.gstatic.com>; rel="preconnect"; crossorigin, <https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap>; rel="preload"; as="style"')
	response.headers.set('Vercel-CDN-Cache-Control', 'maxage=3600000, stale-while-revalidate')
	response.headers.set('Cache-Control', 'maxage=3600000, stale-while-revalidate')
	response.headers.set('ETag', `"${process.env.VERCEL_URL || 'dev'}"`)

	return response
}