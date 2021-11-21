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
  import I from './icons/I.svelte'

  export let base: string
  export let items: EntryCollection<Item>
  export let themes: EntryCollection<Theme>

  function toggle(id: string) {

  }

  let visibleThemes = true
  let visibleDate = true
</script>

<svelte:head>
  <title>{base} – Écobâtiment</title>
</svelte:head>

<input class="hidden filters" type="checkbox" name="filters" id="filters" />
<label for="filters"><I i="menu" small /> Filtres</label>

<nav>
  <input class="hidden" on:input={() => visibleDate = !visibleDate} type="checkbox" name="date" id="date" />
  <label for="date">Par date <I i="chevron" small rotate={visibleDate ? 0 : 180} /></label>

  
  <ul>
    {#if visibleDate}
    <li>
      <input on:input={() => false} type="checkbox" name="future" id="future" />
      <label for="future">À venir</label>
    </li>
    <li>
      <input on:input={() => false} type="checkbox" name="archived" id="archived" />
      <label for="archived">Disponibles</label>
    </li>
    {/if}
  </ul>

  <input class="hidden" on:input={() => visibleThemes = !visibleThemes} type="checkbox" name="themes" id="themes" />
  <label for="themes">Par thèmes <I i="chevron" small rotate={visibleThemes ? 0 : 180} /></label>

  <ul>
    {#if visibleThemes}
    {#each themes.items as theme}
    <li>
      <input on:input={() => toggle(theme.fields.id)} type="checkbox" name={theme.fields.id} id={theme.fields.id} />
      <label for={theme.fields.id}>{theme.fields.titre}</label>
    </li>
    {/each}
    {/if}
  </ul>
</nav>

<section>
  <Items items={items.items.filter(item => item.fields.vedette)} vedette />

  <hr>

  <Items items={items.items.filter(item => !item.fields.vedette)} />
</section>

<style lang="scss">
  nav {
    grid-column: span 2;

    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }

  section {
    grid-column: 4 / span 9;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: var(--gutter);

    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }

  hr {
    grid-column: span 12;
    margin-bottom: var(--s4);
  }

  label {
    text-transform: uppercase;
  }

  nav {
    ul {
      list-style: none;
      padding-left: 0;
      margin-bottom: var(--s4);
    }

    li {
      display: grid;
      grid-template-columns: 1fr 8fr;
      column-gap: var(--s0);
      margin-bottom: var(--s0);

      &:before {
        content: none;
      }
    }
  }

  input.hidden {
    display: none;
  }

  input.filters {

    + label {
      @media (min-width: 888px) {
        display: none;
      }

      // color: var(--light);
      background: var(--alt);
      padding: var(--s0);
      border-radius: var(--s0);
      margin-bottom: var(--s2);
      grid-column: span 12;

      + nav {
        background: var(--alt);
        padding: var(--s2);
        border-bottom-left-radius: var(--s0);
        border-bottom-right-radius: var(--s0);
        display: none;

        ul:last-child {
          margin-bottom: 0;
        }
      }
    }

    &:checked {

      + label {
        margin-bottom: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        + nav {
          display: block;
          margin-bottom: var(--s2);
        }
      }
    }
  }
</style>