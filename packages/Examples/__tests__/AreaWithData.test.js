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
    expect(wrapper.contains(AreaSearch)).toBe(true)
  })

  it('renders the data block components', () => {
    expect(wrapper.contains(DataBlock)).toBe(true)
  })

  it('renders the bar chart component', () => {
    expect(wrapper.contains(BarChart)).toBe(true)
  })
})
