<!--
@component
HeaderImage.svelte — Full-Width Hero/Header Image Component

Displays a full-screen-width header image that maintains its size
while cropping responsively instead of shrinking/distorting.

Ideal for article hero images, landing banners, and feature headers.

USAGE EXAMPLE:
<HeaderImage
  src="/photos/city-skyline.jpg"
  alt="New York City skyline at sunrise"
  height="100vh"
  overlay={true}
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
    overlay = false, // Optional dark overlay
  } = $props();

  // Resolve local images using asset()
  const resolvedSrc = $derived(
    src.startsWith('/') && !src.startsWith('//') ? asset(src) : src
  );
</script>

<section
  class="header-image"
  style={`height: ${height};`}
>
  <img
    src={resolvedSrc}
    {alt}
    class="background-image"
  />

  {#if overlay}
    <div class="overlay"></div>
  {/if}

  <div class="content">
    <slot />
  </div>
</section>

<style lang="scss">
  @use '../../styles' as *;

  .header-image {
    position: relative;
    width: 100vw;
    overflow: hidden;

    // Makes image stretch edge-to-edge
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
  }

  .background-image {
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;

    // Prevents distortion and crops image instead
    object-fit: cover;
    object-position: center;

    display: block;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: var(--spacing-lg);
    text-align: center;
    color: white;
  }
</style>