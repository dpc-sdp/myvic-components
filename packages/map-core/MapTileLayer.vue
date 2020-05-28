<script>
import ol from './lib/ol'

/**
 * YourvicMapTileLayer provides support for OSM, XYZ, WMS and ArcGIS tiled map layers for YourvicMapCore. It offers a
 * declarative API for describing layers as child components of YourvicMapCore, wrapping the functionality provided by
 * an OpenLayers Tile layer and OSM, XYZ, TileWMS and TileArcGISRest data sources.
 */
export default {
  name: 'YourvicMapTileLayer',
  components: {},
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
     * The data source projection as an SRS identifier string. Defaults to the projection of the Map, which in
     * OpenLayers defaults to ```EPSG:3857``` (Web Mercator). ```EPSG:4326``` (WGS84) is also supported out of the box.
     * Experimental support for ```EPSG:4283``` (GDA94) is also provided.
     */
    projection: {
      type: String,
      default: undefined
    },
    /**
     * Optional bounding extent for layer rendering, defined as an array of numbers: ```[minx, miny, maxx, maxy]```.
     * The layer will not be rendered outside of this extent. Units must match the configured projection.
     */
    extent: {
      type: Array,
      default: () => undefined
    },
    /**
     * Attributions for the layer data source as an array of strings. Will be automatically displayed by the Map
     * attribution control if enabled.
     */
    attributions: {
      type: Array,
      default: () => []
    },
    /**
     * The opacity of the layer between 0 and 1 (inclusive). Default value is 1.
     */
    opacity: {
      type: Number,
      default: 1,
      validator: value => (value >= 0 && value <= 1)
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
    },
    /**
     * The z-index for layer rendering. The layers will be ordered first by Z-index and then by the order in which they
     * are added.
     */
    zIndex: {
      type: Number,
      default: undefined
    }
  },
  inject: ['getMap'],
  data: function () {
    return {
      layer: null,
      layerSource: null
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
    async projection (newValue) {
      await this.configureLayer()
    },
    async extent (newValue) {
      await this.configureLayer()
    },
    async attributions (newValue) {
      await this.configureLayer()
    },
    async opacity (newValue) {
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
    },
    async zIndex (newValue) {
      await this.configureLayer()
    }
  },
  async mounted () {
    await this.configureLayer()
  },
  render (createElement) {
    return null
  },
  methods: {
    configureLayer: async function () {
      // Get map and remove any previous version of layer
      if (this.getMap == null) {
        console.error('getMap was not provided, check that yourvic-tile-layer is a child of yourvic-map-core')
        return
      }
      let map = await this.getMap()
      if (map == null) { return }
      map.removeLayer(this.layer)
      // Create layer source
      switch (this.type) {
        case 'OSM':
          this.layerSource = new ol.source.OSM({
            projection: this.projection,
            attributions: this.attributions.concat([ol.source.OSMAttribution]),
            transition: this.transition
          })
          break
        case 'XYZ':
          this.layerSource = new ol.source.XYZ({
            url: this.url,
            projection: this.projection,
            attributions: this.attributions,
            transition: this.transition
          })
          break
        case 'WMS':
          this.layerSource = new ol.source.TileWMS({
            url: this.url,
            params: this.params,
            projection: this.projection,
            attributions: this.attributions,
            transition: this.transition,
            hidpi: this.highDPI,
            serverType: this.serverType
          })
          break
        case 'ArcGIS':
          this.layerSource = new ol.source.TileArcGISRest({
            url: this.url,
            params: this.params,
            projection: this.projection,
            attributions: this.attributions,
            transition: this.transition
          })
          break
        default:
          this.layerSource = null
      }
      // Create layer
      this.layer = new ol.layer.Tile({
        source: this.layerSource,
        opacity: this.opacity,
        extent: this.extent,
        zIndex: this.zIndex
      })
      // Add layer to map
      map.addLayer(this.layer)
    }
  }
}
</script>
