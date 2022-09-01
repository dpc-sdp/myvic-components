<template>
  <div id="long-description">
    <h2>Sample Site - Pie Chart</h2>
    <p>
      This component is a pie chart showing the sources of Victoria’s population decrease for the current quarter. As of July 2020 this graph is showing predominately interstate departures and deaths. The chart title is “Population Clock for Victoria by Outgoing Sources”.
    </p>
    <p>
      The data is separated out by Births, Interstate Arrivals and Overseas Arrivals, with each representing a piece of the pie. The discrete value of the population decrease and the source can be seen when you hover over the pie slice, the pie slice will change colour to highlight this ‘selection’. Clicking on the chart area yields no actions or further information, however clicking on the source in the legend will filter said source off the chart.
    </p>
    <p>
      The data has been sourced from the Australian Bureau of Statistics and is downloadable as a SDMX-JSON file for interpretation:
      <a href="https://api.data.abs.gov.au/data/POPULATION_CLOCK/2+4+7.2.Q.NUM?startPeriod=2022-Q4&detail=Full&dimensionAtObservation=AllDimensions">https://api.data.abs.gov.au/data/POPULATION_CLOCK/2+4+7.2.Q.NUM?startPeriod=2022-Q4&detail=Full&dimensionAtObservation=AllDimensions</a>
    </p>
  </div>
</template>

<script>
  module.exports = {
    data: function() {
      return {};
    }
  };
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  #long-description {
    text-align: left;
    max-width: 1024px;
    margin: auto;
  }
</style>
