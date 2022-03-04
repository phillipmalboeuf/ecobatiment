import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: vercel(),
		vite: () => process.env.NODE_ENV !== 'development' && ({
			ssr: {
				noExternal: ['contentful']
			}
		})
	}
};

export default config;
