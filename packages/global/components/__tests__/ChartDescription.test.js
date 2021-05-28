import { mount } from '@vue/test-utils'
import ChartDescription from './../ChartDescription.vue'

describe('ChartDescription', () => {
  const wrapper = mount(ChartDescription, {
    propsData: {
      longDesc: 'https://www.w3.org'
    }
  })

  it('renders a link to the long description', () => {
    expect(wrapper.find('a').exists()).toBe(true)
  })
})
