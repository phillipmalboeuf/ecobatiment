<script lang="ts">
  export let media
  export let small = false
  export let noDescription = false
  export let ar = undefined
  export let eager = false

  function cdn(url: string) {
    return url.replace('//downloads.ctfassets.net', '//images.ctfassets.net').replace('//images.ctfassets.net', '//philsassets.imgix.net')
  }
</script>

<style>
  img,
  video,
  object {
    width: 100%;
    max-width: 100%;
  }

  object {
    min-height: 66vh;
  }
</style>

{#if media.fields.file.contentType.startsWith('video/')}
<video src="{media.fields.file.url}" autoplay muted loop playsinline />
{:else if media.fields.file.contentType.endsWith('/pdf')}
<object data={media.fields.file.url} type="application/pdf">
<p>This browser does not support PDFs. Please download the PDF to view it: <a href={media.fields.file.url} target="_blank">Download PDF</a>.</p>
</object>
{:else}
<picture>
  {#if small}
<source srcSet="{cdn(media.fields.file.url)}?w=400{ar ? `&h=${Math.round(ar * 400)}&fit=fill` : ''}&fm=avif" type="image/avif" media="(max-width: 900px)" />
<source srcSet="{cdn(media.fields.file.url)}?w=400{ar ? `&h=${Math.round(ar * 400)}&fit=fill` : ''}" media="(max-width: 900px)" />
<source srcSet="{cdn(media.fields.file.url)}?w=600{ar ? `&h=${Math.round(ar * 600)}&fit=fill` : ''}&fm=avif" type="image/avif" media="(max-width: 1200px)" />
<source srcSet="{cdn(media.fields.file.url)}?w=600{ar ? `&h=${Math.round(ar * 600)}&fit=fill` : ''}" media="(max-width: 1200px)" />
<source srcSet="{cdn(media.fields.file.url)}?w=800{ar ? `&h=${Math.round(ar * 800)}&fit=fill` : ''}&fm=avif" type="image/avif" />
<img src="{cdn(media.fields.file.url)}?w=800{ar ? `&h=${Math.round(ar * 800)}&fit=fill` : ''}" alt="{media.fields.title} {media.fields.description}" loading={eager ? "eager" : "lazy"} />
  {:else}
<source srcSet="{cdn(media.fields.file.url)}?w=900{ar ? `&h=${Math.round(ar * 900)}&fit=fill` : ''}&fm=avif" type="image/avif" media="(max-width: 900px)" />
<source srcSet="{cdn(media.fields.file.url)}?w=900{ar ? `&h=${Math.round(ar * 900)}&fit=fill` : ''}" media="(max-width: 900px)" />
<source srcSet="{cdn(media.fields.file.url)}?w=1200{ar ? `&h=${Math.round(ar * 1200)}&fit=fill` : ''}&fm=avif" type="image/avif" media="(max-width: 1200px)" />
<source srcSet="{cdn(media.fields.file.url)}?w=1800{ar ? `&h=${Math.round(ar * 1800)}&fit=fill` : ''}&fm=avif" type="image/avif" />
<img style={ar && `aspect-ratio: 1800 / ${Math.round(ar * 1800)}`} src="{cdn(media.fields.file.url)}?w=1800{ar ? `&h=${Math.round(ar * 1800)}&fit=fill` : ''}" alt="{media.fields.title} {media.fields.description}" loading={eager ? "eager" : "lazy"} />
  {/if}
</picture>
{/if}

{#if !noDescription && media.fields.description}
<small>{media.fields.description}</small>
{/if}