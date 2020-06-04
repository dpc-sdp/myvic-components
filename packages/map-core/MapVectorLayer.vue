<script>
import ol from './lib/ol'
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
     * The url of the vector layer as a function that accepts an extent and projection and constructs the
     * URL as a string.
     */
    urlFunction: {
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
     * The data source projection as an SRS identifier string. Defaults to the projection of the Map, which in
     * OpenLayers defaults to ```EPSG:3857``` (Web Mercator). ```EPSG:4326``` (WGS84) is also supported out of the box.
     * Experimental support for ```EPSG:4283``` (GDA94) is also provided.
     */
    projection: {
      type: String,
      default: undefined
    },
    /**
     * Attributions for the layer data source as an array of strings. Will be automatically displayed by the Map
     * attribution control if enabled.
     */
    attributions: {
      type: Array,
      default: () => []
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
    async dataFormat (newValue) {
      await this.configureLayer()
    },
    async loadingStrategy (newValue) {
      await this.configureLayer()
    },
    async projection (newValue) {
      await this.configureLayer()
    },
    async attributions (newValue) {
      await this.configureLayer()
    }
  },
  data: function () {
    return {}
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

      // Create layer source
      this.layerSource = new ol.source.Vector({
        url: this.url || this.urlFunction,
        format: this.format,
        strategy: this.strategy,
        projection: this.projection,
        attributions: this.attributions.concat([ol.source.OSMAttribution])
      })

      // Create layer
      this.layer = new ol.layer.Vector({
        source: this.layerSource,
        opacity: this.opacity,
        extent: this.extent,
        zIndex: this.zIndex,
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 255, 1.0)',
            width: 2
          })
        })
      })

      // Add layer to map
      this.map.addLayer(this.layer)
    }
  }
}
</script>
