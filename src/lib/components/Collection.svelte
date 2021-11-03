<script context="module" lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import type { Theme } from '$lib/components/Themes.svelte'

  export interface Item {
    titre: string
    id: string
    photo: Asset
    date: Date
    corps: RichTextContent
    themes: Entry<Theme>[]
    vedette: boolean
  }
</script>

<script lang="ts">
  import type { EntryCollection } from 'contentful'
  import Picture from './Picture.svelte'
  import Themes from './Themes.svelte'

  export let base: string
  export let items: EntryCollection<Item>
  export let themes: EntryCollection<Theme>

  function toggle(id: string) {

  }
</script>

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
{#each items.items.filter(item => item.fields.vedette) as item}
  <article class="vedette">
    {#if item.fields.photo}<figure>
      <Picture media={item.fields.photo} noDescription ar={1 / 3} />
    </figure>{/if}
    <Themes {base} themes={item.fields.themes} />
    <a href="/{base}/{item.fields.id}">
      <h4>{item.fields.titre}</h4>
      <small>{item.fields.date}</small>
    </a>
  </article>
{/each}

<hr>

{#each items.items.filter(item => !item.fields.vedette) as item}
  <article>
    {#if item.fields.photo}<figure>
      <Picture media={item.fields.photo} noDescription ar={1} />
    </figure>{/if}
    <Themes {base} themes={item.fields.themes} />
    <a href="/{base}/{item.fields.id}">
      <h5>{item.fields.titre}</h5>
      <small>{item.fields.date}</small>
    </a>
  </article>
{/each}
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

  h4, h5 {
    margin-bottom: var(--s1);
  }

  hr {
    grid-column: span 12;
    margin-bottom: var(--s4);
  }

  article {
    grid-column: span 4;
    margin-bottom: var(--s4);
  }

  article.vedette {
    grid-column: span 12;
  }

  figure {
    margin-bottom: var(--s2);
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