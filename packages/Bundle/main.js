import Vue from 'vue'
import YourVicBarChart from '@dpc-sdp/yourvic-bar-chart'
import YourVicToggleList from '@dpc-sdp/yourvic-toggle-list'

export function mountBarChart (el, props) {
  // eslint-disable-next-line no-new
  new Vue({
    el,
    render: h => h(YourVicBarChart, { props })
  })
}

export function mountToggleList (el, props) {
  // eslint-disable-next-line no-new
  new Vue({
    el,
    render: h => h(YourVicToggleList, { props })
  })
}
