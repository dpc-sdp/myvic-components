<template>
  <div id="long-description">
    <h2>Bundle 2 – Map</h2>
    <p>
      This component is a map showing the selected area from the dialogue box above it. Selections are based on suburbs, postcodes, local government areas (LGA) or regions as defined by the Australian Bureau of Statistics.
    </p>
    <p>
      The map has a grey base with cased roads in varying colours demonstrating road hierarchy. Rivers, major waterbodies and bays are shown in blue. Parklands and ovals are shown in green. Major community infrastructure like schools/universities and hospitals are coloured in tan and pink, respectively. At certain zoomed in scales in specific areas dark grey polygons will appear that signify building envelopes. You can move around the map by panning it with the mouse and zoom in and out either by the scroll wheel of the mouse or the “+” or “-“ buttons in the top left hand corner of the map. Clicking on the map has no affect.
    </p>
    <p>
      When an area of interest is selected from the above dialogue box a navy boundary over the area is highlighted and the map zooms to the area.
    </p>
    <p>
      The data has been sourced using the Australian Bureau of Statistics Geographies.
    </p>
    <p>
      To find this data use the Australian Statistical Geography Standard (ASGS) site: <a href="https://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/1270.0.55.003July%202016?OpenDocument">https://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/1270.0.55.003July%202016?OpenDocument</a>
    </p>
    <h3>Replicating the data</h3>
    <p>
      For this example we will be downloading Shapefiles of the areas, however the same files can be downloaded into MapInfo Tab formats. The shapefile file package can be downloaded and used in a range of geographic information system (GIS) packages including but not limited to QGIS (open source) and ArcGIS (proprietary).
    </p>
    <p>
      Upon landing on the Australian Statistical Geography Standard (ASGS) page, scroll down to the zip files that are relevant to the area you are searching for. These include the following:
    </p>
    <p>
      Postcode: “Postal Areas ASGS Ed 2016 Digital Boundaries in ESRI Shapefile Format“
    </p>
    <p>
      Locality: “State Suburbs ASGS Ed 2016 Digital Boundaries in ESRI Shapefile Format“
    </p>
    <p>
      LGA: ”Local Government Areas ASGS Ed 2016 Digital Boundaries in ESRI Shapefile Format“
    </p>
    <p>
      Region: “Tourism Regions ASGS Ed 2016 Digital Boundaries in ESRI Shapefile Format“
    </p>
    <p>
      Once downloaded the unzipped files can be viewed in a shapefile-compatible GIS package.
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
