 <!--
@component
This is your page!
-->
<script>
  // Import all the news furniture components
  import ArticleHeader from '$lib/components/Article/ArticleHeader.svelte';
  import ArticleBody from '$lib/components/Article/ArticleBody.svelte';
  import DropdownInput from '$lib/components/Forms/DropdownInput.svelte';
  import HeaderImage from '$lib/components/Media/HeaderImage.svelte';
  import MethodologyBox from '$lib/components/Article/MethodologyBox.svelte';

  // Get data from the load function
  let { data } = $props();

  // Create year options for the dropdown
  const yearOptions = $derived(
    data.dataByYear
      .filter((item) => item.year >= 2019 && item.year <= 2025)
      .map((item) => ({
        label: item.year.toString(),
        value: item.year.toString(),
      }))
  );

  // State for selections (initialize to latest year)
  let selectedYear = $state('2025');

  // Get the baseline (2018) data
  const baselineData = $derived(
    data.dataByYear.find((item) => item.year === 2018)
  );

  // Get the selected year data
  const selectedData = $derived(
    data.dataByYear.find((item) => item.year === parseInt(selectedYear))
  );

  // Create table data with all restaurants
  const tableData = $derived(
    selectedData && baselineData
      ? [
          {
            name: 'Chipotle',
            price2018: baselineData.avgChipotle,
            priceSelected: selectedData.avgChipotle,
          },
          {
            name: 'Cava',
            price2018: baselineData.avgCava,
            priceSelected: selectedData.avgCava,
          },
          {
            name: 'Sweetgreen',
            price2018: baselineData.avgSweetgreen,
            priceSelected: selectedData.avgSweetgreen,
          },
        ]
      : []
  );

  // Calculate percentage increases for each restaurant
  const restaurantIncreases = $derived(
    tableData.map((item) => {
      if (item.price2018 > 0) {
        return {
          ...item,
          increase: (
            ((item.priceSelected - item.price2018) / item.price2018) *
            100
          ).toFixed(1),
        };
      }
      return { ...item, increase: 0 };
    })
  );

  // Calculate average restaurant price increase
  const avgRestaurantIncrease = $derived(
    restaurantIncreases.length > 0
      ? (
          restaurantIncreases.reduce(
            (sum, item) => sum + parseFloat(item.increase),
            0
          ) / restaurantIncreases.length
        ).toFixed(1)
      : 0
  );

  // Article metadata
  let headline = '"Slop bowls" soar in price, outpacing income and inflation';
  let byline = 'Irene Adeline Milanez';
  let pubDate = '2026-01-31';
</script>

<!-- This sets the page title in the browser tab -->
<svelte:head>
  <title>{headline} | NYCity News Service</title>
  <meta
    name="description"
    content="At the Craig Newmark Graduate School of Journalism at the City University of New York, change is in our DNA. That comes of being born in 2006, as the digital revolution was transforming our profession in ways none of us could have imagined."
  />
</svelte:head>

<div class="container">
  <ArticleHeader
    category="Economy"
    {headline}
    subhead="Some fast casual restaurants have raised prices by over 50%, since 2018."
    {byline}
    {pubDate}
  />
</div>

<!-- Your page content goes here -->
<HeaderImage
  src="bowl.jpeg"
  alt="New York City skyline at sunrise"
  height="100vh"
  caption="Consumers strained by rising prices and economic uncertainty are cutting back on takeout lunches at fast casual chains like Chipotle, Sweetgreen and Cava."
  credit="Photo Illustration / Irene Adeline Milanez, Photo / Loren Castillo"
></HeaderImage>

<div class="container">
  <!-- Article Body: The main story text with proper typography -->
  <ArticleBody>
    <p class="dropcap">
      Viresh Patel was such a devoted Chipotle customer, that even finding a
      strip of plastic packaging in his burrito bowl didn’t stop him from
      getting lunch there three to four times a week.
    </p>
    <p>
      For Patel, a 24-year-old assistant recreation coordination, Chipotle has
      been a lunch staple for him since high school. His nearest branch was a
      little over a 10 minute walk from his work at Sunnyvale City Hall, where
      he would order a chicken burrito or bowl with beans, fajita veggies and
      corn salsa, hold the lettuce.
    </p>
    <p>
      Lately, aggressive post-pandemic price increases have done what Patel once
      thought was impossible: keep him away from Chipotle.
    </p>
    <p>
      “You add tax, then you add whatever sides you might get,” Patel said. “The
      premium stuff like chess and guacamole cost extra dollars, so it just all
      adds up.”
    </p>
    <p>
      Consumers strained by rising prices and economic uncertainty are cutting
      back on takeout lunches, particularly at fast casual chains like Chipotle,
      Sweetgreen and Cava. Gen Z in particular appears to be pulling back.
      Spending growth at limited-service restaurants among younger consumers has
      dropped sharply, down 19 percentage points over the past two years,
      compared with an 11- to 12-point decline for older groups, according to a
      McKinsey
      <a
        href="https://www.mckinsey.com/industries/retail/our-insights/what-us-consumers-want-from-restaurants-in-2026"
        target="_blank"
        rel="noopener noreferrer"
      >
        report.
      </a>
    </p>

    <!-- Year Selector and Price Comparison Table -->
    <div class="metrics-section">
      <h2>How much more expensive was your slop bowl?</h2>

      <div class="dropdown-row">
        <DropdownInput
          options={yearOptions}
          value={selectedYear}
          label="Choose a year"
          placeholder="Choose a year…"
          onchange={(e) => (selectedYear = e.target.value)}
        />
      </div>

      {#if restaurantIncreases.length > 0}
        <table class="price-table">
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>2018</th>
              <th>{selectedYear}</th>
              <th>Increase</th>
            </tr>
          </thead>
          <tbody>
            {#each restaurantIncreases as item (item.name)}
              <tr>
                <td>{item.name}</td>
                <td>${item.price2018.toFixed(2)}</td>
                <td>${item.priceSelected.toFixed(2)}</td>
                <td class="increase-cell">{item.increase}%</td>
              </tr>
            {/each}
          </tbody>
        </table>

        <div class="summary-text">
          <p>
            Meanwhile, overall restaurant prices rose <strong>{avgRestaurantIncrease}%</strong> and the median household income rose
            <strong>{selectedData.houseZeroIndex.toFixed(1)}%</strong>.
          </p>
        </div>
      {/if}
    </div>

    <p>
      Fast casual restaurants sit between fast food and full-service dining,
      with higher ingredient quality and more labor-intensive operations than
      quick-service chains. That leaves them vulnerable to rising costs without
      the pricing flexibility or scale advantages of fast food chains, like
      McDonalds. In the past year, Sweetgreen stock has plummeted by 55.24% and
      Chipotle stock fell by 35.99%.
    </p>
    <p>
      U.S. consumers, already strained by post-pandemic inflation, high prices
      from tariffs and a weakening labor market, continue to be concerned about
      affordability.
    </p>
    <p>
      Since the U.S. attacked Iran in February, oil prices have climbed above
      $100 a barrel for the first time in more than a year. While it’s too early
      to see the impact of the war on food prices, the shock is already
      affecting consumer confidence.
    </p>
    <p>
      “When food prices go up or consumer confidence goes down, people make
      substitutions,” said Richard Volpe, a professor of agribusiness at Cal
      Poly San Luis Obispo. “The first substitution that they make is away from
      food service and towards the supermarket.”
    </p>
    <p>
      Patel now prepares his own version of a burrito bowl at home in response
      to his increased monthly cost of living. He pays $750 in rent for a space
      shared with his partner, along with a $1200 car payment and insurance for
      a recently purchased 2024 Ford Mustang. Gas prices have surged in recent
      weeks, rising by roughly a dollar per gallon in the span of a month to
      about $5 for regular fuel and premium grades approaching $7 or higher at
      some stations in his city.
    </p>
    <p>
      When Patel does eat out for lunch, he goes for cheaper options, such as a
      $5 chicken and rice bowl from El Pollo Loco.
    </p>
    <p>
      “I would prefer to keep my bowls under $10 but realistically it's, it's
      always gonna be $11 or $12 at Chipotle,” Patel said. “But I'm not paying
      $15 for a bowl.”
    </p>
    <p>
      Trading down and substitutions are common consumer responses to rising
      prices across income groups, but not evenly. Declines in sales reveal the
      K-shaped direction of the U.S. economy, where wealthier Americans have
      increased their spending thanks to stock market gains, while lower-income
      households are struggling with the high cost of living and wages that
      aren’t keeping pace.
    </p>

    <div class="chart-wrapper">
      <iframe title="Fast Casual Prices Outpace Income and Inflation" aria-label="Line chart" id="datawrapper-chart-iipPq" 
      src="https://datawrapper.dwcdn.net/iipPq/3/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="537" data-external="1"></iframe><script type="text/javascript">window.addEventListener("message",function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r,i=0;r=e[i];i++)if(r.contentWindow===a.source){var d=a.data["datawrapper-height"][t]+"px";r.style.height=d}}});</script>
      </div>

    <p>
      Food prices have remained elevated with the average transaction price at
      Chipotle increasing by 50.1%, Cava by 25.4% and Sweetgreen by 70.8%, since
      2018. Overall, the consumer price index for restaurant and takeout meals
      rose about 38.6% over the past eight years, driven by higher labor, rent
      and ingredient costs, according to the U.S. Bureau of Labor Statistics.
      Yet, in the same time period, median household income only grew by 9.6%.
    </p>
    <p>
      Beef and other staples have seen particularly sharp increases in recent
      months. While many fast food chains now have automated ordering and
      payment, fast casual restaurants still rely on workers for food
      preparation and service.
    </p>
    <p>
      Fast casual chains are not only hit by higher operating costs, but also a
      shrinking customer base. The shift toward remote and hybrid work has
      reduced foot traffic in many cities like D.C. and San Francisco.
    </p>
    <p>
      Companies are responding with promotions and lower-priced menu items aimed
      at retaining budget-conscious consumers.
    </p>
    <p>
      “It’s rare to say, ‘Okay, let’s go Chipotle for dinner,’ and you
      definitely would not go there for breakfast, so it has to own lunch,” said
      Russell W. Zwanka, director of the Food Marketing Program at Western
      Michigan University. “If it doesn’t own lunch affordably it’s going to
      lose out.”
    </p>
    <p>
      Kristy Nguyen, a 25-year-old shift lead at Aldi in Fullerton, Calif.,
      brings lunch to work most days. She prepares meals like honey garlic pork
      over rice or chicken pasta with broccoli, spending roughly $150 a month on
      groceries for lunch.
    </p>
    <p>
      As a new homeowner and mother with a $700 monthly mortgage, Nguyen said
      she tracks her spending closely and prioritizes saving for emergencies.
    </p>
    <p>
      “I was insane about tracking my expenses, packing my lunches and saving
      money,” she said. “It really helped me to be able to save enough money to
      afford a down payment.”
    </p>
    <p>
      For many young Americans, financial strains extend beyond rising lunch
      prices. New college graduates are entering a slowing job market with fewer
      entry-level positions, while carrying student debt and high costs of
      living and rent.
    </p>
    <p>
      Stephen Zagor, professor at Columbia Business School, said many people
      feel uncomfortable by the current economic climate because of rising
      prices, U.S. involvement in Iran and advancements in AI disrupting the
      labor market.
    </p>
    <p>
      Retail trade sales were down 0.2 percent from December 2025, according to
      the latest data from the Census Bureau, suggesting concerns over
      affordability are weakening consumer spending. Consumer sentiment sits at
      53.3%, its lowest level since December 2025, according to the University
      of Michigan.
    </p>
    <p>
      “People are feeling threatened. Their jobs are feeling threatened,” Zagor
      said. “There are people that have a mindset that says, ‘I shouldn't be
      very liberal in spending. I need to maintain my conservative spending.’ ”
    </p>
  </ArticleBody>

  <MethodologyBox>
    <p>
      This analysis compared increases in fast-casual restaurant average
      transactions with broader economic trends since 2018. Using Python and
      pandas, data on average menu prices from Chipotle, Cava, and Sweetgreen
      were compared against Consumer Price Index (CPI) data for food away from
      home and median household income data. To make the datasets comparable,
      each variable was converted into a zero-index measure using 2018 as the
      baseline. Percentage change from 2018 was then calculated to show how
      restaurant prices, inflation and income changed over time relative to one
      another.
    </p>
    <ul>
      <li>
        <a
          href="https://data.bls.gov/pdq/SurveyOutputServlet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consumer Price Index, Food away from home
        </a>
      </li>
      <li>
        <a
          href="https://fred.stlouisfed.org/graph/fredgraph.csv?bgcolor=%23ebf3fb&chart_type=line&drp=0&fo=open%20sans&graph_bgcolor=%23ffffff&height=450&mode=fred&recession_bars=on&txtcolor=%23444444&ts=12&tts=12&width=1320&nt=0&thu=0&trc=0&show_legend=yes&show_axis_titles=yes&show_tooltip=yes&id=MEHOINUSA672N&scale=left&cosd=2018-01-01&coed=2024-01-01&line_color=%230073e6&link_values=false&line_style=solid&mark_type=none&mw=3&lw=3&ost=-99999&oet=99999&mma=0&fml=a&fq=Annual&fam=avg&fgst=lin&fgsnd=2020-02-01&line_index=1&transformation=lin&vintage_date=2026-05-17&revision_date=2026-05-17&nd=1984-01-01"
          target="_blank"
          rel="noopener noreferrer"
        >
          Median Household Income,
        </a>
        <a
          href="https://seekingalpha.com/article/4837289-median-household-income-september-2025"
          target="_blank"
          rel="noopener noreferrer"
        >
          2025 estimate
        </a>
      </li>
      <li>
        <a
          href="https://github.com/ireneadelinemilanez/menuprices_analysis/tree/main/1_DATA"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chipotle, Cava and Sweetgreen Average Transactions (Annual), Bloomberg
          Second Measure
        </a>
      </li>
      <li>
        <a
          href="https://github.com/ireneadelinemilanez/menuprices_analysis/blob/main/Combined_analysis3.ipynb"
          target="_blank"
          rel="noopener noreferrer"
        >
          Analysis Github Repository
        </a>
      </li>
    </ul>
  </MethodologyBox>
</div>

<style lang="scss">
  @use '$lib/styles' as *;

  .chart-wrapper {
  border: 2pt solid var(--color-accent);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  margin: var(--spacing-lg) 0;
  background: white;
}


  .metrics-section {
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-sm) var(--spacing-md) var(--spacing-md);
  border: 2pt solid var(--color-accent);
  border-radius: var(--border-radius-md);

  h2 {
    margin-top: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
    color: var(--color-dark);
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    line-height: 1.2;
  }
}

  .dropdown-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }

  .price-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: var(--spacing-lg);
    font-size: var(--font-size-lg);
    font-family: var(--font-sans);

  thead {
    background-color: var(--color-accent);
    color: white;
  }

  th,
  td {
    padding: var(--spacing-sm) var(--spacing-md);
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }

  th {
    font-weight: var(--font-weight-bold);
  }

  .increase-cell {
    color: var(--color-accent);
  }

  tbody tr {
    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }

    &:last-child td {
      border-bottom: none;
    }
  }
}
  .summary-text {
    font-size: var(--font-size-lg);
    line-height: 1.6;
    color: var(--color-dark);

    p {
      margin: 0;
    }

    strong {
      color: var(--color-accent);
      font-family: var(--font-sans);
      font-weight: var(--font-weight-normal);
    }
  }

  @include mobile {
    .metrics-section {
      padding: var(--spacing-md);
    }

    .price-table {
      font-size: var(--font-size-sm);

      th,
      td {
        padding: var(--spacing-xs) var(--spacing-sm);
      }
    }

    .summary-text {
      font-size: var(--font-size-base);
    }
  }
</style>
