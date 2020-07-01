import { mount } from '@vue/test-utils'
import IncomeData from './../IncomeData.vue'
import DataBlock from '@dpc-sdp/yourvic-data-block'
import BarChart from '@dpc-sdp/yourvic-bar-chart'
import {
  YourvicMapCore,
  YourvicMapVectorTileLayer,
  YourvicMapVectorLayer,
  YourvicMapLegend
} from '@dpc-sdp/yourvic-map-core'

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
    expect(wrapper.contains(YourvicMapCore)).toBe(true)
  })

  it('renders the map vector layer component', () => {
    expect(wrapper.contains(YourvicMapVectorLayer)).toBe(true)
  })

  it('renders the map vector tile layer component', () => {
    expect(wrapper.contains(YourvicMapVectorTileLayer)).toBe(true)
  })

  it('renders the legend component', () => {
    expect(wrapper.contains(YourvicMapLegend)).toBe(true)
  })
})
