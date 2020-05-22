<template>
  <div class="yourvic-treemap-chart">
    <canvas :id="componentKey" class="yourvic-treemap-chart-canvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
// eslint-disable-next-line no-unused-vars
import treemap from 'chartjs-chart-treemap'
import builder from './utils/buildChartOptions'

const createChart = (instance) => {
  var ctx = document.getElementById(instance.componentKey)
  // eslint-disable-next-line no-unused-vars
  var myBarChart = new Chart(ctx, {
    type: 'treemap',
    data: instance.chartData,
    options: instance.options
  })
}

/**
 * TreeMap provides a generic and configurable tree map chart component
 */
export default {
  props: {
    /**
     * Title that appears above the chart. If this is null then the title and its container will not render at all
     */
    title: {
      type: String
    },
    /**
     * The data to display. This should be an array of objects. Each object should have two attributes. Refer to the `valueAttr` and `labelAttr` props for details
     */
    data: {
      type: Array
    },
    /**
     * the attribute of the dataset that will be used to determine the area of the tree map squares
     */
    valueAttr: {
      type: String,
      required: true
    },
    /**
     * the attribute of the dataset that will be used to label the tree map squares
     */
    labelAttr: {
      type: String,
      required: true
    },
    /**
     * The format of the data values. This will be used to format the value in the tooltips. The choices are:
     * `normal`, `percentage`, `dollar`, `thousandDollar`
     */
    dataFormat: {
      type: String,
      default: 'normal'
    }
  },
  components: {},
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
      return builder.getChartData(this.data, this.valueAttr, this.labelAttr)
    },
    options: function () {
      if (!this.data) {
        return null
      }
      const options = {
        maintainAspectRatio: false,
        title: builder.getTitle(this.title),
        legend: { display: false },
        tooltips: builder.getTooltips(this.dataFormat)
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
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  .yourvic-treemap-chart {
    position: relative;
    height: inherit;
    width: inherit;
  }
</style>
