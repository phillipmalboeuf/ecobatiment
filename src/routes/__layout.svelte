<script context="module">
	import '../app.css'
	import { respond } from '$lib/responses'

	export async function load({ params, fetch, session, context }) {
		return respond(fetch, `/layout.json`)
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

<main class:navigating={$navigating} id="main">
	<slot></slot>
</main>

<Navigation {navigation} {sousNavigation} {contact} {panier} path={$page.url.pathname} />

<style lang="scss">
	main {
    min-height: 100vh;
    margin: 0;
    padding: calc(var(--s4) + var(--margins)) var(--margins) var(--margins);

		@media (max-width: 888px) {
      margin-top: var(--s3);
    }
	}

	main:before {
		content: "";
		border-top: 2px solid black;
		position: fixed;
		top: 0;
		left: 0;
		width: 0%;
		z-index: 100;
		box-sizing: border-box;
		transition: none;
		opacity: 0;
	}

	main.navigating:before {
		opacity: 1;
		width: 100%;
		transition: width 666ms, opacity 333ms;
	}
</style>