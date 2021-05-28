import { mount } from '@vue/test-utils'
import ErrorComponent from './../Error.vue'

describe('ErrorComponent', () => {
  const wrapper = mount(ErrorComponent, {
    propsData: {
      errorClass: 'chart'
    }
  })

  it('renders a styled error container', () => {
    expect(wrapper.find('div.myvic-error--chart').exists()).toBe(true)
  })
})
