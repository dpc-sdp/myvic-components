import { mount } from '@vue/test-utils'
import Example2 from './../Example2.vue'
import { AreaSearch } from '@dpc-sdp/yourvic-areasearch'
import { YourvicMapCore, YourvicMapVectorLayer } from '@dpc-sdp/yourvic-map-core'

describe('Example2', () => {
  const wrapper = mount(Example2, {
    propsData: {}
  })

  it('renders the area search component', () => {
    expect(wrapper.contains(AreaSearch)).toBe(true)
  })

  it('renders the map core component', () => {
    expect(wrapper.contains(YourvicMapCore)).toBe(true)
  })

  it('renders the map vector layer component', () => {
    expect(wrapper.contains(YourvicMapVectorLayer)).toBe(true)
  })
})
