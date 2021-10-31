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
	import '../app.css';

	export let navigation: Entry<{
		liens: Entry<{
			titre: string
			lien: string
			externe: boolean
		}>[]
	}>
</script>

<nav>
	{#each navigation.fields.liens as lien}
	<a href={lien.fields.lien}>{lien.fields.titre}</a>
	{/each}
</nav>

<slot></slot>