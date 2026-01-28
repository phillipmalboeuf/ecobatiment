<script lang="ts">
	import '../app.css'
	import type { Entry, RichTextContent } from 'contentful'
	import type { LayoutData } from './$types'

	import Navigation from '$lib/components/Navigation.svelte'
	import { navigating, page } from '$app/stores'
	import type { Lien } from '$lib/components/Link.svelte'

	export let data: LayoutData
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

<Navigation navigation={data.navigation} sousNavigation={data.sousNavigation} contact={data.contact} panier={data.panier} path={$page.url.pathname} />

<style lang="scss">
	main {
    min-height: 100vh;
    margin: 0;
    padding: calc(var(--s4) + var(--margins)) var(--margins) var(--margins);

		// @media (max-width: 888px) {
    //   margin-top: var(--s3);
    // }
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