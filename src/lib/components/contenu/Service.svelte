<script lang="ts">
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import type { Item } from '../Collection.svelte'
  import Document from '../document/Document.svelte'
  import Picture from '../Picture.svelte'


  export let service: Entry<{
    id: string
    titre: string
    corps: RichTextContent
    photo: Asset
    exemplesDeProjets: Entry<Item>[]
    exemplesDePublications: Entry<Item>[]
  }>
</script>

<section class="grid" id={service.fields.id}>  
  <aside>
    <h4>{service.fields.titre}</h4>

    {#if service.fields.exemplesDeProjets}
    <h6>Exemples de projets</h6>
    {#each service.fields.exemplesDeProjets as projet}
    <a href="/projets/{projet.fields.id}">{projet.fields.titre}</a>
    {/each}
    {/if}

    {#if service.fields.exemplesDePublications}
    <h6>Exemples de publications</h6>
    {#each service.fields.exemplesDePublications as publication}
    <a href="/publications/{publication.fields.id}">{publication.fields.titre}</a>
    {/each}
    {/if}
  </aside>
  <div class="columns">
    {#if service.fields.photo}
    <figure>
      <Picture media={service.fields.photo} small />
    </figure>
    {/if}
    <Document body={service.fields.corps} />
  </div>
</section>

<hr>

<style lang="scss">
  aside {
    grid-column: span 6;

    a {
      display: block;
      margin-bottom: var(--s0);
    }

    h6 {
      margin-top: var(--s4);
    }
  }

  div {
    grid-column: span 6;
  }
</style>