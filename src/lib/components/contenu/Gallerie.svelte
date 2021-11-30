<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import Picture from '../Picture.svelte'


  export let gallerie: Entry<{
    titre: string
    id: string
    photos: Asset[]
    taille: string
  }>
</script>

<section id={gallerie.fields.id} class="grid" style="grid-template-columns: repeat({gallerie.fields.photos.length > 4 ? gallerie.fields.photos.length : 4}, 1fr);">  
  {#if gallerie.fields.titre}<h5 style="grid-column: span {gallerie.fields.photos.length > 4 ? gallerie.fields.photos.length : 4}">{gallerie.fields.titre}</h5>{/if}

  {#each gallerie.fields.photos as media, index}
  <figure>
    <Picture {media} small ar={{
      'Grand': 3 / 1,
      'Medium': 2 / 1,
      'Petit': 1
    }[gallerie.fields.taille] || 1} />
  </figure>
  {/each}
</section>

<hr>

<style lang="scss">
  figure {
    margin-bottom: var(--s1);
  }

  h5 {
    // grid-column: span 4;
  }

  @media (max-width: 888px) {
    h5 {
      grid-column: span 2 !important;
    }
    
    section.grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  // figure :global(img) {
  //   height: 25vw;
  //   object-fit: cover;
  // }

  // section.Moyen figure :global(img) {
  //   height: 50vw;
  // }

  // section.Grand figure :global(img) {
  //   height: 75vw;
  // }
</style>