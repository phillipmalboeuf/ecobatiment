<script lang="ts">
  import type { Entry } from 'contentful'
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
  export let cartVisible: boolean
</script>

<aside>
  <button on:click={() => cartVisible = !cartVisible}>
    {#if cartVisible}
    <I i='close' big />
    {:else}
    <I i='panier' big />
    {/if}
  </button>

  <button on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <I i='up' big />
  </button>
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
  <div>
    <h5>Contact</h5>
    {#if contact.fields.telephone}<a href="tel:{contact.fields.telephone}" target="_blank"><I  i="phone" /> {contact.fields.telephone}</a>{/if}
    {#if contact.fields.email}<a href="mailto:{contact.fields.email}" target="_blank"><I  i="courriel" /> {contact.fields.email}</a>{/if}
    {#if contact.fields.adresse}<a style="display: flex;" href="{contact.fields.lienDadresse}" target="_blank">
      <I  i="map" />
      <p>{contact.fields.adresse}</p>
    </a>{/if}
  </div>

  {#if contact.fields.photoDadresse}<figure>
    <a href="{contact.fields.lienDadresse}" target="_blank">
    <Picture media={contact.fields.photoDadresse} small ar={1 / 2} />
    </a>
  </figure>{/if}

  <div>
    <h5>Médias sociaux</h5>
    {#if contact.fields.facebook}<a href="{contact.fields.facebook}" target="_blank"><I  i="facebook" /> Facebook</a>{/if}
    {#if contact.fields.twitter}<a href="{contact.fields.twitter}" target="_blank"><I  i="twitter" /> Twitter</a>{/if}
    {#if contact.fields.instagram}<a href="{contact.fields.instagram}" target="_blank"><I  i="instagram" /> Instagram</a>{/if}
    {#if contact.fields.linkedIn}<a href="{contact.fields.linkedIn}" target="_blank"><I  i="linkedin" /> LinkedIn</a>{/if}
  </div>

  {#each sousNavigation.fields.liens as lien}
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


<nav>
  <small>{contact.fields.copyright}</small>
  <a on:click href="/" class="logo">
    <LogoComplet />
  </a>
</nav>

<style lang="scss">
  aside {
    margin: calc(var(--s2) * -1) calc(var(--s2) * -1) var(--s3) auto; 
    text-align: right;

    button {
      background: transparent;
      border: none;
    }
  }

  nav {
    width: 100%;
    max-width: var(--width);
    margin: 0 auto;
    margin-bottom: var(--s3);

    &:last-child {
      margin-bottom: 0;
      max-width: none;
    }

    a {
      display: block;
    }

    h5 {
      margin-bottom: var(--s1);
    }

    display: flex;
    justify-content: space-between;

    @media (max-width: 888px) {
      flex-direction: column;
      row-gap: var(--s2);
    }

    > small {
      align-self: flex-end;
    }
  }

  hr {
    margin: var(--s3) auto;
    max-width: var(--width);
  }

  a.logo {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.25rem;
  }

  figure {
    max-width: 25%;

    @media (max-width: 888px) {
      max-width: 66%;
    }
  }
</style>