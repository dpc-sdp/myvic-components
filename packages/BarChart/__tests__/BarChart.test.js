import { mount } from '@vue/test-utils'
import MyvicBarChart from './../index.vue'
import ChartDescription from '@dpc-sdp/myvic-global/components/ChartDescription'
import ErrorComponent from '@dpc-sdp/myvic-global/components/Error'

describe('MyvicBarChart', () => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [40, 20, 12, 52, 10, 39]
      }
    ]
  }

  const wrapper = mount(MyvicBarChart, {
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

  const errorWrapper = mount(MyvicBarChart, {
    propsData: {
      direction: 'horizontal',
      title: 'Bar Chart',
      data: invalidChartData,
      showLegend: true,
      dataFormat: 'normal'
    }
  })

  it('renders a canvas', () => {
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('renders the chart description', () => {
    expect(wrapper.findComponent(ChartDescription).exists()).toBe(true)
  })

  it('renders an error message with invalid data', () => {
    expect(errorWrapper.findComponent(ErrorComponent).exists()).toBe(true)
  })
})
