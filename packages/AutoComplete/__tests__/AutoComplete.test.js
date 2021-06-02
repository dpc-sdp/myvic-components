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
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders SearchResults', () => {
    expect(wrapper.findComponent(SearchResults).exists()).toBe(true)
  })

  it('finds an item', async () => {
    wrapper.setData({ query: 'item' })
    wrapper.vm.onChange()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.results).toHaveLength(1)
  })
})
