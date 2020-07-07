<template>
  <div id="app">
    <layout />
  </div>
</template>

<script>
import Layout from './components/Layout.vue'

export default {
  name: 'app',
  components: {
    Layout
  }
}
</script>

<style lang="scss">
// Import global style in app level.
@import "~@dpc-sdp/ripple-global/style";

#app {
  text-align: center;
}
</style>
