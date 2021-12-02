<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import Document from '../document/Document.svelte'
  import Picture from '../Picture.svelte'


  export let contenu: Entry<{
    titre: string
    id: string
    corps: RichTextContent
    photos: Asset[]
  }>
</script>

<section id={contenu.fields.id} class="grid">  
  <aside>
    {#if contenu.fields.photos}
    {#each contenu.fields.photos as media}
    <figure>
      <Picture {media} small />
    </figure>
    {/each}
    {:else}
    {#if contenu.fields.titre}<h4>{contenu.fields.titre}</h4>{/if}
    {/if}
  </aside>
  <div>
    {#if contenu.fields.titre && contenu.fields.photos}<h4>{contenu.fields.titre}</h4>{/if}
    <Document body={contenu.fields.corps} />
  </div>
</section>

<hr>

<style lang="scss">
  aside {
    grid-column: span 5;

    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }

  div {
    grid-column: 7 / span 6;

    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }
</style>