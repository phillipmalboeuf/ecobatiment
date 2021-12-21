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
    futur: boolean
    lien: Entry<Lien>
    type?: string
    shopifyHandle?: string
    gratuit?: Asset
  }
</script>

<script lang="ts">
  import type { EntryCollection } from 'contentful'
  import { goto } from '$app/navigation'
  import { browser } from '$app/env'
  import { page } from '$app/stores'

  import Items from './Items.svelte'
  import I from './icons/I.svelte'
  import Pagination from './Pagination.svelte'

  export let base: string
  export let items: EntryCollection<Item>
  export let themes: EntryCollection<Theme>
  export let noDate = false

  let checked: string[] = []
  let currentPage: number

  page.subscribe(p => {
    checked = p.query.has("q") ? p.query.get("q").split(',') : []
    currentPage = p.query.has("p") ? parseInt(p.query.get("p")) : 0 
  })

  $: {
    browser && goto((checked.length > 0 ? `?q=${checked.join(',')}` : '?') + (currentPage ? `&p=${currentPage}` : ''), { keepfocus: true, noscroll: true })
  }

  let visibleThemes = true
  let visibleDate = true
  let visibleType = true
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
    {#if base === 'publications'}
    <li>
      <input bind:group={checked} type="checkbox" name="futur" id="futur" value="futur" />
      <label for="futur">À venir</label>
    </li>
    <li>
      <input bind:group={checked} type="checkbox" name="dispo" id="dispo" value="dispo" />
      <label for="dispo">Disponibles</label>
    </li>
    {:else if base === 'projets'}
    <li>
      <input bind:group={checked} type="checkbox" name="futur" id="futur" value="futur" />
      <label for="futur">En cours</label>
    </li>
    <li>
      <input bind:group={checked} type="checkbox" name="archived" id="archived" value="archived" />
      <label for="archived">Réalisés</label>
    </li>
    {:else if base === 'activites'}
    <li>
      <input bind:group={checked} type="checkbox" name="futur" id="futur" value="futur" />
      <label for="futur">À venir</label>
    </li>
    <li>
      <input bind:group={checked} type="checkbox" name="archived" id="archived" value="archived" />
      <label for="archived">Archivés</label>
    </li>
    {/if}
    {/if}
  </ul>

  {#if base === 'publications' || base === 'activites'}
  <input class="hidden" on:input={() => visibleType = !visibleType} type="checkbox" name="type" id="type" />
  <label for="type">Par type <I i="chevron" small rotate={visibleType ? 0 : 180} /></label>

  <ul>
    {#if visibleType}
    {#if base === 'publications'}
    {#each ['Livre', 'Fiche informative', 'Article', 'Outil'] as value}
    <li>
      <input bind:group={checked} type="checkbox" name={value} id={value} value={value} />
      <label for={value}>{value}</label>
    </li>
    {/each}
    {:else if base === 'activites'}
    {#each ['Conférence', 'Visite terrain', 'Écobâtiment y sera'] as value}
    <li>
      <input bind:group={checked} type="checkbox" name={value} id={value} value={value} />
      <label for={value}>{value}</label>
    </li>
    {/each}
    {/if}
    {/if}
  </ul>
  {/if}

  <input class="hidden" on:input={() => visibleThemes = !visibleThemes} type="checkbox" name="themes" id="themes" />
  <label for="themes">Par thèmes <I i="chevron" small rotate={visibleThemes ? 0 : 180} /></label>

  <ul>
    {#if visibleThemes}
    {#each themes.items as theme}
    <li>
      <input bind:group={checked} type="checkbox" name={theme.fields.id} id={theme.fields.id} value={theme.fields.id} />
      <label for={theme.fields.id}>{theme.fields.titre}</label>
    </li>
    {/each}
    {/if}
  </ul>
</nav>

<section>
  {#if items.items.length > 0}
  <Items items={items.items.filter(item => item.fields.vedette)} vedette noDate />

  {#if items.items.find(item => item.fields.vedette)}
  <hr>
  {/if}

  <Items items={items.items.filter(item => !item.fields.vedette)} noDate />
  {:else}
  <em>Aucun résultat retrouvé.</em>
  {/if}
</section>

<section>
  <Pagination {base} {items} {checked} {currentPage} />
</section>

<style lang="scss">
  nav {
    position: sticky;
    align-self: flex-start;
    top: calc(var(--gutter) * 2);
    grid-column: span 2;

    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }

  section {
    grid-column: 4 / span 9;
    align-self: flex-start;

    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: var(--gutter);

    @media (max-width: 888px) {
      grid-column: span 12;
    }

    em {
      grid-column: span 12;
      font-style: normal;
      text-align: center;  
      padding: var(--gutter);
      background-color: var(--alt);
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

      & > *:before {
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

      @media (max-width: 888px) {
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