<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import { fade, fly, slide } from 'svelte/transition'
  import { onMount } from 'svelte'
  import Carousel from 'svelte-carousel'
  
  import Document from '../document/Document.svelte'
  import Picture from '../Picture.svelte'

  let ready: boolean
  onMount(async () => {
    ready = true
  })

  export let slider: Entry<{
    titre: string
    id: string
    slides: Entry<{
      corps: RichTextContent
    }>[]
  }>
</script>

<section id={slider.fields.id}>
  <!-- <h4>{slider.fields.titre}</h4> -->
  {#if ready}
  <Carousel
    let:currentPageIndex
    let:pagesCount
    let:showPage
  >
    {#each slider.fields.slides as slide, index}
    <article>
      <Document body={slide.fields.corps} />
    </article>
    {/each}
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
    position: relative;
    background-color: var(--mutedlight);
    margin: var(--s4) auto;
    margin-left: calc(var(--margins) * -1);
    width: calc(100% + (var(--margins) * 2));
  }

  article {
    text-align: center;
    padding: var(--s5) 20vw;
  }

  .dots {
    position: absolute;
    bottom: var(--s3);

    display: flex;
    column-gap: var(--s0);

    button {
      font-size: 0;
      border: 1px solid;
      background: transparent;

      height: 0.66rem;
      width: 0.66rem;
      border-radius: 1rem;

      &.active {
        background: currentColor;
      }
    }
  }
</style>