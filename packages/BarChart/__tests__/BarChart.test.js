import { mount } from '@vue/test-utils'
import MyVicBarChart from './../index.vue'
import ChartDescription from '@dpc-sdp/myvic-global/components/ChartDescription'
import ErrorComponent from '@dpc-sdp/myvic-global/components/Error'

describe('MyVicBarChart', () => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [40, 20, 12, 52, 10, 39]
      }
    ]
  }

  const wrapper = mount(MyVicBarChart, {
    propsData: {
      direction: 'horizontal',
      title: 'Bar Chart',
      data: chartData,
      showLegend: true,
      dataFormat: 'normal',
      longDesc: 'https://www.w3.org'
    }
  })

  const invalidChartData = {
    datasets: [{}]
  }

  const errorWrapper = mount(MyVicBarChart, {
    propsData: {
      direction: 'horizontal',
      title: 'Bar Chart',
      data: invalidChartData,
      showLegend: true,
      dataFormat: 'normal'
    }
  })

  it('renders a canvas', () => {
    expect(wrapper.contains('canvas')).toBe(true)
  })

  it('renders the chart description', () => {
    expect(wrapper.contains(ChartDescription)).toBe(true)
  })

  it('renders an error message with invalid data', () => {
    expect(errorWrapper.contains(ErrorComponent)).toBe(true)
  })
})
