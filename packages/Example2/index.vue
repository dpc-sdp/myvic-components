<template>
  <div class="yourvic-example2__container">
    <area-search
      :initial-value="area.name"
      @item-selected="selectArea"
    />
    <div class="yourvic-example2__map-container">
      <yourvic-map-core
        :center="center"
        :zoom="12"
        :minZoom="8"
        :baseMapUrl="baseMapUrl"
      >
        <yourvic-map-vector-layer
          :url="layerUrl"
          dataFormat="GeoJSON"
          loadingStrategy="bbox"
          :zoomToExtent="true"
        />
      </yourvic-map-core>
    </div>
  </div>
</template>
<script>

import { AreaSearch } from '@dpc-sdp/yourvic-areasearch'
import { YourvicMapCore, YourvicMapVectorLayer } from '@dpc-sdp/yourvic-map-core'
import { createRequestUrl } from './utils/requests'

/**
 * Example 2 is a component showcasing the area search and map components
 */
export default {
  components: {
    AreaSearch,
    YourvicMapCore,
    YourvicMapVectorLayer
  },
  props: {
  },
  data () {
    return {
      baseMapUrl: 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g',
      center: [16137905.843820328, -4555057.013522999],
      area: {
        id: 'LGA24600',
        name: 'City of Melbourne',
        description: 'lga'
      }
    }
  },
  computed: {
    layerUrl: function () {
      return createRequestUrl(this.area.id, this.area.description)
    }
  },
  methods: {
    selectArea: async function (searchComponent, area) {
      this.area = area
    }
  }
}
</script>

<style lang="scss" scoped>
  .yourvic-example2 {
    display: relative;

    &__container {
      width: 100%;
      max-width: 800px;
      margin: 20px auto 0;
    }
    &__map-container {
      width: 100%;
      margin: 30px 0 20px;
      height: 560px;
    }
  }
</style>
