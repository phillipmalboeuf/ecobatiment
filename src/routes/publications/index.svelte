<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { respond } from '$lib/responses'
  
  export const load: Load = async ({ page, fetch, session, stuff }) => {
		return respond(fetch, `/publications.json?${page.query.toString()}`)
	}
</script>

<script lang="ts">
  import type { EntryCollection } from 'contentful'
  import type { Item } from '$lib/components/Collection.svelte'
  import type { Theme } from '$lib/components/Themes.svelte'
  import Collection from '$lib/components/Collection.svelte'


	export let publications: EntryCollection<Item>
  export let themes: EntryCollection<Theme>
</script>

<section class="grid">
  <h1>Publications</h1>
  
  <Collection base="publications" {themes} items={publications} noDate />
</section>

<style lang="scss">
  h1 {
    grid-column: 4 / span 9;
  }
</style>