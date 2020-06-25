<script>
import ol from './lib/ol'
import layer from './mixin/layer'

/**
 * YourvicMapTileLayer provides support for OSM, XYZ, WMS and ArcGIS tiled map layers for YourvicMapCore. It offers a
 * declarative API for describing layers as child components of YourvicMapCore, wrapping the functionality provided by
 * an OpenLayers Tile layer and OSM, XYZ, TileWMS and TileArcGISRest data sources.
 */
export default {
  name: 'YourvicMapTileLayer',
  mixins: [layer],
  props: {
    /**
     * The type of the tile layer. Must be ```OSM```, ```XYZ```, ```WMS``` or ```ArcGIS```
     */
    type: {
      type: String,
      required: true,
      validator: value => ['OSM', 'XYZ', 'WMS', 'ArcGIS'].includes(value)
    },
    /**
     * The url of the tile layer. Not required for 'OSM' layers.
     */
    url: {
      type: String,
      default: undefined
    },
    /**
     * Additional service specific parameters passed through for ```WMS``` and ```ArcGIS``` tile layers. For ```WMS```
     * layers a ```LAYERS``` property must be specified.
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * Optional tile size as an array of numbers: ```[width, height]```. If undefined, will default to 256x256 or
     * 512x512 if using hidpi.
     */
    tileSize: {
      type: Array,
      default: () => undefined
    },
    /**
     * Duration of the opacity transition when rendering map tiles. To disable transition, set to 0.
     */
    transition: {
      type: Number,
      default: 500
    },
    /**
     * Request high DPI tiles for high resolution displays. Defaults to true.
     */
    highDPI: {
      type: Boolean,
      default: true
    },
    /**
     * The type of the remote WMS server. Only used for WMS layers when high DPI is true.
     */
    serverType: {
      type: String,
      default: undefined,
      validator: value => ['geoserver', 'mapserver', 'qgis', 'carmentaserver'].includes(value) || value === undefined
    }
  },
  watch: {
    async type (newValue) {
      await this.configureLayer()
    },
    async url (newValue) {
      await this.configureLayer()
    },
    async params (newValue) {
      await this.configureLayer()
    },
    async tileSize (newValue) {
      await this.configureLayer()
    },
    async transition (newValue) {
      await this.configureLayer()
    },
    async highDPI (newValue) {
      await this.configureLayer()
    },
    async serverType (newValue) {
      await this.configureLayer()
    }
  },
  computed: {
    tileGrid: function () {
      if (this.map === undefined || this.tileSize === undefined) return undefined
      else {
        return ol.createTileGrid(this.map.getView(), 25, this.tileSize)
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
      switch (this.type) {
        case 'OSM':
          this.layerSource = await this.createOSMLayerSource()
          break
        case 'XYZ':
          this.layerSource = await this.createXYZLayerSource()
          break
        case 'WMS':
          this.layerSource = await this.createWMSLayerSource()
          break
        case 'ArcGIS':
          this.layerSource = await this.createArcGISLayerSource()
          break
        default:
          this.layerSource = null
      }

      // Create layer
      this.layer = new ol.layer.Tile({
        source: this.layerSource,
        opacity: this.opacity,
        extent: this.extent,
        zIndex: this.zIndex,
        visible: this.visible
      })

      // Expose postrender event to users
      this.enablePostRenderEvent()

      // Add layer to map
      this.map.addLayer(this.layer)
    },
    createOSMLayerSource: async function () {
      return new ol.source.OSM({
        projection: this.projection,
        attributions: this.attributions.concat([ol.source.OSMAttribution]),
        transition: this.transition
      })
    },
    createXYZLayerSource: async function () {
      return new ol.source.XYZ({
        url: this.url,
        projection: this.projection,
        tileSize: this.tileSize,
        attributions: this.attributions,
        transition: this.transition
      })
    },
    createWMSLayerSource: async function () {
      return new ol.source.TileWMS({
        url: this.url,
        params: this.params,
        projection: this.projection,
        tileGrid: this.tileGrid,
        attributions: this.attributions,
        transition: this.transition,
        hidpi: this.highDPI,
        serverType: this.serverType
      })
    },
    createArcGISLayerSource: async function () {
      return new ol.source.TileArcGISRest({
        url: this.url,
        params: this.params,
        projection: this.projection,
        tileGrid: this.tileGrid,
        attributions: this.attributions,
        transition: this.transition
      })
    }
  }
}
</script>
