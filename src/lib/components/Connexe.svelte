<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import Picture from './Picture.svelte'
  import type { Item } from './Collection.svelte'
  import Themes from './Themes.svelte'
  import I from './icons/I.svelte'
  import { date } from '$lib/formatters'

  export let items: Entry<Item>[]

  const grid = items.length > 4 ? 4 : items.length
</script>



<section class="grid" style="grid-template-columns: repeat({grid}, 1fr);">  
  <h6><I i="arrow-far-right" /></h6>
  <h5 style="grid-column: span {grid};">Aller plus loin</h5>

  {#each items as item, index}
  <article>
    <a href="/{item.sys.contentType.sys.id}s/{item.fields.id}">
      <figure>
        <Picture media={item.fields.photo} small ar={1 / (4 - grid)} noDescription />
      </figure>
    </a>

    <div>
      <Themes base="{item.sys.contentType.sys.id}s" themes={item.fields.themes} />

      <a href="/{item.sys.contentType.sys.id}s/{item.fields.id}"><h5>{item.fields.titre}</h5></a>
      {#if item.fields.date}<small>{date(item.fields.date)}</small>{/if}
    </div>
  </article>
  {/each}
</section>


<style lang="scss">
  h5 {
    text-transform: uppercase;
    margin-bottom: var(--s3);
  }

  figure {
    margin-bottom: var(--s2);
  }

  @media (max-width: 888px) {
    h5 {
      grid-column: span 2 !important;
    }
    
    section.grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    figure {
      margin-bottom: var(--s1);
    }

    article {
      margin-bottom: var(--s2);
    }
  }

  div {
    padding: 0 var(--s1);

    h5 {
      text-transform: none;
      margin: var(--s0) 0;
    }

    @media (max-width: 888px) {
      padding: 0 var(--s0);
    }
  }
</style>