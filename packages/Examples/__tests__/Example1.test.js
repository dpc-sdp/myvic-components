import { mount } from '@vue/test-utils'
import Example1 from './../Example1.vue'
import { AreaSearch } from '@dpc-sdp/yourvic-areasearch'
import DataBlock from '@dpc-sdp/yourvic-data-block'
import BarChart from '@dpc-sdp/yourvic-bar-chart'

describe('Example1', () => {
  const wrapper = mount(Example1, {
    propsData: {}
  })

  it('renders the area search component', () => {
    expect(wrapper.contains(AreaSearch)).toBe(true)
  })

  it('renders the data block components', () => {
    expect(wrapper.contains(DataBlock)).toBe(true)
  })

  it('renders the bar chart component', () => {
    expect(wrapper.contains(BarChart)).toBe(true)
  })
})
