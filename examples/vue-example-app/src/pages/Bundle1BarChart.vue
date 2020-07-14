<template>
  <div id="long-description">
    <h2>Bundle 1 – Bar Chart</h2>
    <p>
      This component is a horizontal bar chart showing the household composition for a selected area from the dialogue box above it. Selections are based on suburbs, postcodes, local government areas or regions as defined by the Australian Bureau of Statistics. The chart title is “Household composition”.
    </p>
    <p>
      The data is separated out by Family Households, Group of People and Single person, and shows the breakdown of these household composition by percentage. At the end of the data block in this chart the discrete percentage value for the data block is in bold. The same discrete percentage information and the specific household composition can be seen when you hover over the data block, the data block will change colour to highlight this ‘selection’. Clicking on the data blocks yields no actions or further information.
    </p>
    <p>
      The data has been sourced using the Australian Bureau of Statistics 2016 Census.
    </p>
    <p>
      To find this data use the QuickStats search tools to find the data and your area of interest: <a href="https://www.abs.gov.au/websitedbs/D3310114.nsf/Home/2016%20QuickStats">https://www.abs.gov.au/websitedbs/D3310114.nsf/Home/2016%20QuickStats</a>
    </p>
    <h3>Replicating the data</h3>
    <p>
      For this example we will be focussing on the Local Government Area of the City of Melbourne for the area of interest.
    </p>
    <p>
      Upon landing on the QuickStats page, scroll down to the “Search QuickStats” section.
    </p>
    <p>
      In the “Enter a location” dialogue box type in “Melbourne (C)” and select the LGA geography option in the drop down.
    </p>
    <p>
      For this chart only 2016 data was used, so leave the “2016” year in the drop down above the “GO” button.
    </p>
    <p>
      Click “GO” to move to the collated data.
    </p>
    <p>
      Scroll down to the “Dwellings – household composition” section. In the table here the breakdown by number of households as well as the percentage mix is detailed for our area of interest as well as for the State of Victoria and Australia as a whole.
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
