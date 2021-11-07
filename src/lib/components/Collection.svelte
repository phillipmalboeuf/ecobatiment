<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import type { Theme } from '$lib/components/Themes.svelte'
  import type { Lien } from './Link.svelte'

  export interface Item {
    titre: string
    id: string
    photo: Asset
    date: Date
    corps: RichTextContent
    themes: Entry<Theme>[]
    vedette: boolean
    lien: Entry<Lien>
  }
</script>

<script lang="ts">
  import type { EntryCollection } from 'contentful'
  import Items from './Items.svelte'

  export let base: string
  export let items: EntryCollection<Item>
  export let themes: EntryCollection<Theme>

  function toggle(id: string) {

  }
</script>

<svelte:head>
  <title>{base} – Écobâtiment</title>
</svelte:head>


<nav>
  <ul>
  {#each themes.items as theme}
  <li>
    <input on:input={() => toggle(theme.fields.id)} type="checkbox" name={theme.fields.id} id={theme.fields.id} />
    <label for={theme.fields.id}>{theme.fields.titre}</label>
  </li>
  {/each}
  </ul>
</nav>

<section>
  <Items items={items.items.filter(item => item.fields.vedette)} {base} vedette />

  <hr>

  <Items items={items.items.filter(item => !item.fields.vedette)} {base} />
</section>

<style lang="scss">
  nav {
    grid-column: span 2;
  }

  section {
    grid-column: 4 / span 9;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: var(--gutter);
  }

  hr {
    grid-column: span 12;
    margin-bottom: var(--s4);
  }

  nav {
    ul {
      list-style: none;
      padding-left: 0;
    }

    li {
      label {
        text-transform: uppercase;
      }
    }
  }
</style>