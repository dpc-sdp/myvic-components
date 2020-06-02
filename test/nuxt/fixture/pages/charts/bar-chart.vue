<template>
  <div>
    <your-vic-bar-chart title="test bar chart" :data="chartData" />
  </div>
</template>

<script>
import YourVicBarChart from '~~/packages/BarChart'
import { chartData } from '~~/packages/BarChart/storiesConstants.js'

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
