import BarChart from './index.vue'
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs'
import _merge from 'lodash.merge'

export default {
  title: 'Bar Chart',
  decorators: [withKnobs]
}

const barChartTemplate = `<bar-chart :id="id" :title="title" :direction="direction" :data="data" :showLegend="showLegend" />`

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [40, 20, 12, 52, 10, 39]
    }
  ]
}

const dualChartData = _merge({}, chartData)
dualChartData.datasets.push({
  label: 'Dataset 2',
  data: [35, 14, 11, 42, 12, 46]
})

export const Default = () => ({
  decorators: [withKnobs],
  components: { BarChart },
  template: barChartTemplate,
  props: {
    id: {
      default: () => 'bar-chart-default'
    },
    direction: {
      default: select('direction', { horizontal: 'horizontal', vertical: 'vertical' }, 'horizontal')
    },
    title: {
      default: text('title', undefined)
    },
    data: {
      default: object('data', chartData)
    },
    showLegend: {
      default: boolean('showLegend', false)
    }
  }
})

export const WithTitleAndLegend = () => ({
  components: { BarChart },
  template: barChartTemplate,
  props: {
    id: { default: () => 'bar-chart-default' },
    direction: { default: () => 'horizontal' },
    title: { default: () => 'Sample Chart' },
    data: { default: () => chartData },
    showLegend: { default: () => true }
  }
})

export const Vertical = () => ({
  components: { BarChart },
  template: barChartTemplate,
  props: {
    id: { default: () => 'bar-chart-default' },
    direction: { default: () => 'vertical' },
    title: { default: () => undefined },
    data: { default: () => chartData },
    showLegend: { default: () => false }
  }
})

export const DualData = () => ({
  components: { BarChart },
  template: barChartTemplate,
  props: {
    id: { default: () => 'bar-chart-default' },
    direction: { default: () => 'horizontal' },
    title: { default: () => 'Dual Chart' },
    data: { default: () => dualChartData },
    showLegend: { default: () => true }
  }
})
