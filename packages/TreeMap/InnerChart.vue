<template>
  <div class="myvic-treemap-chart">
    <canvas
      :id="componentKey"
      class="myvic-treemap-chart-canvas"
      :tabIndex="tabIndex"
      role="img"
      :aria-label="ariaLabel"
      :alt="shortDesc"
      :longDesc="longDesc"
      style="outline: none"
    />
    <chart-description v-if="longDesc" :longDesc="longDesc" cssClass="myvic-tree-map__long-description" />
  </div>
</template>

<script>
import Chart from 'chart.js'
// eslint-disable-next-line no-unused-vars
import treemap from 'chartjs-chart-treemap'
import builder from './utils/buildChartOptions'
import utils from '@dpc-sdp/myvic-global/utils/charts'
import ChartDescription from '@dpc-sdp/myvic-global/components/ChartDescription'

const createChart = (instance) => {
  var ctx = document.getElementById(instance.componentKey)
  if (!ctx) return
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'treemap',
    data: instance.chartData,
    options: instance.options
  })
}

export default {
  components: {
    ChartDescription
  },
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
    },
    /**
     *  Short description of the chart for accessibility purposes. This string will become the "alt" attribute
     */
    shortDesc: {
      type: String,
      default: ''
    },
    /**
     *  A URL that points to the long description of the chart for accessibility purposes
     */
    longDesc: {
      type: String
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
@import "~@dpc-sdp/myvic-global/styles/charts";
  .myvic-tree-map {
    &__long-description {
      padding-left: 0 !important;
    }
  }
</style>
