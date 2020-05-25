import { mount } from '@vue/test-utils'
import YourVicBarChart from './../index.vue'

describe('YourVicBarChart', () => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [40, 20, 12, 52, 10, 39]
      }
    ]
  }

  const wrapper = mount(YourVicBarChart, {
    propsData: {
      direction: 'horizontal',
      title: 'Bar Chart',
      data: chartData,
      showLegend: true,
      dataFormat: 'normal'
    }
  })

  it('renders a canvas', () => {
    expect(wrapper.contains('canvas')).toBe(true)
  })
})
