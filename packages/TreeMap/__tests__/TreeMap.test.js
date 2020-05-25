import { mount } from '@vue/test-utils'
import YourVicTreeMap from './../index.vue'

describe('YourVicTreeMap', () => {
  const chartData = [
    {
      name: 'Category 1',
      value: 45
    },
    {
      name: 'Category 2',
      value: 70
    },
    {
      name: 'Category 3',
      value: 80
    },
    {
      name: 'Category 4',
      value: 15
    },
    {
      name: 'Category 5',
      value: 55
    },
    {
      name: 'Category 6',
      value: 25
    },
    {
      name: 'Category 7',
      value: 2
    }
  ]

  const wrapper = mount(YourVicTreeMap, {
    propsData: {
      title: 'Line Chart',
      data: chartData,
      valueAttr: 'value',
      labelAttr: 'name',
      dataFormat: 'normal'
    }
  })

  it('renders a canvas', () => {
    expect(wrapper.contains('canvas')).toBe(true)
  })
})
