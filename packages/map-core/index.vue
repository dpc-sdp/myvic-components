<template>
  <div class="myvic-map-core" :style="containerStyle">
    <rpl-alert v-if="ie11" title="Internet Explorer 11 (and older) is not fully supported, please upgrade to" :link='{"text":"Microsoft Edge.","url":"https://www.microsoft.com/en-us/edge"}'/>
    <div
      class="ol-popup"
      :class="`myvic-map-core__popup--${popupProps.position || 'default'}`"
      ref="mapPopup">
      <map-indicator
        v-bind="popupProps"
        :selectedFeature="isPopupFeatureBoundToParent() ? popupFeature : localPopupFeature"
        :mapElement="$refs.map"
        @popup-close="onPopupClose">
        <slot name="popup"></slot>
      </map-indicator>
    </div>
    <div
      v-if="!gotError && !ie11"
      class="myvic-map-core__container">
      <div class="myvic-map-core__map" ref="map" :tabindex="tabIndex" role="application" :aria-label="ariaLabel">
        <!-- @slot Default slot for child layers -->
        <slot></slot>
        <div
          class="ol-control myvic-map-core__geolocation"
          :class="{'ol-control--hidden': !enableGeolocationControl, 'myvic-map-core__geolocation--right':controlPositions === 'top-right'}"
          ref="geolocation">
          <button
          class="myvic-map-core__geolocation-button"
          :class="{'myvic-map-core__geolocation-button--active': geolocationCentered}"
          @click="enableGeolocation">
            <span class="rpl-visually-hidden">Click to locate current location on map</span>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.926636 7.21044L8.13002 8.87L9.73002 16L17 0L0.926636 7.21044Z"/>
            </svg>
          </button>
        </div>
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
import { getSvg } from '@dpc-sdp/myvic-global/mapIcons/iconLibrary'
import { createHTMLElementFromString } from '@dpc-sdp/myvic-global/utils/misc'
import { RplAlert } from '@dpc-sdp/ripple-alert'

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
     * or ```[lon, lat]``` (two-way binding).
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
     * Map zoom level (two-way binding)
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
     * Enable or disable the Geolocation control (button)
     */
    enableGeolocationControl: {
      type: Boolean,
      default: false
    },
    /**
     * Adjust the position of the zoom, full screen and geolocation controls. Can be set to 'default' or 'top-right'
     */
    controlPositions: {
      type: String,
      default: 'default'
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
     * Feature that the popup displays information for (two-way binding). If not supplied then this component will
     * use a local objecct (localPopupFeature) to manage this. Supplying this prop lets the parent set or clear
     * the popup feature ad hoc
     */
    popupFeature: {
      type: Object,
      default: function () {
        return null
      }
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
     * props to pass to the MapIndicator component. Includes ```stickyHeader``` (Boolean)
     * and ```position``` (String, one of ```default```, ```float-left```, ```below-feature```)
     */
    popupProps: {
      type: Object,
      default: function () {
        return {}
      }
    },
    /**
     * delay the popup rendering (ms). Useful if the map needs to finish zoom/pan animations first
     */
    popupDelay: {
      type: Number,
      default: 0
    },
    /**
     * If the map contains any MapVectorLayer components with clustering, this setting will determine what happens when clicking on
     * the cluster. The default behavior is to display a popup. If this setting is set to true, the map will zoom to the extent of
     * the clustered features instead
     */
    zoomToClusterOnClick: {
      type: Boolean,
      default: false
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
      geolocationControl: null,
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
      popupApplied: false, // helps avoid duplicate popups between select interaction and mapclick event
      localPopupFeature: null,
      positionToOverlayClass: {
        default: undefined,
        'float-left': 'myvic-map-core__overlay--float-left',
        'below-feature': undefined
      },
      geolocation: null,
      geolocationCentered: false,
      geolocationPosition: null,
      ie11: !!window.MSInputMethodContext && !!document.documentMode
    }
  },
  components: {
    MapIndicator,
    Error,
    RplAlert
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
      this.map.getView().animate({ center: newCenter, duration: 100 })
    },
    projection (newProjection) {
      this.createMap()
    },
    zoom (newZoom) {
      if (newZoom !== this.currentZoom) {
        this.map.getView().animate({ zoom: newZoom, duration: 100 })
      }
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
    popupProps (newPopupProps, oldPopupProps) {
      if (newPopupProps.position !== oldPopupProps.position) {
        this.addPopupOverlay()
      }
    },
    enableZoomControl () {
      this.setMapControls()
    },
    controlPositions () {
      this.createMapControls()
      this.setMapControls()
    },
    enableAttributionControl () {
      this.setMapControls()
    },
    enableFullScreenControl () {
      this.setMapControls()
    },
    enableGeolocationControl () {
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
      this.geolocation = new ol.Geolocation({
        trackingOptions: {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        },
        projection: this.map.getView().getProjection()
      })
      this.geolocation.on('change:position', () => {
        if (this.geolocationPosition) {
          /**
           * Emitted when geolocation position changes
           * @event geolocation-change
           * @property {array} position geolocation position
           * @property {number} accuracy accuracy in meters
           */
          this.$emit('geolocation-change', this.geolocation.getPosition(), this.geolocation.get('accuracy'))
        } else {
          /**
           * Emitted when geolocation position is requested or is initially set
           * @event geolocation-request
           * @property {array} position geolocation position
           * @property {number} accuracy accuracy in meters
           */
          this.$emit('geolocation-request', this.geolocation.getPosition(), this.geolocation.get('accuracy'))
        }
        this.geolocationPosition = this.geolocation.getPosition()
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
      this.zoomControl = new ol.control.Zoom({
        className: this.controlPositions === 'top-right' ? 'myvic-map-core__zoom--right' : undefined,
        zoomInLabel: createHTMLElementFromString(getSvg('plus', 's')),
        zoomOutLabel: createHTMLElementFromString(getSvg('minus', 's'))
      })
      this.attributionControl = new ol.control.Attribution({
        collapsible: false
      })
      this.fullScreenControl = new ol.control.FullScreen({
        className: this.controlPositions === 'top-right' ? 'ol-full-screen--right' : 'ol-full-screen--left'
      })
      this.geolocationControl = new ol.control.Control({
        element: this.$refs.geolocation
      })
    },
    setMapControls () {
      this.map.getControls().clear()
      if (this.enableZoomControl) this.map.addControl(this.zoomControl)
      if (this.enableAttributionControl) this.map.addControl(this.attributionControl)
      if (this.enableFullScreenControl) this.map.addControl(this.fullScreenControl)
      if (this.enableGeolocationControl) this.map.addControl(this.geolocationControl)
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
        filter: (f) => {
          const isCluster = f.get('features') && f.get('features').length !== 1
          return !isCluster
        },
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
      if (this.popupOverlay) {
        this.map.removeOverlay(this.popupOverlay)
      }
      this.popupOverlay = new ol.Overlay({
        element: this.$refs.mapPopup,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        },
        positioning: 'bottom-center',
        position: undefined,
        className: this.positionToOverlayClass[this.popupProps.position]
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
    isPopupFeatureBoundToParent () {
      return 'popupFeature' in this.$options.propsData
    },
    updatePopupFeature (newFeature) {
      if (this.isPopupFeatureBoundToParent()) {
        this.$emit('update:popupFeature', newFeature)
      } else {
        this.localPopupFeature = newFeature
      }
    },
    setFeaturePopup (features, pixel) {
      // Hide popup if there are no features (i.e. click on an empty area of the map)
      if (features.length === 0) {
        this.updatePopupFeature(null)
        return
      }

      // Set feature content used to render popup - either by customMethods, popupContentFunction or default featureMapper
      const firstFeature = features[0]
      let newFeature
      if (this.customMethods && this.customMethods.featureMapper) {
        newFeature = this.customMethods.featureMapper(firstFeature, features)
      } else if (this.popupContentFunction) {
        newFeature = this.popupContentFunction(features)
      } else {
        newFeature = this.featureMapper(firstFeature, features)
      }
      this.updatePopupFeature(newFeature)
      let coordinates
      if (firstFeature.getGeometry().getType() === 'Point') {
        coordinates = firstFeature.getGeometry().flatCoordinates
      } else {
        coordinates = this.map.getCoordinateFromPixel(pixel)
      }
      // Wait until popup rendering is complete before positioning the element
      // this means the popup height is now known, so the map will pan correctly.
      // Here we use setTimeout instead of Vue's nextTick because it should wait
      // for the browser to update the size of the popup based on content length
      // and screen size. With nextTick, the setPosition was running before the
      // overlay changed size.
      setTimeout(() => {
        this.popupOverlay.setPosition(coordinates)
      }, 0)
    },
    applyFeaturePopup (args) {
      if (this.popupDelay === 0) {
        this.setFeaturePopup.apply(this, args)
      } else {
        window.setTimeout(() => { this.setFeaturePopup.apply(this, args) }, this.popupDelay)
      }
    },
    onMoveEnd (evt) {
      const center = evt.map.getView().getCenter()
      this.$emit('update:center', center)
      this.$emit('update:zoom', evt.map.getView().getZoom())
      if (this.geolocationPosition) {
        this.geolocationCentered = center[0] === this.geolocationPosition[0] && center[1] === this.geolocationPosition[1]
      }
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
      let popupFeatures = []
      /**
       * Emitted when a feature is selected
       * @event select
       * @property {object} selected features
       * @property {object} select event
       */
      this.$emit('select', selectedFeatures, evt)

      // popup needs to be handled here and not on mapclick event
      // because evt.target.getFeatures() here produces different
      // features from this.map.forEachFeatureAtPixel which is used there
      if (selectedFeatures.getLength() > 0) {
        const layer = evt.target.getLayer(selectedFeatures.getArray()[0])
        selectedFeatures.getArray().forEach(f => {
          f.layerName = layer.get('name')
          f.event = 'select'

          // Support layers added via themeLayers
          if (this.themeLayers.includes(layer)) popupFeatures.push(f)

          // Support layers added as child components
          if (layer.get('enablePopup')) popupFeatures.push(f)
        })
      }
      this.applyFeaturePopup([popupFeatures, evt.mapBrowserEvent.pixel])
      this.popupHandled = true
    },
    onMapClick (evt) {
      const features = []
      this.map.forEachFeatureAtPixel(evt.pixel, (f, layer) => {
        f.layerName = layer.get('name')
        f.event = 'click'

        // Support layers added via themeLayers
        if (this.themeLayers.includes(layer)) features.push(f)

        // Support layers added as child components
        if (layer.get('enablePopup')) features.push(f)
      })
      /**
       * Emitted when the map is clicked
       * @event click
       * @property {event} the map click event
       * @property {object} selected features
       */
      this.$emit('click', evt, features)

      let popupArgs = [features, evt.pixel]
      const isCluster = features[0] && features[0].get('features') && features[0].get('features').length > 1
      if (isCluster && this.zoomToClusterOnClick) {
        this.zoomToCluster(features[0].get('features'))
        popupArgs = [[]]
      }
      if (!this.popupHandled) {
        this.applyFeaturePopup(popupArgs)
      }
      // reset value to await for next select event
      this.popupHandled = false
    },
    onPopupClose () {
      /**
       * Emitted when the popup is closed
       * @event popup-close
       */
      this.$emit('popup-close')
    },
    zoomToCluster (cluster) {
      // eslint-disable-next-line new-cap
      const extent = new ol.extent.createEmpty()
      cluster.forEach(f => {
        ol.extent.extend(extent, f.getGeometry().getExtent())
      })
      this.map.getView().fit(extent, {
        size: this.map.getSize(),
        padding: [50, 50, 50, 50],
        duration: 400,
        easing: ol.easing.easeOut
      })
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
        this.map.on('moveend', this.onMoveEnd)

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
    },
    enableGeolocation: function () {
      if (!this.geolocation.get('tracking')) {
        this.geolocation.setTracking(true)
      } else {
        this.$emit('geolocation-request', this.geolocation.getPosition(), this.geolocation.get('accuracy'))
      }
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

    &__overlay--float-left {
      height: calc(100% - 16px);
      transform: none !important;
      top: 8px;
      left: 8px;
      bottom: 8px;
    }

    &__popup--default {
      position: absolute;
      z-index: $rpl-zindex-popover;
      bottom: $rpl-space-3;
      transform: translateX(-50%);
      cursor: auto;
    }

    &__popup--float-left {
      position: absolute;
      z-index: $rpl-zindex-popover;
      height: 100%;
      cursor: auto;
    }

    &__popup--below-feature {
      position: absolute;
      z-index: $rpl-zindex-popover;
      top: 8px;
      transform: translateX(-50%);
      cursor: auto;
    }

    &__geolocation {
      left: .5em;
      top: 100px;
      &--right {
        left: auto;
        right: .5em
      }
      &-button--active {
        color: rpl-color('primary') !important;
        background-color: rgba(246,246,246,0.9) !important;
      }
    }

    &__zoom--right {
      top: .5em;
      right: .5em;
    }
  }

  .ol-full-screen {
    &--left {
      top: 100px;
      right: auto;
      left: .5em;
    }
    &--right {
      top: 100px;
      right: .5em;
      left: auto;
    }
  }

  .ol-full-screen--right + .ol-control {
    top: 150px;
  }

  .ol-full-screen--left + .ol-control {
    top: 150px;
  }

  .ol-control--hidden {
    display: none;
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

  .ol-control {
    border-radius: 4px;
    padding: 0;
    overflow: hidden;
    box-shadow: 0px 0px 8px 0px #00000033;
    background-color: transparent;

    &:hover {
      background-color: transparent;
    }
  }

  .ol-control button {
    box-sizing: content-box;
    width: 40px;
    height: 40px;
    margin: 0;
    background-color: rgba(256,256,256,0.95);
    color: rpl-color('dark_neutral');
    font-weight: normal;
    font-size: 30px;
    cursor: pointer;
    border-radius: 0;
    overflow: hidden;

    &:focus {
      color: rpl-color('dark_neutral');
      background-color: rgba(256,256,256,0.95);
    }
    &:hover,&:active {
      color: rpl-color('primary');
      background-color: rgba(246,246,246,0.9);
    }
  }

  .ol-control button ~ button {
    margin-top: 1px;
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
