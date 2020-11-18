<script>
import ol from './lib/ol'
import styles from './styles/styles'
import layer from './mixin/layer'
import { apply } from 'ol-mapbox-style'
import stylefunction from 'ol-mapbox-style/dist/stylefunction'

/**
 * MyvicMapVectorTileLayer provides support for Mapbox Vector Tile sources. It offers a declarative API for
 * describing layers as child components of MyvicMapCore, wrapping the functionality provided by OpenLayers.
 */
export default {
  name: 'MyvicMapVectorTileLayer',
  mixins: [layer],
  props: {
    /**
     * The url of the vector tile layer as a string.
     */
    url: {
      type: String,
      default: undefined
    },
    /**
     * The url of the layer as a function that constructs the URL as a string. Four parameters are provided to
     * the loader function: (extent, resolution, projection, vectorSource) => {}
     */
    urlFunction: {
      type: Function,
      default: undefined
    },
    /**
     * Custom loader for the vector tile layer. Four parameters are provided to the loader function:
     * (extent, resolution, projection, vectorSource) => {}
     */
    loader: {
      type: Function,
      default: undefined
    },
    /**
     * The format of the vector tile layer. Must be ```MVT```.
     */
    dataFormat: {
      type: String,
      required: true,
      validator: value => {
        return ['MVT'].includes(value)
      }
    },
    /**
     * Layer style defined as a single OpenLayers style object, an array or a function.
     */
    layerStyle: {
      type: undefined,
      default: undefined
    },
    /**
     * Method to use when applying styles through the ol-mapbox-style library. ```apply``` will create and style layers from
     * a Mapbox style source. ```stylefunction``` will create an Openlayers style function that can be used to style an
     * existing layer.
     */
    mapboxStyleMethod: {
      type: String,
      default: 'apply',
      validator: value => {
        return ['apply', 'stylefunction'].includes(value)
      }
    },
    /**
     * Mapbox style URL or object to be applied to the map by the ol-mapbox-style library
     */
    mapboxStyle: {
      type: undefined,
      default: undefined
    },
    /**
     * Source key or an array of layer ids from the Mapbox Style object. Controls which layers from the Mapbox style
     * are included in the style function created by the ol-mapbox-style library
     */
    mapboxStyleSource: {
      type: undefined,
      default: undefined
    },
    /**
     * Feature attribute to use for labelling (optional)
     */
    labelAttribute: {
      type: String,
      default: undefined
    },
    /**
     * Control if the default style should only display labels (not markers or shapes)
     */
    labelOnly: {
      type: Boolean,
      default: false
    },
    /**
     * Configure the layer render mode
     */
    renderMode: {
      type: String,
      default: 'hybrid'
    },
    /**
     * Enable or disable decluttering on the layer
     */
    declutter: {
      type: Boolean,
      default: true
    },
    /**
     * Enable or disable overlaps within the data source
     */
    overlaps: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    async url (newValue) {
      this.layerSource.setUrl(newValue)
      await this.layerSource.refresh()
    },
    async urlFunction (newValue) {
      this.layerSource.setUrl(newValue)
      await this.layerSource.refresh()
    },
    async loader (newValue) {
      await this.configureLayer()
    },
    async dataFormat (newValue) {
      await this.configureLayer()
    },
    async layerStyle (newValue) {
      await this.configureLayer()
    },
    async mapboxStyleMethod (newValue) {
      await this.configureLayer()
    },
    async mapboxStyle (newValue) {
      await this.configureLayer()
    },
    async mapboxStyleSource (newValue) {
      await this.configureLayer()
    },
    async labelAttribute (newValue) {
      await this.configureLayer()
    },
    async labelOnly (newValue) {
      await this.configureLayer()
    },
    async renderMode (newValue) {
      await this.configureLayer()
    },
    async declutter (newValue) {
      await this.configureLayer()
    },
    async overlaps (newValue) {
      await this.configureLayer()
    }
  },
  computed: {
    format: function () {
      switch (this.dataFormat) {
        case 'MVT':
          return new ol.format.MVT()
        default:
          return undefined
      }
    }
  },
  methods: {
    configureLayer: async function () {
      // Get map and remove any previous version of layer
      this.map = await this.getOLMap()
      if (this.map == null) { return }
      this.map.removeLayer(this.layer)

      // If url function is provided, wrap it in a function so we can pass in the vector source
      let urlFunctionWrapper
      if (this.urlFunction) {
        urlFunctionWrapper = (extent, resolution, projection) => {
          return this.urlFunction(extent, resolution, projection, this.layerSource)
        }
      }

      // If loader function is provided, wrap it in a function so we can pass in the vector source
      let loaderWrapper
      if (this.loader) {
        loaderWrapper = (extent, resolution, projection) => {
          this.loader(extent, resolution, projection, this.layerSource)
        }
      }

      // Create layer source
      this.layerSource = new ol.source.VectorTileSource({
        url: this.url,
        tileUrlFunction: urlFunctionWrapper,
        loader: loaderWrapper,
        format: this.format,
        projection: this.projection,
        overlaps: this.overlaps,
        attributions: this.attributions
      })

      // Create layer
      this.layer = new ol.layer.VectorTile({
        source: this.layerSource,
        renderMode: this.renderMode,
        opacity: this.opacity,
        extent: this.extent,
        zIndex: this.zIndex,
        style: this.mapboxStyle ? undefined : (this.layerStyle || styles.createDefaultStyleFunction(this.labelAttribute, this.labelOnly, false)),
        declutter: this.declutter,
        visible: this.visible
      })

      // Apply Mapbox styles if provided
      if (this.mapboxStyle) {
        if (this.mapboxStyleMethod === 'apply') {
          apply(this.map, this.mapboxStyle)
        } else if (this.mapboxStyleMethod === 'stylefunction') {
          stylefunction(this.layer, this.mapboxStyle, this.mapboxStyleSource)
        }
      }

      // Set flag used to check if popups are enabled for this layer
      this.layer.set('enablePopup', this.enablePopup)

      // Expose postrender event to users
      this.enablePostRenderEvent()

      // Add layer to map
      this.map.addLayer(this.layer)
    }
  }
}
</script>
