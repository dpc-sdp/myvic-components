<template>
  <div class="myvic-address-search-map__container">
    <div class="myvic-address-search-map__map-container">
      <div class="myvic-address-search-map__address-search-container">
        <address-search
          class="myvic-address-search-map__address-search"
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
          labelAttribute="name"
          :attributions="attributions"
        />
        <myvic-map-vector-layer
          :url="layerUrl"
          dataFormat="GeoJSON"
          loadingStrategy="bbox"
          :zoomToExtent="false"
          labelAttribute="ssc_name"
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
    },
    /**
     * Label text for the radius circle
     */
    radiusLabel: {
      type: String,
      default: 'Approx. 5km radius'
    },
    /**
     * Minimum length of a search query before sending to Mapbox
     */
    minQueryLength: {
      type: Number,
      default: 6
    }
  },
  data () {
    return {
      baseMapUrl: 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g',
      center: [16137905.843820328, -4555057.013522999],
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
      try {
        // let postcode = address.context[0].text
        // let suburb = address.context[1].text
        // let area = this.areas.find(area => area.postcode === postcode && area.name.toLowerCase() === suburb.toLowerCase())
        // if (area) {
        //   this.area = area
        // }
      } catch (e) {
        console.log('Unable to identify suburb: ' + e)
      }

      // Construct radius circle
      try {
        let vertices = 64
        let circle = circularPolygon([address.location.x, address.location.y], this.radius, vertices)
        circle = circle.transform('EPSG:4326', 'EPSG:3857')
        let firstCoord = circle.getCoordinates()[0][0]
        this.features = [
          new Feature({
            geometry: circle
          }),
          new Feature({
            geometry: new Point(firstCoord),
            name: this.radiusLabel
          }),
          new Feature({
            geometry: new Point([address.location.x, address.location.y]).transform('EPSG:4326', 'EPSG:3857')
          })
        ]
      } catch (e) {
        console.log('Unable to create radius: ' + e)
      }
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
      left: 40px;
      width: auto;
      display: flex;
    }
    &__address-search {
      min-width: 200px;
      max-width: 500px;
      margin-left: auto;
      flex-grow: 100;
    }
    &__map-container {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      box-sizing: border-box;
      cursor: grab;
    }
  }
</style>
