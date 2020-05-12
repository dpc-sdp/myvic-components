import BarChart from './index.vue'

export default {
  title: 'Bar Chart'
}

const barChartTemplate = `<bar-chart :id="id" :data="data" />`

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Count',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
}

export const Default = () => ({
  components: { BarChart },
  template: barChartTemplate,
  props: {
    id: {
      default: () => 'bar-chart-default'
    },
    data: {
      default: () => chartData
    }
  }
})
