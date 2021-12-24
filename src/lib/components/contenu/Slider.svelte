<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import { fade, fly, slide } from 'svelte/transition'
  import { onMount } from 'svelte'
  import Carousel from 'svelte-carousel'
  
  import Document from '../document/Document.svelte'
  import Picture from '../Picture.svelte'
  import I from '../icons/I.svelte'

  let ready: boolean
  onMount(async () => {
    ready = true
  })

  export let slider: Entry<{
    titre?: string
    id?: string
    slides: Entry<{
      corps?: RichTextContent
      media?: Asset
    }>[]
  }>
  export let initialPageIndex: number = undefined
</script>

<section id={slider.fields.id}>
  <!-- <h4>{slider.fields.titre}</h4> -->
  {#if ready}
  <Carousel
    {initialPageIndex}
    let:currentPageIndex
    let:pagesCount
    let:showPage
    let:showPrevPage
    let:showNextPage
  >
    {#each slider.fields.slides as slide, index}
    <article>
      {#if slide.fields.corps}<Document body={slide.fields.corps} />{/if}
      {#if slide.fields.media}<Picture media={slide.fields.media} eager />{/if}
    </article>
    {/each}
    <button slot="prev" on:click={showPrevPage} class="arrow arrow-prev">
      <I i='arrow-left' />
    </button>

    <button slot="next" on:click={showNextPage} class="arrow arrow-next">
      <I i='arrow-right' />
    </button>

    <div slot="dots" class="dots">
      {#each Array(pagesCount) as _, pageIndex (pageIndex)}
        <button
          class:active={currentPageIndex === pageIndex}
          on:click={() => showPage(pageIndex)}
        >{pageIndex + 1}</button>
      {/each}
    </div>
  </Carousel>
  {/if}
</section>


<style lang="scss">
  section {
    cursor: ew-resize;
    position: relative;
    background-color: var(--alt);
    margin: var(--s4) auto;
    margin-left: calc(var(--margins) * -1);
    width: calc(100% + (var(--margins) * 2));
  }

  article {
    text-align: center;
    padding: var(--s5) 20vw;
    min-height: 42vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 888px) {
      padding: var(--s5) 0;
    }

    :global(img) {
      pointer-events: none;
    }
  }

  .dots {
    position: absolute;
    bottom: var(--s3);

    display: flex;

    button {
      font-size: 0;
      border: 1px solid;
      background: transparent;

      height: 0.66rem;
      width: 0.66rem;
      border-radius: 1rem;
      margin: 0 var(--s0);

      &.active {
        background: currentColor;
      }
    }
  }

  button.arrow {
    border: none;
    background: transparent;
    padding: var(--s1);

    @media (max-width: 888px) {
      padding: var(--s0);
    }
  }
</style>