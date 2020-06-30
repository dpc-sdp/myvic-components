import YourvicMapCore from '@dpc-sdp/yourvic-map-core'
import YourvicMapVectorLayer from '@dpc-sdp/yourvic-map-core/MapVectorLayer'
import YourVicBarChart from '@dpc-sdp/yourvic-bar-chart'
import YourVicToggleList from '@dpc-sdp/yourvic-toggle-list'

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

export function mountBarChart (el, props) {
  // eslint-disable-next-line no-new
  new window.Vue({
    el,
    render: h => h(YourVicBarChart, { props })
  })
}

export function mountToggleList (el, props) {
  // eslint-disable-next-line no-new
  new window.Vue({
    el,
    render: h => h(YourVicToggleList, { props })
  })
}
