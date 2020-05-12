<template>
  <div class="app-chart">
    <canvas :id="id" class="chart-canvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
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
  },
  mounted () {
    if (!this.data) return
    let chartSettings = {
      datasets: [
        {
          backgroundColor: '#00a9e0'
        }
      ]
    }

    let chartData = _merge({}, this.data, chartSettings)
    var ctx = document.getElementById(this.id)
    // eslint-disable-next-line no-unused-vars
    var myBarChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              offsetGridLines: true
            }
          }]
        }
      }
    })
  },
  computed: {
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
