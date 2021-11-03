<script lang="ts">
  import type { Entry } from 'contentful'

  import { onMount, getContext } from 'svelte'
  import { fade, fly } from 'svelte/transition'
import Footer from './Footer.svelte'
  import Logo from './icons/Logo.svelte'
  import type { Lien } from './Link.svelte'

  export let path: string
  export let navigation: Entry<{
		liens: Entry<Lien>[]
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
    <Footer {navigation} />
  </footer>
  {:else}
  <footer>
    <Footer {navigation} />
  </footer>
  {/if}
</div>

<header>
  <a class="logo" href="/" on:click={click} aria-label="Écobâtiment">
    <Logo />
  </a>

  <nav>  
    {#each navigation.fields.liens as lien}
    <a class:active={path.includes(lien.fields.lien)} href={lien.fields.lien}>{lien.fields.titre}</a>
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
    --height: 50vh;

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
    align-items: center;

    padding: var(--margins);

    button {
      background: none;
      border: none;
      // padding: 1rem 0;
    }

    nav {
      display: flex;
      column-gap: var(--gutter);

      a {
        text-transform: uppercase;
      }

      a.active {
        text-decoration: underline;
      }
    }
  }

  footer {
    z-index: 3;
    width: 100%;
    color: var(--light);
    background: var(--dark);
    height: var(--height);
    padding: var(--margins);
    // padding-left: calc(var(--gutter) * 7.75);
    margin-bottom: calc(var(--height) * -1);

    &.visible {
      position: fixed;
      top: 100%;
      transform: translateY(-100%);
    }
  }

  svg {
    width: 64px;
    height: 49px;
    polygon,
    rect {
      fill: currentColor;
    }
  }
</style>