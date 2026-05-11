<!--
@component
This is your page!
-->
<script>
  // Import all the news furniture components
  import ArticleHeader from '$lib/components/Article/ArticleHeader.svelte';
  import ArticleBody from '$lib/components/Article/ArticleBody.svelte';
  import Blockquote from '$lib/components/Article/Blockquote.svelte';
  import Image from '$lib/components/Media/Image.svelte';
  import RelatedLinks from '$lib/components/Article/RelatedLinks.svelte';
  import DropdownInput from '$lib/components/Forms/DropdownInput.svelte';
  import BigNumber from '$lib/components/Data/BigNumber.svelte';
  import Dashboard from '$lib/components/Data/Dashboard.svelte';

  // Get data from the load function
  let { data } = $props();

  // Create year options for the dropdown
  const yearOptions = $derived(
    data.dataByYear.map((item) => ({
      label: item.year.toString(),
      value: item.year.toString(),
    }))
  );

  // State for year selection (initialize to latest year)
  let selectedYear = $state('2025');

  // Get the selected year data
  const selectedData = $derived(
    data.dataByYear.find((item) => item.year === parseInt(selectedYear))
  );

  // Article metadata
  let headline = 'Slop bowls soar in price, outpacing income and inflation';
  let byline = 'Irene Adeline Milanez';
  let pubDate = '2026-01-31';

  // Related stories
  const relatedStories = [
    {
      headline:
        "How America's top news organizations escape rigid publishing systems to design beautiful data-driven stories on deadline.",
      href: 'https://palewi.re/docs/coding-the-news/',
    },
    {
      headline:
        'How to install, configure and use Visual Studio Code, GitHub and Copilot',
      href: 'https://palewi.re/docs/coding-the-news/scripts/week-1/',
    },
    {
      headline: 'How to publish a website with Node.JS and GitHub Actions',
      href: 'https://palewi.re/docs/coding-the-news/scripts/week-2/',
    },
  ];
</script>

<!-- This sets the page title in the browser tab -->
<svelte:head>
  <title>{headline} | NYCity News Service</title>
  <meta
    name="description"
    content="At the Craig Newmark Graduate School of Journalism at the City University of New York, change is in our DNA. That comes of being born in 2006, as the digital revolution was transforming our profession in ways none of us could have imagined."
  />
</svelte:head>

<!-- Your page content goes here -->
<div class="container">
  <!-- Article Header: Headline, byline, and publication date -->
  <ArticleHeader {headline} {byline} {pubDate} />  

  <!-- Year Selector and Metrics Dashboard -->
  <div class="metrics-section">
    <h2>Cost of Living Comparison</h2>
    <DropdownInput
      options={yearOptions}
      value={selectedYear}
      label="Select Year"
      placeholder="Choose a year…"
      onchange={(e) => (selectedYear = e.target.value)}
    />

    {#if selectedData}
      <Dashboard>
        <BigNumber
          number={selectedData.cpiZeroIndex.toFixed(2) + '%'}
          label="CPI Away From Home"
          footnote="% change from 2018"
        />
        <BigNumber
          number={selectedData.houseZeroIndex.toFixed(2) + '%'}
          label="Median Household Income"
          footnote="% change from 2018"
        />
        <BigNumber
          number={selectedData.chiptoleZeroIndex.toFixed(2) + '%'}
          label="Chipotle Average Price"
          footnote="% change from 2018"
        />
      </Dashboard>
    {/if}
  </div>

  <!-- Article Body: The main story text with proper typography -->
  <ArticleBody>
    <p class="dropcap">
      Viresh Patel was such a devoted Chipotle customer, that even finding a strip of plastic packaging in his burrito bowl didn’t stop him from getting lunch there three to four times a week. </p>
    <p> For Patel, a 24-year-old assistant recreation coordination, Chipotle has been a lunch staple for him since high school. His nearest branch was a little over a 10 minute walk from his work at Sunnyvale City Hall, where he would order a chicken burrito or bowl with beans, fajita veggies and corn salsa, hold the lettuce. 
    </p>
    <p>Lately though, aggressive post-pandemic price increases have done what Patel once thought was impossible: keep him away from Chipotle.
    </p>
    <p>“You add tax, then you add whatever sides you might get,” Patel said. “The premium stuff like chess and guacamole cost extra dollars, so it just all adds up.”
    </p>
    <p>Consumers strained by rising prices and economic uncertainty are cutting back on takeout lunches, particularly at fast casual chains like Chipotle, Sweetgreen and Cava. Gen Z  in particular appears to be pulling back. Spending growth at limited-service restaurants among younger consumers has dropped sharply, down 19 percentage points over the past two years, compared with an 11- to 12-point decline for older groups, according to a McKinsey report.
    </p>
    <p>Fast casual restaurants sit between fast food and full-service dining, with higher ingredient quality and more labor-intensive operations than quick-service chains. That leaves them vulnerable to rising costs without the pricing flexibility or scale advantages of fast food chains, like McDonalds. In the past year, Sweetgreen stock has plummeted by 55.24% and Chipotle stock fell by 35.99%.
    </p>
    <p>U.S. consumers, already strained by post-pandemic inflation, high prices from tariffs and a weakening labor market, continue to be concerned about affordability.
    </p>
    <p>Since the U.S. attacked Iran on Feb. 28, oil prices have climbed above $100 a barrel for the first time in more than a year. While it’s too early to see the impact of the war on food prices, the shock is already affecting consumer confidence. 
    </p>
    <p>“When food prices go up or consumer confidence goes down, people make substitutions,” said Richard Volpe, a professor of agribusiness at Cal Poly San Luis Obispo. “The first substitution that they make is away from food service and towards the supermarket.” 
    </p>
    <p>Patel now prepares his own version of a burrito bowl at home in response to his increased monthly cost of living. He pays $750 in rent for a space shared with his partner, along with a $1200 car payment and insurance for a recently purchased 2024 Ford Mustang. Gas prices have surged in recent weeks, rising by roughly a dollar per gallon in the span of a month to about $5 for regular fuel and premium grades approaching $7 or higher at some stations in his city. 
    </p>
    <p>When Patel does eat out for lunch, he goes for cheaper options, such as a $5 chicken and rice bowl from El Pollo Loco.
    </p>
    <p>“I would prefer to keep my bowls under $10 but realistically it's, it's always gonna be $11 or $12 at Chipotle,” Patel said. “But I'm not paying $15 for a bowl.”
    </p>
    <p>Trading down and substitutions are common consumer responses to rising prices across income groups, but not evenly. Declines in sales reveal the K-shaped direction of the U.S. economy, where wealthier Americans have increased their spending thanks to stock market gains, while lower-income households are struggling with the high cost of living and wages that aren’t keeping pace.
    </p>
    <Image
    src="/line-chart.png"
    alt="The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan."
    caption="The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan."
    credit="Craig Newmark Graduate School of Journalism"
    />
    <p>Food prices have remained elevated with the average transaction price at Chipotle increasing by 50% since 2018. Overall, the consumer price index for restaurant and takeout meals rose about 38.6% over the past eight years, driven by higher labor, rent and ingredient costs, according to the U.S. Bureau of Labor Statistics. Yet, in the same time period, median household income only grew by 9.6%.
    </p>
    <p>Beef and other staples have seen particularly sharp increases in recent months. While many fast food chains now have automated ordering and payment, fast casual restaurants still rely on workers for food preparation and service. 
    </p>
    <p>Fast casual chains are not only hit by higher operating costs, but also a shrinking customer base. The shift toward remote and hybrid work has reduced foot traffic in many cities like D.C. and San Francisco.
    </p>
    <p>Companies are responding with promotions and lower-priced menu items aimed at retaining budget-conscious consumers.
    </p>
    <p>“It’s rare to say, ‘Okay, let’s go Chipotle for dinner,’ and you definitely would not go there for breakfast, so it has to own lunch,” said Russell W. Zwanka, director of the Food Marketing Program at Western Michigan University. “If it doesn’t own lunch affordably it’s going to lose out.”
    </p>
    <p>Kristy Nguyen, a 25-year-old shift lead at Aldi in Fullerton, Calif., brings lunch to work most days. She prepares meals like honey garlic pork over rice or chicken pasta with broccoli, spending roughly $150 a month on groceries for lunch.
    </p>
    <p>As a new homeowner and mother with a $700 monthly mortgage, Nguyen said she tracks her spending closely and prioritizes saving for emergencies.
    </p>
    <p>“I was insane about tracking my expenses, packing my lunches and saving money,” she said. “It really helped me to be able to save enough money to afford a down payment.”
    </p>
    <p>For many young Americans, financial strains extend beyond rising lunch prices. New college graduates are entering a slowing job market with fewer entry-level positions, while carrying student debt and high costs of living and rent.  
    </p>
    <p>Stephen Zagor, professor at Columbia Business School, said many people feel uncomfortable by the current economic climate because of rising prices, U.S. involvement in Iran and advancements in AI disrupting the labor market. 
    </p>
    <p>Retail trade sales were down 0.2 percent from December 2025, according to the latest data from the Census Bureau, suggesting concerns over affordability are weakening consumer spending. Consumer sentiment sits at 53.3%, its lowest level since December 2025, according to the University of Michigan.
    </p>
    <p>“People are feeling threatened. Their jobs are feeling threatened,” Zagor said. “There are people that have a mindset that says, ‘I shouldn't be very liberal in spending. I need to maintain my conservative spending.’ ”
    </p>
  </ArticleBody>

  

</div>

<style lang="scss">
  @use '$lib/styles' as *;

  .metrics-section {
    margin: var(--spacing-lg) 0;
    padding: var(--spacing-lg);
    background-color: var(--color-light-gray);
    border-radius: var(--border-radius-md);

    h2 {
      margin-bottom: var(--spacing-md);
      color: var(--color-dark);
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
    }
  }

  @include mobile {
    .metrics-section {
      padding: var(--spacing-md);
    }
  }
</style>
