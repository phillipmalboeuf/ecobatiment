<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import Document from '../document/Document.svelte'
  import Picture from '../Picture.svelte'


  export let contenu: Entry<{
    id: string
    titre: string
    corps: RichTextContent
    technicalites: RichTextContent
    photos: Asset[]
  }>
</script>

<section class="grid" id={contenu.fields.id}>  
  <aside>
    {#if contenu.fields.titre}<h5>{contenu.fields.titre}</h5>{/if}
    {#if contenu.fields.technicalites}<Document body={contenu.fields.technicalites} />{/if}
  </aside>
  <div class="columns">
    {#if contenu.fields.photos}
    {#each contenu.fields.photos as media}
    <figure>
      <Picture {media} small />
    </figure>
    {/each}
    {/if}
    <Document body={contenu.fields.corps} />
  </div>
</section>

<hr>

<style lang="scss">
  aside {
    grid-column: span 6;

    // @media (max-width: 1200px) {
    //   grid-column: span 5;
    // }

    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }

  div {
    grid-column: span 6;

    @media (max-width: 1200px) {
      grid-column: span 7;
    }

    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }
</style>