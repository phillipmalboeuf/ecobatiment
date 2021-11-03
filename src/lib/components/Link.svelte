<script context="module" lang="ts">
  export interface Lien {
    titre: string
    lien: string
    externe: boolean
  }
</script>

<script lang="ts">
  import type { Entry } from 'contentful'
  
  export let lien: Entry<Lien>
  export let plus = false
</script>

<a href={lien.fields.lien} target={lien.fields.externe && '_blank'}>{#if plus}<span>⨁</span> {/if}{lien.fields.titre}</a>

<style>
  span {
    /* border-radius: ⨁; */
  }
</style>