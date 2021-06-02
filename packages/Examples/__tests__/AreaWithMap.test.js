import { mount } from '@vue/test-utils'
import AreaWithMap from './../AreaWithMap.vue'
import { AreaSearch } from '@dpc-sdp/myvic-areasearch'
import { MyvicMapCore, MyvicMapVectorLayer } from '@dpc-sdp/myvic-map-core'

describe('AreaWithMap', () => {
  const wrapper = mount(AreaWithMap, {
    propsData: {}
  })

  it('renders the area search component', () => {
    expect(wrapper.findComponent(AreaSearch).exists()).toBe(true)
  })

  it('renders the map core component', () => {
    expect(wrapper.findComponent(MyvicMapCore).exists()).toBe(true)
  })

  it('renders the map vector layer component', () => {
    expect(wrapper.findComponent(MyvicMapVectorLayer).exists()).toBe(true)
  })
})
