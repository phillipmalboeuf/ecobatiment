<script context="module" lang="ts">
  export interface Theme {
    titre: string
    id: string
  }
</script>

<script lang="ts">
  import type { Entry } from 'contentful'

  export let base: string
  export let themes: Entry<Theme>[]
</script>

<nav>
  {#each themes as theme}
  <a href="/{base}?q={theme.fields.id}">{theme.fields.titre}</a>
  {/each}
</nav>

<style lang="scss">
  nav {
    margin-bottom: var(--s0);
  }
  
  a {
    font-size: 0.88em;
    opacity: 0.75;
    text-transform: none;

    &:not(:last-child):after {
      content: ", ";
    }

    &:hover,
    &:focus {
      opacity: 1;
    }
  }
</style>