<template>
  <div class="app-chart">
    <inner-chart :chartData="chartData" :options="options" />
  </div>
</template>

<script>
import InnerChart from './InnerChart.js'
import _merge from 'lodash.merge'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    data: {
      type: Object
    }
  },
  components: {
    InnerChart
  },
  computed: {
    chartData: function () {
      let chartSettings = {
        datasets: [
          {
            backgroundColor: '#00a9e0'
          }
        ]
      }

      let chartData = _merge({}, this.data, chartSettings)
      return chartData
    },
    options: function () {
      const options = {
        scales: {
          xAxes: [{
            gridLines: {
              offsetGridLines: true
            }
          }]
        }
      }
      return options
    }
  }
}
</script>

<style lang="scss">
  .app-chart {
    position: relative;
    width: 500px;
    height: 500px;
  }
</style>
