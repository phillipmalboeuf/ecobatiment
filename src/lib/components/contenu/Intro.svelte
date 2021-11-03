<script lang="ts">
  import type { Entry, RichTextContent } from 'contentful'
  import type { Lien } from '../Link.svelte'
  import Document from '../document/Document.svelte'
  import Link from '../Link.svelte'


  export let intro: Entry<{
    titre: string
    corps: RichTextContent
    lien: Entry<Lien>
  }>
</script>

<section class="grid">
  <div>
    {#if intro.fields.titre}<h6>{intro.fields.titre}</h6>{/if}
    <Document body={intro.fields.corps} />
  </div>
  {#if intro.fields.lien}
  <nav><Link lien={intro.fields.lien} plus /></nav>
  {/if}
</section>

<hr>

<style lang="scss">
  div {
    grid-column: span 8;
  }

  div :global(p) {
    font-size: 3rem;
  }

  nav {
    grid-row-start: 2;
    grid-column: span 8;
  }
</style>