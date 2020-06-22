import { mount } from '@vue/test-utils'
import AddressSearch from './../index.vue'
import { AutoComplete } from '@dpc-sdp/yourvic-autocomplete'

describe('AddressSearch', () => {
  const wrapper = mount(AddressSearch, {
  })

  it('renders an AutoComplete', () => {
    expect(wrapper.contains(AutoComplete)).toBe(true)
  })
})
