import { mount } from '@vue/test-utils'
import YourVicPieChart from './../index.vue'
import { chartData } from '../storiesConstants.js'
import ChartDescription from '@dpc-sdp/yourvic-global/components/ChartDescription'
import ErrorComponent from '@dpc-sdp/yourvic-global/components/Error'

describe('YourVicPieChart', () => {
  const wrapper = mount(YourVicPieChart, {
    propsData: {
      title: 'Pie Chart',
      data: chartData,
      showLegend: true,
      dataFormat: 'normal',
      longDesc: 'https://www.w3.org'
    }
  })

  const invalidChartData = {
    datasets: [{}]
  }

  const errorWrapper = mount(YourVicPieChart, {
    propsData: {
      title: 'Pie Chart',
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
