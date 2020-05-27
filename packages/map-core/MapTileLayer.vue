<script>
import ol from './lib/ol'

/**
 * YourvicMapTileLayer provides support for standard tile map layers for YourvicMapCore
 */
export default {
  name: 'YourvicMapTileLayer',
  components: {},
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ['OSM', 'XYZ', 'WMS', 'ArcGIS'].includes(value)
    },
    url: {
      type: String,
      default: undefined
    },
    params: {
      type: Object,
      default: () => ({})
    },
    projection: {
      type: String,
      default: undefined
    },
    extent: {
      type: Array,
      default: () => undefined
    },
    attributions: {
      type: Array,
      default: () => []
    },
    opacity: {
      type: Number,
      default: 1
    },
    transition: {
      type: Number,
      default: 500
    },
    highDPI: {
      type: Boolean,
      default: true
    },
    serverType: {
      type: String,
      default: undefined
    },
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
