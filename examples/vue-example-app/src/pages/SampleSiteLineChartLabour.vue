<template>
  <div id="long-description">
    <h2>Sample Site - Line Chart</h2>
    <p>
      This component is a horizontal line chart showing the monthly Victorian labour force over the age of 15 since 2016, this is a live data feed.  As of July 2020 this graph is showing a downward trend of the labour force since February 2020. The chart title is “Labour Force by Sex”.
    </p>
    <p>
      The data is separated out by the male and female labour force with one line for the male cohort and another for the female. The discrete value of the labour force and the corresponding epoch can be seen when you hover over the data point, the data point for all epochs will be covered in a halo to highlight this ‘selection’. Clicking on the chart area yields no actions or further information, however clicking on the sex (male or female) in the legend will filter said sex off the chart.
    </p>
    <p>
      The data has been sourced from the Australian Bureau of Statistics and is downloadable as a SDMX-JSON file for interpretation:
      <a href="http://stat.data.abs.gov.au/sdmx-json/data/LF/2.6.1+2.1599.10.M/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2017">http://stat.data.abs.gov.au/sdmx-json/data/LF/2.6.1+2.1599.10.M/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2017</a>
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
