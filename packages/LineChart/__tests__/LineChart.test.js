import { mount } from '@vue/test-utils'
import YourVicLineChart from './../index.vue'

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
