import Vue from 'vue'
import YourvicMapCore from '@dpc-sdp/yourvic-map-core'
import YourvicMapTileLayer from '@dpc-sdp/yourvic-map-core/MapTileLayer'
import YourvicMapVectorLayer from '@dpc-sdp/yourvic-map-core/MapVectorLayer'
import YourvicMapVectorTileLayer from '@dpc-sdp/yourvic-map-core/MapVectorTileLayer'

export function mountMap (el, props) {
  // eslint-disable-next-line no-new
  new Vue({
    el,
    render: h => h(YourvicMapCore, { props })
  })
}

export function mountMapWithTileLayer (el, mapProps, layerProps) {
  // eslint-disable-next-line no-new
  new Vue({
    el,
    render (h) {
      const tileLayer = h(YourvicMapTileLayer, { props: layerProps })

      return h(YourvicMapCore, { props: mapProps }, [tileLayer])
    }
  })
}

export function mountMapWithVectorLayer (el, mapProps, layerProps) {
  // eslint-disable-next-line no-new
  new Vue({
    el,
    render (h) {
      const vectorLayer = h(YourvicMapVectorLayer, { props: layerProps })

      return h(YourvicMapCore, { props: mapProps }, [vectorLayer])
    }
  })
}

export function mountMapWithVectorTileLayer (el, mapProps, layerProps) {
  // eslint-disable-next-line no-new
  new Vue({
    el,
    render (h) {
      const vectorTileLayer = h(YourvicMapVectorTileLayer, { props: layerProps })

      return h(YourvicMapCore, { props: mapProps }, [vectorTileLayer])
    }
  })
}
