<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'


  export interface PageDocument {
    titre: string
    id: string
    description?: any
    corps: RichTextContent
    photo: Asset
    contenu: Entry<any>[]
  }

</script>


<script lang="ts">
  import Contenu from './Contenu.svelte'

	export let page: Entry<PageDocument>
</script>

<svelte:head>
  <title>{page.fields.titre} – Écobâtiment</title>
  <meta property="og:title" content="{page.fields.titre} – Écobâtiment" />
  <meta name="twitter:title" content="{page.fields.titre} – Écobâtiment">

  {#if page.fields.description}
  <meta name="description" content={page.fields.description}>
  <meta property="og:description" content={page.fields.description} />
  <meta name="twitter:description" content={page.fields.description}>
  {/if}

  {#if page.fields.photo}
  <meta property="og:image" content="https:{page.fields.photo.fields.file.url}?w=1200&h=630" />
  <meta name="twitter:image" content="https:{page.fields.photo.fields.file.url}?w=600&h=314" />
  <meta name="twitter:card" value="summary_large_image">
  {:else}
  <meta name="twitter:card" value="summary">
  {/if}

  {#if page.fields.contenu && page.fields.contenu[0].sys.contentType.sys.id === 'hero'}
  <style>
    header {
      --header-color: var(--light) !important;
      --header-background: var(--dark) !important;
    }
  </style>
  {/if}
</svelte:head>

{#key page.fields.id}
{#if page.fields.contenu}
<Contenu contenu={page.fields.contenu} />
{/if}
{/key}
