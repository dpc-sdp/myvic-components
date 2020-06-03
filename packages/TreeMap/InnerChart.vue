<template>
  <div class="yourvic-treemap-chart">
    <canvas
      :id="componentKey"
      class="yourvic-treemap-chart-canvas"
      :tabIndex="tabIndex"
      role="img"
      :aria-label="ariaLabel"
      style="outline: none"
    />
  </div>
</template>

<script>
import Chart from 'chart.js'
// eslint-disable-next-line no-unused-vars
import treemap from 'chartjs-chart-treemap'
import builder from './utils/buildChartOptions'
import utils from '@dpc-sdp/yourvic-global/utils/charts'

const createChart = (instance) => {
  var ctx = document.getElementById(instance.componentKey)
  if (!ctx) return
  // eslint-disable-next-line no-unused-vars
  var myBarChart = new Chart(ctx, {
    type: 'treemap',
    data: instance.chartData,
    options: instance.options
  })
}

export default {
  props: {
    title: {
      type: String
    },
    data: {
      type: Array
    },
    valueAttr: {
      type: String,
      required: true
    },
    labelAttr: {
      type: String,
      required: true
    },
    dataFormat: {
      type: String,
      default: 'normal'
    },
    tabIndex: {
      type: Number,
      default: 0
    },
    ariaLabel: {
      type: String,
      default: 'Tree Map Chart'
    }
  },
  data () {
    return {
      componentKey: 0
    }
  },
  mounted () {
    createChart(this)
  },
  updated () {
    createChart(this)
  },
  computed: {
    chartData: function () {
      utils.validateTreeMapData(this.data)
      return builder.getChartData(this.data, this.valueAttr, this.labelAttr)
    },
    options: function () {
      // if (!this.data) {
      //   return null
      // }
      const options = {
        maintainAspectRatio: false,
        title: builder.getTitle(this.title),
        legend: { display: false },
        tooltips: builder.getTooltips(this.dataFormat),
        plugins: { datalabels: { display: false } }
      }
      return options
    }
  },
  watch: {
    // make options changes reactive (only chartData is reactive by default)
    chartData: function () {
      this.componentKey++
    },
    options: function () {
      this.componentKey++
    }
  }
}
</script>

<style lang="scss">
</style>
