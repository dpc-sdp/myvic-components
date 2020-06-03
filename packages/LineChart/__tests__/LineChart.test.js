import { mount } from '@vue/test-utils'
import YourVicLineChart from './../index.vue'
import ErrorComponent from '@dpc-sdp/yourvic-global/components/Error'

describe('YourVicLineChart', () => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [40, 20, 12, 52, 10, 39]
      }
    ]
  }

  const wrapper = mount(YourVicLineChart, {
    propsData: {
      title: 'Line Chart',
      data: chartData,
      showLegend: true,
      dataFormat: 'normal',
      longDesc: 'https://www.w3.org'
    }
  })

  const invalidChartData = {
    datasets: [{}]
  }

  const errorWrapper = mount(YourVicLineChart, {
    propsData: {
      title: 'Line Chart',
      data: invalidChartData,
      showLegend: true,
      dataFormat: 'normal'
    }
  })

  it('renders a canvas', () => {
    expect(wrapper.contains('canvas')).toBe(true)
  })
  
  it('renders a link to the long description', () => {
    expect(wrapper.contains('a')).toBe(true)
  })

  it('renders an error message with invalid data', () => {
    expect(errorWrapper.contains(ErrorComponent)).toBe(true)
  })
})
