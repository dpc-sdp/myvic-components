<template>
  <chart-wrapper class="yourvic-treemap-chart">
    <inner-chart v-bind="$props" />
  </chart-wrapper>
</template>

<script>
import InnerChart from './InnerChart'
import ChartWrapper from '@dpc-sdp/yourvic-global/components/ChartWrapper'

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
      default: 'Tree Map Chart'
    }
  },
  components: {
    ChartWrapper,
    InnerChart
  }
}
</script>

<style lang="scss">
  .yourvic-treemap-chart {
    position: relative;
    height: inherit;
    width: inherit;
  }
</style>
