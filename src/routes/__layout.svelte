<script context="module">
	import '../app.css'

	export async function load({ page, fetch, session, context }) {
		const res = await fetch(`/layout.json`)

		return {
			props: await res.json()
		}
	}
</script>

<script lang="ts">
	import type { Entry, RichTextContent } from 'contentful'
	

	import Navigation from '$lib/components/Navigation.svelte'
	import { getStores, navigating, page, session } from '$app/stores'
	import type { Lien } from '$lib/components/Link.svelte'

	export let navigation: Entry<{
		liens: Entry<Lien>[]
	}>
	export let sousNavigation: Entry<{
		liens: Entry<Lien>[]
	}>
	export let contact: Entry<any>
	export let panier: Entry<any>
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

<Navigation {navigation} {sousNavigation} {contact} {panier} path={$page.path} />

<style lang="scss">
	main {
    min-height: 100vh;
    margin: var(--s4) 0;
    padding: var(--margins);
	}
</style>