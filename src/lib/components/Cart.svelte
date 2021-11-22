<script lang="ts" context="module">
	import { writable } from 'svelte/store'
	import { CartDocument, getCart, createCart, products, removeFromCart, updateQuantity } from '$lib/clients/shopify'
  export let cart = writable<CartDocument>()
</script>

<script lang="ts">
	import { date, money } from '$lib/formatters'

  import type { Entry } from 'contentful'
	import { afterUpdate, onMount } from 'svelte'

  import { fade, fly } from 'svelte/transition'
  import I from './icons/I.svelte'
  import Picture from './Picture.svelte'
  import Themes from './Themes.svelte'
  import type { Item } from './Collection.svelte'
  import { respond } from '$lib/responses'

  export let panier: Entry<any>
  export let visible: boolean

  let publications: Entry<Item>[]

	onMount(async () => {
		const id = sessionStorage.getItem("cart-id")
		if (id) {
			$cart = await getCart(id)
		} else {
			$cart = await createCart()
			sessionStorage.setItem("cart-id", $cart.id)
		}
	})

	cart.subscribe(async value => {
		if (value?.lines.length > 0) {
			visible = true

      publications = await Promise.all(value.lines.map(async line => (await respond(fetch, `/publications/${line.merchandise.product.handle}.json`)).props.publication))
		}
	})
</script>

{#if visible && $cart}
<section transition:fly={{ y: 100 }}>
  <button class="close" on:click={() => visible = false}><I i="close" big /></button>
  <h4>{panier.fields.titre}</h4>

  <ol>
    {#each $cart.lines as item, index}
    <li>
			
      {#if publications && publications[index]}
      <figure>
        <a href="/{publications[index].sys.contentType.sys.id}s/{publications[index].fields.id}">
          <Picture media={publications[index].fields.photo} ar={1} />
        </a>
      </figure>

      <div>
        <Themes base="{publications[index].sys.contentType.sys.id}s" themes={publications[index].fields.themes} />

        <h5>
          {money(item.merchandise.priceV2.amount)}<br>
          <a href="/{publications[index].sys.contentType.sys.id}s/{publications[index].fields.id}">{publications[index].fields.titre}</a><br>
          <small>{date(publications[index].fields.date)}</small>
        </h5>

        <h5>Type de document</h5>
      </div>
      {/if}

      <form>
        <label for="quantity">{panier.fields.quantite}</label>
        <input on:change={async e => {
          $cart = await updateQuantity($cart.id, item.id, parseInt(e.currentTarget.value))
        }} type="number" name="quantity" id="quantity" min={1} value={item.quantity}>
      </form>

      <button class="trash" on:click={async () => {
        $cart = await removeFromCart($cart.id, item.id)
      }}><I i="trash" big /></button>
    </li>
		{:else}
		<li><a href="/publications" style="text-decoration: underline;">Remplir votre panier</a></li>
    {/each}
  </ol>

  <aside>
    <h4>{panier.fields.total}</h4>
    <table>
      <tr>
        <th>{panier.fields.sousTotal}</th>
        <td>{$cart?.lines.length ? money($cart.estimatedCost.subtotalAmount.amount) : '–'}</td>
      </tr>
      <tr>
        <th>{panier.fields.livraison}</th>
        <td>{panier.fields.suivante}</td>
      </tr>
      <tr>
        <th>{panier.fields.taxes}</th>
        <td>{panier.fields.suivante}</td>
      </tr>
      <tr>
        <th>{panier.fields.codePromotionnel}</th>
        <td><input type="text" name="code" id="code"></td>
      </tr>
    </table>
    <hr>
    <table>
      <tr>
        <th>{panier.fields.estimationDuTotal}</th>
        <td>{$cart?.lines.length ? money($cart.estimatedCost.totalAmount.amount) : '–'}</td>
      </tr>
    </table>
    <button class="full" disabled={$cart?.lines.length === 0}>{panier.fields.checkout}</button>
  </aside>
</section>
{/if}

<style lang="scss">
  section {
    position: fixed;
    bottom: 0;
    z-index: 20;
    width: 100%;
    max-height: 100vh;
    color: var(--dark);
    background: var(--alt);
    
    overflow-y: scroll;
    padding: calc(var(--margins) * 2);

    @media (max-width: 888px) {
      padding: var(--s3) var(--s1) var(--s1);
    }

    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: var(--margins);

    > h4 {
      grid-column: span 12;
      margin-bottom: var(--s3);
    }
  }

  ol {
    list-style: none;
    padding-left: 0;
    grid-column: span 8;
    margin: 0;

    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }

  li, aside {
    padding: var(--s2);
    background: var(--light);
  }

  aside {
    align-self: flex-start;
    grid-column: span 4;

    @media (max-width: 888px) {
      grid-column: span 12;
    }
  }

  table {
    width: 100%;

    th {
      text-align: left;
      padding-bottom: var(--s0);
    }

    td:last-child {
      text-align: right;
    }
  }

  li {
    position: relative;
    margin-bottom: var(--s2);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: var(--gutter);

    @media (max-width: 888px) {
      grid-template-columns: repeat(3, 1fr);
    }

    figure {
      margin: 0;
    }

    div {
      grid-column: span 2;
    }

    h5 {
      margin: var(--s1) 0 var(--s2);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  form {

    @media (max-width: 888px) {
      grid-column: span 2;
    }

    label {
      display: block;
      margin-bottom: var(--s1);
    }

    input {
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      padding: 0.5rem;
      width: 100%;
    }
  }

  h4 {
    text-transform: uppercase;
  }

  button.close,
  button.trash {
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    border: none;
    padding: var(--s2);

    @media (max-width: 888px) {
      padding: var(--s0);
    }
  }

  button.trash {
    top: auto;
    bottom: 0;
  }

  button.full {
    margin-top: var(--s2);
    background: black;
  }
</style>