<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'


  export interface PageDocument {
    titre: string
    id: string
    description: RichTextContent
    thumbnail: Asset
    contenu: Entry<any>[]
  }

</script>


<script lang="ts">
  import Contenu from './Contenu.svelte'

	export let page: Entry<PageDocument>
</script>

<h1>{page.fields.titre}</h1>

<Contenu contenu={page.fields.contenu} />
