<template>
  <div>
    <my-vic-bar-chart title="test bar chart" :data="chartData" />
  </div>
</template>

<script>
import MyVicBarChart from '@dpc-sdp/myvic-bar-chart'
import { chartData } from '@dpc-sdp/myvic-bar-chart/storiesConstants.js'

export default {
  components: {
    MyVicBarChart
  },
  data () {
    return {
      chartData: chartData
    }
  }
}
</script>
