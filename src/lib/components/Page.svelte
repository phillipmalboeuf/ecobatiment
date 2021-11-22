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
  import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

	export let page: Entry<PageDocument>
</script>

<svelte:head>
  <title>{page.fields.titre} – Écobâtiment</title>
  {#if page.fields.description}<meta name="description" content={documentToPlainTextString(page.fields.description)}>{/if}

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
