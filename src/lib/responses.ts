import type { LoadInput } from '@sveltejs/kit'
import json from 'json-complete'

export async function respond(fetch: LoadInput['fetch'], url: string) {
  const res = await fetch(url)

  if (res.ok) {
    const text = await res.text()
    return {
      props: json.decode(text)
    }
  }

  return {
    status: res.status,
    error: new Error(`Could not load ${url}`)
  }
}