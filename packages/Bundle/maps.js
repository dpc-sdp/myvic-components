import Vue from 'vue'
import MyvicMapCore from '@dpc-sdp/myvic-map-core'
import MyvicMapTileLayer from '@dpc-sdp/myvic-map-core/MapTileLayer'
import MyvicMapVectorLayer from '@dpc-sdp/myvic-map-core/MapVectorLayer'
import MyvicMapVectorTileLayer from '@dpc-sdp/myvic-map-core/MapVectorTileLayer'

export function mountMap (el, props) {
  // eslint-disable-next-line no-new
  new Vue({
    el,
    render: h => h(MyvicMapCore, { props })
  })
}

export function mountMapWithTileLayer (el, mapProps, layerProps) {
  // eslint-disable-next-line no-new
  new Vue({
    el,
    render (h) {
      const tileLayer = h(MyvicMapTileLayer, { props: layerProps })

      return h(MyvicMapCore, { props: mapProps }, [tileLayer])
    }
  })
}

export function mountMapWithVectorLayer (el, mapProps, layerProps) {
  // eslint-disable-next-line no-new
  new Vue({
    el,
    render (h) {
      const vectorLayer = h(MyvicMapVectorLayer, { props: layerProps })

      return h(MyvicMapCore, { props: mapProps }, [vectorLayer])
    }
  })
}

export function mountMapWithVectorTileLayer (el, mapProps, layerProps) {
  // eslint-disable-next-line no-new
  new Vue({
    el,
    render (h) {
      const vectorTileLayer = h(MyvicMapVectorTileLayer, { props: layerProps })

      return h(MyvicMapCore, { props: mapProps }, [vectorTileLayer])
    }
  })
}
