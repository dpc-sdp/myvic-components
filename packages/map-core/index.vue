<template>
  <div class="myvic-map-core" :style="containerStyle" >
    <div
      class="myvic-map-core__popup ol-popup"
      ref="mapPopup">
      <map-indicator
        :selectedFeature="feature"
        :mapElement="$refs.map" />
    </div>
    <div
      v-if="!gotError"
      class="myvic-map-core__container">
      <div class="myvic-map-core__map" ref="map" :tabindex="tabIndex" role="application" :aria-label="ariaLabel">
        <!-- @slot Default slot for child layers -->
        <slot></slot>
        <a
          v-if="enableMapboxWatermark"
          href="http://mapbox.com/about/maps"
          class="map-watermark"
          target="_blank">Mapbox</a>
      </div>
    </div>
    <error v-if="gotError" :message="error.toString()" errorClass="map" class="myvic-map-core__container" />
  </div>
</template>

<script>
import MapIndicator from './MapIndicator'
import ol from './lib/ol'
import styles from './styles/styles'
import catchError from '@dpc-sdp/myvic-global/mixins/catchError'
import Error from '@dpc-sdp/myvic-global/components/Error'

/**
 * MyvicMapCore provides a generic and configurable map component based on OpenLayers
 */
export default {
  name: 'MyvicMapCore',
  mixins: [catchError],
  props: {
    /**
     * CSS styles that control the appearance of the container that the map is rendered into
     */
    containerStyle: {
      type: Object,
      default: function () {
        return {
          position: 'relative',
          width: '100%',
          height: '100%'
        }
      }
    },
    /**
     * Coordinates to center the map on as an array of numbers. Must match the map projection, in the form ```[x, y]```
     * or ```[lon, lat]```.
     */
    center: {
      type: Array,
      default: () => [16136905.843820328, -4383057.013522999],
      validator: value => value.length === 2
    },
    /**
     * Map projection as an SRS identifier string. Defaults to ```EPSG:3857``` (Web Mercator). ```EPSG:4326``` (WGS84)
     * is also supported out of the box. Experimental support for ```EPSG:4283``` (GDA94) is also provided.
     */
    projection: {
      type: String,
      default: undefined
    },
    /**
     * Initial map zoom level
     */
    zoom: {
      type: Number,
      default: 7
    },
    /**
     * Maximum map zoom level for interactive maps
     */
    maxZoom: {
      type: Number,
      default: 20
    },
    /**
     * Minimum map zoom level for interactive maps
     */
    minZoom: {
      type: Number,
      default: 1
    },
    /**
     * Control whether to refresh (rerender) the map
     */
    refreshOn: {
      type: Boolean,
      default: false
    },
    /**
     * TODO
     */
    themeLayerUrl: {
      type: String
    },
    /**
     * URL of the XYZ tiled map service to use as a basemap
     */
    baseMapUrl: {
      type: String,
      default: ''
    },
    /**
     * Basemap attribution information as an array of strings. Will be automatically displayed by the Map
     * attribution control (which is enabled by default). An attribution can include links,
     * for example: ```<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>```. This can be used to
     * provide links to accessible alternative content (similar to the longdesc attribute for an img).
     */
    baseMapAttributions: {
      type: Array,
      default: () => []
    },
    /**
     * Enable or disable the Mapbox watermark (required for licensing when using Mapbox basemap)
     */
    enableMapboxWatermark: {
      type: Boolean,
      default: false
    },
    /**
     * Enable or disable the zoom control (buttons)
     */
    enableZoomControl: {
      type: Boolean,
      default: true
    },
    /**
     * Enable or disable the attribution control
     */
    enableAttributionControl: {
      type: Boolean,
      default: true
    },
    /**
     * Enable or disable the full screen control (button)
     */
    enableFullScreenControl: {
      type: Boolean,
      default: false
    },
    /**
     * Enable or disable the ability for users to pan the map
     */
    enablePanInteraction: {
      type: Boolean,
      default: true
    },
    /**
     * Enable or disable the ability for users to zoom the map
     */
    enableZoomInteraction: {
      type: Boolean,
      default: true
    },
    /**
     * Enable or disable the ability for users to select vector features
     */
    enableSelectInteraction: {
      type: Boolean,
      default: false
    },
    /**
     * OpenLayers style or style functions for selected feature (via select interaction). If not provided a default
     * style will be used.
     */
    selectedFeatureStyle: {
      type: undefined,
      default: undefined
    },
    /**
     * Attribute to use for labels when using the default selected style
     */
    selectedFeatureStyleLabelAttribute: {
      type: String,
      default: undefined
    },
    /**
     * Function used to generate content for the map popups (enabled per layer). Accepts an array of Features and
     * should return an object with ```title``` and ```content``` properties
     */
    popupContentFunction: {
      type: Function,
      default: undefined
    },
    /**
     * Set a specific tab index for users interacting with the map via the keyboard
     */
    tabIndex: {
      type: Number,
      default: 0
    },
    /**
     * Set focus() on the map element
     */
    focus: {
      type: Boolean,
      default: false
    },
    /**
     * Set the map aria label. Ideally this value should be as descriptive as possible, for example, 'Interactive map
     * of population growth by suburb'
     */
    ariaLabel: {
      type: String,
      default: 'Interactive Map'
    },
    /**
     * Enable or disable the ability for users to rotate the map
     */
    enableRotateInteraction: {
      type: Boolean,
      default: false
    },
    /**
     * TODO
     */
    customThemeFunction: {
      type: Function,
      default: null
    },
    /**
     * TODO
     */
    customMethods: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    return {
      map: null,
      baseLayer: null,
      baseSource: null,
      themeLayers: null,
      popupOverlay: null,
      zoomControl: null,
      attributionControl: null,
      fullScreenControl: null,
      dragPanInteraction: null,
      keyboardPanInteraction: null,
      doubleClickZoomInteraction: null,
      pinchZoomInteraction: null,
      keyboardZoomInteraction: null,
      mouseWheelZoomInteraction: null,
      dragZoomInteraction: null,
      dragRotateInteraction: null,
      pinchRotateInteraction: null,
      selectInteraction: null,
      feature: null
    }
  },
  components: {
    MapIndicator,
    Error
  },
  watch: {
    // Used as a prop when the map will be offscreen initially i.e. mobile
    // OL will hide the canvas
    // Update size renders the map again
    refreshOn (val) {
      if (val) {
        this.map.updateSize()
        // TODO: Calling zoom works but zooms in too close on mobile
        // Update with mobile specific zoom level
        this.zoomOnAppMounted()
      }
    },
    center (newCenter) {
      this.map.getView().setCenter(newCenter)
      this.map.getView().setZoom(this.zoom)
      this.feature = null
    },
    projection (newProjection) {
      this.createMap()
    },
    zoom (newZoom) {
      this.map.getView().setZoom(newZoom)
    },
    minZoom (newMinZoom) {
      this.map.getView().setMinZoom(newMinZoom)
    },
    maxZoom (newMaxZoom) {
      this.map.getView().setMaxZoom(newMaxZoom)
    },
    baseMapUrl (newBaseMapUrl) {
      this.updateBaseMap()
    },
    baseMapAttributions (newBaseMapUrl) {
      this.updateBaseMap()
    },
    enableZoomControl () {
      this.setMapControls()
    },
    enableAttributionControl () {
      this.setMapControls()
    },
    enableFullScreenControl () {
      this.setMapControls()
    },
    enablePanInteraction () {
      this.setMapInteractions()
    },
    enableZoomInteraction () {
      this.setMapInteractions()
    },
    enableSelectInteraction () {
      this.setMapInteractions()
    },
    selectedFeatureStyle () {
      this.setMapInteractions()
    },
    selectedFeatureStyleLabelAttribute () {
      this.setMapInteractions()
    },
    enableRotateInteraction () {
      this.setMapInteractions()
    },
    focus (focus) {
      if (focus) this.$refs.map.focus()
    }
  },
  mounted () {
    this.onAppMounted()
  },
  provide: function () {
    return {
      getMap: this.getMap,
      interceptError: this.interceptError
    }
  },
  methods: {
    /**
     * All of these methods can be overridden by passing in
     * functions of the same name as properties of the customMethods prop
     *
     * const myMethods = {
     *    themeFeatureStyleFunction (feature, resolution) {
     *      return new ol.style.Style({})
     *    }
     * }
     * <myvic-map :customMethods="myMethods" />
     */
    createMap () {
      ol.registerCustomProjections()
      this.map = new ol.Map({
        target: this.$refs.map,
        interactions: ol.interaction.defaults({
          altShiftDragRotate: false,
          onFocusOnly: false,
          doubleClickZoom: false,
          keyboard: false,
          mouseWheelZoom: false,
          shiftDragZoom: false,
          dragPan: false,
          pinchRotate: false,
          pinchZoom: false
        }),
        controls: ol.control.defaults({
          zoom: false,
          attribution: false,
          attributionOptions: {
            collapsible: false
          }
        }),
        view: new ol.View({
          center: this.center,
          projection: this.projection,
          zoom: this.zoom,
          maxZoom: this.maxZoom,
          minZoom: this.minZoom
        })
      })
      if (this.focus) this.$refs.map.focus()
    },
    createBaseLayer () {
      this.baseSource = new ol.source.XYZ({
        url: this.baseMapUrl,
        transition: 1000,
        attributions: this.baseMapAttributions
      })
      this.baseLayer = new ol.layer.Tile({
        source: this.baseSource
      })
    },
    createMapControls () {
      this.zoomControl = new ol.control.Zoom()
      this.attributionControl = new ol.control.Attribution({
        collapsible: false
      })
      this.fullScreenControl = new ol.control.FullScreen()
    },
    setMapControls () {
      this.map.getControls().clear()
      if (this.enableZoomControl) this.map.addControl(this.zoomControl)
      if (this.enableAttributionControl) this.map.addControl(this.attributionControl)
      if (this.enableFullScreenControl) this.map.addControl(this.fullScreenControl)
    },
    createMapInteractions () {
      this.dragPanInteraction = new ol.interaction.DragPan()
      this.keyboardPanInteraction = new ol.interaction.KeyboardPan()

      this.doubleClickZoomInteraction = new ol.interaction.DoubleClickZoom()
      this.pinchZoomInteraction = new ol.interaction.PinchZoom()
      this.keyboardZoomInteraction = new ol.interaction.KeyboardZoom()
      this.mouseWheelZoomInteraction = new ol.interaction.MouseWheelZoom()
      this.dragZoomInteraction = new ol.interaction.DragZoom()

      this.dragRotateInteraction = new ol.interaction.DragRotate()
      this.pinchRotateInteraction = new ol.interaction.PinchRotate()

      this.selectInteraction = new ol.interaction.Select({
        condition: ol.events.condition.click,
        style: this.selectedFeatureStyle || styles.createSelectedStyleFunction(this.selectedFeatureStyleLabelAttribute)
      })
      this.selectInteraction.on('select', this.onSelect)
    },
    setMapInteractions () {
      this.map.getInteractions().clear()
      if (this.enablePanInteraction) {
        this.map.addInteraction(this.dragPanInteraction)
        this.map.addInteraction(this.keyboardPanInteraction)
      }
      if (this.enableZoomInteraction) {
        this.map.addInteraction(this.doubleClickZoomInteraction)
        this.map.addInteraction(this.pinchZoomInteraction)
        this.map.addInteraction(this.keyboardZoomInteraction)
        this.map.addInteraction(this.mouseWheelZoomInteraction)
        this.map.addInteraction(this.dragZoomInteraction)
      }
      if (this.enableRotateInteraction) {
        this.map.addInteraction(this.dragRotateInteraction)
        this.map.addInteraction(this.pinchRotateInteraction)
      }
      if (this.enableSelectInteraction) {
        this.map.addInteraction(this.selectInteraction)
      }
    },
    createImageIconStyle: (src, crossOrigin, size) => {
      return new ol.style.Style({
        image: new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */ ({
          crossOrigin,
          src,
          imgSize: size
        }))
      })
    },
    themeFeatureStyleFunction (feature, resolution) {
      let size = [12, 12]

      function pointSvgDefinition (fillColor, width, height) {
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 8 8"><style>.st0{fill:${fillColor}}</style><circle cx="4" cy="4" r="3.8" class="st0"/></svg>`)
      }

      return this.createImageIconStyle(
        pointSvgDefinition('#1caadd', size[0], size[1]),
        'anonymous',
        size
      )
    },
    createThemeLayers () {
      this.themeLayers = []
      const themeSource = new ol.source.VectorTileSource({
        overlaps: false,
        format: new ol.format.MVT(),
        url: this.themeLayerUrl,
        transition: 0
      })
      const themeLayer = new ol.layer.VectorTile({
        style: (this.customMethods && this.customMethods.themeFeatureStyleFunction) ? this.customMethods.themeFeatureStyleFunction : this.themeFeatureStyleFunction,
        opacity: 1,
        source: themeSource,
        renderMode: 'hybrid',
        name: 'defaultThemeLayer'
      })
      this.themeLayers.push(themeLayer)
    },
    addPopupOverlay () {
      this.popupOverlay = new ol.Overlay({
        element: this.$refs.mapPopup,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        },
        positioning: 'bottom-center',
        position: undefined
      })
      this.map.addOverlay(this.popupOverlay)
    },
    zoomToArea (area, { duration }) {
      /*
      var featureRequest = new ol.format.WFS().writeGetFeature({
        srsName: 'EPSG:900913',
        featureNS: 'myvic',
        featurePrefix: 'myvic',
        featureTypes: ['suburb'],
        outputFormat: 'application/json'// ,
        // filter: ol.format.filter.equalTo('ssc_name', area, false)
      })
      fetch('https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver/myvic/wfs', {
        method: 'POST',
        body: new XMLSerializer().serializeToString(featureRequest)
      }).then((response) => {
        return response.json()
      }).then((json) => {
        var features = new ol.format.GeoJSON().readFeatures(json)
        if (features.length > 0) {
          let feature = features[0]
          map.getView().fit(feature.getGeometry().getExtent(), {
            size: map.getSize(),
            duration: duration
          })
        }
      })
      */
    },
    zoomOnAppMounted () {
      // Do something like `this.zoomToArea()`
    },
    onMapPointerMove (evt) {
      // set the cursor to a pointer when hovering over an icon
      var pixel = this.map.getEventPixel(evt.originalEvent)
      var hit = this.map.hasFeatureAtPixel(pixel)
      this.$refs.map.style.cursor = hit ? 'pointer' : ''
      if (hit === true) {
        const features = []
        this.map.forEachFeatureAtPixel(evt.pixel, (f, layer) => {
          f.layerName = layer.get('name')
          f.event = 'move'
          if (this.themeLayers.includes(layer)) features.push(f)
        })
        const firstFeature = features[0]
        if (this.customMethods && this.customMethods.featureMapper) {
          this.customMethods.featureMapper(firstFeature, features)
        }
      } else {
        // the move event didn't select a feature
        if (this.customMethods && this.customMethods.featureMapper) {
          this.customMethods.featureMapper({ 'layerName': 'none', 'event': 'move' }, false)
        }
      }
    },
    onSelect (evt) {
      let selectedFeatures = evt.target.getFeatures()
      if (selectedFeatures.getLength() > 0) {
        /**
         * Emitted when a feature is selected
         * @event select
         * @property {object} selected features
         * @property {object} select event
         */
        this.$emit('select', selectedFeatures, evt)
      }
    },
    onMapClick (evt) {
      /**
       * Emitted when the map is clicked
       * @event click
       * @property {event} the map click event
       */
      this.$emit('click', evt)

      const features = []
      this.map.forEachFeatureAtPixel(evt.pixel, (f, layer) => {
        f.layerName = layer.get('name')
        f.event = 'click'

        // Support layers added via themeLayers
        if (this.themeLayers.includes(layer)) features.push(f)

        // Support layers added as child components
        if (layer.get('enablePopup')) features.push(f)
      })

      // Hide popup if there are no features (i.e. click on an empty area of the map)
      if (features.length === 0) {
        this.feature = null
        return
      }

      // Set feature content used to render popup - either by customMethods, popupContentFunction or default featureMapper
      const firstFeature = features[0]
      if (this.customMethods && this.customMethods.featureMapper) {
        this.feature = this.customMethods.featureMapper(firstFeature, features)
      } else if (this.popupContentFunction) {
        this.feature = this.popupContentFunction(features)
      } else {
        this.feature = this.featureMapper(firstFeature, features)
      }

      // Wait until popup rendering is complete before positioning the element
      // this means the popup height is now known, so the map will pan correctly.
      // Here we use setTimeout instead of Vue's nextTick because it should wait
      // for the browser to update the size of the popup based on content length
      // and screen size. With nextTick, the setPosition was running before the
      // overlay changed size.
      setTimeout(() => {
        let coordinate = this.map.getCoordinateFromPixel(evt.pixel)
        this.popupOverlay.setPosition(coordinate)
      }, 0)
    },
    onAppMounted () {
      try {
        this.createMap()

        if (this.customMethods && this.customMethods.createBaseLayer) {
          this.baseLayer = this.customMethods.createBaseLayer(ol)
        } else {
          this.createBaseLayer()
        }

        if (this.customMethods && this.customMethods.createThemeLayers) {
          this.themeLayers = this.customMethods.createThemeLayers(ol)
        } else {
          this.createThemeLayers()
        }

        this.map.addLayer(this.baseLayer)

        this.createMapControls()
        this.setMapControls()

        this.createMapInteractions()
        this.setMapInteractions()

        for (let layer of this.themeLayers) {
          this.map.addLayer(layer)
        }

        this.addPopupOverlay()

        this.map.on('singleclick', this.onMapClick)
        this.map.on('pointermove', this.onMapPointerMove)

        if (this.customMethods && this.customMethods.exposeMap) {
          this.customMethods.exposeMap(this.map)
        }

        this.zoomOnAppMounted()
      } catch (error) {
        this.interceptError(error)
      }
    },
    featureMapper (feature) {
      // this function should be overridden when consuming this component,
      // to allow customisation of the pop content
      return {
        title: feature.get('title') || feature.get('name') || 'No Title',
        content: feature.get('content') || 'No Content'
      }
    },
    updateBaseMap () {
      this.map.removeLayer(this.baseLayer)
      this.createBaseLayer()
      this.map.addLayer(this.baseLayer)
    },
    getMap: function (found) {
      // This function is used with dependency injection to allow child components get a reference to the map
      // See: https://vuejs.org/v2/guide/components-edge-cases.html#Dependency-Injection
      return new Promise((resolve, reject) => {
        let checkForMap = () => {
          if (this.map) {
            resolve(this.map)
          } else {
            setTimeout(checkForMap, 50)
          }
        }
        checkForMap()
      })
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $myvic-map-popup-width: rem(300px) !default; // consider increasing this

  .myvic-map-core {

    &__container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }

    &__map {
      width: 100%;
      height: 100%;
      /*position: absolute;*/
      top: 0;
      left: 0;
      box-sizing: border-box;
      cursor: grab;
    }

    &__map:focus {
      outline: rpl-color('mid_neutral_1') solid 1px;
    }

    &__popup {
      position: absolute;
      z-index: $rpl-zindex-popover;
      bottom: $rpl-space-3;
      transform: translateX(-50%);
      cursor: auto;
    }
  }

  .ol-attribution {
    line-height: 1em;
  }

  .ol-attribution a, .ol-attribution li {
    font-family: VIC-Regular, Arial, Helvetica, sans-serif;
    font-size: .8rem;
    color: #222;
    text-decoration: none;
  }

  .map-watermark {
    position: absolute;
    display: block;
    margin: 5px;
    height: 20px;
    width: 65px;
    bottom: 0;
    text-indent: -9999%;
    z-index: 99999;
    overflow: hidden;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgODAuNDcgMjAuMDIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDgwLjQ3IDIwLjAyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe29wYWNpdHk6MC42O2ZpbGw6I0ZGRkZGRjtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30uc3Qxe29wYWNpdHk6MC42O2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAgICA7fTwvc3R5bGU+PGc+PHBhdGggY2xhc3M9InN0MCIgZD0iTTc5LjI5LDEzLjYxYzAsMC4xMS0wLjA5LDAuMi0wLjIsMC4yaC0xLjUzYy0wLjEyLDAtMC4yMy0wLjA2LTAuMjktMC4xNmwtMS4zNy0yLjI4bC0xLjM3LDIuMjhjLTAuMDYsMC4xLTAuMTcsMC4xNi0wLjI5LDAuMTZoLTEuNTNjLTAuMDQsMC0wLjA4LTAuMDEtMC4xMS0wLjAzYy0wLjA5LTAuMDYtMC4xMi0wLjE4LTAuMDYtMC4yN2MwLDAsMCwwLDAsMGwyLjMxLTMuNWwtMi4yOC0zLjQ3Yy0wLjAyLTAuMDMtMC4wMy0wLjA3LTAuMDMtMC4xMWMwLTAuMTEsMC4wOS0wLjIsMC4yLTAuMmgxLjUzYzAuMTIsMCwwLjIzLDAuMDYsMC4yOSwwLjE2bDEuMzQsMi4yNWwxLjMzLTIuMjRjMC4wNi0wLjEsMC4xNy0wLjE2LDAuMjktMC4xNmgxLjUzYzAuMDQsMCwwLjA4LDAuMDEsMC4xMSwwLjAzYzAuMDksMC4wNiwwLjEyLDAuMTgsMC4wNiwwLjI3YzAsMCwwLDAsMCwwTDc2Ljk2LDEwbDIuMzEsMy41Qzc5LjI4LDEzLjUzLDc5LjI5LDEzLjU3LDc5LjI5LDEzLjYxeiIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02My4wOSw5LjE2Yy0wLjM3LTEuNzktMS44Ny0zLjEyLTMuNjYtMy4xMmMtMC45OCwwLTEuOTMsMC40LTIuNiwxLjEyVjMuMzdjMC0wLjEyLTAuMS0wLjIyLTAuMjItMC4yMmgtMS4zM2MtMC4xMiwwLTAuMjIsMC4xLTAuMjIsMC4yMnYxMC4yMWMwLDAuMTIsMC4xLDAuMjIsMC4yMiwwLjIyaDEuMzNjMC4xMiwwLDAuMjItMC4xLDAuMjItMC4yMnYtMC43YzAuNjgsMC43MSwxLjYyLDEuMTIsMi42LDEuMTJjMS43OSwwLDMuMjktMS4zNCwzLjY2LTMuMTNDNjMuMjEsMTAuMyw2My4yMSw5LjcyLDYzLjA5LDkuMTZMNjMuMDksOS4xNnogTTU5LjEyLDEyLjQxYy0xLjI2LDAtMi4yOC0xLjA2LTIuMy0yLjM2VjkuOTljMC4wMi0xLjMxLDEuMDQtMi4zNiwyLjMtMi4zNnMyLjMsMS4wNywyLjMsMi4zOVM2MC4zOSwxMi40MSw1OS4xMiwxMi40MXoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjguMjYsNi4wNGMtMS44OS0wLjAxLTMuNTQsMS4yOS0zLjk2LDMuMTNjLTAuMTIsMC41Ni0wLjEyLDEuMTMsMCwxLjY5YzAuNDIsMS44NSwyLjA3LDMuMTYsMy45NywzLjE0YzIuMjQsMCw0LjA2LTEuNzgsNC4wNi0zLjk5UzcwLjUxLDYuMDQsNjguMjYsNi4wNHogTTY4LjI0LDEyLjQyYy0xLjI3LDAtMi4zLTEuMDctMi4zLTIuMzlzMS4wMy0yLjQsMi4zLTIuNHMyLjMsMS4wNywyLjMsMi4zOVM2OS41MSwxMi40MSw2OC4yNCwxMi40Mkw2OC4yNCwxMi40MnoiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTkuMTIsNy42M2MtMS4yNiwwLTIuMjgsMS4wNi0yLjMsMi4zNnYwLjA2YzAuMDIsMS4zMSwxLjA0LDIuMzYsMi4zLDIuMzZzMi4zLTEuMDcsMi4zLTIuMzlTNjAuMzksNy42Myw1OS4xMiw3LjYzeiBNNTkuMTIsMTEuMjNjLTAuNiwwLTEuMDktMC41My0xLjExLTEuMTlWMTBjMC4wMS0wLjY2LDAuNTEtMS4xOSwxLjExLTEuMTlzMS4xMSwwLjU0LDEuMTEsMS4yMVM1OS43NCwxMS4yMyw1OS4xMiwxMS4yM3oiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNNjguMjQsNy42M2MtMS4yNywwLTIuMywxLjA3LTIuMywyLjM5czEuMDMsMi4zOSwyLjMsMi4zOXMyLjMtMS4wNywyLjMtMi4zOVM2OS41MSw3LjYzLDY4LjI0LDcuNjN6IE02OC4yNCwxMS4yM2MtMC42MSwwLTEuMTEtMC41NC0xLjExLTEuMjFzMC41LTEuMiwxLjExLTEuMnMxLjExLDAuNTQsMS4xMSwxLjIxUzY4Ljg1LDExLjIzLDY4LjI0LDExLjIzeiIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My41Niw2LjI0aC0xLjMzYy0wLjEyLDAtMC4yMiwwLjEtMC4yMiwwLjIydjAuN2MtMC42OC0wLjcxLTEuNjItMS4xMi0yLjYtMS4xMmMtMi4wNywwLTMuNzUsMS43OC0zLjc1LDMuOTlzMS42OSwzLjk5LDMuNzUsMy45OWMwLjk5LDAsMS45My0wLjQxLDIuNi0xLjEzdjAuN2MwLDAuMTIsMC4xLDAuMjIsMC4yMiwwLjIyaDEuMzNjMC4xMiwwLDAuMjItMC4xLDAuMjItMC4yMlY2LjQ0YzAtMC4xMS0wLjA5LTAuMjEtMC4yMS0wLjIxQzQzLjU3LDYuMjQsNDMuNTcsNi4yNCw0My41Niw2LjI0eiBNNDIuMDIsMTAuMDVjLTAuMDEsMS4zMS0xLjA0LDIuMzYtMi4zLDIuMzZzLTIuMy0xLjA3LTIuMy0yLjM5czEuMDMtMi40LDIuMjktMi40YzEuMjcsMCwyLjI4LDEuMDYsMi4zLDIuMzZMNDIuMDIsMTAuMDV6Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTM5LjcyLDcuNjNjLTEuMjcsMC0yLjMsMS4wNy0yLjMsMi4zOXMxLjAzLDIuMzksMi4zLDIuMzlzMi4yOC0xLjA2LDIuMy0yLjM2VjkuOTlDNDIsOC42OCw0MC45OCw3LjYzLDM5LjcyLDcuNjN6IE0zOC42MiwxMC4wMmMwLTAuNjcsMC41LTEuMjEsMS4xMS0xLjIxYzAuNjEsMCwxLjA5LDAuNTMsMS4xMSwxLjE5djAuMDRjLTAuMDEsMC42NS0wLjUsMS4xOC0xLjExLDEuMThTMzguNjIsMTAuNjgsMzguNjIsMTAuMDJ6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTQ5LjkxLDYuMDRjLTAuOTgsMC0xLjkzLDAuNC0yLjYsMS4xMlY2LjQ1YzAtMC4xMi0wLjEtMC4yMi0wLjIyLTAuMjJoLTEuMzNjLTAuMTIsMC0wLjIyLDAuMS0wLjIyLDAuMjJ2MTAuMjFjMCwwLjEyLDAuMSwwLjIyLDAuMjIsMC4yMmgxLjMzYzAuMTIsMCwwLjIyLTAuMSwwLjIyLTAuMjJ2LTMuNzhjMC42OCwwLjcxLDEuNjIsMS4xMiwyLjYxLDEuMTJjMi4wNywwLDMuNzUtMS43OCwzLjc1LTMuOTlTNTEuOTgsNi4wNCw0OS45MSw2LjA0eiBNNDkuNiwxMi40MmMtMS4yNiwwLTIuMjgtMS4wNi0yLjMtMi4zNlY5Ljk5YzAuMDItMS4zMSwxLjA0LTIuMzcsMi4yOS0yLjM3YzEuMjYsMCwyLjMsMS4wNywyLjMsMi4zOVM1MC44NiwxMi40MSw0OS42LDEyLjQyTDQ5LjYsMTIuNDJ6Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTQ5LjYsNy42M2MtMS4yNiwwLTIuMjgsMS4wNi0yLjMsMi4zNnYwLjA2YzAuMDIsMS4zMSwxLjA0LDIuMzYsMi4zLDIuMzZzMi4zLTEuMDcsMi4zLTIuMzlTNTAuODYsNy42Myw0OS42LDcuNjN6IE00OS42LDExLjIzYy0wLjYsMC0xLjA5LTAuNTMtMS4xMS0xLjE5VjEwQzQ4LjUsOS4zNCw0OSw4LjgxLDQ5LjYsOC44MWMwLjYsMCwxLjExLDAuNTUsMS4xMSwxLjIxUzUwLjIxLDExLjIzLDQ5LjYsMTEuMjN6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTM0LjM2LDEzLjU5YzAsMC4xMi0wLjEsMC4yMi0wLjIyLDAuMjJoLTEuMzRjLTAuMTIsMC0wLjIyLTAuMS0wLjIyLTAuMjJWOS4yNGMwLTAuOTMtMC43LTEuNjMtMS41NC0xLjYzYy0wLjc2LDAtMS4zOSwwLjY3LTEuNTEsMS41NGwwLjAxLDQuNDRjMCwwLjEyLTAuMSwwLjIyLTAuMjIsMC4yMmgtMS4zNGMtMC4xMiwwLTAuMjItMC4xLTAuMjItMC4yMlY5LjI0YzAtMC45My0wLjctMS42My0xLjU0LTEuNjNjLTAuODEsMC0xLjQ3LDAuNzUtMS41MiwxLjcxdjQuMjdjMCwwLjEyLTAuMSwwLjIyLTAuMjIsMC4yMmgtMS4zM2MtMC4xMiwwLTAuMjItMC4xLTAuMjItMC4yMlY2LjQ0YzAuMDEtMC4xMiwwLjEtMC4yMSwwLjIyLTAuMjFoMS4zM2MwLjEyLDAsMC4yMSwwLjEsMC4yMiwwLjIxdjAuNjNjMC40OC0wLjY1LDEuMjQtMS4wNCwyLjA2LTEuMDVoMC4wM2MxLjA0LDAsMS45OSwwLjU3LDIuNDgsMS40OGMwLjQzLTAuOSwxLjMzLTEuNDgsMi4zMi0xLjQ5YzEuNTQsMCwyLjc5LDEuMTksMi43NiwyLjY1TDM0LjM2LDEzLjU5eiIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04MC4zMiwxMi45N2wtMC4wNy0wLjEyTDc4LjM4LDEwbDEuODUtMi44MWMwLjQyLTAuNjQsMC4yNS0xLjQ5LTAuMzktMS45MmMtMC4wMS0wLjAxLTAuMDItMC4wMS0wLjAzLTAuMDJjLTAuMjItMC4xNC0wLjQ4LTAuMjEtMC43NC0wLjIxaC0xLjUzYy0wLjUzLDAtMS4wMywwLjI4LTEuMywwLjc0bC0wLjMyLDAuNTNsLTAuMzItMC41M2MtMC4yOC0wLjQ2LTAuNzctMC43NC0xLjMxLTAuNzRoLTEuNTNjLTAuNTcsMC0xLjA4LDAuMzUtMS4yOSwwLjg4Yy0yLjA5LTEuNTgtNS4wMy0xLjQtNi45MSwwLjQzYy0wLjMzLDAuMzItMC42MiwwLjY5LTAuODUsMS4wOWMtMC44NS0xLjU1LTIuNDUtMi42LTQuMjgtMi42Yy0wLjQ4LDAtMC45NiwwLjA3LTEuNDEsMC4yMlYzLjM3YzAtMC43OC0wLjYzLTEuNDEtMS40LTEuNDFoLTEuMzNjLTAuNzcsMC0xLjQsMC42My0xLjQsMS40djMuNTdjLTAuOS0xLjMtMi4zOC0yLjA4LTMuOTctMi4wOWMtMC43LDAtMS4zOSwwLjE1LTIuMDIsMC40NWMtMC4yMy0wLjE2LTAuNTEtMC4yNS0wLjgtMC4yNWgtMS4zM2MtMC40MywwLTAuODMsMC4yLTEuMSwwLjUzYy0wLjAyLTAuMDMtMC4wNC0wLjA1LTAuMDctMC4wOGMtMC4yNy0wLjI5LTAuNjUtMC40NS0xLjA0LTAuNDVoLTEuMzJjLTAuMjksMC0wLjU3LDAuMDktMC44LDAuMjVDNDAuOCw1LDQwLjEyLDQuODUsMzkuNDIsNC44NWMtMS43NCwwLTMuMjcsMC45NS00LjE2LDIuMzhjLTAuMTktMC40NC0wLjQ2LTAuODUtMC43OS0xLjE5Yy0wLjc2LTAuNzctMS44LTEuMTktMi44OC0xLjE5aC0wLjAxYy0wLjg1LDAuMDEtMS42NywwLjMxLTIuMzQsMC44NGMtMC43LTAuNTQtMS41Ni0wLjg0LTIuNDUtMC44NGgtMC4wM2MtMC4yOCwwLTAuNTUsMC4wMy0wLjgyLDAuMWMtMC4yNywwLjA2LTAuNTMsMC4xNS0wLjc4LDAuMjdjLTAuMi0wLjExLTAuNDMtMC4xNy0wLjY3LTAuMTdoLTEuMzNjLTAuNzgsMC0xLjQsMC42My0xLjQsMS40djcuMTRjMCwwLjc4LDAuNjMsMS40LDEuNCwxLjRoMS4zM2MwLjc4LDAsMS40MS0wLjYzLDEuNDEtMS40MWMwLDAsMCwwLDAsMFY5LjM1YzAuMDMtMC4zNCwwLjIyLTAuNTYsMC4zNC0wLjU2YzAuMTcsMCwwLjM2LDAuMTcsMC4zNiwwLjQ1djQuMzVjMCwwLjc4LDAuNjMsMS40LDEuNCwxLjRoMS4zNGMwLjc4LDAsMS40LTAuNjMsMS40LTEuNGwtMC4wMS00LjM1YzAuMDYtMC4zLDAuMjQtMC40NSwwLjMzLTAuNDVjMC4xNywwLDAuMzYsMC4xNywwLjM2LDAuNDV2NC4zNWMwLDAuNzgsMC42MywxLjQsMS40LDEuNGgxLjM0YzAuNzgsMCwxLjQtMC42MywxLjQtMS40di0wLjM2YzAuOTEsMS4yMywyLjM0LDEuOTYsMy44NywxLjk2YzAuNywwLDEuMzktMC4xNSwyLjAyLTAuNDVjMC4yMywwLjE2LDAuNTEsMC4yNSwwLjgsMC4yNWgxLjMyYzAuMjksMCwwLjU3LTAuMDksMC44LTAuMjV2MS45MWMwLDAuNzgsMC42MywxLjQsMS40LDEuNGgxLjMzYzAuNzgsMCwxLjQtMC42MywxLjQtMS40di0xLjY5YzAuNDYsMC4xNCwwLjk0LDAuMjIsMS40MiwwLjIxYzEuNjIsMCwzLjA3LTAuODMsMy45Ny0yLjF2MC41YzAsMC43OCwwLjYzLDEuNCwxLjQsMS40aDEuMzNjMC4yOSwwLDAuNTctMC4wOSwwLjgtMC4yNWMwLjYzLDAuMywxLjMyLDAuNDUsMi4wMiwwLjQ1YzEuODMsMCwzLjQzLTEuMDUsNC4yOC0yLjZjMS40NywyLjUyLDQuNzEsMy4zNiw3LjIyLDEuODljMC4xNy0wLjEsMC4zNC0wLjIxLDAuNS0wLjM0YzAuMjEsMC41MiwwLjcyLDAuODcsMS4yOSwwLjg2aDEuNTNjMC41MywwLDEuMDMtMC4yOCwxLjMtMC43NGwwLjM1LTAuNThsMC4zNSwwLjU4YzAuMjgsMC40NiwwLjc3LDAuNzQsMS4zMSwwLjc0aDEuNTJjMC43NywwLDEuMzktMC42MywxLjM4LTEuMzlDODAuNDcsMTMuMzgsODAuNDIsMTMuMTcsODAuMzIsMTIuOTdMODAuMzIsMTIuOTd6IE0zNC4xNSwxMy44MWgtMS4zNGMtMC4xMiwwLTAuMjItMC4xLTAuMjItMC4yMlY5LjI0YzAtMC45My0wLjctMS42My0xLjU0LTEuNjNjLTAuNzYsMC0xLjM5LDAuNjctMS41MSwxLjU0bDAuMDEsNC40NGMwLDAuMTItMC4xLDAuMjItMC4yMiwwLjIyaC0xLjM0Yy0wLjEyLDAtMC4yMi0wLjEtMC4yMi0wLjIyVjkuMjRjMC0wLjkzLTAuNy0xLjYzLTEuNTQtMS42M2MtMC44MSwwLTEuNDcsMC43NS0xLjUyLDEuNzF2NC4yN2MwLDAuMTItMC4xLDAuMjItMC4yMiwwLjIyaC0xLjMzYy0wLjEyLDAtMC4yMi0wLjEtMC4yMi0wLjIyVjYuNDRjMC4wMS0wLjEyLDAuMS0wLjIxLDAuMjItMC4yMWgxLjMzYzAuMTIsMCwwLjIxLDAuMSwwLjIyLDAuMjF2MC42M2MwLjQ4LTAuNjUsMS4yNC0xLjA0LDIuMDYtMS4wNWgwLjAzYzEuMDQsMCwxLjk5LDAuNTcsMi40OCwxLjQ4YzAuNDMtMC45LDEuMzMtMS40OCwyLjMyLTEuNDljMS41NCwwLDIuNzksMS4xOSwyLjc2LDIuNjVsMC4wMSw0LjkxQzM0LjM3LDEzLjcsMzQuMjcsMTMuOCwzNC4xNSwxMy44MUMzNC4xNSwxMy44MSwzNC4xNSwxMy44MSwzNC4xNSwxMy44MXogTTQzLjc4LDEzLjU5YzAsMC4xMi0wLjEsMC4yMi0wLjIyLDAuMjJoLTEuMzNjLTAuMTIsMC0wLjIyLTAuMS0wLjIyLTAuMjJ2LTAuNzFDNDEuMzQsMTMuNiw0MC40LDE0LDM5LjQyLDE0Yy0yLjA3LDAtMy43NS0xLjc4LTMuNzUtMy45OXMxLjY5LTMuOTksMy43NS0zLjk5YzAuOTgsMCwxLjkyLDAuNDEsMi42LDEuMTJ2LTAuN2MwLTAuMTIsMC4xLTAuMjIsMC4yMi0wLjIyaDEuMzNjMC4xMS0wLjAxLDAuMjEsMC4wOCwwLjIyLDAuMmMwLDAuMDEsMCwwLjAxLDAsMC4wMlYxMy41OXogTTQ5LjkxLDE0Yy0wLjk4LDAtMS45Mi0wLjQxLTIuNi0xLjEydjMuNzhjMCwwLjEyLTAuMSwwLjIyLTAuMjIsMC4yMmgtMS4zM2MtMC4xMiwwLTAuMjItMC4xLTAuMjItMC4yMlY2LjQ1YzAtMC4xMiwwLjEtMC4yMSwwLjIyLTAuMjFoMS4zM2MwLjEyLDAsMC4yMiwwLjEsMC4yMiwwLjIydjAuN2MwLjY4LTAuNzIsMS42Mi0xLjEyLDIuNi0xLjEyYzIuMDcsMCwzLjc1LDEuNzcsMy43NSwzLjk4UzUxLjk4LDE0LDQ5LjkxLDE0eiBNNjMuMDksMTAuODdDNjIuNzIsMTIuNjUsNjEuMjIsMTQsNTkuNDMsMTRjLTAuOTgsMC0xLjkyLTAuNDEtMi42LTEuMTJ2MC43YzAsMC4xMi0wLjEsMC4yMi0wLjIyLDAuMjJoLTEuMzNjLTAuMTIsMC0wLjIyLTAuMS0wLjIyLTAuMjJWMy4zN2MwLTAuMTIsMC4xLTAuMjIsMC4yMi0wLjIyaDEuMzNjMC4xMiwwLDAuMjIsMC4xLDAuMjIsMC4yMnYzLjc4YzAuNjgtMC43MSwxLjYyLTEuMTIsMi42LTEuMTFjMS43OSwwLDMuMjksMS4zMywzLjY2LDMuMTJDNjMuMjEsOS43Myw2My4yMSwxMC4zMSw2My4wOSwxMC44N0w2My4wOSwxMC44N0w2My4wOSwxMC44N3ogTTY4LjI2LDE0LjAxYy0xLjksMC4wMS0zLjU1LTEuMjktMy45Ny0zLjE0Yy0wLjEyLTAuNTYtMC4xMi0xLjEzLDAtMS42OWMwLjQyLTEuODUsMi4wNy0zLjE1LDMuOTctMy4xNGMyLjI1LDAsNC4wNiwxLjc4LDQuMDYsMy45OVM3MC41LDE0LjAxLDY4LjI2LDE0LjAxTDY4LjI2LDE0LjAxeiBNNzkuMDksMTMuODFoLTEuNTNjLTAuMTIsMC0wLjIzLTAuMDYtMC4yOS0wLjE2bC0xLjM3LTIuMjhsLTEuMzcsMi4yOGMtMC4wNiwwLjEtMC4xNywwLjE2LTAuMjksMC4xNmgtMS41M2MtMC4wNCwwLTAuMDgtMC4wMS0wLjExLTAuMDNjLTAuMDktMC4wNi0wLjEyLTAuMTgtMC4wNi0wLjI3YzAsMCwwLDAsMCwwbDIuMzEtMy41bC0yLjI4LTMuNDdjLTAuMDItMC4wMy0wLjAzLTAuMDctMC4wMy0wLjExYzAtMC4xMSwwLjA5LTAuMiwwLjItMC4yaDEuNTNjMC4xMiwwLDAuMjMsMC4wNiwwLjI5LDAuMTZsMS4zNCwyLjI1bDEuMzQtMi4yNWMwLjA2LTAuMSwwLjE3LTAuMTYsMC4yOS0wLjE2aDEuNTNjMC4wNCwwLDAuMDgsMC4wMSwwLjExLDAuMDNjMC4wOSwwLjA2LDAuMTIsMC4xOCwwLjA2LDAuMjdjMCwwLDAsMCwwLDBMNzYuOTYsMTBsMi4zMSwzLjVjMC4wMiwwLjAzLDAuMDMsMC4wNywwLjAzLDAuMTFDNzkuMjksMTMuNzIsNzkuMiwxMy44MSw3OS4wOSwxMy44MUM3OS4wOSwxMy44MSw3OS4wOSwxMy44MSw3OS4wOSwxMy44MUw3OS4wOSwxMy44MXoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAsMS4yMWMtNC44NywwLTguODEsMy45NS04LjgxLDguODFzMy45NSw4LjgxLDguODEsOC44MXM4LjgxLTMuOTUsOC44MS04LjgxQzE4LjgxLDUuMTUsMTQuODcsMS4yMSwxMCwxLjIxeiBNMTQuMTgsMTIuMTljLTEuODQsMS44NC00LjU1LDIuMi02LjM4LDIuMmMtMC42NywwLTEuMzQtMC4wNS0yLTAuMTVjMCwwLTAuOTctNS4zNywyLjA0LTguMzljMC43OS0wLjc5LDEuODYtMS4yMiwyLjk4LTEuMjJjMS4yMSwwLDIuMzcsMC40OSwzLjIzLDEuMzVDMTUuOCw3LjczLDE1Ljg1LDEwLjUsMTQuMTgsMTIuMTl6Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTEwLDAuMDJjLTUuNTIsMC0xMCw0LjQ4LTEwLDEwczQuNDgsMTAsMTAsMTBzMTAtNC40OCwxMC0xMEMxOS45OSw0LjUsMTUuNTIsMC4wMiwxMCwwLjAyeiBNMTAsMTguODNjLTQuODcsMC04LjgxLTMuOTUtOC44MS04LjgxUzUuMTMsMS4yLDEwLDEuMnM4LjgxLDMuOTUsOC44MSw4LjgxQzE4LjgxLDE0Ljg5LDE0Ljg3LDE4LjgzLDEwLDE4LjgzeiIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNC4wNCw1Ljk4Yy0xLjc1LTEuNzUtNC41My0xLjgxLTYuMi0wLjE0QzQuODMsOC44Niw1LjgsMTQuMjMsNS44LDE0LjIzczUuMzcsMC45Nyw4LjM5LTIuMDRDMTUuODUsMTAuNSwxNS44LDcuNzMsMTQuMDQsNS45OHogTTExLjg4LDkuODdsLTAuODcsMS43OGwtMC44Ni0xLjc4TDguMzgsOS4wMWwxLjc3LTAuODZsMC44Ni0xLjc4bDAuODcsMS43OGwxLjc3LDAuODZMMTEuODgsOS44N3oiLz48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjEzLjY1LDkuMDEgMTEuODgsOS44NyAxMS4wMSwxMS42NSAxMC4xNSw5Ljg3IDguMzgsOS4wMSAxMC4xNSw4LjE1IDExLjAxLDYuMzcgMTEuODgsOC4xNSAiLz48L2c+PC9zdmc+);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 65px 20px;
  }
</style>
