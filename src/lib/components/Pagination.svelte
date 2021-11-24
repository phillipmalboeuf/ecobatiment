<script lang="ts">
  import type { EntryCollection } from 'contentful'
  import { page } from '$app/stores'

  import type { Item } from './Collection.svelte'

  export let base: string
  export let checked: string[]
  export let items: EntryCollection<Item>

  export let currentPage: number

  let numberOfPages = Math.ceil(items.total / items.limit)
</script>

{#if numberOfPages > 0}
{#each new Array(numberOfPages) as _, index}
<a class:current={index === currentPage} href="/{base}?{checked.length > 0 ? `q=${checked.join(',')}&` : ''}p={index}">{index+1}</a>
{/each}
{/if}

<style lang="scss">
  a {
    background: transparent;
    // border: 1px solid;
    background: var(--alt);
    border-radius: var(--s0);
    padding: 1rem;
    text-align: center;

    opacity: 0.33;

    &:hover,
    &:focus {
      opacity: 0.88;
    }

    &.current {
      opacity: 1;
    }
  }
</style>