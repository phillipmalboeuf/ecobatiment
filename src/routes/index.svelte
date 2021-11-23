<script context="module">
	import { respond } from '$lib/responses'
	export async function load({ page, fetch, session, context }) {
		return respond(fetch, `/index.json`)
	}
</script>

<script lang="ts">
  import type { PageDocument } from '$lib/components/Page.svelte'
  import type { Entry } from 'contentful'

  import Page from '$lib/components/Page.svelte'

  export let accueil: Entry<PageDocument>
</script>

<Page page={accueil} />
