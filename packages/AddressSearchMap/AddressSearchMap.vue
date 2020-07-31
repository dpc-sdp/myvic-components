<template>
  <div class="myvic-address-search-map__container">
    <div class="myvic-address-search-map__map-container">
      <div class="myvic-address-search-map__address-search-container">
        <address-search
          provider="Mapbox"
          :minQueryLength="minQueryLength"
          @item-selected="selectAddress"
          @item-cleared="clearAddress"
        />
      </div>
      <myvic-map-core
        :center="center"
        :zoom="12"
        :minZoom="7"
        :baseMapUrl="baseMapUrl"
        ariaLabel="An interactive map"
        enableMapboxWatermark
      >
        <myvic-map-vector-layer
          :features="features"
          dataFormat="GeoJSON"
          :zoomToExtent="true"
          :attributions="attributions"
        />
        <myvic-map-vector-layer
          :url="layerUrl"
          dataFormat="GeoJSON"
          loadingStrategy="bbox"
          :zoomToExtent="false"
          :attributions="attributions"
        />
      </myvic-map-core>
    </div>
  </div>
</template>
<script>

import { AddressSearch } from '@dpc-sdp/myvic-addresssearch'
import { getAreas } from './utils/getAreas'
import { MyvicMapCore, MyvicMapVectorLayer, Feature, Point, circularPolygon } from '@dpc-sdp/myvic-map-core'
import { createWfsRequestUrl } from '@dpc-sdp/myvic-global/utils/geoserver_requests'

/**
 * AreaWithMap is a component showcasing the area search and map components
 */
export default {
  components: {
    AddressSearch,
    MyvicMapCore,
    MyvicMapVectorLayer
  },
  props: {
    /**
     * Radius of circle to draw around the address
     */
    radius: {
      type: Number,
      default: 5000
    }
  },
  data () {
    return {
      baseMapUrl: 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g',
      center: [16137905.843820328, -4555057.013522999],
      minQueryLength: 6,
      areas: undefined,
      area: {
        id: '',
        description: 'suburb'
      },
      features: [],
      attributions: [
        '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
      ]
    }
  },
  created: async function () {
    this.areas = await getAreas()
  },
  computed: {
    layerUrl: function () {
      return createWfsRequestUrl(this.area.id, this.area.description)
    }
  },
  methods: {
    selectAddress: async function (searchComponent, address) {
      // Lookup SSC ID for suburb
      let postcode = address.context[0].text
      let suburb = address.context[1].text
      let area = this.areas.find(area => area.postcode === postcode && area.name.toLowerCase() === suburb.toLowerCase())
      this.area = area

      // Construct radius circle
      let vertices = 64
      let circle = circularPolygon([address.location.x, address.location.y], this.radius, vertices)
      circle = circle.transform('EPSG:4326', 'EPSG:3857')
      this.features = [
        new Feature({
          geometry: circle,
          name: address.address
        }),
        new Feature({
          geometry: new Point([address.location.x, address.location.y]).transform('EPSG:4326', 'EPSG:3857'),
          name: address.address
        })
      ]
    },
    clearAddress: function () {
      this.features = []
      this.area = {
        id: '',
        description: 'suburb'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .myvic-address-search-map {
    &__container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
    &__address-search-container {
      position: absolute;
      z-index: 200;
      top: 10px;
      right: 10px;
      margin-left: 45px;
      min-width: 260px;
      width: 400px;
    }
    &__map-container {
      width: 100%;
      height: 100%;
      /*position: absolute;*/
      top: 0;
      left: 0;
      box-sizing: border-box;
      cursor: grab;
    }
  }
</style>
