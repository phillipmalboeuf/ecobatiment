<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { respond } from '$lib/responses'
  
  export const load: Load = async ({ url, fetch, session, stuff }) => {
		return respond(fetch, `/projets.json?${url.searchParams.toString()}`)
	}
</script>

<script lang="ts">
  import type { EntryCollection } from 'contentful'
  import type { Item } from '$lib/components/Collection.svelte'
  import type { Theme } from '$lib/components/Themes.svelte'
  import Collection from '$lib/components/Collection.svelte'


	export let projets: EntryCollection<Item>
  export let themes: EntryCollection<Theme>
</script>

<section class="grid">
  <h1>Projets</h1>
  
  <Collection base="projets" {themes} items={projets} />
</section>

<style lang="scss">
  h1 {
    grid-column: 4 / span 9;

    @media (max-width: 888px) {
      grid-column: span 12;
      font-size: 2rem;
    }
  }
</style>