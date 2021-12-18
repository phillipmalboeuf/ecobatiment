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
  let footer: HTMLDivElement
  let cartVisible = false
  let cartNumber: number

  // let locale = getContext('locale')

  onMount(() => {
		// const scrolledObserver = new IntersectionObserver( 
		// 	([e]) => scrolled = e.isIntersecting,
		// 	{ threshold: [0] }
		// )

		// scrolledObserver.observe(footer)

    // document.getElementById('main').addEventListener('click', () => visible = false, { passive: true, capture: false })
	})

  function toggle() {
    visible = !visible
    document.documentElement.classList.toggle('noscroll')
  }

  function hide() {
    visible = false
    document.documentElement.classList.remove('noscroll')
  }
</script>

<div bind:this={footer}>
  <Footer {navigation} {sousNavigation} {contact} {cartNumber} bind:cartVisible bind:visible on:click={hide} />
</div>

<header>
  <nav>
  <div>
    <a class="logo" href="/" on:click={hide} aria-label="Écobâtiment">
      <Logotype />
    </a>
  </div>

  <div>
    {#each navigation.fields.liens as lien}
    <a class:active={path.includes(lien.fields.lien)} href={lien.fields.lien}>{lien.fields.titre}</a>
    {/each}
  </div>

  <div>
    <button on:click={() => cartVisible = !cartVisible}>
      {#if cartVisible}
      <I i='close' big />
      {:else}
      <I i='panier' big />
      {/if}
      {#if cartNumber > 0}
      <span>{cartNumber}</span>
      {/if}
    </button>

    <button on:click={toggle}>
      {#if visible}
      <I i='close' big />
      {:else}
      <I i='menu' big />
      {/if}
    </button>
  </div>
  </nav>
</header>

<Cart bind:visible={cartVisible} bind:number={cartNumber} {panier} />


<style lang="scss">
  header {
    --header-color: var(--dark);
    --header-background: var(--light);

    z-index: 3;
    position: absolute;
    top: 0;
    width: 100%;
    
    color: var(--header-color);
    background: var(--header-background);
    
    padding: calc(var(--margins) / 1.33) var(--margins);

    button {
      position: relative;
      color: currentColor;
      background: none;
      border: none;
      padding: 0;

      span {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: calc(var(--gutter) * 1.5);
      width: 100%;
      // max-width: var(--width);
      // margin: 0 auto;
      
      > div {
        width: 20%;

        @media (max-width: 888px) {
          width: 30%;
        }
      }

      > div:last-child {
        text-align: right;
      }

      > div:nth-child(2) {
        width: auto;
        display: flex;
        align-items: center;

        @media (max-width: 1200px) {
          display: none;
        }

        a {
          font-size: 1rem;
          padding: calc(var(--gutter) / 2) calc(var(--gutter) / 1.5);
          text-transform: uppercase;

          @media (max-width: 1500px) {
            padding: calc(var(--gutter) / 2) calc(var(--gutter) / 2);
          }
        }

        a.active {
          text-decoration: underline;
        }
      }
    }
  }
</style>