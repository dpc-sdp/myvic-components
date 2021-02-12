<template>
  <div class="myvic-address-search-map__container">
    <div class="myvic-address-search-map__map-container">
      <div class="myvic-address-search-map__address-search-container">
        <address-search
          class="myvic-address-search-map__address-search"
          :provider="geocodeProvider"
          :minQueryLength="minQueryLength"
          :showIcon="false"
          :mapboxGeocoderParams="mapboxGeocoderParams"
          :vicmapAddressAPIKey="vicmapAddressAPIKey"
          @item-selected="selectAddress"
          @item-cleared="clearAddress"
        />
      </div>
      <myvic-map-core
        :center="center"
        :zoom="8"
        :minZoom="7"
        ariaLabel="An interactive map"
        :enableFullScreenControl="false"
        :focus="mapFocus"
        :enableAttributionControl="true"
        :enableMapboxWatermark="enableMapboxWatermark"
      >
        <myvic-map-tile-layer
          :visible="basemapProvider === 'Vicmap'"
          type="WMS"
          url="https://base.maps.vic.gov.au/service"
          :params="{'LAYERS': 'CARTO_WM', 'TILED': false}"
          :highDPI="false"
          :zIndex="1"
        />
        <myvic-map-tile-layer
          :visible="basemapProvider === 'Mapbox'"
          type="XYZ"
          url="https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g"
          :attributions="mapboxAttributions"
        />
        <myvic-map-vector-layer
          :features="features"
          dataFormat="GeoJSON"
          :zoomToExtent="true"
          labelAttribute="name"
          :attributions="attributions"
          :zIndex="4"
        />
        <myvic-map-vector-layer
          :visible="showSuburb"
          :url="layerUrl"
          dataFormat="GeoJSON"
          loadingStrategy="bbox"
          :zoomToExtent="false"
          labelAttribute="ssc_name"
          :attributions="attributions"
          :zIndex="3"
        />
        <myvic-map-vector-layer
          :visible="showMetroBoundary"
          :url="metroBoundaryUrl"
          dataFormat="GeoJSON"
          :zoomToExtent="true"
          :layerStyle="getMetroAreaStyle"
          :zIndex="2"
        />
      </myvic-map-core>
    </div>
  </div>
</template>
<script>

import { AddressSearch } from '@dpc-sdp/myvic-addresssearch'
import { getAreas } from './utils/getAreas'
import { MyvicMapCore, MyvicMapVectorLayer, MyvicMapTileLayer, Feature, Point, circularPolygon } from '@dpc-sdp/myvic-map-core'
import { createWfsRequestUrl } from '@dpc-sdp/myvic-global/utils/geoserver_requests'
import ol from '@dpc-sdp/myvic-map-core/lib/ol'

/**
 * AreaWithMap is a component showcasing the area search and map components
 */
export default {
  components: {
    AddressSearch,
    MyvicMapCore,
    MyvicMapVectorLayer,
    MyvicMapTileLayer
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
    },
    basemapProvider: {
      type: String,
      default: 'Mapbox',
      validator: value => ['Vicmap', 'Mapbox'].includes(value)
    },
    geocodeProvider: {
      type: String,
      default: 'DELWP',
      validator: value => ['DELWP', 'Mapbox', 'VicmapAddressAPI'].includes(value)
    },
    mapboxGeocoderParams: {
      type: String,
      default: '+victoria.json?country=AU&proximity=144.9,-37.8&types=address&access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g'
    },
    vicmapAddressAPIKey: {
      type: String,
      default: ''
    },
    showSuburb: {
      type: Boolean,
      default: false
    },
    showMetroBoundary: {
      type: Boolean,
      default: true
    },
    metroBoundaryUrl: {
      type: String,
      default: 'metro_3857_poly_simplified.geojson'
    },
    label: {
      type: String,
      default: 'Restriction zone'
    }
  },
  data () {
    return {
      baseMapUrl: 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g',
      mapFocus: false,
      center: [16171110, -4558722],
      areas: undefined,
      area: {
        id: '',
        description: 'suburb'
      },
      features: [],
      attributions: [],
      mapboxAttributions: [
        '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
        '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      ],
      metroAreaStyle: [
        new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#FF5500',
            width: 3
          }),
          fill: new ol.style.Fill({
            color: ol.getRgbaFromString('#ff5500', 0.1)
          }),
          text: new ol.style.Text({
            text: this.label,
            font: '600 0.8rem "VIC-Regular", "Arial", "Helvetica", "sans-serif"',
            rotateWithView: false,
            placement: 'point',
            overflow: true,
            fill: new ol.style.Fill({
              color: 'white'
            }),
            stroke: new ol.style.Stroke({
              color: 'black',
              width: 3
            })
          })
        })
      ]
    }
  },
  created: async function () {
    this.areas = await getAreas()
  },
  computed: {
    layerUrl: function () {
      return createWfsRequestUrl(this.area.id, this.area.description)
    },
    enableMapboxWatermark: function () {
      return this.basemapProvider === 'Mapbox'
    }
  },
  methods: {
    selectAddress: async function (searchComponent, address) {
      // Lookup SSC ID for suburb
      try {
        let area
        if (this.showSuburb && this.geocodeProvider === 'DELWP') {
          // Get suburb from DELWP response
          let postcode = address.address.trim().slice(-4)
          let postcodeSuburbs = this.areas.filter(area => area.postcode === postcode)
          // Sort so longer suburb names are matched first, e.g. 'Hepburn Springs' before 'Hepburn'
          postcodeSuburbs.sort((a, b) => b.name.length - a.name.length)
          // Use address without postcode, then use regex match from end of string (to exclude streets that match suburb names)
          let addressShort = address.address.slice(0, -5)
          area = postcodeSuburbs.find(area => addressShort.toLowerCase().match(area.name.toLowerCase() + '$'))
        } else if (this.showSuburb && this.geocodeProvider === 'Mapbox') {
          // Get suburb from Mapbox response
          let postcode = address.context[0].text
          let suburb = address.context[1].text
          area = this.areas.find(area => area.postcode === postcode && area.name.toLowerCase() === suburb.toLowerCase())
        } else if (this.showSuburb && this.geocodeProvider === 'VicmapAddressAPI') {
          area = this.areas.find(area => area.postcode === address.postcode && area.name.toLowerCase() === address.suburb.toLowerCase())
        }
        if (area) {
          this.area = area
        } else {
          this.area = {
            id: '',
            description: 'suburb'
          }
        }
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
      this.mapFocus = true
    },
    clearAddress: function () {
      this.features = []
      this.area = {
        id: '',
        description: 'suburb'
      }
    },
    getMetroAreaStyle: function () {
      return this.metroAreaStyle
    }
  }
}
</script>

<style lang="scss">
  .ol-full-screen {
    top: 65px
  }
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
      left: 47px;
      width: auto;
      display: flex;

      @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        /* IE10+ CSS styles go here */
        display: block;
      }
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
