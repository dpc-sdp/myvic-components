import { mount } from '@vue/test-utils'
import AutoComplete from './../index.vue'
import SearchResults from './../SearchResults.vue'

describe('AutoComplete', () => {
  const items = [
    {
      name: 'item 1',
      description: 'description for item 1'
    },
    {
      name: 'result 1',
      description: 'description for result 1'
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
  
  it('finds an item', async () => {
    wrapper.setData({ query: 'item' })
    wrapper.vm.onChange()
    await wrapper.vm.$nextTick()
    console.log(wrapper.vm.$data.results)
    expect(wrapper.vm.$data.results.length).toBe(1)
  })
})
