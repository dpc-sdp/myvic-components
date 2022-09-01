<template>
  <div id="long-description">
    <h2>Sample Site - Line Chart</h2>
    <p>
      This component is a horizontal line chart showing the number of short-term monthly overseas visitor arrivals and resident returns entering Australia since 2017. As of July 2020 this graph is showing a downward trend of visitor numbers since January 2020. The chart title is “Monthly Visitors to Australia”.
    </p>
    <p>
      The data is a single line with small circles pertaining to the data points. The discrete value of travellers and the corresponding epoch can be seen when you hover over the data point, the data point will be covered in a halo to highlight this ‘selection’.  Clicking on the chart yields no actions or further information.
    </p>
    <p>
      The data has been sourced from the Australian Bureau of Statistics and is downloadable as a SDMX-JSON file for interpretation:
      <a href="https://api.data.abs.gov.au/data/OAD_COUNTRY/06.TOT.10.M?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2017">https://api.data.abs.gov.au/data/OAD_COUNTRY/06.TOT.10.M?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2017</a>
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
