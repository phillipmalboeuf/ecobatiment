<script lang="ts">
  import type { Entry, EntryCollection } from 'contentful'
  import Picture from './Picture.svelte'
  import Themes from './Themes.svelte'
  import Link, { Lien } from './Link.svelte'
  import { date } from '$lib/formatters'
  import type { Item } from './Collection.svelte'
  import Document from './document/Document.svelte'

  export let base: string
  export let items: Entry<Item>[]
  export let vedette:boolean = false
  export let corps:boolean = false
</script>


{#each items as item}
<article class:vedette>
  {#if item.fields.lien}
  <span class:disabled={item.fields.lien.fields.disabled}><Link lien={item.fields.lien} /></span>
  {/if}
  {#if item.fields.photo}
  <a href="/{base}/{item.fields.id}">
    <figure>
      <Picture media={item.fields.photo} noDescription={!corps} ar={vedette ? 1 / 3 : 1} />
    </figure>
  </a>{/if}

  <div class:corps>
    <div>
      {#if item.fields.themes}<Themes {base} themes={item.fields.themes} />{/if}
      <a href="/{base}/{item.fields.id}">
        {#if vedette}<h4>{item.fields.titre}</h4>{:else}<h5>{item.fields.titre}</h5>{/if}
      </a>
      {#if item.fields.date}<small>{date(item.fields.date)}</small>{/if}
    </div>

    {#if corps && item.fields.corps}<aside>
      <Document body={item.fields.corps} />
    </aside>{/if}
  </div>
</article>
{/each}

<style lang="scss">
  h4, h5 {
    margin-bottom: var(--s1);
  }

  article {
    position: relative;
    grid-column: span 4;
    margin-bottom: var(--s4);

    span :global(a) {
      position: absolute;
      z-index: 2;
      top: var(--s1);
      right: var(--s1);

      color: var(--light);
      background: var(--highlight);
      padding: var(--s0) var(--s2);
      border-radius: var(--s2);

      &:hover,
      &:focus {
        background: var(--dark);
      }
    }

    span.disabled :global(a) {
      background: var(--muted);
    }
  }

  article.vedette {
    grid-column: span 12;
  }

  figure {
    margin-bottom: var(--s2);
  }

  div.corps {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: var(--gutter);
  }

  aside :global(p) {
    font-size: 1.25rem;
  }
</style>