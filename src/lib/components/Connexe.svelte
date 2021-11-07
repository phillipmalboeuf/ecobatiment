<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import Picture from './Picture.svelte'
  import type { Item } from './Collection.svelte'
  import Themes from './Themes.svelte'

  export let items: Entry<Item>[]

  const grid = items.length > 4 ? 4 : items.length
</script>



<section class="grid" style="grid-template-columns: repeat({grid}, 1fr);">  
  <h5 style="grid-column: span {grid};">Contenu connexe</h5>

  {#each items as item, index}
  <article>
    <a href="/{item.sys.contentType.sys.id}s/{item.fields.id}">
      <figure>
        <Picture media={item.fields.photo} small ar={1 / (4 - grid)} noDescription />
      </figure>
    </a>

    <div>
      <Themes base={item.sys.contentType.sys.id} themes={item.fields.themes} />

      <a href="/{item.sys.contentType.sys.id}s/{item.fields.id}"><h5>{item.fields.titre}</h5></a>
      <small>{item.fields.date}</small>
    </div>
  </article>
  {/each}
</section>


<style lang="scss">
  h5 {
    text-transform: uppercase;
  }

  figure {
    margin-bottom: var(--s2);
  }

  div {
    padding: 0 var(--s1);

    h5 {
      text-transform: none;
      margin: var(--s0) 0;
    }
  }
</style>