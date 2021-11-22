<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { respond } from '$lib/responses'
  
  export const load: Load = async ({ page, fetch, session, stuff }) => {
		return respond(fetch, `/publications/${page.params.id}.json`)
	}
</script>

<script lang="ts">
  import type { Asset, Entry, EntryCollection, RichTextContent } from 'contentful'
  import type { Item } from '$lib/components/Collection.svelte'
  import type { Theme } from '$lib/components/Themes.svelte'
  import Page from '$lib/components/Page.svelte'
  import Document from '$lib/components/document/Document.svelte'
  import Picture from '$lib/components/Picture.svelte'
  import Connexe from '$lib/components/Connexe.svelte'
  import Themes from '$lib/components/Themes.svelte'
  import Form from '$lib/components/Form.svelte'
import { date } from '$lib/formatters'

	export let publication: Entry<Item & {
    contenu: Entry<any>[]
    photos: Asset[]
    petiteDescription: RichTextContent
    elementsConnexes: Entry<any>[]
  }>
</script>

<!-- {#if projet.fields.photo}
<figure>
  <figcaption><h1>{projet.fields.titre}</h1></figcaption>
  <Picture media={projet.fields.photo} ar={1 / 2.5} />
</figure>
{:else}
<h1>{projet.fields.titre}</h1>
{/if} -->

<section class="grid">
  <aside>
    <h6><Themes base="publications" themes={publication.fields.themes} /></h6>

    {#if publication.fields.photos}
    {#each publication.fields.photos as media}
    <figure>
      <Picture {media} small />
    </figure>
    {/each}
    {/if}
  </aside>
  <div>
    <h6>{date(publication.fields.date)}</h6>
    <h2>{publication.fields.titre}</h2>
    {#if publication.fields.corps}<Document body={publication.fields.corps} />{/if}
    
    <Form />

    <small>{#if publication.fields.petiteDescription}<Document body={publication.fields.petiteDescription} />{/if}</small>
  </div>
</section>

<hr>

<Page page={publication} />

{#if publication.fields.elementsConnexes}
<Connexe items={publication.fields.elementsConnexes} />
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

  // aside {
  //   grid-column: span 8;

  //   :global(p) {
  //     font-size: 2rem;
  //   }
  // }
</style>