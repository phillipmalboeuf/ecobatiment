<script lang="ts">
  import type { Entry } from 'contentful'
  import Logo from './icons/Logo.svelte'
  import type { Lien } from './Link.svelte'

  // export let path: string
  export let navigation: Entry<{
		liens: Entry<Lien>[]
	}>
</script>

<nav>
  {#each navigation.fields.liens as lien}
  <a href={lien.fields.lien}>{lien.fields.titre}</a>
  {/each}
</nav>

<a href="/">
  <Logo />
</a>

<style lang="scss">
  nav {
    a {
      display: block;
    }
  }
</style>