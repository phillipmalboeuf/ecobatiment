<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  // import type { Lien } from '../Link.svelte'
  // import Document from '../document/Document.svelte'
  // import Link from '../Link.svelte'
  import Picture from '../Picture.svelte'

  export let hero: Entry<{
    titre: string
    id: string
    photo: Asset
  }>
</script>

<div>
  <section id={hero.fields.id} class="grid">
    <figure>
      <Picture media={hero.fields.photo} ar={1 / 2} eager />
    </figure>

    <h1>{hero.fields.titre}</h1>
  </section>

  <!-- <hr> -->
</div>
 


<style lang="scss">
  section.grid:first-child {
    margin-top: var(--s2);

    @media (min-width: 888px) {
      margin-top: 0;
    }
  }

  div {
    position: relative;

    &:before {
      content: "";
      background: var(--dark);

      position: absolute;
      z-index: -1;
      left: calc(var(--margins) * -1);
      top: calc(var(--s4) * -1);
      width: calc(100% + (var(--margins) * 2));
      height: 100%;
    }
  }

  figure {
    grid-column: span 8;
    margin: 0;

    @media (max-width: 888px) {
      grid-column: span 12;
      grid-row-start: 2;
    }
  }

  h1 {
    position: relative;
    color: var(--light);
    grid-column: span 4;
    padding: var(--s4);

    @media (max-width: 1200px) {
      padding: var(--s1) var(--s3) var(--s4);
    }

    @media (max-width: 888px) {
      grid-column: span 12;
      padding: 0;
    }

    &:before {
      content: "";
      position: absolute;
      top: calc(var(--s4) + var(--s2));
      right: calc(100% - var(--s2));
      height: 3px;
      background: var(--highlight);
      width: 20%;

      @media (max-width: 1200px) {
         top: calc(var(--s3));
        right: calc(100% - var(--s1));
      }

      @media (max-width: 888px) {
        display: none;
      }
    }
  }
</style>