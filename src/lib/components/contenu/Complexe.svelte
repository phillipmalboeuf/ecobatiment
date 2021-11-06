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
    <h4>{contenu.fields.titre}</h4>
    {#if contenu.fields.technicalites}<Document body={contenu.fields.technicalites} />{/if}
  </aside>
  <div>
    {#each contenu.fields.photos as media}
    <figure>
      <Picture {media} small />
    </figure>
    {/each}
    <Document body={contenu.fields.corps} />
  </div>
</section>

<hr>

<style lang="scss">
  aside {
    grid-column: span 6;
  }

  div {
    grid-column: span 6;
  }
</style>