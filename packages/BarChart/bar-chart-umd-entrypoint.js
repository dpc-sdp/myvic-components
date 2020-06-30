import YourVicBarChart from './index.vue'

export function mountBarChart (el, props) {
  // eslint-disable-next-line no-new
  new window.Vue({
    el,
    render: h => h(YourVicBarChart, { props })
  })
}
