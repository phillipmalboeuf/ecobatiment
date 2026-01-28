<script lang="ts">
  import type { PageDocument } from '$lib/components/Page.svelte'
  import type { PageData } from './$types'
  import Page from '$lib/components/Page.svelte'

  export let data: PageData
</script>

<Page page={data.page} />