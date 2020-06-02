<template>
  <div>
      <!-- <yourvic-map-core
        :style="{height: '400px'}"
        baseMapUrl="https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g"
        :center="[16136905.843820328, -4383057.013522999]"
        :zoom="7"
      /> -->
      <component
        :is="mapCore"
        :style="{height: '400px'}"
        baseMapUrl="https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g"
        :center="[16136905.843820328, -4383057.013522999]"
        :zoom="7"
      ></component>
  </div>
</template>

<script>
// TODO: we can't use import directly as "ol.js" will throw error "window not found" in server side.
// import YourvicMapCore from '~~/packages/map-core'

export default {
  // components: {
  //   YourvicMapCore
  // },
  data () {
    return {
      mapCore: null
    }
  },
  mounted () {
    // TODO: So we need to use dynamic import in mounted for now.
    // Ideally, "ol.js" issue should be handled inside map-core component.
    this.mapCore = () => import('~~/packages/map-core')
  }
}
</script>
