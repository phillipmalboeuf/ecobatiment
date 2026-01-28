<script lang="ts">
  import type { EntryCollection } from 'contentful'
  import type { Item } from '$lib/components/Collection.svelte'
  import type { Theme } from '$lib/components/Themes.svelte'
  import type { PageData } from './$types'
  import Collection from '$lib/components/Collection.svelte'

  export let data: PageData
</script>

<section class="grid">
  <h1>Activités</h1>
  
  <Collection base="activites" themes={data.themes} items={data.activites} />
</section>

<style lang="scss">
  h1 {
    grid-column: 4 / span 9;
  }
</style>