import { mount } from '@vue/test-utils'
import SearchResults from './../SearchResults.vue'
import DoubleLineItem from './../DoubleLineItem.vue'
import SingleLineItem from './../SingleLineItem.vue'

describe('SearchResults', () => {
  const items = [
    {
      name: 'item 1',
      description: 'description for item 1'
    }
  ]

  const wrapperDouble = mount(SearchResults, {
    propsData: {
      items: items,
      resultItemLineStyle: 'double',
      getItemName: ({ name }) => name,
      getItemSecondaryText: ({ description }) => description
    }
  })

  const wrapperSingle = mount(SearchResults, {
    propsData: {
      items: items,
      resultItemLineStyle: 'single',
      getItemName: ({ name }) => name,
      getItemSecondaryText: ({ description }) => description
    }
  })

  const wrapperNoItems = mount(SearchResults, {
    propsData: {
      items: [],
      resultItemLineStyle: 'single',
      getItemName: ({ name }) => name,
      getItemSecondaryText: ({ description }) => description
    }
  })

  it('renders a list', () => {
    expect(wrapperDouble.find('ul').exists()).toBe(true)
  })

  it('renders the proper item style', () => {
    expect(wrapperDouble.findComponent(DoubleLineItem).exists()).toBe(true)
    expect(wrapperSingle.findComponent(SingleLineItem).exists()).toBe(true)
  })

  it('renders a list item with a specific style when no items are found', () => {
    expect(wrapperNoItems.find('li.myvic-search-results__item--no-results').exists()).toBe(true)
  })
})
