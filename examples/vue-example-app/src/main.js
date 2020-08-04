import Vue from 'vue'
import App from './App.vue'
import RplGlobal from '@dpc-sdp/ripple-global'
import router from './router'

// Install Ripple Global plugin
const rplOptions = {
  // Your custom options
  // https://github.com/dpc-sdp/ripple/tree/develop/packages/components/Atoms/Global#rploptions
}
Vue.use(RplGlobal, rplOptions)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
