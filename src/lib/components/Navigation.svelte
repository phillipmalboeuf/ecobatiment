<script lang="ts">
  import type { Entry } from 'contentful'

  import { onMount, getContext } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import Cart from './Cart.svelte'
  import Footer from './Footer.svelte'
  import I from './icons/I.svelte'
  import Logotype from './icons/Logotype.svelte'
  import type { Lien } from './Link.svelte'

  export let path: string
  export let navigation: Entry<{
		liens: Entry<Lien>[]
	}>
  export let sousNavigation: Entry<{
		liens: Entry<Lien>[]
	}>
  export let contact: Entry<any>
  export let panier: Entry<any>
  
  let visible = false
  let scrolled: boolean
  let footer: HTMLDivElement
  let cartVisible = false

  // let locale = getContext('locale')

  onMount(() => {
		const scrolledObserver = new IntersectionObserver( 
			([e]) => scrolled = e.isIntersecting,
			{ threshold: [0] }
		)

		scrolledObserver.observe(footer)

    document.getElementById('main').addEventListener('click', () => visible = false, { passive: true, capture: false })
	})

  function hide() {
    visible = false
  }
</script>

<div bind:this={footer}>
  {#if visible}
  <footer class="visible" transition:fly={{ y: 100 }}>
    <Footer {navigation} {sousNavigation} {contact} on:click={hide} />
  </footer>
  {:else}
  <footer>
    <Footer {navigation} {sousNavigation} {contact} />
  </footer>
  {/if}
</div>

<header>
  <a class="logo" href="/" on:click={hide} aria-label="Écobâtiment">
    <Logotype />
  </a>

  <nav>  
    {#each navigation.fields.liens as lien}
    <a class:active={path.includes(lien.fields.lien)} href={lien.fields.lien}>{lien.fields.titre}</a>
    {/each}
  </nav>

  <div>
    <button on:click={() => cartVisible = !cartVisible}>
      {#if cartVisible}
      <I i='close' big />
      {:else}
      <I i='panier' big />
      {/if}
    </button>

    {#if scrolled && !visible}
    <button on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <I i='up' big />
    </button>
    {:else}
    <button on:click={() => visible = !visible}>
      {#if visible}
      <I i='close' big />
      {:else}
      <I i='menu' big />
      {/if}
    </button>
    {/if}
  </div>
  
</header>

<Cart bind:visible={cartVisible} {panier} />


<style lang="scss">
  :root {
    --height: 66vh;

    @media (max-width: 888px) {
      --height: 80vh;
    }
  }
  
  header {
    --header-color: var(--dark);
    --header-background: var(--light);

    z-index: 3;
    position: absolute;
    top: 0;
    width: 100%;
    
    color: var(--header-color);
    background: var(--header-background);
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: var(--margins);

    button {
      color: currentColor;
      background: none;
      border: none;
      padding: 0;
    }

    > a,
    > div {
      width: 25%;
    }

    > div {
      text-align: right;
    }

    nav {
      display: flex;
      column-gap: calc(var(--gutter) * 1.5);

      @media (max-width: 1200px) {
        display: none;
      }

      a {
        font-size: 0.88rem;
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
    
    overflow-y: scroll;
    padding: calc(var(--margins) * 2);
    // padding-left: calc(var(--gutter) * 7.75);
    margin-bottom: calc(var(--height) * -1);

    &.visible {
      position: fixed;
      top: 100%;
      transform: translateY(-100%);
      max-height: var(--height);
    }
  }
</style>