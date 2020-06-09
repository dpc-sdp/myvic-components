import { mount } from '@vue/test-utils'
import DataBlock from './../index.vue'
import DataItem from './../DataItem.vue'

describe('DataBlock', () => {
  const wrapper = mount(DataBlock, {
    propsData: {
      data: {},
      selectable: true,
      isBlock: true
    }
  })

  it('renders a DataItem', () => {
    expect(wrapper.contains(DataItem)).toBe(true)
  })
})
