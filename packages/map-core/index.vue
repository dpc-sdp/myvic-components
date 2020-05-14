<template>
  <div class="yourvic-map-core" >
    <div
      id="map-popup"
      class="yourvic-map-core__popup ol-popup"
      ref="mapPopup">
      <map-indicator
        :selectedFeature="feature"
        :mapElement="$refs.map" />
    </div>
    <div class="yourvic-map-core__container">
      <div class="yourvic-map-core__map" id="map" ref="map">
      </div>
    </div>
  </div>
</template>

<script>
import MapIndicator from './MapIndicator'
import ol from './lib/ol'

let map,
  baseLayer,
  baseSource,
  themeLayers,
  popupOverlay,
  zoomControl,
  attributionControl,
  fullScreenControl,
  dragPanInteraction,
  keyboardPanInteraction,
  doubleClickZoomInteraction,
  pinchZoomInteraction,
  keyboardZoomInteraction,
  mouseWheelZoomInteraction,
  dragZoomInteraction,
  dragRotateInteraction,
  pinchRotateInteraction

/**
 * All of these functions can be overridden by passing in
 * functions of the same name as properties of the customMethods prop
 *
 * const myMethods = {
 *    themeFeatureStyleFunction (feature, resolution) {
 *      return new ol.style.Style({})
 *    }
 * }
 * <yourvic-map :customMethods="myMethods" />
 */
const methods = {
  createMap () {
    map = new ol.Map({
      target: 'map',
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
        zoom: this.zoom,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom
      })
    })
  },
  createBaseLayer () {
    baseSource = new ol.source.XYZ({
      url: this.baseMapUrl,
      transition: 1000,
      attributions: [this.baseMapAttributionText]
    })
    baseLayer = new ol.layer.Tile({
      source: baseSource
    })
  },
  createMapControls () {
    zoomControl = new ol.control.Zoom()
    attributionControl = new ol.control.Attribution({
      collapsible: false
    })
    fullScreenControl = new ol.control.FullScreen()
  },
  setMapControls () {
    map.getControls().clear()
    if (this.enableZoomControl) map.addControl(zoomControl)
    if (this.enableAttributionControl) map.addControl(attributionControl)
    if (this.enableFullScreenControl) map.addControl(fullScreenControl)
  },
  createMapInteractions () {
    dragPanInteraction = new ol.interaction.DragPan()
    keyboardPanInteraction = new ol.interaction.KeyboardPan()

    doubleClickZoomInteraction = new ol.interaction.DoubleClickZoom()
    pinchZoomInteraction = new ol.interaction.PinchZoom()
    keyboardZoomInteraction = new ol.interaction.KeyboardZoom()
    mouseWheelZoomInteraction = new ol.interaction.MouseWheelZoom()
    dragZoomInteraction = new ol.interaction.DragZoom()

    dragRotateInteraction = new ol.interaction.DragRotate()
    pinchRotateInteraction = new ol.interaction.PinchRotate()
  },
  setMapInteractions () {
    map.getInteractions().clear()
    if (this.enablePanInteraction) {
      map.addInteraction(dragPanInteraction)
      map.addInteraction(keyboardPanInteraction)
    }
    if (this.enableZoomInteraction) {
      map.addInteraction(doubleClickZoomInteraction)
      map.addInteraction(pinchZoomInteraction)
      map.addInteraction(keyboardZoomInteraction)
      map.addInteraction(mouseWheelZoomInteraction)
      map.addInteraction(dragZoomInteraction)
    }
    if (this.enableRotateInteraction) {
      map.addInteraction(dragRotateInteraction)
      map.addInteraction(pinchRotateInteraction)
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
    themeLayers = []
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
    themeLayers.push(themeLayer)
  },
  addPopupOverlay () {
    popupOverlay = new ol.Overlay({
      element: this.$refs.mapPopup,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      },
      positioning: 'bottom-center',
      position: undefined
    })
    map.addOverlay(popupOverlay)
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
    var pixel = map.getEventPixel(evt.originalEvent)
    var hit = map.hasFeatureAtPixel(pixel)
    this.$refs.map.style.cursor = hit ? 'pointer' : ''
    if (hit === true) {
      const features = []
      map.forEachFeatureAtPixel(evt.pixel, (f, layer) => {
        f.layerName = layer.get('name')
        f.event = 'move'
        if (themeLayers.includes(layer)) features.push(f)
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
  onMapClick (evt) {
    const features = []
    map.forEachFeatureAtPixel(evt.pixel, (f, layer) => {
      f.layerName = layer.get('name')
      f.event = 'click'
      if (themeLayers.includes(layer)) features.push(f)
    })

    if (features.length === 0) {
      // hide popup if you click on the map
      this.feature = null
      return
    }

    const firstFeature = features[0]

    this.feature = (this.customMethods && this.customMethods.featureMapper) ? this.customMethods.featureMapper(firstFeature, features) : this.featureMapper(firstFeature, features)

    // Wait until popup rendering is complete before positioning the element
    // this means the popup height is now known, so the map will pan correctly.
    // Here we use setTimeout instead of Vue's nextTick because it should wait
    // for the browser to update the size of the popup based on content length
    // and screen size. With nextTick, the setPosition was running before the
    // overlay changed size.
    setTimeout(function () {
      popupOverlay.setPosition(firstFeature.getGeometry().getCoordinates())
    }, 0)
  },
  onAppMounted () {
    this.createMap()

    if (this.customMethods && this.customMethods.createBaseLayer) {
      baseLayer = this.customMethods.createBaseLayer(ol)
    } else {
      this.createBaseLayer()
    }

    if (this.customMethods && this.customMethods.createThemeLayers) {
      themeLayers = this.customMethods.createThemeLayers(ol)
    } else {
      this.createThemeLayers()
    }

    map.addLayer(baseLayer)

    this.createMapControls()
    this.setMapControls()

    this.createMapInteractions()
    this.setMapInteractions()

    for (let layer of themeLayers) {
      map.addLayer(layer)
    }

    this.addPopupOverlay()

    map.on('singleclick', this.onMapClick)
    map.on('pointermove', this.onMapPointerMove)

    if (this.customMethods && this.customMethods.exposeMap) {
      this.customMethods.exposeMap(map)
    }

    this.zoomOnAppMounted()
  },
  featureMapper (layer, feature) {
    // this function should be overridden when consuming this component,
    // to allow customisation of the pop content
    return {
      title: feature.get('title'),
      content: feature.get('content')
    }
  },
  updateBaseMapUrl () {
    map.removeLayer(baseLayer)
    this.createBaseLayer()
    map.addLayer(baseLayer)
  }
}

export default {
  name: 'YourvicMapCore',
  props: {
    // Default center/zoom on state of Victoria
    center: {
      type: Array,
      default: () => [16136905.843820328, -4383057.013522999],
      validator: value => value.length === 2
    },
    zoom: {
      type: Number,
      default: 7
    },
    maxZoom: {
      type: Number,
      default: 20
    },
    minZoom: {
      type: Number,
      default: 1
    },
    refreshOn: {
      type: Boolean,
      default: false
    },
    themeLayerUrl: {
      type: String
    },
    baseMapUrl: {
      type: String,
      required: true
    },
    baseMapAttributionText: {
      type: String,
      default: '© Mapbox © OpenStreetMap'
    },
    enableZoomControl: {
      type: Boolean,
      default: true
    },
    enableAttributionControl: {
      type: Boolean,
      default: true
    },
    enableFullScreenControl: {
      type: Boolean,
      default: false
    },
    enablePanInteraction: {
      type: Boolean,
      default: true
    },
    enableZoomInteraction: {
      type: Boolean,
      default: true
    },
    enableRotateInteraction: {
      type: Boolean,
      default: false
    },
    customThemeFunction: {
      type: Function,
      default: null
    },
    customMethods: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    return { feature: null }
  },
  components: {
    MapIndicator
  },
  watch: {
    // Used as a prop when the map will be offscreen initially i.e. mobile
    // OL will hide the canvas
    // Update size renders the map again
    refreshOn (val) {
      if (val) {
        map.updateSize()
        // TODO: Calling zoom works but zooms in too close on mobile
        // Update with mobile specific zoom level
        this.zoomOnAppMounted()
      }
    },
    center (newCenter) {
      map.getView().setCenter(newCenter)
      map.getView().setZoom(this.zoom)
      this.feature = null
    },
    zoom (newZoom) {
      map.getView().setZoom(newZoom)
    },
    minZoom (newMinZoom) {
      map.getView().setMinZoom(newMinZoom)
    },
    maxZoom (newMaxZoom) {
      map.getView().setMaxZoom(newMaxZoom)
    },
    baseMapUrl (newBaseMapUrl) {
      this.updateBaseMapUrl()
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
    enableRotateInteraction () {
      this.setMapInteractions()
    }
  },
  mounted () {
    this.onAppMounted()
  },
  methods
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $yourvic-map-popup-width: rem(300px) !default; // consider increasing this

  .yourvic-map-core {
    width: 100%;
    height: 100%;

    &__container {
      position: relative;
      width: 100%;
      height: 100%;
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

    &__popup {
      position: absolute;
      z-index: $rpl-zindex-popover;
      bottom: $rpl-space-3;
      transform: translateX(-50%);
      cursor: auto;
    }
  }
</style>
