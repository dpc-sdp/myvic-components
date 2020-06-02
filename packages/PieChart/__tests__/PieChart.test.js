import { mount } from '@vue/test-utils'
import YourVicPieChart from './../index.vue'
import { chartData } from '../storiesConstants.js'
import ErrorComponent from './../../global/components/Error'

describe('YourVicPieChart', () => {
  const wrapper = mount(YourVicPieChart, {
    propsData: {
      title: 'Pie Chart',
      data: chartData,
      showLegend: true,
      dataFormat: 'normal'
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

  it('renders an error message with invalid data', () => {
    expect(errorWrapper.contains(ErrorComponent)).toBe(true)
  })
})
