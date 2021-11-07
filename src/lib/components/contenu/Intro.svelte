<script lang="ts">
  import type { Entry, RichTextContent } from 'contentful'
  import type { Lien } from '../Link.svelte'
  import Document from '../document/Document.svelte'
  import Link from '../Link.svelte'


  export let intro: Entry<{
    titre: string
    id: string
    corps: RichTextContent
    lien: Entry<Lien>
  }>
</script>

<section id={intro.fields.id} class="grid">
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
    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }

  div :global(p) {
    font-size: 3rem;

    @media (max-width: 888px) {
      font-size: 1.5rem;
    }
  }

  nav {
    grid-row-start: 2;
    grid-column: span 8;
    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }
</style>