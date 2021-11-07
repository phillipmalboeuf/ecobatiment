<script lang="ts">

</script>

<form action="">
  <label for="type">Type de document</label>
  <select name="type" id="type">
    <option value="id">Document Imprimé – 50$</option>
  </select>

  <label for="quantity">Quantité</label>
  <input type="number" min=1 name="quantity" id="quantity" value=1>

  <button type="submit">Ajouter au panier d'achat</button>
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

    font-size: var(--s1);
    color: var(--light);
    background: var(--dark);
    text-transform: uppercase;
    text-align: center;
    
    width: 100%;
    border: none;
    padding: var(--s1);
    border-radius: var(--s2);
  }
</style>