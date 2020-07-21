import { mount } from '@vue/test-utils'
import MyVicTreeMap from './../index.vue'
import ChartDescription from '@dpc-sdp/myvic-global/components/ChartDescription'

describe('MyVicTreeMap', () => {
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

  const wrapper = mount(MyVicTreeMap, {
    propsData: {
      title: 'Line Chart',
      data: chartData,
      valueAttr: 'value',
      labelAttr: 'name',
      dataFormat: 'normal',
      longDesc: 'https://www.w3.org'
    }
  })

  it('renders a canvas', () => {
    expect(wrapper.contains('canvas')).toBe(true)
  })

  it('renders the chart description', () => {
    expect(wrapper.contains(ChartDescription)).toBe(true)
  })

  it('renders a link to the long description', () => {
    expect(wrapper.contains('a')).toBe(true)
  })
})
