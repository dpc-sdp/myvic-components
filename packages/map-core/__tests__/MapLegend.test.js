import { mount } from '@vue/test-utils'
import YourvicMapLegend from './../MapLegend.vue'

describe('YourvicMapLegend', () => {
  const wrapper = mount(YourvicMapLegend, {
    propsData: {
      title: 'Legend Test',
      type: 'gradient',
      alignLeft: false,
      gradientColor: 'blue'
    }
  })

  it('renders the legend title', () => {
    let itemArray = wrapper.findAll('.yourvic-map-legend__title')
    expect(itemArray).toHaveLength(1)
    expect(itemArray.at(0).text()).toBe('Legend Test')
  })

  it('renders the legend content', () => {
    let itemArray = wrapper.findAll('.yourvic-map-legend__content')
    expect(itemArray).toHaveLength(1)
  })
})
