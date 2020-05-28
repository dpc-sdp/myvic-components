<template>
  <chart-wrapper>
    <bar-chart v-bind="$props" />
  </chart-wrapper>
</template>

<script>
import BarChart from './BarChart'
import ChartWrapper from '../global/components/ChartWrapper'

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
    ChartWrapper,
    BarChart
  }
}
</script>

<style lang="scss">
</style>
