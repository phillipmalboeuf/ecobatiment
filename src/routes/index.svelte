<script context="module">
	export async function load({ page, fetch, session, context }) {
		const res = await fetch(`/index.json`)

		return {
			props: {
				accueil: (await res.json()).accueil
			}
		}
	}
</script>

<script lang="ts">
  import type { PageDocument } from '$lib/components/Page.svelte'
  import type { Entry } from 'contentful'

  import Page from '$lib/components/Page.svelte'

  export let accueil: Entry<PageDocument>
</script>

<Page page={accueil} />
