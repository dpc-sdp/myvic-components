import { mount } from '@vue/test-utils'
import AreaWithData from './../AreaWithData.vue'
import { AreaSearch } from '@dpc-sdp/myvic-areasearch'
import DataBlock from '@dpc-sdp/myvic-data-block'
import BarChart from '@dpc-sdp/myvic-bar-chart'

describe('AreaWithData', () => {
  const wrapper = mount(AreaWithData, {
    propsData: {}
  })

  it('renders the area search component', () => {
    expect(wrapper.findComponent(AreaSearch).exists()).toBe(true)
  })

  it('renders the data block components', () => {
    expect(wrapper.findComponent(DataBlock).exists()).toBe(true)
  })

  it('renders the bar chart component', () => {
    expect(wrapper.findComponent(BarChart).exists()).toBe(true)
  })
})
