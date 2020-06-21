import { mount } from '@vue/test-utils'
import AreaSearch from './../index.vue'
import { AutoComplete } from '@dpc-sdp/yourvic-autocomplete'

describe('AreaSearch', () => {
  const wrapper = mount(AreaSearch, {
  })

  it('renders an AutoComplete', () => {
    expect(wrapper.contains(AutoComplete)).toBe(true)
  })
})
