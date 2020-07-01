import Vue from 'vue'
import YourvicMapCore from '@dpc-sdp/yourvic-map-core'
import YourvicMapVectorLayer from '@dpc-sdp/yourvic-map-core/MapVectorLayer'

export function mountMap (el, props) {
  // eslint-disable-next-line no-new
  new Vue({
    el,
    render: h => h(YourvicMapCore, { props })
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
