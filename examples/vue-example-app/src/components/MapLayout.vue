<template>
  <div class="myvic-address-search-map-layout">
    <address-search-map
      :basemapProvider="basemapProvider"
      :geocodeProvider="geocodeProvider"
      :vicmapAddressAPIKey="vicmapAddressAPIKey"
      :minQueryLength="8"
      :showSuburb="false"
      :showMetroBoundary="true"
      metroBoundaryUrl="https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver/myvic/ows?service=WFS&version=1.0.0&outputFormat=application%2Fjson&request=GetFeature&typeName=myvic:covid_metro_area_4326"
      :radius="radius"
      :radiusLabel="radiusLabel"
      :label="label"
    />
  </div>
</template>

<script>
  import { AddressSearchMap } from '@dpc-sdp/myvic-address-search-map'

  export default {
    name: 'MapLayout',
    components: {
      AddressSearchMap
    },
    data() {
      // Please make sure env variable VUE_APP_COVID_MAP_RADIUS is set.
      const radius = parseInt(process.env.VUE_APP_COVID_MAP_RADIUS)
      let radiusLabel
      if (isNaN(radius)) {
        radiusLabel = `We have a glitch in our system. We are aware of the issue. We appreciate your patience while we're looking into it.`
      } else {
        const radiusKm = Math.round(radius / 1000)
        radiusLabel = `Approx. ${radiusKm}km radius`
      }
      return {
        radius: isNaN(radius) ? null : radius,
        radiusLabel,
        label: process.env.VUE_APP_COVID_MAP_LABEL,
        basemapProvider: process.env.VUE_APP_COVID_MAP_BASEMAP_PROVIDER,
        geocodeProvider: process.env.VUE_APP_COVID_MAP_GEOCODE_PROVIDER,
        vicmapAddressAPIKey: process.env.VUE_APP_COVID_MAP_VICMAP_API_KEY
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .myvic-address-search-map-layout {
    width: 100%;
    height: 100%;
  }
</style>
