<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import type { Lien } from '../Link.svelte'
  import Document from '../document/Document.svelte'
  import Picture from '../Picture.svelte'
  import Themes, { Theme } from '../Themes.svelte'
  import Link from '../Link.svelte'

  export let liste: Entry<{
    titre: string
    lien: Entry<Lien>
    items: Entry<{
      titre: string
      id: string
      photo: Asset
      date: Date
      corps: RichTextContent
      themes: Entry<Theme>[]
    }>[]
  }>
</script>

<section class="grid">
  <div>
    {#if liste.fields.titre}
    <h2>{liste.fields.titre}</h2>
    {/if}
    {#if liste.fields.lien}
    <Link lien={liste.fields.lien} plus />
    {/if}
  </div>

  {#each liste.fields.items as item, index}
    {#if item.fields.photo}<figure>
      <a href="/{item.sys.contentType.sys.id}s/{item.fields.id}">
        <Picture media={item.fields.photo} />
      </a>
    </figure>{/if}
    <article id={item.fields.id}>
      <Themes base="{item.sys.contentType.sys.id}s" themes={item.fields.themes} />
      <a href="/{item.sys.contentType.sys.id}s/{item.fields.id}">
        <h4>{item.fields.titre}</h4>
      </a>
      {item.fields.date}
    </article>

    {#if item.fields.corps}<aside>
      <Document body={item.fields.corps} />
    </aside>{/if}
  {/each}
</section>

<hr>

<style lang="scss">
  section.grid {
    margin-bottom: 0;
  }

  h2 {
    margin-bottom: var(--s2);
  }

  div {
    grid-column: span 12;
    margin-bottom: var(--s3);
  }

  figure {
    grid-column: span 12;
  }

  figure :global(img) {
    height: 25vw;
    object-fit: cover;
  }

  article {
    grid-column: span 6;
    margin-bottom: var(--s4);

    h4 {
      margin: var(--s1) 0;
    }
  }

  aside {
    grid-column: span 6;
    margin-bottom: var(--s4);
  }
</style>