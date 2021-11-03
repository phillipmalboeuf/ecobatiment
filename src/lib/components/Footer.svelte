<script lang="ts">
  import type { Entry } from 'contentful'
  import Logo from './icons/Logo.svelte'
  import Logotype from './icons/Logotype.svelte'
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

<hr>

<a href="/" class="logo">
  <Logo />
  <Logotype />
</a>

<style lang="scss">
  nav {
    margin-bottom: var(--s2);

    a {
      display: block;
    }
  }

  hr {
    margin-bottom: var(--s2);
  }

  a.logo {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.25rem;
  }
</style>