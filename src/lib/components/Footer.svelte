<script lang="ts">
  import type { Entry } from 'contentful'
  import { fade, fly } from 'svelte/transition'

  import I from './icons/I.svelte'
  import LogoComplet from './icons/LogoComplet.svelte'
  import type { Lien } from './Link.svelte'
  import Picture from './Picture.svelte'

  // export let path: string
  export let navigation: Entry<{
		liens: Entry<Lien>[]
	}>
  export let sousNavigation: Entry<{
		liens: Entry<Lien>[]
	}>
  export let contact: Entry<any>
  export let visible: boolean
  export let cartVisible: boolean
  export let cartNumber: number

  let focus: boolean
</script>

{#key visible}
<footer class:visible transition:fly={{ y: 100 }}>
  <aside>
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

    {#if !visible}
    <button on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <I i='up' big />
    </button>
    {:else}
    <button on:click={() => {
      visible = false
      document.documentElement.classList.remove('noscroll')
    }}>
      <I i='close' big />
    </button>
    {/if}
  </aside>

  <nav>
    {#each navigation.fields.liens as lien}
    <div>
      <h5><a on:click href={lien.fields.lien}>{lien.fields.titre}</a></h5>
      {#if lien.fields.sousLiens}
      {#each lien.fields.sousLiens as l}
      <a on:click href={l.fields.lien}>{l.fields.titre}</a>
      {/each}
      {/if}
    </div>
    {/each}
  </nav>

  <hr>

  <nav>
    <div class="contact">
      <h5>Contact</h5>
      {#if contact.fields.telephone}<a href="tel:{contact.fields.telephone}" target="_blank"><I  i="phone" /> {contact.fields.telephone}</a>{/if}
      {#if contact.fields.email}<a href="mailto:{contact.fields.email}" target="_blank"><I  i="courriel" /> {contact.fields.email}</a>{/if}
      {#if contact.fields.adresse}<a class:focus on:pointerenter={() => focus = true} on:pointerleave={() => focus = undefined} style="display: flex;" href="{contact.fields.lienDadresse}" target="_blank">
        <I  i="map" />
        <p>{contact.fields.adresse}</p>
      </a>{/if}
    </div>

    {#if contact.fields.photoDadresse}<figure>
      <a class:focus on:pointerenter={() => focus = true} on:pointerleave={() => focus = undefined} href="{contact.fields.lienDadresse}" target="_blank">
      <Picture media={contact.fields.photoDadresse} small ar={1 / 2} />
      </a>
    </figure>{/if}

    <div class="social">
      <h5>Médias sociaux</h5>
      {#if contact.fields.facebook}<a href="{contact.fields.facebook}" target="_blank"><I  i="facebook" /> Facebook</a>{/if}
      {#if contact.fields.twitter}<a href="{contact.fields.twitter}" target="_blank"><I  i="twitter" /> Twitter</a>{/if}
      {#if contact.fields.instagram}<a href="{contact.fields.instagram}" target="_blank"><I  i="instagram" /> Instagram</a>{/if}
      {#if contact.fields.linkedIn}<a href="{contact.fields.linkedIn}" target="_blank"><I  i="linkedin" /> LinkedIn</a>{/if}
    </div>

    {#each sousNavigation.fields.liens as lien}
    <div class="sub">
      <h5><a on:click href={lien.fields.lien}>{lien.fields.titre}</a></h5>
      {#if lien.fields.sousLiens}
      {#each lien.fields.sousLiens as l}
      <a on:click href={l.fields.lien}>{l.fields.titre}</a>
      {/each}
      {/if}
    </div>
    {/each}
  </nav>


  <nav>
    <small>{contact.fields.copyright}</small>
    <a on:click href="/" class="logo">
      <LogoComplet />
    </a>
  </nav>
</footer>
{/key}

<style lang="scss">
  footer {
    position: relative;
    z-index: 4;
    width: 100%;
    height: 100vh;
    max-height: 66rem;
    overflow-y: scroll;

    color: var(--light);
    background: var(--dark);
    padding: calc(var(--margins) * 2) calc(var(--margins) * 2) calc(var(--margins) * 1.25);

    display: flex;
    flex-direction: column;
    // justify-content: center;

    &.visible {
      position: fixed;
      top: 100%;
      transform: translateY(-100%);
    }
  }

  aside {
    position: absolute;
    top: 0;
    right: 0;
    padding: var(--margins);

    button {
      position: relative;
      background: transparent;
      border: none;
      padding: 0;

      span {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }

  a.logo {
    margin: 0 auto;

    @media (max-width: 1200px) {
      :global(svg) { height: 7rem; }
    }

    @media (max-width: 888px) {
      display: none;
    }

    @media (min-width: 888px) {
      margin-top: calc(var(--s4) * -1);
      margin-bottom: calc(var(--s1) * -1);
    }
  }

  nav {
    width: 100%;
    max-width: calc(var(--width) - (var(--margins) * 2));
    margin: var(--s3) auto;

    &:last-child {
      margin: 0 auto;
      // margin-top: calc(var(--s3) * -1);
      flex: 1;
      align-items: flex-end;
    }

    a {
      display: block;
      margin-bottom: 0.25rem;
    }

    h5 {
      font-size: 1.5rem;
      margin-bottom: var(--s1);
    }

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: var(--gutter);

    @media (max-width: 1200px) {
      .contact,
      .social {
        a {
          margin-left: -1.66em;
        }
      }
    }

    @media (max-width: 888px) {
      grid-template-columns: 1fr;
      row-gap: var(--s1);

      &:first-of-type h5 {
        margin-bottom: 0;
      }

      h5 {
        font-size: 1.33rem;
      }

      &:first-of-type > div > a {
        display: none;
      }

      .contact,
      .social {
        a {
          margin-left: 0;
        }
      }

      .social {
        order: -1;
      }

      .sub {
        order: -2;

        > a {
          display: none;
        }
      }
    }

    > small {
      grid-column: span 4;
    }
  }

  hr {
    margin: var(--s3) auto;
    max-width: var(--width);

    @media (max-width: 888px) {
      margin: 0 auto;
    }
  }

  figure {
    max-width: 75%;
    grid-column: span 2;

    @media (max-width: 888px) {
      display: none;
    }
  }
</style>