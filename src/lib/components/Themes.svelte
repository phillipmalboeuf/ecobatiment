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
  <a href="/{base}?themes={theme.fields.id}">{theme.fields.titre}</a>
  {/each}
</nav>

<style lang="scss">
  a {
    text-transform: uppercase;

    &:not(:last-child):after {
      content: ", ";
    }
  }
</style>