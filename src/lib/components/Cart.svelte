<script lang="ts">
import { date, money } from '$lib/formatters';

  import type { Entry } from 'contentful'

  import { fade, fly } from 'svelte/transition'
import Chiffres from './contenu/Chiffres.svelte';
  import I from './icons/I.svelte'
  import Picture from './Picture.svelte'
  import Themes from './Themes.svelte'


  export let panier: Entry<any>

  export let visible: boolean
  export let items = [
    {
	"metadata": {
		"tags": []
	},
	"sys": {
		"space": {
			"sys": {
				"type": "Link",
				"linkType": "Space",
				"id": "9m5iliq43y44"
			}
		},
		"id": "4ZEaMRaTsrxQKdbpmdAYJ4",
		"type": "Entry",
		"createdAt": "2021-11-07T15:23:30.388Z",
		"updatedAt": "2021-11-14T17:20:59.767Z",
		"environment": {
			"sys": {
				"id": "master",
				"type": "Link",
				"linkType": "Environment"
			}
		},
		"revision": 4,
		"contentType": {
			"sys": {
				"type": "Link",
				"linkType": "ContentType",
				"id": "publication"
			}
		},
		"locale": "en-US"
	},
	"fields": {
		"titre": "Valoriser les bâtiments existants",
		"id": "valoriser-les-batiments-existants",
		"shopifyHandle": "valoriser-les-batiments-existants",
		"date": "2021-11-17T00:00-04:00",
		"vedette": true,
		"futur": false,
		"type": "Livre",
		"themes": [
			{
				"metadata": {
					"tags": []
				},
				"sys": {
					"space": {
						"sys": {
							"type": "Link",
							"linkType": "Space",
							"id": "9m5iliq43y44"
						}
					},
					"id": "QK7ACLfIEB3GcpW8qJRwM",
					"type": "Entry",
					"createdAt": "2021-11-02T21:30:11.019Z",
					"updatedAt": "2021-11-02T21:30:11.019Z",
					"environment": {
						"sys": {
							"id": "master",
							"type": "Link",
							"linkType": "Environment"
						}
					},
					"revision": 1,
					"contentType": {
						"sys": {
							"type": "Link",
							"linkType": "ContentType",
							"id": "theme"
						}
					},
					"locale": "en-US"
				},
				"fields": {
					"titre": "Habitation",
					"id": "habitation"
				}
			},
			{
				"metadata": {
					"tags": []
				},
				"sys": {
					"space": {
						"sys": {
							"type": "Link",
							"linkType": "Space",
							"id": "9m5iliq43y44"
						}
					},
					"id": "2du7lnnDfezjWBoNEU91xV",
					"type": "Entry",
					"createdAt": "2021-11-02T21:31:02.036Z",
					"updatedAt": "2021-11-02T21:31:02.036Z",
					"environment": {
						"sys": {
							"id": "master",
							"type": "Link",
							"linkType": "Environment"
						}
					},
					"revision": 1,
					"contentType": {
						"sys": {
							"type": "Link",
							"linkType": "ContentType",
							"id": "theme"
						}
					},
					"locale": "en-US"
				},
				"fields": {
					"titre": "Patrimoine bâti",
					"id": "patrimoine-bati"
				}
			}
		],
		"photo": {
			"metadata": {
				"tags": []
			},
			"sys": {
				"space": {
					"sys": {
						"type": "Link",
						"linkType": "Space",
						"id": "9m5iliq43y44"
					}
				},
				"id": "1eRFsaeetr7L5IVxxzSJia",
				"type": "Asset",
				"createdAt": "2021-11-14T17:20:35.630Z",
				"updatedAt": "2021-11-14T17:20:35.630Z",
				"environment": {
					"sys": {
						"id": "master",
						"type": "Link",
						"linkType": "Environment"
					}
				},
				"revision": 1,
				"locale": "en-US"
			},
			"fields": {
				"title": "Clocher",
				"file": {
					"url": "//images.ctfassets.net/9m5iliq43y44/1eRFsaeetr7L5IVxxzSJia/e68254e2ddc2ce5292dd35ea8abdb9a8/unadjustednonraw_thumb_38a5_51592656839_o.jpg",
					"details": {
						"size": 215740,
						"image": {
							"width": 1086,
							"height": 724
						}
					},
					"fileName": "unadjustednonraw_thumb_38a5_51592656839_o.jpg",
					"contentType": "image/jpeg"
				}
			}
		},
		"photos": [
			{
				"metadata": {
					"tags": []
				},
				"sys": {
					"space": {
						"sys": {
							"type": "Link",
							"linkType": "Space",
							"id": "9m5iliq43y44"
						}
					},
					"id": "4qj1jl25g58sWHZiZEytC6",
					"type": "Asset",
					"createdAt": "2021-11-03T00:24:24.264Z",
					"updatedAt": "2021-11-03T00:24:24.264Z",
					"environment": {
						"sys": {
							"id": "master",
							"type": "Link",
							"linkType": "Environment"
						}
					},
					"revision": 1,
					"locale": "en-US"
				},
				"fields": {
					"title": "Église",
					"description": "",
					"file": {
						"url": "//images.ctfassets.net/9m5iliq43y44/4qj1jl25g58sWHZiZEytC6/404f05a383a34c3548eb875a7621d5d1/Screen_Shot_2021-11-02_at_8.24.04_PM.png",
						"details": {
							"size": 1052428,
							"image": {
								"width": 1022,
								"height": 682
							}
						},
						"fileName": "Screen Shot 2021-11-02 at 8.24.04 PM.png",
						"contentType": "image/png"
					}
				}
			},
			{
				"metadata": {
					"tags": []
				},
				"sys": {
					"space": {
						"sys": {
							"type": "Link",
							"linkType": "Space",
							"id": "9m5iliq43y44"
						}
					},
					"id": "177QlbAtl667YvwDHx1a8D",
					"type": "Asset",
					"createdAt": "2021-11-02T21:37:25.553Z",
					"updatedAt": "2021-11-03T00:02:17.346Z",
					"environment": {
						"sys": {
							"id": "master",
							"type": "Link",
							"linkType": "Environment"
						}
					},
					"revision": 2,
					"locale": "en-US"
				},
				"fields": {
					"title": "Rue",
					"description": "Crédit photo: Lorem Ipsum",
					"file": {
						"url": "//images.ctfassets.net/9m5iliq43y44/177QlbAtl667YvwDHx1a8D/d42c6c95d1a67fea15ce00e5b5b01e5e/Screen_Shot_2021-11-02_at_5.36.50_PM.png",
						"details": {
							"size": 1444394,
							"image": {
								"width": 1021,
								"height": 765
							}
						},
						"fileName": "Screen Shot 2021-11-02 at 5.36.50 PM.png",
						"contentType": "image/png"
					}
				}
			},
			{
				"metadata": {
					"tags": []
				},
				"sys": {
					"space": {
						"sys": {
							"type": "Link",
							"linkType": "Space",
							"id": "9m5iliq43y44"
						}
					},
					"id": "1eRFsaeetr7L5IVxxzSJia",
					"type": "Asset",
					"createdAt": "2021-11-14T17:20:35.630Z",
					"updatedAt": "2021-11-14T17:20:35.630Z",
					"environment": {
						"sys": {
							"id": "master",
							"type": "Link",
							"linkType": "Environment"
						}
					},
					"revision": 1,
					"locale": "en-US"
				},
				"fields": {
					"title": "Clocher",
					"file": {
						"url": "//images.ctfassets.net/9m5iliq43y44/1eRFsaeetr7L5IVxxzSJia/e68254e2ddc2ce5292dd35ea8abdb9a8/unadjustednonraw_thumb_38a5_51592656839_o.jpg",
						"details": {
							"size": 215740,
							"image": {
								"width": 1086,
								"height": 724
							}
						},
						"fileName": "unadjustednonraw_thumb_38a5_51592656839_o.jpg",
						"contentType": "image/jpeg"
					}
				}
			}
		],
	}
}
  ]
</script>

{#if visible}
<section transition:fly={{ y: 100 }}>
  <button class="close" on:click={() => visible = false}><I i="close" big /></button>
  <h4>{panier.fields.titre}</h4>

  <ol>
    {#each [...items, ...items] as item}
    <li>
      <figure>
        <a href="/{item.sys.contentType.sys.id}s/{item.fields.id}">
          <Picture media={item.fields.photo} ar={1} />
        </a>
      </figure>

      <div>
        <Themes base="{item.sys.contentType.sys.id}s" themes={item.fields.themes} />

        <h5>
          {money(50)}<br>
          <a href="/{item.sys.contentType.sys.id}s/{item.fields.id}">{item.fields.titre}</a><br>
          <small>{date(item.fields.date)}</small>
        </h5>

        <h5>Type de document</h5>
      </div>

      <form>
        <label for="quantity">{panier.fields.quantite}</label>
        <input type="number" name="quantity" id="quantity" min={1} value={1}>
      </form>

      <button class="trash" on:click={() => false}><I i="trash" big /></button>
    </li>
    {/each}
  </ol>

  <aside>
    <h4>{panier.fields.total}</h4>
    <table>
      <tr>
        <th>{panier.fields.sousTotal}</th>
        <td>{money(100)}</td>
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
        <td>{money(100)}</td>
      </tr>
    </table>
    <button class="full">{panier.fields.checkout}</button>
  </aside>
</section>
{/if}

<style lang="scss">
  section {
    position: fixed;
    bottom: 0;
    z-index: 2;
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