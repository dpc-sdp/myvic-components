<template>
  <div id="long-description">
    <h2>Bundle 3 – Bar Chart</h2>
    <p>
      This component is a horizontal bar chart showing a range of statistical breakdowns (based on the selection of the data items above), for the local government area of Melbourne. There are four selectable statistical breakdowns:
    </p>
    <p>
      Weekly personal income, where the data is separated out by ranges of income (Negative/Nil, $1-$299, $300-$399, $400-$799, $800-$999, $1,000-$1,249, $1,250-$1499, $1,500-$1,999 and $2000 plus) and shows the breakdown of these income ranges by percentage for the local government area. At the end of the data block in this chart the discrete percentage value for the data block is in bold. The same discrete percentage information and the specific income range can be seen when you hover over the data block, the data block will change colour to highlight this ‘selection’.  Clicking on the data blocks yields no actions or further information. The chart title is “Weekly personal income”.
    </p>
    <p>
      Weekly personal income between 2011 and 2016, where the data is separated out by ranges of income (Negative/Nil, $1-$299, $300-$399, $400-$799, $800-$999, $1,000-$1,249, $1,250-$1499, $1,500-$1,999 and $2000 plus) and shows the breakdown of these income ranges by percentage for the local government area. In the darker colour the 2011 data is shown and in the lighter colour the 2016 data is shown. At the end of the data block in this chart the discrete percentage value for the data block is in bold. The same discrete percentage information, the specific income range and census year can be seen when you hover over the data block, the data block will change colour to highlight this ‘selection’.  Clicking on the data blocks yields no actions or further information, however clicking on the year in the legend will filter said year off the chart. The chart title is “Weekly personal income between 2011 and 2016”.
    </p>
    <p>
      Weekly household income, where the data is separated out by ranges of income (Negative/Nil, $1-$299, $300-$399, $400-$799, $800-$999, $1,000-$1,249, $1,250-$1499, $1,500-$1,999 and $2000 plus) and shows the breakdown of these income ranges by percentage for the local government area. At the end of the data block in this chart the discrete percentage value for the data block is in bold. The same discrete percentage information and the specific income range can be seen when you hover over the data block, the data block will change colour to highlight this ‘selection’.  Clicking on the data blocks yields no actions or further information. The chart title is “Weekly household income”.
    </p>
    <p>
      Weekly household income between 2011 and 2016, where the data is separated out by ranges of income (Negative/Nil, $1-$299, $300-$399, $400-$799, $800-$999, $1,000-$1,249, $1,250-$1499, $1,500-$1,999 and $2000 plus) and shows the breakdown of these income ranges by percentage for the local government area. In the darker colour the 2011 data is shown and in the lighter colour the 2016 data is shown. At the end of the data block in this chart the discrete percentage value for the data block is in bold. The same discrete percentage information, the specific income range and census year can be seen when you hover over the data block, the data block will change colour to highlight this ‘selection’.  Clicking on the data blocks yields no actions or further information, however clicking on the year in the legend will filter said year off the chart. The chart title is “Weekly household income between 2011 and 2016”.
    </p>
    <p>
      The data has been sourced using the Australian Bureau of Statistics 2011 and 2016 Census.
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
      For this chart both 2011 and 2016 data was used, so the first data collection will be for 2011 and the second for 2016. Select “2011” from the drop down above the “GO” button to select 2011, then repeat for 2016.
    </p>
    <p>
      Click “GO” to move to the collated data.
    </p>
    <p>
      Scroll down to the “Median weekly incomes” section. In the table here the breakdown of the median personal and household weekly incomes are listed.
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
