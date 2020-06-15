<script>
import ol from './lib/ol'
import styles from './styles/styles'
import layer from './mixin/layer'

/**
 * YourvicMapVectorLayer provides support for vector sources such as WFS, ArcGIS Feature Server and GeoJSON files for
 * YourvicMapCore. It offers a declarative API for describing layers as child components of YourvicMapCore, wrapping
 * the functionality provided by OpenLayers.
 */
export default {
  name: 'YourvicMapVectorLayer',
  mixins: [layer],
  props: {
    /**
     * The url of the vector layer as a string. This property takes precedence if both url and urlFunction are provided.
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
     * Custom loader for the vector layer. Four parameters are provided to the loader function:
     * (extent, resolution, projection, vectorSource) => {}
     */
    loader: {
      type: Function,
      default: undefined
    },
    /**
     * The format of the vector layer. Must be ```GeoJSON```, ```EsriJSON``` or ```WFS```
     */
    dataFormat: {
      type: String,
      required: true,
      validator: value => {
        return ['GeoJSON', 'EsriJSON', 'WFS'].includes(value)
      }
    },
    /**
     * The loading strategy for the vector layer. Supports ```all```, ```bbox``` or ```tile```.
     */
    loadingStrategy: {
      type: String,
      validator: value => {
        return ['all', 'bbox', 'tile'].includes(value)
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
     * Feature attribute to use for labelling (optional)
     */
    labelAttribute: {
      type: String,
      default: undefined
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
    async loadingStrategy (newValue) {
      await this.configureLayer()
    },
    async layerStyle (newValue) {
      await this.configureLayer()
    },
    async labelAttribute (newValue) {
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
        case 'GeoJSON':
          return new ol.format.GeoJSON()
        case 'EsriJSON':
          return new ol.format.EsriJSON()
        case 'WFS':
          return new ol.format.WFS()
        default:
          return undefined
      }
    },
    strategy: function () {
      switch (this.loadingStrategy) {
        case 'bbox':
          return ol.loadingstrategy.bbox
        case 'tile':
          return ol.loadingstrategy.tile((ol.tilegrid.createXYZ({
            tileSize: 512
          })))
        default:
          return undefined // defaults to 'all' strategy
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
      this.layerSource = new ol.source.Vector({
        url: this.url || urlFunctionWrapper,
        loader: loaderWrapper,
        format: this.format,
        strategy: this.strategy,
        projection: this.projection,
        overlaps: this.overlaps,
        attributions: this.attributions.concat([ol.source.OSMAttribution])
      })

      // Create layer
      this.layer = new ol.layer.Vector({
        source: this.layerSource,
        opacity: this.opacity,
        extent: this.extent,
        zIndex: this.zIndex,
        style: this.layerStyle || styles.createDefaultStyleFunction(this.labelAttribute),
        declutter: true
      })

      // Add layer to map
      this.map.addLayer(this.layer)
    }
  }
}
</script>
