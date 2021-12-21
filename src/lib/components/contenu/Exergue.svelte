<script lang="ts">
  import type { Entry, RichTextContent } from 'contentful'
  import type { Lien } from '../Link.svelte'
  import Document from '../document/Document.svelte'
  import Link from '../Link.svelte'


  export let intro: Entry<{
    titre: string
    id: string
    corps: RichTextContent
    technicalites: RichTextContent
    lien: Entry<Lien>
  }>
</script>

<section id={intro.fields.id} class="grid">
  <nav>
    {#if intro.fields.titre}<h6>{intro.fields.titre}</h6>{/if}
    {#if intro.fields.lien}
    <Link lien={intro.fields.lien} plus />
    {/if}
  </nav>

  <div class:right={!intro.fields.technicalites && !intro.fields.titre}>
    <Document body={intro.fields.corps} />
  </div>
  
  <aside>
    <Document body={intro.fields.technicalites} />
  </aside>
</section>

<hr>

<style lang="scss">
  div {
    grid-column: span 5;

    &.right {
      grid-column: 7 / span 6;

      @media (max-width: 1200px) {
        grid-column: 6 / span 7;
      }
    }

    @media (max-width: 888px) {
      grid-column: span 12;

      &.right {
        grid-column: span 12;
      }
    }
  }

  nav {
    grid-column: span 12;
    margin-bottom: var(--s1);
  }

  h6 {
    margin-bottom: var(--s1);
  }

  div :global(p) {
    font-size: 1.66rem;

    @media (max-width: 888px) {
      font-size: 1.33rem;
    }
  }

  aside {
    grid-column: 7 / span 4;

    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }
</style>