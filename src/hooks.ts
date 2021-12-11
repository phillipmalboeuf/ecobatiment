/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {

	const response = await resolve(request)

	return {
		...response,
		headers: {
			...response.headers,
			'Link': '<https://images.ctfassets.net>; rel="preconnect", <https://fonts.googleapis.com>; rel="preconnect", <https://fonts.gstatic.com>; rel="preconnect"; crossorigin, <https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap>; rel="preload"; as="style"',
			'Cache-Control': 's-maxage=1, stale-while-revalidate'
		}
	};
}