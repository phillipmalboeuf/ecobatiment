<script lang="ts">
  import type { Asset, Entry, EntryCollection, RichTextContent } from 'contentful'
  import type { Item } from '$lib/components/Collection.svelte'
  import type { Theme } from '$lib/components/Themes.svelte'
  import type { PageData } from './$types'
  import Page from '$lib/components/Page.svelte'
  import Document from '$lib/components/document/Document.svelte'
  import Picture from '$lib/components/Picture.svelte'
  import Connexe from '$lib/components/Connexe.svelte'
  import Themes from '$lib/components/Themes.svelte'
  import Form from '$lib/components/Form.svelte'
  import Link from '$lib/components/Link.svelte'
  import { date } from '$lib/formatters'

  export let data: PageData
  const activite = data.activite
</script>

<section class="grid">
  <aside>
    <h6><Themes base="activites" themes={activite.fields.themes} /></h6>

    {#if activite.fields.photos}
    {#each activite.fields.photos as media}
    <figure>
      <Picture {media} small />
    </figure>
    {/each}
    {/if}
  </aside>
  <div>
    <h6>{date(activite.fields.date, true)}</h6>
    <h2>{activite.fields.titre}</h2>
    {#if activite.fields.corps}<Document body={activite.fields.corps} />{/if}

    {#if activite.fields.lien}<nav><Link lien={activite.fields.lien} /></nav>{/if}
  </div>
</section>

<hr>

<Page page={activite} />

{#if activite.fields.elementsConnexes}
<Connexe items={activite.fields.elementsConnexes} />
{/if}


<style lang="scss">
  aside {
    grid-column: span 5;

    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }

  div {
    grid-column: 7 / span 6;

    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }

  nav :global(a) {
    display: block;
    font-size: var(--s1);
    color: var(--light);
    background: var(--dark);
    text-align: center;
    text-transform: uppercase;

    margin-top: var(--s4);
    width: 100%;
    border: none;
    padding: var(--s1);
    border-radius: var(--s2);
  }

  // aside {
  //   grid-column: span 8;

  //   :global(p) {
  //     font-size: 2rem;
  //   }
  // }
</style>