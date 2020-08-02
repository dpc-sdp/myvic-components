<template>
  <div class="myvic-address-search-map-layout">
    <address-search-map />
  </div>
</template>

<script>
  import { AddressSearchMap } from '@dpc-sdp/myvic-address-search-map'

  export default {
    name: 'MapLayout',
    components: {
      AddressSearchMap
    },
    data: () => {
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
