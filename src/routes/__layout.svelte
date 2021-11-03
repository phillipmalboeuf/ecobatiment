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
	main {
    min-height: 100vh;
    margin-top: var(--s5);
    padding: var(--margins);
	}
</style>