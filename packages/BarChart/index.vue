<template>
  <div class="yourvic-bar-chart">
    <inner-chart
      v-if="direction === 'vertical'"
      :key="componentKey"
      :chartData="chartData"
      :options="options"
      :dataFormat="dataFormat"
      :styles="chartContainerStyles"
      :tabIndex="tabIndex"
      role="img"
      :aria-label="ariaLabel"
    />
    <inner-horizontal-chart
      v-if="direction === 'horizontal'"
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
import InnerHorizontalChart from './InnerHorizontalChart'
// eslint-disable-next-line no-unused-vars
import ChartDataLabels from 'chartjs-plugin-datalabels'
import builder from './utils/buildChartOptions'
import _merge from 'lodash.merge'

/**
 * YourvicBarChart provides a generic and configurable bar chart component
 */
export default {
  props: {
    /**
     * Direction of bar chart: can be 'horizontal' or 'vertical'
     */
    direction: {
      type: String,
      default: 'horizontal'
    },
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
     *  Customise the chart aria label
     */
    ariaLabel: {
      type: String,
      default: 'Bar Chart'
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
    chartContainerStyles () {
      return {
        position: 'relative',
        height: 'inherit',
        width: 'inherit',
        outline: 'none'
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
          xAxes: builder.getAxes('x', this.direction, this.data, this.dataFormat),
          yAxes: builder.getAxes('y', this.direction, this.data, this.dataFormat)
        },
        legend: builder.getLegend(this.showLegend),
        tooltips: builder.getTooltips(this.direction, this.data, this.dataFormat),
        plugins: builder.getPlugin(this.dataFormat)
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
@import "../global/styles/charts";
  .yourvic-bar-chart {
    position: relative;
    height: inherit;
    width: inherit;
    padding: $outer-padding;
  }
</style>
