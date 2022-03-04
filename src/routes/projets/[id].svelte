<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { respond } from '$lib/responses'
  
  export const load: Load = async ({ params, fetch, session, stuff }) => {
		return respond(fetch, `/projets/${params.id}.json`)
	}
</script>

<script lang="ts">
  import type { Entry, EntryCollection } from 'contentful'
  import type { Item } from '$lib/components/Collection.svelte'
  import type { Theme } from '$lib/components/Themes.svelte'
  import Page from '$lib/components/Page.svelte'
  import Document from '$lib/components/document/Document.svelte'
  import Picture from '$lib/components/Picture.svelte'
  import Connexe from '$lib/components/Connexe.svelte'
  import Themes from '$lib/components/Themes.svelte'
  import { date } from '$lib/formatters'

	export let projet: Entry<Item & {
    contenu: Entry<any>[],
    elementsConnexes: Entry<any>[]
    dark: boolean
  }>
</script>

{#if projet.fields.photo}
<figure style="--title: {projet.fields.photo}">
  <figcaption><h1 class:dark={projet.fields.dark}>{projet.fields.titre}</h1></figcaption>
  <Picture media={projet.fields.photo} ar={1 / 2.5} />
</figure>
{:else}
<h1>{projet.fields.titre}</h1>
{/if}

<section class="grid">
  <aside>
    <Themes base="projets" themes={projet.fields.themes} />
    <h6>{date(projet.fields.date)}</h6>
    {#if projet.fields.corps}<Document body={projet.fields.corps} />{/if}
  </aside>
</section>

<hr>

<Page page={projet} />

{#if projet.fields.elementsConnexes}
<Connexe items={projet.fields.elementsConnexes} />
{/if}


<style lang="scss">
  figure {

    @media (max-width: 888px) {
      margin-bottom: calc(var(--s2) * -1);
    
      :global(img) {
        object-fit: cover;
        aspect-ratio: 1.33 !important;
      }
    }

    figcaption {
      position: absolute;
      top: var(--s3);
      left: var(--s3);
      width: 80%;

      @media (max-width: 888px) {
        top: var(--s2);
        left: var(--s1);
        width: 90%;
      }
    }

    h1 {
      color: var(--dark);
      font-size: 2rem;

      @media (min-width: 888px) {
        font-size: 2.5rem;
      }

      &.dark {
        color: var(--light);
      }
    }
  }

  aside {
    grid-column: span 8;

    :global(p) {
      font-size: 2rem;
    }

    @media (max-width: 888px) {
      grid-column: span 12;

      :global(p) {
        font-size: 1rem;
      }
    }
  }
</style>