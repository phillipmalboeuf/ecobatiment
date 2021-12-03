<script lang="ts">
  import type { Entry, RichTextContent } from 'contentful'
  import type { Lien } from '../Link.svelte'
  import Document from '../document/Document.svelte'
  import Link from '../Link.svelte'
  import Logo from '../icons/Logo.svelte'

  export let intro: Entry<{
    titre: string
    id: string
    corps: RichTextContent
    lien: Entry<Lien>
    logo: boolean
  }>
</script>

<section id={intro.fields.id} class="grid">
  {#if intro.fields.logo}
  <figure>
    <Logo />
  </figure>
  {/if}
  <div>
    {#if intro.fields.titre}<h6>{intro.fields.titre}</h6>{/if}
    <Document body={intro.fields.corps} />
    {#if intro.fields.lien}
    <nav><Link lien={intro.fields.lien} plus /></nav>
    {/if}
  </div>
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
    font-size: 2.66rem;

    @media (max-width: 888px) {
      font-size: 1.33rem;
    }
  }

  // nav {
  //   grid-row-start: 2;
  //   grid-column: span 8;
  //   @media (max-width: 888px) {
  //     grid-column: span 12;
  //   }
  // }

  figure {
    grid-column: span 1;
    margin-top: 0.66rem;
    // grid-row: span 2;

    @media (max-width: 888px) {
      display: none;
    }
  }
</style>