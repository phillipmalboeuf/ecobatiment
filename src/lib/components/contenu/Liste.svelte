<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import type { Lien } from '../Link.svelte'
  import Link from '../Link.svelte'
  import Items from '../Items.svelte'
  import type { Item } from '../Collection.svelte'

  export let liste: Entry<{
    titre: string
    id: string
    lien: Entry<Lien>
    grid: boolean
    items: Entry<Item>[]
  }>
</script>


<div>
  {#if liste.fields.titre}
  <h2>{liste.fields.titre}</h2>
  {/if}
  {#if liste.fields.lien}
  <Link lien={liste.fields.lien} plus />
  {/if}
</div>

<section id={liste.fields.id} class="grid" class:long={liste.fields.grid && liste.fields.items?.length > 4}>
  {#if liste.fields.items}
  <Items items={liste.fields.items} vedette={!liste.fields.grid} corps={!liste.fields.grid} />
  {/if}
</section>

<hr>

<style lang="scss">
  section.grid {
    margin-bottom: 0;

    &.long {
      padding-left: calc(15% + (3 * var(--gutter)));

      @media (max-width: 888px) {
        padding-left: 0;
      }
    }
  }

  h2 {
    margin-bottom: var(--s2);
  }

  div {
    max-width: var(--width);
    margin: var(--s4) auto var(--s3);
  }
</style>