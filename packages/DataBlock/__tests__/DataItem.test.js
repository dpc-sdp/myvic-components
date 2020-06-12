import { mount } from '@vue/test-utils'
import DataItem from './../DataItem.vue'

describe('DataItem', () => {
  const wrapper = mount(DataItem, {
    propsData: {
      title: 'title text',
      description: 'description text',
      trend: 'up'
    }
  })

  const noTrendWrapper = mount(DataItem, {
    propsData: {
      title: 'title text',
      description: 'description text',
      trend: ''
    }
  })

  it('renders a title', () => {
    expect(wrapper.contains('h3')).toBe(true)
  })

  it('renders a description', () => {
    expect(wrapper.contains('p')).toBe(true)
  })

  it('renders a trend', () => {
    expect(wrapper.contains('span')).toBe(true)
  })

  it('does not render a trend if the trend prop is falsy', () => {
    expect(noTrendWrapper.contains('span')).toBe(false)
  })
})
