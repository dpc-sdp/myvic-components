import Vue from 'vue'
import App from './App.vue'
import Bundle1BarChart from './pages/Bundle1BarChart.vue'
import Bundle2Map from './pages/Bundle2Map.vue'
import Bundle3BarChart from './pages/Bundle3BarChart.vue'
import Bundle3Map from './pages/Bundle3Map.vue'
import SampleSiteBarChart from './pages/SampleSiteBarChart.vue'
import SampleSiteLineChartLabour from './pages/SampleSiteLineChartLabour.vue'
import SampleSiteLineChartVisitors from './pages/SampleSiteLineChartVisitors.vue'
import SampleSiteMap from './pages/SampleSiteMap.vue'
import SampleSitePieChartDecrease from './pages/SampleSitePieChartDecrease.vue'
import SampleSitePieChartIncrease from './pages/SampleSitePieChartIncrease.vue'
import SampleSiteTreeMap from './pages/SampleSiteTreeMap.vue'
import RplGlobal from '@dpc-sdp/ripple-global'

// Install Ripple Global plugin
const rplOptions = {
  // Your custom options
  // https://github.com/dpc-sdp/ripple/tree/develop/packages/components/Atoms/Global#rploptions
}
Vue.use(RplGlobal, rplOptions)

Vue.config.productionTip = false

const routes = {
  '/': App,
  '/bundle-1-bar-chart': Bundle1BarChart,
  '/bundle-2-map': Bundle2Map,
  '/bundle-3-bar-chart': Bundle3BarChart,
  '/bundle-3-map': Bundle3Map,
  '/sample-site-bar-chart': SampleSiteBarChart,
  '/sample-site-line-chart-labour': SampleSiteLineChartLabour,
  '/sample-site-line-chart-visitors': SampleSiteLineChartVisitors,
  '/sample-site-map': SampleSiteMap,
  '/sample-site-pie-chart-decrease': SampleSitePieChartDecrease,
  '/sample-site-pie-chart-increase': SampleSitePieChartIncrease,
  '/sample-site-tree-map': SampleSiteTreeMap,
}

new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || App
    }
  },
  render (h) { return h(this.ViewComponent) }
}).$mount('#app')
