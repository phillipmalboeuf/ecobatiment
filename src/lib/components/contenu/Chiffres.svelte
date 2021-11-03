<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import Document from '../document/Document.svelte'
  import Picture from '../Picture.svelte'


  export let chiffres: Entry<{
    titre: string
    chiffres: Entry<{ corps: RichTextContent }>[]
  }>
</script>

<section class="grid" style="grid-template-columns: repeat({chiffres.fields.chiffres.length > 4 ? chiffres.fields.chiffres.length : 4}, 1fr);">  
{#if chiffres.fields.titre}<nav><h6>{chiffres.fields.titre}</h6></nav>{/if}
  {#each chiffres.fields.chiffres as item, index}
  <figure>
    <Document body={item.fields.corps} />
  </figure>
  {/each}
</section>

<hr>

<style lang="scss">
  figure {
    position: relative;
    margin-bottom: 0;
  }

  nav {
    grid-column: span 12;
  }

  h6 {
    margin-bottom: var(--s1);
  }

  figure {
    :global(h2),
    :global(h4),
    :global(h6) {
      margin-bottom: var(--s0);
    }
  }
</style>