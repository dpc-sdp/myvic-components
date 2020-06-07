<script>
import ol from './lib/ol'
import layer from './mixin/layer'
import globalStyles from '@dpc-sdp/yourvic-global/styles/export.scss'

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
    },
    async projection (newValue) {
      await this.configureLayer()
    },
    async attributions (newValue) {
      await this.configureLayer()
    }
  },
  data: function () {
    return {
      defaultPointStyle: [
        new ol.style.Style({
          image: new ol.style.Circle({
            radius: 4,
            stroke: new ol.style.Stroke({
              color: globalStyles.fillDefault,
              width: 2
            }),
            fill: new ol.style.Fill({
              // color: globalStyles.fillDefaultHoverLight // throws assertion error during tests
              color: [0, 169, 224, 0.2]
            })
          })
        })
      ],
      defaultLineStyle: [
        new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: globalStyles.fillDefault,
            width: 3
          })
        })
      ],
      defaultPolygonStyle: [
        new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: globalStyles.fillDefault,
            width: 3
          }),
          fill: new ol.style.Fill({
            color: globalStyles.fillDefaultHoverLight
          })
        })
      ],
      defaultTextStyle: [
        new ol.style.Style({
          text: new ol.style.Text({
            font: 'normal 0.8rem "VIC-Regular", "Arial", "Helvetica", "sans-serif"',
            rotateWithView: false,
            placement: 'point',
            overflow: true,
            fill: new ol.style.Fill({
              color: globalStyles.titleColor
            }),
            stroke: new ol.style.Stroke({
              color: globalStyles.titleColor,
              width: 1
            })
          })
        })
      ]
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

      // If loader function is provided, wrap it in a function so we can pass in the vector source
      let loaderWrapper
      if (this.loader) {
        loaderWrapper = (extent, resolution, projection) => {
          this.loader(extent, resolution, projection, this.layerSource)
        }
      }

      // Create layer source
      this.layerSource = new ol.source.Vector({
        url: this.url || this.urlFunction,
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
        style: this.layerStyle || this.defaultStyleFunction,
        declutter: true
      })

      // Add layer to map
      this.map.addLayer(this.layer)
    },
    defaultStyleFunction: function (feature, resolution) {
      let geomType = feature.getGeometry().getType()
      let styles
      switch (geomType) {
        case ol.geom.GeometryType.POINT:
        case ol.geom.GeometryType.MULTI_POINT:
          styles = this.defaultPointStyle
          break
        case ol.geom.GeometryType.LINE_STRING:
        case ol.geom.GeometryType.MULTI_LINE_STRING:
          styles = this.defaultLineStyle
          break
        case ol.geom.GeometryType.POLYGON:
        case ol.geom.GeometryType.MULTI_POLYGON:
          styles = this.defaultPolygonStyle
          break
        case ol.geom.GeometryType.GEOMETRY_COLLECTION:
          styles = this.defaultPointStyle.concat(this.defaultLineStyle, this.defaultPolygonStyle)
          break
        default:
          styles = this.defaultPolygonStyle
      }

      if (this.labelAttribute) {
        let textStyles = this.defaultTextStyle[0]
        textStyles.getText().setText(feature.get(this.labelAttribute))
        styles.push(textStyles)
      }

      return styles
    }
  }
}
</script>
