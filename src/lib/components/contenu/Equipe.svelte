<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import { fade, fly } from 'svelte/transition'
  
  import Document from '../document/Document.svelte'
  import I from '../icons/I.svelte'
  import Picture from '../Picture.svelte'


  export let equipe: Entry<{
    titre: string
    id: string
    membres: Entry<{
      nom: string
      id: string
      photo: Asset
      poste: string
      acros: string
      biographie: RichTextContent
      phone: string
      courriel: string
    }>[]
  }>

  let selected: number
</script>

<section id={equipe.fields.id} class="grid" style="grid-template-columns: repeat({equipe.fields.membres.length > 5 ? equipe.fields.membres.length + 1 : 6}, 1fr);">  
  <h4>{equipe.fields.titre}</h4>
  {#each equipe.fields.membres as membre, index}
  <article class:selected={index === selected} id={membre.fields.id}>
    <button on:click={e => {
      index === selected ? selected = undefined : selected = index
      e.currentTarget.blur()
    }}>
      <figure>
        <Picture media={membre.fields.photo} small ar={2.5 / 1} noDescription />
      </figure>

      <div>
        <h6>{membre.fields.poste.replace('<br>', '\n')}</h6>
        <h5>{membre.fields.nom}</h5>
        <h6>{membre.fields.acros}</h6>
        <br><br>

        <span>
        {#if index === selected}
        <I i="arrow-top" big />
        {:else}
        <I i="arrow-bottom" big />
        {/if}
        </span>
      </div>
    </button>
  </article>
  {/each}

  {#if selected !== undefined}
  {#key selected}
  <section transition:fly={{ y: -50 }} class="grid corps" style="--start: {selected + 3};">
    <div>
      <h6>{equipe.fields.membres[selected].fields.poste.replace('<br>', ' ')}</h6>
      <h5>{equipe.fields.membres[selected].fields.nom}</h5>
      <h6>{equipe.fields.membres[selected].fields.acros}</h6>
    </div>

    <nav>
      {#if equipe.fields.membres[selected].fields.courriel}<h6><a href="mailto:{equipe.fields.membres[selected].fields.courriel}" target="_blank"><I i="courriel" /> {equipe.fields.membres[selected].fields.courriel}</a></h6>{/if}
      {#if equipe.fields.membres[selected].fields.phone}<h6><a href="tel:{equipe.fields.membres[selected].fields.phone}" target="_blank"><I i="phone" /> {equipe.fields.membres[selected].fields.phone}</a></h6>{/if}
    </nav>

    <aside class="columns">
      <Document body={equipe.fields.membres[selected].fields.biographie} />
    </aside>
    
  </section>
  {/key}
  {/if}
</section>

<hr>

<style lang="scss">

  article {
    position: relative;
    overflow-y: visible;

    @media (max-width: 888px) {
      grid-column: span 12;
      margin-bottom: var(--s2);;

      :global(svg) {
        height: 2em !important;
        width: 2em !important;
      }
    }
  }

  figure {
    padding-bottom: 100%;
    margin-bottom: var(--s1);

    :global(img) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
      transition: height 666ms;

      @media (min-width: 888px) {
        .selected & {
          height: 166%;
        }
      }
    }
  }

  button {
    width: 100%;
    border: none;
    background: transparent;
    padding: 0;
    text-align: left;

    span {
      position: absolute;
      top: calc(100% - 1.5rem);
    }

    @media (max-width: 888px) {
      display: grid;
      grid-template-columns: 1fr 2fr;
      column-gap: var(--s2);
    }
  }

  h6, h5 {
    font-weight: normal;
    margin-bottom: var(--s1);
    white-space: pre-line;
  }

  .corps {
    grid-column: span 6;

    @media (max-width: 888px) {
      grid-column: span 12;
    }

    div {
      grid-column: 3 / span 5;

      h6:last-child {
        margin-bottom: var(--s2);
      }
    }

    nav {
      text-align: right;
      grid-column: span 5;

      h6 {
        margin-bottom: var(--s0);
      }
    }

    aside {
      grid-column: 3 / span 10;
      grid-row-start: 2;
    }

    @media (max-width: 888px) {
      grid-row-start: var(--start);
      margin-top: 0;

      aside,
      nav {
        grid-column: span 12;
      }

      nav {
        text-align: left;
      }

      div {
        display: none;
      }
    }
  }

  // figure :global(img) {
  //   height: 25vw;
  //   object-fit: cover;
  // }

  // section.Moyen figure :global(img) {
  //   height: 50vw;
  // }

  // section.Grand figure :global(img) {
  //   height: 75vw;
  // }
</style>