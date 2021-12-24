<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import Picture from '../Picture.svelte'
  import Slider from './Slider.svelte'
  import I from '../icons/I.svelte'

  export let gallerie: Entry<{
    titre: string
    id: string
    photos: Asset[]
    taille: string
  }>

  let showSlider: number = undefined

  function show(index: number) {
    showSlider = index
    document.documentElement.classList.toggle('noscroll')
  }

  function hide() {
    showSlider = undefined
    document.documentElement.classList.remove('noscroll')
  }
</script>

<section id={gallerie.fields.id} class="grid" style="grid-template-columns: repeat({gallerie.fields.photos.length < 4 ? gallerie.fields.photos.length : 4}, 1fr);">  
  {#if gallerie.fields.titre}<h5 style="grid-column: span {gallerie.fields.photos.length < 4 ? gallerie.fields.photos.length : 4}">{gallerie.fields.titre}</h5>{/if}

  {#each gallerie.fields.photos as media, index}
  <figure on:click={() => show(index)}>
    <Picture {media} small={gallerie.fields.photos.length > 3} ar={{
      'Grand': 3 / Math.max(5 - gallerie.fields.photos.length, 1),
      'Moyen': 2 / Math.max(5 - gallerie.fields.photos.length, 1),
      'Petit': 1 / Math.max(5 - gallerie.fields.photos.length, 1),
    }[gallerie.fields.taille] || 1} />
  </figure>
  {/each}
</section>

{#if showSlider != undefined}
<aside transition:fade>
  <button on:click={hide} />
  <button class="close" on:click={hide}>Fermer <I i='close' /></button>
  <div transition:fly={{ y: 100 }}>
    <Slider initialPageIndex={showSlider} slider={{ fields: {
      // @ts-ignore
      slides: gallerie.fields.photos.map(media => ({
        fields: {
          media
        }
      }))
    } }} />
  </div>
</aside>
{/if}

<hr>

<style lang="scss">
  figure {
    cursor: pointer;
    margin-bottom: var(--s1);
  }

  h5 {
    // grid-column: span 4;
  }

  @media (max-width: 888px) {
    h5 {
      grid-column: span 2 !important;
    }
    
    section.grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  aside {
    position: fixed;
    z-index: 88;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    padding: var(--margins);
    background-color: var(--mutedlight);

    button {
      position: absolute;
      top: 0;
      right: 0;
      width: 100vw;
      height: 100vh;
      background: transparent;
      border: none;

      &.close {
        font-size: 1em;
        top: var(--s5);
        z-index: 2;
        right: 0.5em;
        // background-color: white;
        width: auto;
        height: auto;
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