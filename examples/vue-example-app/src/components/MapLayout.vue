<template>
  <div class="myvic-address-search-map-layout">
    <address-search-map
      :basemapProvider="basemapProvider"
      :geocodeProvider="geocodeProvider"
      :vicmapAddressAPIKey="vicmapAddressAPIKey"
      :minQueryLength="6"
      :showSuburb="false"
      :showMetroBoundary="true"
      metroBoundaryUrl="metro_3857_poly_simplified.geojson"
      :radius="radius"
      :radiusLabel="radiusLabel"
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
