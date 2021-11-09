<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'


  export interface PageDocument {
    titre: string
    id: string
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
