import YourvicMapCore from './index.vue'
import YourvicMapVectorLayer from './MapVectorLayer'

export function mountMap (el, props) {
  // eslint-disable-next-line no-new
  new window.Vue({
    el,
    render: h => h(YourvicMapCore, { props })
  })
}

export function mountMapWithVectorLayer (el, mapProps, layerProps) {
  // eslint-disable-next-line no-new
  new window.Vue({
    el,
    render (h) {
      const vectorLayer = h(YourvicMapVectorLayer, { props: layerProps })

      return h(YourvicMapCore, { props: mapProps }, [vectorLayer])
    }
  })
}
