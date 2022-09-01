<template>
  <div id="long-description">
    <h2>Sample Site – Bar Chart</h2>
    <p>
      This component is a bar chart showing the quarterly residential property price index for Greater Melbourne since 2019. The chart title is “Residential Property Price Index for Greater Melbourne”.
    </p>
    <p>
      The data is separated out by Established houses and Attached dwellings, and shows the breakdown of these by the residential property price index value. At the end of the data block in this chart the discrete index value for the data block is in bold. The same discrete index value, the property type breakdown and the specific epoch can be seen when you hover over the data block, the data block will change colour to highlight this ‘selection’. Clicking on the data blocks yields no actions or further information, however clicking on the property type in the legend will filter said property type off the chart.
    </p>
    <p>
      The data has been sourced from the Australian Bureau of Statistics and is downloadable as a SDMX-JSON file for interpretation:
      <a href="https://api.data.abs.gov.au/data/RPPI/1.2+1.2GMEL.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2019">https://api.data.abs.gov.au/data/RPPI/1.2+1.2GMEL.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2019</a>
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
