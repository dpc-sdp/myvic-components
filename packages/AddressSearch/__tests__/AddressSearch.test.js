import { mount } from '@vue/test-utils'
import AddressSearch from './../index.vue'
import { AutoComplete } from '@dpc-sdp/myvic-autocomplete'

describe('AddressSearch', () => {
  const wrapper = mount(AddressSearch, {
  })

  it('renders an AutoComplete', () => {
    expect(wrapper.findComponent(AutoComplete).exists()).toBe(true)
  })
})
