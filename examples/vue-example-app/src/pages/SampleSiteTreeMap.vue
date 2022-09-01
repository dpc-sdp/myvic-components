<template>
  <div id="long-description">
    <h2>Sample Site - Tree Map</h2>
    <p>
      This component is a tree map showing the variances in the consumer price index for a range of goods and services within Greater Melbourne for the current quarter. The chart title is “CPI change for a range of goods and services”.
    </p>
    <p>
      The data is separated out to food and non-alcoholic beverages, alcohol and tobacco, clothing and footwear, housing, furnishings, health, transport, communication, recreation, education and insurance and financial services and shows the breakdown of these goods and services with respect to their consumer price index value change. The discrete value of the consumer price index change and the source can be seen when you hover over the data block, the data block will change colour to highlight this ‘selection’. Clicking on the data blocks yields no actions or further information.
    </p>
    <p>
      The data has been sourced from the Australian Bureau of Statistics and is downloadable as a SDMX-JSON file for interpretation:
      <a href="https://api.data.abs.gov.au/data/CPI/2.20001+20006+20002+20003+20004+115486+20005+115488+115489+115493+126670.10.2.Q.NUM?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2022">https://api.data.abs.gov.au/data/CPI/2.20001+20006+20002+20003+20004+115486+20005+115488+115489+115493+126670.10.2.Q.NUM?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2022</a>
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
