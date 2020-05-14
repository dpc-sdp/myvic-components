<template>
  <div class="app-chart">
    <inner-chart v-if="direction === 'vertical'" :key="componentKey" :chartData="chartData" :options="options" />
    <inner-horizontal-chart v-if="direction === 'horizontal'" :key="componentKey" :chartData="chartData" :options="options" />
  </div>
</template>

<script>
import InnerChart from './InnerChart'
import InnerHorizontalChart from './InnerHorizontalChart'
import builder from './utils/buildChartOptions'
import _merge from 'lodash.merge'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    title: {
      type: String
    },
    data: {
      type: Object
    },
    showLegend: {
      type: Boolean,
      default: false
    }
  },
  components: {
    InnerChart,
    InnerHorizontalChart
  },
  data () {
    return {
      componentKey: 0
    }
  },
  computed: {
    chartData: function () {
      const chartSettings = {
        datasets: builder.getDatasetSettings(this.data)
      }
      const chartData = _merge({}, this.data, chartSettings)
      return chartData
    },
    options: function () {
      const options = {
        title: builder.getTitle(this.title),
        scales: {
          xAxes: builder.getXAxes(this.direction, this.data),
          yAxes: builder.getYAxes(this.direction, this.data)
        },
        legend: builder.getLegend(this.showLegend)
      }
      return options
    }
  },
  watch: {
    // make options changes reactive (only chartData is reactive by default)
    options: function () {
      this.componentKey++
    }
  }
}
</script>

<style lang="scss">
  @import '../core/styles/main';
  .app-chart {
    position: relative;
    width: 400px;
    height: 400px;
  }
</style>
