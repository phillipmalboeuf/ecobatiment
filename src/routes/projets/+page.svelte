<script lang="ts">
  import type { EntryCollection } from 'contentful'
  import type { Item } from '$lib/components/Collection.svelte'
  import type { Theme } from '$lib/components/Themes.svelte'
  import type { PageData } from './$types'
  import Collection from '$lib/components/Collection.svelte'

  export let data: PageData
</script>

<section class="grid">
  <h1>Projets</h1>
  
  <Collection base="projets" themes={data.themes} items={data.projets} />
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