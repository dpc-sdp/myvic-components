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
    expect(wrapper.find('h3').exists()).toBe(true)
  })

  it('renders a description', () => {
    expect(wrapper.find('p').exists()).toBe(true)
  })

  it('renders a trend', () => {
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('does not render a trend if the trend prop is falsy', () => {
    expect(noTrendWrapper.find('span').exists()).toBe(false)
  })
})
