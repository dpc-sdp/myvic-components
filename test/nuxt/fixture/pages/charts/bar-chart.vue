<template>
  <div>
    <your-vic-bar-chart title="test bar chart" :data="chartData" />
  </div>
</template>

<script>
import YourVicBarChart from '@dpc-sdp/yourvic-bar-chart'
import { chartData } from '@dpc-sdp/yourvic-bar-chart/storiesConstants.js'

export default {
  components: {
    YourVicBarChart
  },
  data () {
    return {
      chartData: chartData
    }
  }
}
</script>
