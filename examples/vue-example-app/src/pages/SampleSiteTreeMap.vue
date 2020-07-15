<template>
  <div id="long-description">
    <h2>Sample Site - Tree Map</h2>
    <p>
      This component is a tree map showing the variances in the consumer price index a range of goods and services within Greater Melbourne for the current quarter, this is a live data feed. As of July 2020 this map is evenly divided with smaller increases for Domestic and household services, and Housing. The chart title is “CPI for a range of goods and services”.
    </p>
    <p>
      The data is separated out by All group CPI, Beer, Wine, and Spirits, and shows the breakdown of these goods and services with respect to their consumer price index value. The discrete value of the consumer price index and the source can be seen when you hover over the data block, the data block will change colour to highlight this ‘selection’. Clicking on the data blocks yields no actions or further information.
    </p>
    <p>
      The data has been sourced from the Australian Bureau of Statistics and is downloadable as a SDMX-JSON file for interpretation:
      <a href="http://stat.data.abs.gov.au/sdmx-json/data/CPI/1.2.10001+40089+40088+40087+30027.10.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020">http://stat.data.abs.gov.au/sdmx-json/data/CPI/1.2.20001+20002+20003+97565.10+20.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020</a>
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
