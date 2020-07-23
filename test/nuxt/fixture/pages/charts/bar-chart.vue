<template>
  <div>
    <myvic-bar-chart title="test bar chart" :data="chartData" />
  </div>
</template>

<script>
import MyvicBarChart from '@dpc-sdp/myvic-bar-chart'
import { chartData } from '@dpc-sdp/myvic-bar-chart/storiesConstants.js'

export default {
  components: {
    MyvicBarChart
  },
  data () {
    return {
      chartData: chartData
    }
  }
}
</script>
