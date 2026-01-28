<script lang="ts">
  import type { Entry } from 'contentful'
  import type { PageData } from './$types'

  import Page from '$lib/components/Page.svelte'

  export let data: PageData
</script>

<Page page={data.accueil} />
