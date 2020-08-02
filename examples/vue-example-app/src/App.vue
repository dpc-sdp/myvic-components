<template>
  <div id="app">
    <map-layout />
  </div>
</template>

<script>
import MapLayout from './components/MapLayout.vue'

export default {
  name: 'app',
  components: {
    MapLayout
  }
}
</script>

<style lang="scss">
// Import global style in app level.
@import "~@dpc-sdp/ripple-global/style";

#app {
}
</style>
