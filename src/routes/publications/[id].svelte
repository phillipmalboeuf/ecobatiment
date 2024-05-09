<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { respond } from '$lib/responses'
  
  export const load: Load = async ({ params, fetch, session, stuff }) => {
		return respond(fetch, `/publications/${params.id}.json`)
	}
</script>

<script lang="ts">
  import type { Asset, Entry, EntryCollection, RichTextContent } from 'contentful'
  import { getProduct, ProductDocument } from '$lib/clients/shopify'
  import { onMount } from 'svelte'

  import type { Item } from '$lib/components/Collection.svelte'
  import type { Theme } from '$lib/components/Themes.svelte'
  import Page from '$lib/components/Page.svelte'
  import Document from '$lib/components/document/Document.svelte'
  import Picture from '$lib/components/Picture.svelte'
  import Connexe from '$lib/components/Connexe.svelte'
  import Themes from '$lib/components/Themes.svelte'
  import Form from '$lib/components/Form.svelte'
  import { date, money } from '$lib/formatters'


	export let publication: Entry<Item & {
    contenu: Entry<any>[]
    photos: Asset[]
    petiteDescription: RichTextContent
    elementsConnexes: Entry<any>[]
    shopifyHandle: string
    lienExterne: string
    gratuit: Asset
  }>
  
  let product: ProductDocument

  onMount(async () => {
    if (publication.fields.shopifyHandle) {
      product = await getProduct(publication.fields.shopifyHandle)
    }
  })
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
    {:else if publication.fields.photo}
    <figure>
      <Picture media={publication.fields.photo} small />
    </figure>
    {/if}
  </aside>
  <div>
    <!-- <h6>{date(publication.fields.date)}</h6> -->
    <h2>{publication.fields.titre}</h2>
    {#if product}<h6>{money(product.priceRange.minVariantPrice.amount)}{#if product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount} – {money(product.priceRange.maxVariantPrice.amount)}{/if}</h6>{/if}
    {#if publication.fields.corps}<Document body={publication.fields.corps} />{/if}
    
    {#if publication.fields.shopifyHandle && product}
    <Form {product} />
    {/if}

    {#if publication.fields.lienExterne}
    <a class:button={!publication.fields.shopifyHandle} href={publication.fields.lienExterne} target="_blank">Commandez ici</a>
    {/if}

    {#if publication.fields.gratuit}
    <a class:button={!publication.fields.shopifyHandle} href={publication.fields.gratuit.fields.file.url} target="_blank">Télécharger maintenant</a>
    {/if}

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

  h2 {
    margin-bottom: var(--s2);
  }

  a {
    display: block;
    margin-top: var(--s2);
    width: 100%;

    &:not(.button) {
      margin-top: calc(var(--s2) * -1);
      margin-bottom: var(--s2);
      text-decoration: underline;
      text-align: center;
    }
  }

  // aside {
  //   grid-column: span 8;

  //   :global(p) {
  //     font-size: 2rem;
  //   }
  // }
</style>