import { createClient } from 'contentful'
// import pkg from 'contentful'
// const { createClient } = pkg

export const contentful = createClient({
  space: '9m5iliq43y44',
  accessToken: 'xK7YqcTxT1SjOvFKeKftCHJRQWW1LOCEXw8wKfJ7wQ8',
})

export async function entries<T>(content_type: string, locale: string, query: {[key: string]: any}={}, include=2) {
  return await contentful.getEntries<T>({ content_type, include, locale, ...query })
}