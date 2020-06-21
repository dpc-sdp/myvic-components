import { mount } from '@vue/test-utils'
import AutoComplete from './../index.vue'
import SearchResults from './../SearchResults.vue'

describe('AutoComplete', () => {
  const items = [
    {
      name: 'item 1',
      description: 'description for item 1'
    }
  ]

  const wrapper = mount(AutoComplete, {
    propsData: {
      items: items
    }
  })

  it('renders an input', () => {
    expect(wrapper.contains('input')).toBe(true)
  })

  it('renders SearchResults', () => {
    expect(wrapper.contains(SearchResults)).toBe(true)
  })
})
