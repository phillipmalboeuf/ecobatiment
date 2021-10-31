<script lang="ts">
  import type { Entry } from 'contentful'

  import { onMount, getContext } from 'svelte'
  import { fade, fly } from 'svelte/transition'

  export let path: string
  export let navigation: Entry<{
		liens: Entry<{
			titre: string
			lien: string
			externe: boolean
		}>[]
	}>
  
  let visible = false
  let scrolled: boolean
  let footer: HTMLDivElement

  // let locale = getContext('locale')

  onMount(() => {
		const scrolledObserver = new IntersectionObserver( 
			([e]) => scrolled = e.isIntersecting,
			{ threshold: [0] }
		)

		scrolledObserver.observe(footer)

    document.getElementById('main').addEventListener('click', () => visible = false, { passive: true, capture: false })
	})

  function click(e) {
    visible = false
    path = e.currentTarget.href
  }
</script>

<div bind:this={footer}>
{#if visible}
<footer class="visible" transition:fly={{ y: 100 }}>
  <nav>
    {#each navigation.fields.liens as lien}
    <a class:active={path.includes(lien.fields.lien)} href={lien.fields.lien}>{lien.fields.titre}</a>
    {/each}
  </nav>
</footer>
{:else}
<footer>
  <nav>
    {#each navigation.fields.liens as lien}
    <a href={lien.fields.lien}>{lien.fields.titre}</a>
    {/each}
  </nav>
</footer>
{/if}
</div>

<header>
  <nav>
    <a class="logo" href="/" on:click={click}>Écobâtiment</a>
    {#each navigation.fields.liens as lien}
    <a href={lien.fields.lien}>{lien.fields.titre}</a>
    {/each}
  </nav>
  {#if scrolled && !visible}
  <button on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <svg viewBox="0 0 65.14 49.16"><rect x="22.72" y="15.35" width="19.69" height="2.79"/><polygon points="42.22,28.69 32.57,19.04 22.92,28.69 24.9,30.66 31.02,24.53 31.02,34.65 34.12,34.65 34.12,24.53 
	40.24,30.66 "/></svg>
  </button>
  {:else}
  <button on:click={() => visible = !visible}>
    {#if visible}
    <svg viewBox="0 0 65.14 49.16"><rect x="20.32" y="23.19" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.8412 30.2298)" class="st0" width="24.49" height="2.79"/><rect x="31.18" y="12.33" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.8412 30.2298)" class="st0" width="2.79" height="24.49"/></svg>
    {:else}
    <svg viewBox="0 0 65.14 49.16"><rect x="22.96" y="15.98" width="19.69" height="2.79"/><rect x="22.96" y="30.24" width="19.69" height="2.79"/></svg>
    {/if}
  </button>
  {/if}
</header>



<style lang="scss">
  :root {
    --height: 66vh;

    // @media (max-width: 900px) {
    //   --height: 6.66rem;
    // }
  }
  
  header {
    z-index: 3;
    position: fixed;
    top: 0;
    width: 100%;
    
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    button {
      background: none;
      border: none;
      padding: 1rem 0;
    }

    nav {
      width: 100%;
      // display: grid;
      // grid-template-columns: 1fr 6fr;
      // column-gap: var(--gutter);
    }
  }

  footer {
    z-index: 3;
    width: 100%;
    background: grey;
    padding-bottom: var(--height);
    padding-left: calc(var(--gutter) * 7.75);
    margin-bottom: calc(var(--height) * -1);

    &.visible {
      position: fixed;
      top: 100%;
      transform: translateY(-100%);
    }

    a {
      display: block;
      // padding: 0.2rem 0;

      &:last-child {
        margin-bottom: 10vh;
      }
    }
  }

  nav {
    padding: 2rem 0;

    @media (max-width: 900px) {
      padding: 1.5rem 0;
    }

    a {
      font-size: 1.75rem;
      line-height: 1.222;
    }

    a.active {
      opacity: 0.3;
    }

    a.logo {
      font-size: 3rem;
      line-height: 1;
      font-weight: bold;
      text-decoration: none;
      display: inline-block;
      margin-left: var(--gutter);

      @media (max-width: 900px) {
        font-size: 1.75rem;
      }
    }
  }

  svg {
    width: 64px;
    height: 49px;
    polygon,
    rect {
      fill: black;
    }
  }
</style>