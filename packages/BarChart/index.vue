<template>
  <div class='myvic-bar-chart'>
    <component
      v-if='!gotError'
      :is='innerComponentName'
      :key='componentKey'
      :chartData='chartData'
      :options='options'
      :dataFormat='dataFormat'
      :styles='chartContainerStyles'
      :tabIndex='tabIndex'
      role='img'
      :aria-label='ariaLabel'
      :alt='shortDesc'
      :longDesc='longDesc'
    />
    <chart-description v-if='!gotError && longDesc' :longDesc='longDesc' />
    <error v-if='gotError' :message='error.toString()' errorClass='chart' />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import ChartDataLabels from 'chartjs-plugin-datalabels'
// eslint-disable-next-line no-unused-vars
import ChartAnnotation from 'chartjs-plugin-annotation'
import builder from './utils/buildChartOptions'
import _merge from 'lodash.merge'
import ChartDescription from '@dpc-sdp/myvic-global/components/ChartDescription'
import Error from '@dpc-sdp/myvic-global/components/Error'
import catchError from '@dpc-sdp/myvic-global/mixins/catchError'
import validateChartData from '@dpc-sdp/myvic-global/mixins/validateChartData'

/**
 * MyvicBarChart provides a generic and configurable bar chart component
 */
export default {
  components: {
    'InnerHorizontalChart': () => import('./InnerHorizontalChart'),
    'InnerChart': () => import('./InnerChart'),
    ChartDescription,
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
     * Titles for the primary and secondary axes. An Object with optional `primary` and `secondary` keys
     */
    axesTitles: {
      type: Object,
      default: () => ({})
    },
    /**
     * The data to display. Refer to the Data Format section below
     */
    data: {
      type: Object
    },
    /**
     * Whether to display data labels next to the bars. This setting is always false with a Stacked Bar Chart
     */
    showDataLabels: {
      type: Boolean,
      default: true
    },
    /**
     * An array of custom styles for each dataset. Refer to the Custom Styling section below
     */
    customDatasetStyles: {
      type: Array,
      default: () => []
    },
    /**
     * Annotations to display. Refer to [chartjs-plugin-annotation](https://www.chartjs.org/chartjs-plugin-annotation/guide/usage.html) for details
     */
    annotation: {
      type: Object,
      default: () => {}
    },
    /**
     * Custom scale limits for the primary data axis. An Object with optional `min` and `max` keys. Helpful for expanding the chart for context or for making room for annotations
     */
    scaleLimits: {
      type: Object,
      default: () => {}
    },
    /**
     * Whether to stack the datasets, creating a Stacked Bar Chart
     */
    stacked: {
      type: Boolean,
      default: false
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
     * `normal`, `percentage`, `thousand`, `dollar`, `thousandDollar`
     */
    dataFormat: {
      type: String,
      default: 'normal',
      validator: value => ['normal', 'percentage', 'thousand', 'dollar', 'thousandDollar'].includes(value)
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
    },
    /**
     *  Short description of the chart for accessibility purposes. This string will become the 'alt' attribute
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
          datasets: builder.getDatasetSettings(this.data, this.customDatasetStyles)
        }
        const chartData = _merge({}, this.data, chartSettings)
        return chartData
      } catch (error) {
        this.interceptError(error)
        return {}
      }
    },
    options: function () {
      try {
        const options = {
          maintainAspectRatio: false,
          responsive: true,
          title: builder.getTitle(this.title),
          scales: {
            xAxes: builder.getAxes('x', this.direction, this.data, this.axesTitles, this.dataFormat, this.stacked, this.scaleLimits),
            yAxes: builder.getAxes('y', this.direction, this.data, this.axesTitles, this.dataFormat, this.stacked, this.scaleLimits)
          },
          legend: builder.getLegend(this.showLegend),
          tooltips: builder.getTooltips(this.direction, this.dataFormat),
          plugins: builder.getPlugin(this.dataFormat, this.showDataLabels, this.stacked),
          annotation: this.annotation
        }
        return options
      } catch (error) {
        this.interceptError(error)
        return {}
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

<style lang='scss'>
@import '~@dpc-sdp/myvic-global/styles/charts';
  .myvic-bar-chart {
    position: relative;
    height: inherit;
    width: inherit;
    padding: $outer-padding;
  }
</style>
