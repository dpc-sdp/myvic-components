<template>
  <div id="long-description">
    <h2>Bundle 1 – Bar Chart</h2>
    <p>
      This component is a map showing a range of statistical breakdowns (based on the selection of the data items above), for local government areas of Melbourne. There are four selectable statistical breakdowns:
    </p>
    <p>
      Weekly personal income, where the map shows the LGAs with the greater median personal income per week as a darker colour and the lesser as a lighter colour. There is a legend showing the upper and lower bounds of the values being shown, these are $1,087 and $452, respectively.
    </p>
    <p>
      Weekly personal income between 2011 and 2016, where the map shows the LGAs with the greater increase in median personal income per week between the two epochs as a darker colour and the lesser as a lighter colour. There is a legend showing the upper and lower bounds of the values being shown, these are 23.87% and -9.70%, respectively.
    </p>
    <p>
      Weekly household income, where the map shows the LGAs with the greater median household income per week as a darker colour and the lesser as a lighter colour. There is a legend showing the upper and lower bounds of the values being shown, these are $2,145 and $775, respectively.
    </p>
    <p>
      Weekly household income between 2011 and 2016, where the map shows the LGAs with the greater increase in median household income per week between the two epochs as a darker colour and the lesser as a lighter colour. There is a legend showing the upper and lower bounds of the values being shown, these are 23.70% and 0.15%, respectively.
    </p>
    <p>
      You can move around the map by panning it with the mouse and zoom in and out either by the scroll wheel of the mouse or the “+” or “-“ buttons in the top left hand corner of the map. Clicking on the map has no affect. There is no base map displayed for this map, simply LGAs with colour gradations.
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
      For this map both 2011 and 2016 data was used, so the first data collection will be for 2011 and the second for 2016. Select “2011” from the drop down above the “GO” button to select 2011, then repeat for 2016.
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
