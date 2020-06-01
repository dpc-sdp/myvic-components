export default {
  components: {},
  inject: ['getMap'],
  props: {
    /**
     * Optional bounding extent for layer rendering, defined as an array of numbers: ```[minx, miny, maxx, maxy]```.
     * The layer will not be rendered outside of this extent. Units must match the configured projection.
     */
    extent: {
      type: Array,
      default: () => undefined
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
     * The z-index for layer rendering. The layers will be ordered first by Z-index and then by the order in which they
     * are added.
     */
    zIndex: {
      type: Number,
      default: undefined
    }
  },
  data: function () {
    return {
      layer: null,
      layerSource: null
    }
  },
  watch: {
    async extent (newValue) {
      await this.configureLayer()
    },
    async opacity (newValue) {
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
  }
}
