// As some component can not be used in server side rendering, we export them here.
// Provide a plugin which others can use it in Nuxt as no ssr mode.
// Usage in Nuxt: https://nuxtjs.org/guide/plugins/#client-side-only

import YourVicFreeWifiMap from './YourVicFreeWifiMap.vue'

const install = Vue => {
  Vue.component('yourvicFreeWifiMap', YourVicFreeWifiMap)
}

export default {
  install
}

export { YourVicFreeWifiMap }
