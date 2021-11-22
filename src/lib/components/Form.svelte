<script lang="ts">
  import { addToCart, getCart, ProductDocument } from '$lib/clients/shopify'
  import { money } from '$lib/formatters'
  import { cart } from './Cart.svelte'

  export let product: ProductDocument
  let waiting = false
  
  let variant = product.variants[0]
</script>

<form 
  on:change={e => {
    variant = product.variants.find(variant => {
      let found = true
      Object.keys(variant.selectedOptions).forEach(name => e.currentTarget[name].value === variant.selectedOptions[name])
      return found
    })
  }}
  on:submit={async e => {
    e.preventDefault()

    waiting = true
    await addToCart($cart.id, variant.id, e.target["quantity"].value)
    $cart = await getCart(sessionStorage.getItem("cart-id"))
    waiting = false
  }}>
  {#if product.options[0].name !== 'Title'}
  {#each product.options as option}
  <label for={option.name}>{option.name}</label>
  <select name={option.name} id={option.name}>
    {#each option.values as value}
    <option {value}>{value}</option>
    {/each}
  </select>
  {/each}
  {/if}

  <label for="quantity">Quantité</label>
  <input type="number" min=1 name="quantity" id="quantity" value=1>

  <button class="full" disabled={waiting || !product.availableForSale} type="submit">{#if waiting}Un instant...{:else}Ajouter au panier d'achat – {money(variant.priceV2.amount)}{/if}</button>
</form>

<style lang="scss">
  form {
    display: grid;
    grid-template-columns: 2fr 3fr;
    column-gap: var(--gutter);
    row-gap: var(--s1);
    margin-bottom: var(--s4);

    @media (max-width: 888px) {
      grid-template-columns: 1fr;
    }
  }

  label {
    text-transform: uppercase;
  }

  input, select {
    color: currentColor;
    border: 1px solid currentColor;
    border-radius: 3px;
    font-size: var(--s1);
    padding: calc(var(--s0) / 2) var(--s0);
  }

  button {
    grid-column: span 2;
    margin-top: var(--s1);

    @media (max-width: 888px) {
      grid-column: span 1;
    }
  }
</style>