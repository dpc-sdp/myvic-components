<template>
  <div class="yourvic-bar-chart">
    <component
      v-if="!gotError"
      :is="innerComponentName"
      :key="componentKey"
      :chartData="chartData"
      :options="options"
      :dataFormat="dataFormat"
      :styles="chartContainerStyles"
      :tabIndex="tabIndex"
      role="img"
      :aria-label="ariaLabel"
    />
    <error v-if="gotError" :message="error.toString()" errorClass="chart" />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import ChartDataLabels from 'chartjs-plugin-datalabels'
import builder from './utils/buildChartOptions'
import _merge from 'lodash.merge'
import Error from '@dpc-sdp/yourvic-global/components/Error'
import catchError from '@dpc-sdp/yourvic-global/mixins/catchError'
import validateChartData from '@dpc-sdp/yourvic-global/mixins/validateChartData'

/**
 * YourvicBarChart provides a generic and configurable bar chart component
 */
export default {
  components: {
    'InnerHorizontalChart': () => import(`./${'InnerHorizontalChart'}`),
    'InnerChart': () => import(`./${'InnerChart'}`),
    Error
  },
  mixins: [catchError, validateChartData],
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
  data () {
    return {
      componentKey: 0
    }
  },
  computed: {
    innerComponentName: function () {
      return this.direction === 'vertical' ? 'InnerChart' : 'InnerHorizontalChart'
    },
    chartContainerStyles () {
      return {
        position: 'relative',
        height: 'inherit',
        width: 'inherit',
        outline: 'none'
      }
    },
    chartData: function () {
      try {
        const chartSettings = {
          datasets: builder.getDatasetSettings(this.data)
        }
        const chartData = _merge({}, this.data, chartSettings)
        return chartData
      } catch (error) {
        this.interceptError(error)
      }
    },
    options: function () {
      try {
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
      } catch (error) {
        this.interceptError(error)
      }
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
