<template>
  <div class="myvic-examples__container">
    <area-search
      :initial-value="area.name"
      @item-selected="selectArea"
    />
    <div class="myvic-examples__map-container">
      <myvic-map-core
        :center="center"
        :zoom="12"
        :minZoom="8"
        :baseMapUrl="baseMapUrl"
        ariaLabel="An interactive map"
        enableMapboxWatermark
      >
        <myvic-map-vector-layer
          :url="layerUrl"
          dataFormat="GeoJSON"
          loadingStrategy="bbox"
          :zoomToExtent="true"
          :attributions="attributions"
        />
      </myvic-map-core>
    </div>
  </div>
</template>
<script>

import { AreaSearch } from '@dpc-sdp/myvic-areasearch'
import { MyvicMapCore, MyvicMapVectorLayer } from '@dpc-sdp/myvic-map-core'
import { createWfsRequestUrl } from '@dpc-sdp/myvic-global/utils/geoserver_requests'

/**
 * AreaWithMap is a component showcasing the area search and map components
 */
export default {
  components: {
    AreaSearch,
    MyvicMapCore,
    MyvicMapVectorLayer
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
      },
      attributions: [
        '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
        ' | ',
        '<a href="https://example.visualise.myvictoria.vic.gov.au/bundle-2-map" tabindex="0" target="_blank">Accessible Version</a>'
      ]
    }
  },
  computed: {
    layerUrl: function () {
      return createWfsRequestUrl(this.area.id, this.area.description)
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
  .myvic-examples {
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
