import { mount, shallowMount } from '@vue/test-utils'
import ChartWrapper from './../ChartWrapper.vue'
import ErrorComponent from './../Error.vue'

describe('ChartWrapper', () => {
  const wrapper = mount(ChartWrapper, {
    propsData: {},
    slots: {
      default: ['<span />']
    }
  })

  const errorWrapper = shallowMount(ChartWrapper, {
    propsData: {},
    slots: {
      default: ['<span />']
    }
  })
  errorWrapper.vm.interceptError(new Error('Generic error'))

  it('renders a span', () => {
    expect(wrapper.contains('span')).toBe(true)
  })

  it('renders error component', () => {
    expect(errorWrapper.contains(ErrorComponent)).toBe(true)
  })
})
