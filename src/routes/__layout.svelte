<script context="module">
	export async function load({ page, fetch, session, context }) {
		const res = await fetch(`/layout.json`)

		return {
			props: {
				navigation: (await res.json()).navigation
			}
		}
	}
</script>

<script lang="ts">
	import type { Entry, RichTextContent } from 'contentful'
	import '../app.css'

	import Navigation from '$lib/components/Navigation.svelte'
	import { getStores, navigating, page, session } from '$app/stores'

	export let navigation: Entry<{
		liens: Entry<{
			titre: string
			lien: string
			externe: boolean
		}>[]
	}>
</script>

<!-- <nav>
	<a href="/">Écobâtiment</a>
	{#each navigation.fields.liens as lien}
	<a href={lien.fields.lien}>{lien.fields.titre}</a>
	{/each}
</nav> -->

<main id="main">
	<slot></slot>
</main>

<Navigation {navigation} path={$page.path} />

<style lang="scss">
	:global(:root) {
		font-family: "Helvetica Now", "Helvetica Neue", Helvetica, sans-serif;
    letter-spacing: -0.08em;

    --yellow: yellow;

    --large: 1444px;
    --medium: 1024px;
    --small: 375px;

    --gutter: 2vw;
    --top: 6rem;

    --textcolor: black;
    --highlight: var(--yellow);
    --background: white;

    @media (max-width: 900px) {
      --gutter: 4vw;
    }
	}

	:global(body) {
    padding: 0;
    margin: 0;
    min-height: 120vh;
    background: var(--background);
  }

	main {
    min-height: 120vh;
    margin-top: var(--top);
    padding: var(--gutter);
	}
</style>