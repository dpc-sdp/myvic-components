<script>
import ol from './lib/ol'
import styles from './styles/styles'
import layer from './mixin/layer'

/**
 * MyvicMapVectorLayer provides support for vector sources such as WFS, ArcGIS Feature Server and GeoJSON files for
 * MyvicMapCore. It offers a declarative API for describing layers as child components of MyvicMapCore, wrapping
 * the functionality provided by OpenLayers.
 */
export default {
  name: 'MyvicMapVectorLayer',
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
     * Array of OL Features to display in the Vector Layer
     */
    features: {
      type: Array,
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
     * Control if the default style should only display labels (not markers or shapes)
     */
    labelOnly: {
      type: Boolean,
      default: false
    },
    /**
     * Whether to cluster the point features
     */
    clustering: {
      type: Boolean,
      default: false
    },
    /**
     * Distance between clusters
     */
    clusterDistance: {
      type: Number,
      default: 40
    },
    /**
     * Layer style for the clustered points defined as a single OpenLayers style object, an array or a function.
     */
    clusterPointStyle: {
      type: undefined,
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
     * Configure whether the layer should automatically zoom to its extent when loaded or reconfigured
     * (using postrender)
     */
    zoomToExtent: {
      type: Boolean,
      default: false
    },
    zoomDuration: {
      type: Number,
      default: 1000
    }
  },
  watch: {
    async url (newValue) {
      await this.configureLayer()
    },
    async urlFunction (newValue) {
      await this.configureLayer()
    },
    async loader (newValue) {
      await this.configureLayer()
    },
    async features (newValue) {
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
    async labelOnly (newValue) {
      await this.configureLayer()
    },
    async declutter (newValue) {
      await this.configureLayer()
    },
    async overlaps (newValue) {
      await this.configureLayer()
    },
    async zoomToExtent (newValue) {
      await this.configureLayer()
    },
    async zoomDuration (newValue) {
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
      if (this.map == null) {
        return
      }
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
        features: this.features,
        format: this.format,
        strategy: this.strategy,
        projection: this.projection,
        overlaps: this.overlaps,
        attributions: this.attributions
      })

      if (this.clustering) {
        this.clusterSource = new ol.source.ClusterSource({
          source: this.layerSource,
          distance: this.clusterDistance
        })
      }
      const isIE = (navigator.appName === 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)))

      const LayerConstructor = this.clustering && !isIE ? ol.source.AnimatedCluster : ol.layer.Vector

      // Create layer
      this.layer = new LayerConstructor({
        source: this.clustering ? this.clusterSource : this.layerSource,
        opacity: this.opacity,
        extent: this.extent,
        zIndex: this.zIndex,
        style: this.getLayerStyle(),
        animationDuration: this.clustering ? 600 : undefined,
        declutter: this.declutter,
        visible: this.visible
      })

      // Set flag used to check if popups are enabled for this layer
      this.layer.set('enablePopup', this.enablePopup)

      // Expose postrender event to users
      this.enablePostRenderEvent()

      // Auto Zoom to layer extent on source change if enabled
      if (this.zoomToExtent) {
        // Check if the layer is 'ready' immediately
        if (this.layerSource.getState() === 'ready') {
          try {
            this.zoomToLayerExtent(60, this.zoomDuration)
          } catch (e) {}
        }
        // On 'change', zoom to extent
        this.layerSource.on('change', (event) => {
          if (this.layerSource.getState() === 'ready') {
            this.zoomToLayerExtent(60, this.zoomDuration)
          }
        })
      }

      // Add layer to map
      this.map.addLayer(this.layer)
    },
    zoomToLayerExtent: function (padding, duration) {
      let extent = this.layerSource.getExtent()
      if (extent) {
        this.map.getView().fit(
          this.layerSource.getExtent(),
          {
            padding: [padding, padding, padding, padding],
            duration,
            constrainResolution: false
          }
        )
      }
    },
    callIfFunction: function (thing, parameters) {
      if (typeof thing === 'function') return thing(parameters)
      return thing
    },
    getLayerStyle: function () {
      const unclusteredStyle = this.layerStyle || styles.createDefaultStyleFunction(this.labelAttribute, this.labelOnly, false)
      return this.clustering ? this.getClusteringStyle(unclusteredStyle) : unclusteredStyle
    },
    getClusteringStyle: function (unclusteredStyle) {
      return (feature) => {
        const features = feature.get('features')
        if (features.length > 1) {
          return this.callIfFunction(this.clusterPointStyle, features) || styles.createDefaultClusteringStyleFunction(features)
        } else {
          return this.callIfFunction(unclusteredStyle, features[0])
        }
      }
    }
  }
}
</script>
