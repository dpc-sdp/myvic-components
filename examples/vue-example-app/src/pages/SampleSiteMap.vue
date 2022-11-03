<template>
  <div id="long-description">
    <h2>Sample Site - Map</h2>
    <p>
      This component is a map showing the pedestrian counts for sensor locations within the City of Melbourne.
    </p>
    <p>
      The map has a grey base with cased roads in varying colours demonstrating road hierarchy. Rivers, major waterbodies and bays are shown in blue. Parklands and ovals are shown in green. Major community infrastructure like schools/universities and hospitals are coloured in tan and pink, respectively. At certain zoomed in scales in specific areas dark grey polygons will appear that signify building envelopes. You can move around the map by panning it with the mouse and zoom in and out either by the scroll wheel of the mouse or the “+” or “-“ buttons in the top left hand corner of the map. Clicking on the data points will show the discrete pedestrian count and a description of the street location of the sensor.
    </p>
    <p>
      The dots are colour coded according to the number of pedestrians the sensor has picked up in the epoch (1 minute). The darker the colour indicates the more pedestrians, the lighter less pedestrians and the grey indicates no pedestrians sensed in that minute.
    </p>
    <p>
      The data has been sourced using the City of Melbourne Open Data Portal, the data can be accessed through the JSON file listed below:
      <a href="https://data.melbourne.vic.gov.au/resource/d6mv-s43h.json">https://data.melbourne.vic.gov.au/resource/d6mv-s43h.json</a>
    </p>
    <h3>Replicating the data</h3>
    <p>
      The data served up in the above JSON does not include any contextual information on where the sensor is located other than the sensor_id, for this reason it needs to be joined up to a further static dataset indicating locations in terms of coordinates as well as street locations. This can be found at:
      <a href="https://data.melbourne.vic.gov.au/resource/h57g-5234.json">https://data.melbourne.vic.gov.au/resource/h57g-5234.json</a>
    </p>
    <p>
      Using the sensor_id for both JSON files as your primary key, the contextual information of the sensors location can be joined to the real-time counts.
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
