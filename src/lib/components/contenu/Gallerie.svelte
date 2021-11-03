<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import Picture from '../Picture.svelte'


  export let gallerie: Entry<{
    titre: string
    photos: Asset[]
    taille: string
  }>
</script>

<section class="grid" style="grid-template-columns: repeat({gallerie.fields.photos.length > 4 ? gallerie.fields.photos.length : 4}, 1fr);">  
  {#each gallerie.fields.photos as media, index}
  <figure>
    {#if gallerie.fields.titre && index === 0}<figcaption>{gallerie.fields.titre}</figcaption>{/if}
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
    position: relative;
    margin-bottom: 0;
  }

  figcaption {
    position: absolute;
    top: var(--s1);
    left: var(--s1);
    width: 100%;
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