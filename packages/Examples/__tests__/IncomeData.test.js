import { mount } from '@vue/test-utils'
import IncomeData from './../IncomeData.vue'
import DataBlock from '@dpc-sdp/myvic-data-block'
import BarChart from '@dpc-sdp/myvic-bar-chart'
import {
  MyvicMapCore,
  MyvicMapVectorTileLayer,
  MyvicMapVectorLayer,
  MyvicMapLegend
} from '@dpc-sdp/myvic-map-core'

describe('IncomeData', () => {
  const wrapper = mount(IncomeData, {
    propsData: {}
  })

  it('renders the data block components', () => {
    expect(wrapper.findComponent(DataBlock).exists()).toBe(true)
  })

  it('renders the bar chart component', () => {
    expect(wrapper.findComponent(BarChart).exists()).toBe(true)
  })

  it('renders the map core component', () => {
    expect(wrapper.findComponent(MyvicMapCore).exists()).toBe(true)
  })

  it('renders the map vector layer component', () => {
    expect(wrapper.findComponent(MyvicMapVectorLayer).exists()).toBe(true)
  })

  it('renders the map vector tile layer component', () => {
    expect(wrapper.findComponent(MyvicMapVectorTileLayer).exists()).toBe(true)
  })

  it('renders the legend component', () => {
    expect(wrapper.findComponent(MyvicMapLegend).exists()).toBe(true)
  })
})
