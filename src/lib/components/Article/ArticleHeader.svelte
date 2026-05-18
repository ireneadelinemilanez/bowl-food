<!--
@component
ArticleHeader.svelte — NYCity News Service Style Article Header

Displays the headline and metadata line with icons in the NYCity style:
- Optional kicker (eyebrow label) above the headline
- Large serif headline (via Headline subcomponent)
- Bordered metadata box with date (via Pubdate) and authors (via Byline)

USAGE EXAMPLE:
<ArticleHeader
  headline="City Council Approves New Budget"
  kicker="City Hall"
  byline="Jane Smith, John Doe"
  pubDate="2024-01-15"
/>
-->
<script>
  import Kicker from './Kicker.svelte';
  import Headline from './Headline.svelte';
  import Byline from './Byline.svelte';
  import Pubdate from './Pubdate.svelte';

  let {
    category = '', // NEW: Topic/category label
    headline, // Required: The main title of the article
    subhead = '', // NEW
    kicker = '', // Optional: Eyebrow label rendered above the headline
    byline = '', // Optional: The author's name(s)
    pubDate = '', // Optional: Publication date in YYYY-MM-DD format
  } = $props();
</script>

<header class="article-header">
  {#if category}
    <div class="category">
      {category}
    </div>
  {/if}
  <Headline text={headline} />

  {#if subhead}
    <p class="subhead">{subhead}</p>
  {/if}

  <Kicker text={kicker} />

  {#if byline || pubDate}
    <div class="meta">
      {#if byline}
        <div class="meta-item meta-byline">
          <svg
            class="meta-icon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
            <circle
              cx="12"
              cy="7"
              r="4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          <Byline {byline} />
        </div>
      {/if}

      {#if pubDate}
        <div class="meta-item meta-date">
          <svg
            class="meta-icon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M12 6v6l4 2"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <Pubdate date={pubDate} />
        </div>
      {/if}
    </div>
  {/if}
</header>

<style lang="scss">
  @use '../../styles' as *;

  .article-header {
    margin-bottom: var(--spacing-xs);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .category {
    display: inline-block;

    margin-bottom: var(--spacing-sm);
    padding: 0.35rem 0.75rem;

    background: black;
    color: white;

    font-family: var(--font-family-sans);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);

    text-transform: uppercase;
    letter-spacing: 0.08em;
    line-height: 1;

    border-radius: 2px;
  }

  .meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .meta-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);
  }

  .meta-icon {
    color: var(--color-dark);
    flex-shrink: 0;
  }

  /* Byline styling */
  .meta-byline :global(.byline) {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-dark);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
    margin: 0;
    text-align: center;
  }

  /* Pubdate styling */
  .meta-date :global(.pubdate) {
    font-size: var(--font-size-xs);
    color: var(--color-medium-gray);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
    margin: 0;
    text-align: center;
  }

  .subhead {
    max-width: 36rem;
    margin: var(--spacing-sm) 0 var(--spacing-sm);

    font-family: var(--font-serif);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-normal);
    line-height: var(--leading-relaxed);

    color: var(--color-dark);
    text-align: center;
  }
</style>
