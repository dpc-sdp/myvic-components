<template>
  <div class="yourvic-treemap-chart">
    <canvas
      :id="componentKey"
      class="yourvic-treemap-chart-canvas"
      :tabIndex="tabIndex"
      role="img"
      :aria-label="ariaLabel"
      :alt="shortDesc"
      :longDesc="longDesc"
      style="outline: none"
    />
    <a class="yourvic-tree-map__long-description" v-if="longDesc" :href="longDesc">Chart Description</a>
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
  var myChart = new Chart(ctx, {
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
@import "../global/styles/charts";
  .yourvic-tree-map {
    &__long-description {
    font-size: 12px;
    font-family: 'Vic-Medium', 'sans-serif';
    padding: 5px 5px 5px 0;
    color: $gridLabelColor
    }
  }
</style>
