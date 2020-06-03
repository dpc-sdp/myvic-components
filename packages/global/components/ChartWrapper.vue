<template>
  <div class="yourvic-chart-wrapper" ariaLabel="chart">
    <slot v-if="!gotError"></slot>
    <error v-if="gotError" :message="error.toString()" errorClass="chart" />
  </div>
</template>

<script>

import Error from './Error'
import catchError from '../mixins/catchError'

/**
 * ChartWrapper adds error handling to child chart components
 */
export default {
  components: { Error },
  mixins: [catchError],
  props: {
  }
}
</script>

<style lang="scss">
  .yourvic-chart-wrapper {
    position: relative;
    height: inherit;
    width: inherit;
  }
</style>
