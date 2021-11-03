<script lang="ts">
  import type { Entry } from 'contentful'
  import Chiffres from './contenu/Chiffres.svelte'
  import Complexe from './contenu/Complexe.svelte'
  import Exergue from './contenu/Exergue.svelte'
  import Gallerie from './contenu/Gallerie.svelte'
  import Intro from './contenu/Intro.svelte'
  import Liste from './contenu/Liste.svelte'
  import Simple from './contenu/Simple.svelte'

  export let contenu: Entry<any>[]
</script>


{#each contenu as entry (entry.sys.id)}
{#if entry.sys.contentType.sys.id === 'intro'}
<Intro intro={entry} />
{:else if entry.sys.contentType.sys.id === 'liste'}
<Liste liste={entry} />
{:else if entry.sys.contentType.sys.id === 'contenuComplexe'}
<Complexe contenu={entry} />
{:else if entry.sys.contentType.sys.id === 'contenuSimplifie'}
<Simple contenu={entry} />
{:else if entry.sys.contentType.sys.id === 'blocGallerie'}
<Gallerie gallerie={entry} />
{:else if entry.sys.contentType.sys.id === 'chiffres'}
<Chiffres chiffres={entry} />
{:else if entry.sys.contentType.sys.id === 'exergue'}
<Exergue intro={entry} />
{/if}
{/each}

