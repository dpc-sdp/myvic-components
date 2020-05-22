<template>
  <div class="yourvic-line-chart">
    <inner-chart
      :key="componentKey"
      :chartData="chartData"
      :options="options"
      :dataFormat="dataFormat"
      :styles="chartContainerStyles"
      :tabIndex="tabIndex"
      role="img"
      :aria-label="ariaLabel"
    />
  </div>
</template>

<script>
import InnerChart from './InnerChart'
import builder from './utils/buildChartOptions'
import _merge from 'lodash.merge'

/**
 * YourvicLineChart provides a generic and configurable line chart component
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
     * The data to display. Refer to the Data Format section below
     */
    data: {
      type: Object
    },
    /**
     * Whether to show a legend underneath the chart
     */
    showLegend: {
      type: Boolean,
      default: false
    },
    /**
     * The format of the data values. The choices are:
     * `normal`, `percentage`, `dollar`, `thousandDollar`
     */
    dataFormat: {
      type: String,
      default: 'normal'
    },
    /**
     * Customise the chart tab index
     */
    tabIndex: {
      type: Number,
      default: 0
    },
    /**
     * Customise the chart aria label
     */
    ariaLabel: {
      type: String,
      default: 'Line Chart'
    }
  },
  components: {
    InnerChart
  },
  data () {
    return {
      componentKey: 0
    }
  },
  computed: {
    chartContainerStyles () {
      return {
        position: 'relative',
        height: 'inherit',
        width: 'inherit'
      }
    },
    chartData: function () {
      if (!this.data) {
        return null
      }
      const chartSettings = {
        datasets: builder.getDatasetSettings(this.data)
      }
      const chartData = _merge({}, this.data, chartSettings)
      return chartData
    },
    options: function () {
      if (!this.data) {
        return null
      }
      const options = {
        maintainAspectRatio: false,
        responsive: true,
        title: builder.getTitle(this.title),
        scales: {
          xAxes: builder.getAxes('x', 'vertical', this.data, this.dataFormat),
          yAxes: builder.getAxes('y', 'vertical', this.data, this.dataFormat)
        },
        legend: builder.getLegend(this.showLegend),
        tooltips: builder.getTooltips('vertical', this.data, this.dataFormat),
        plugins: { datalabels: { display: false } }
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
  .yourvic-line-chart {
    position: relative;
    width: inherit;
    height: inherit;
  }
</style>
