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
    expect(wrapper.contains(DataBlock)).toBe(true)
  })

  it('renders the bar chart component', () => {
    expect(wrapper.contains(BarChart)).toBe(true)
  })

  it('renders the map core component', () => {
    expect(wrapper.contains(MyvicMapCore)).toBe(true)
  })

  it('renders the map vector layer component', () => {
    expect(wrapper.contains(MyvicMapVectorLayer)).toBe(true)
  })

  it('renders the map vector tile layer component', () => {
    expect(wrapper.contains(MyvicMapVectorTileLayer)).toBe(true)
  })

  it('renders the legend component', () => {
    expect(wrapper.contains(MyvicMapLegend)).toBe(true)
  })
})
