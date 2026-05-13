<!--
@component
HeaderImage.svelte — Full-Width Hero/Header Image Component

Displays a full-screen-width header image that maintains its size
while cropping responsively instead of shrinking/distorting.

Ideal for article hero images, landing banners, and feature headers.

USAGE EXAMPLE:
<HeaderImage
  src="/images/city-hall.jpg"
  alt="City Hall building at sunset"
  caption="City Hall, where the budget vote took place Tuesday evening."
  credit="Jane Smith / The Daily News"
>
  <h1>Housing Costs Continue to Rise</h1>
</HeaderImage>
-->

<script>
  import { asset } from '$app/paths';

  let {
    src, // Required: Image source URL
    alt, // Required: Alt text for accessibility
    height = '100vh', // Height of the header section
    caption = '', // Optional: Caption text below image
    credit = '', // Optional: Photo credit
  } = $props();

  // Resolve local images using asset()
  const resolvedSrc = $derived(
    src.startsWith('/') && !src.startsWith('//') ? asset(src) : src
  );
</script>

<section class="header-wrapper">
  <div
    class="header-image"
    style={`height: ${height};`}
  >
    <img
      src={resolvedSrc}
      {alt}
      class="background-image"
    />
  </div>

  {#if caption || credit}
    <figcaption class="caption-container">
      {#if caption}
        <span class="caption">{caption}</span>
      {/if}

      {#if credit}
        <span class="credit">{credit}</span>
      {/if}
    </figcaption>
  {/if}
</section>

 <style lang="scss">
  @use '../../styles' as *;

  .header-wrapper {
    width: 100%;
    margin-bottom: var(--spacing-2xl);
  }

  .header-image {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .caption-container {
    width: 100%;
    max-width: var(--max-width-content);

    margin: var(--spacing-sm) auto 0 auto;

    padding: 0 var(--spacing-lg);

    display: flex;
    flex-direction: column;
    gap: 0.15rem;

    box-sizing: border-box;
  }

  .caption {
    font-size: var(--font-size-sm);
    line-height: var(--leading-caption);
    color: var(--color-text);
  }

  .credit {
    font-size: var(--font-size-xs);
    color: var(--color-medium-gray);
    font-style: italic;
  }
</style>