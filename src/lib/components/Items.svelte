<script lang="ts">
  import type { Entry, EntryCollection } from 'contentful'
  import Picture from './Picture.svelte'
  import Themes from './Themes.svelte'
  import Link, { Lien } from './Link.svelte'
  import { date } from '$lib/formatters'
  import type { Item } from './Collection.svelte'
  import Document from './document/Document.svelte'

  export let items: Entry<Item>[]
  export let vedette:boolean = false
  export let corps:boolean = false
  export let noDate:boolean = false

  let focus: string

  function base(id: string) {
    return id === 'service' ? 'consultation#' : `${id}s/`
  }
</script>


{#each items as item}
<article class:vedette class:service={item.sys.contentType.sys.id === 'service'}>
  {#if item.fields.lien}
  <span class:disabled={item.fields.lien.fields.disabled}><Link lien={item.fields.lien} /></span>
  {/if}
  {#if item.sys.contentType.sys.id === 'projet' && item.fields.futur}
  <span><strong>En cours</strong></span>
  {/if}

  {#if item.sys.contentType.sys.id === 'publication' && item.fields.shopifyHandle}
  <span><strong>Acheter</strong></span>
  {/if}

  {#if item.sys.contentType.sys.id === 'publication' && item.fields.gratuit}
  <span class="disabled"><strong>Télécharger</strong></span>
  {/if}

  {#if item.fields.photo}
  <a href="/{base(item.sys.contentType.sys.id)}{item.fields.id}" class:focus={focus === item.fields.id} on:pointerenter={() => focus = item.fields.id} on:pointerleave={() => focus = undefined}>
    <figure>
      <Picture media={item.fields.photo} noDescription={!corps} ar={(vedette || item.sys.contentType.sys.id === 'service') ? 1 / 2.5 : 1} small={!vedette} />
    </figure>
  </a>{/if}

  <div class:corps>
    <div>
      {#if item.fields.themes}<Themes base={base(item.sys.contentType.sys.id)} themes={item.fields.themes} />{/if}
      <a href="/{base(item.sys.contentType.sys.id)}{item.fields.id}" class:focus={focus === item.fields.id} on:pointerenter={() => focus = item.fields.id} on:pointerleave={() => focus = undefined}>
        <h4>{item.fields.titre}</h4>
      </a>
      {#if !noDate && item.fields.date}{date(item.fields.date)}{/if}
    </div>

    {#if corps && item.fields.corps}<aside>
      <Document body={item.fields.corps} />
    </aside>{/if}
  </div>
</article>
{/each}

<style lang="scss">
  h4 {
    margin-bottom: var(--s1);

    @media (max-width: 888px) {
      margin-bottom: var(--s0);
    }
  }

  article {
    position: relative;
    grid-column: span 4;
    margin-bottom: var(--s4);

    @media (max-width: 888px) {
      grid-column: span 6;
    }

    @media (max-width: 666px) {
      // grid-column: span 12;
    }

    span :global(a),
    span strong {
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

    span strong {
      pointer-events: none;
    }

    span.disabled :global(a),
    span.disabled strong {
      background: var(--muted);
    }
  }

  figure {
    margin-bottom: var(--s2);
  }

  article.vedette {
    grid-column: span 12;
    
    figure {
      margin-bottom: var(--s3);
    }
  }

  article.service {
    grid-column: span 6;

    figure {
      margin-bottom: var(--s1);
    }
  }

  div.corps {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: var(--gutter);

    @media (max-width: 888px) {
      grid-template-columns: 1fr;
      row-gap: var(--s3);
    }

    aside {
      padding-right: 10%;
    }
  }

  aside :global(p) {
    font-size: 1.33rem;

    @media (max-width: 888px) {
      font-size: 1.1rem;
    }
  }
</style>