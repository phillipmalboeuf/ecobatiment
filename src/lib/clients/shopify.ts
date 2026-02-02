

import axios from 'axios'

async function request(query: string) {
  let results = await axios.post<{ data: any }>(`https://ecobatiment.myshopify.com/api/unstable/graphql.json`, query, {
    headers: {
      'Content-Type': 'application/graphql',
      'X-Shopify-Storefront-Access-Token': 'a5789537d2790d52bedca5cdd42ffa15'
    }
  })

  return results.data.data
}

export interface VariantDocument {
  title: string
  priceV2: {
    amount: number
  }
  compareAtPriceV2: {
    amount: number
  }
  weight: number
  id: string
  sku: string
  outOfStock: boolean
  selectedOptions: {[key: string]: string}
}

export interface ProductDocument {
  variants: VariantDocument[]
  options: { name: string, values: string[] }[]
  title: string
  handle: string
  availableForSale: boolean
  productType: string
  priceRange: {
    maxVariantPrice: {
      amount: number
    }
    minVariantPrice: {
      amount: number
    }
  }
}

export const products = async () => {
  return (await request(`
    query {
      shop {
        products(first: 20) {
          edges {
            node {
              title
              handle
            }
          }
        }
      }
    }
  `)).shop.products.edges.map(e => e.node)
}

export const getProduct = async (handle: string) => {
  const product = (await request(`
    query {
        product(handle: "${handle}") {
          title
          handle
          availableForSale
          productType
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first:20) {
            edges {
              node {
                id
                sku
                title
                weight
                availableForSale
                quantityAvailable
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
                priceV2 {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      
    }
  `)).product
  return {
    ...product,
    variants: product.variants.edges?.map(e => e.node)
  }
}

const cartNode = `{
  id
  checkoutUrl
  estimatedCost {
    totalAmount {
      amount
    }
    subtotalAmount {
      amount
    }
    totalTaxAmount {
      amount
    }
  }
  discountCodes {
    applicable
    code
  }
  lines(first:20) {
    edges {
      node {
        id
        quantity
        attributes {
          key
          value
        }
        estimatedCost {
          totalAmount {
            amount
          }
          subtotalAmount {
            amount
          }
        }
        discountAllocations {
          discountedAmount {
            amount
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            sku
            weight
            selectedOptions {
              name
              value
            }
            priceV2 {
              amount
            }
            compareAtPriceV2 {
              amount
            }
            product {
              title
              handle
            }
          }
        }
      }
    }
  }
}`


export interface LineDocument {
  id: string
  quantity: number
  estimatedCost: {
    totalAmount: {
      amount: number
    }
    subtotalAmount: {
      amount: number
    }
  }
  discountAllocations: {
    discountedAmount: {
      amount: number
    }
  }[]
  merchandise: {
    id: string
    sku: string
    weight: number
    selectedOptions: { name: string, value: string }[]
    product: {
      handle: string
      productType: string
    }
    priceV2: {
      amount: number
    }
    compareAtPriceV2: {
      amount: number
    }
  }
  attributes?: { name: string, value: string }[]
}


export interface CartDocument {
  id: string
  lines?: LineDocument[]
  estimatedCost: {
    totalAmount: {
      amount: number
    }
    subtotalAmount: {
      amount: number
    }
    totalTaxAmount: {
      amount: number
    }
  }
  discountCodes: {
    applicable: boolean
    code: string
  }[]
  checkoutUrl: string
}

function postprocessCart(cart: any) {
  return {
    ...cart,
    lines: cart.lines?.edges.map(e => e.node)
  }
}

export async function createCart() {
  return request(`
    mutation {
      cartCreate(input: {
        lines: []
      }) {
        cart ${cartNode}
      }
    }`).then(result => {
    return postprocessCart(result.cartCreate.cart)
  })
}

export async function getCart(id: string): Promise<CartDocument> {
  return request(`
    query {
      cart(id:"${id}") ${cartNode}
    }`).then(result => {
      return postprocessCart(result.cart)
    })
}

export async function addToCart(cart_id: string, id: string, quantity=1) {
  return request(`
    mutation {
      cartLinesAdd(lines: [{
        merchandiseId: "${id}",
        quantity: ${quantity}
      }], cartId: "${cart_id}") {
        cart ${cartNode}
      }
    }`).then(result => {
      return postprocessCart(result.cartLinesAdd.cart)
    })
}

export async function removeFromCart(cart_id: string, id: string) {
  return request(`
    mutation {
      cartLinesRemove(lineIds: ["${id}"], cartId: "${cart_id}") {
        cart ${cartNode}
      }
    }`).then(result => {
      return postprocessCart(result.cartLinesRemove.cart)
    })
}

export async function updateQuantity(cart_id: string, id: string, quantity: number) {
  return request(`
    mutation {
      cartLinesUpdate(lines: [{
        id: "${id}",
        quantity: ${quantity}
      }], cartId: "${cart_id}") {
        cart ${cartNode}
      }
    }`).then(result => {
      return postprocessCart(result.cartLinesUpdate.cart)
    })
}

export async function updateDiscountCode(cart_id: string, code: string) {
  return request(`
    mutation {
      cartDiscountCodesUpdate(discountCodes: ["${code}"], cartId: "${cart_id}") {
        cart ${cartNode}
        userErrors {
          code
          field
          message
        }
      }
    }`).then(result => {
      return postprocessCart(result.cartDiscountCodesUpdate.cart)
    })
}

export async function removeDiscountCode(cart_id: string) {
  return request(`
    mutation {
      cartDiscountCodesUpdate(discountCodes: [], cartId: "${cart_id}") {
        cart ${cartNode}
      }
    }`).then(result => {
      return postprocessCart(result.cartDiscountCodesUpdate.cart)
    })
}