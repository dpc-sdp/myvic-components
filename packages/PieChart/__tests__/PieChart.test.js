import { mount } from '@vue/test-utils'
import YourVicPieChart from './../index.vue'
import { chartData } from '../storiesConstants.js'

describe('YourVicPieChart', () => {
  const wrapper = mount(YourVicPieChart, {
    propsData: {
      direction: 'horizontal',
      title: 'Line Chart',
      data: chartData,
      showLegend: true,
      dataFormat: 'normal'
    }
  })

  it('renders a canvas', () => {
    expect(wrapper.contains('canvas')).toBe(true)
  })
})
