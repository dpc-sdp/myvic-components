<template>
  <div class="myvic-address-search-map-layout">
    <address-search-map
      geocodeProvider="VicmapAddressAPI"
      vicmapAddressAPIKey="0e8bf7b3-b681-4d0b-9bcd-b8ef6a071296"
      :minQueryLength="6"
      :showSuburb="false"
      :showMetroBoundary="true"
      metroBoundaryUrl="metro_3857_poly_simplified.geojson"
      :radius="5000"
      radiusLabel="Approx. 5km radius"
    />
  </div>
</template>

<script>
  import { AddressSearchMap } from '@dpc-sdp/myvic-address-search-map'

  export default {
    name: 'MapLayout',
    components: {
      AddressSearchMap
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
