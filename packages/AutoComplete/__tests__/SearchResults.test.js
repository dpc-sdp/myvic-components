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
    expect(wrapperDouble.contains('ul')).toBe(true)
  })

  it('renders the proper item style', () => {
    expect(wrapperDouble.contains(DoubleLineItem)).toBe(true)
    expect(wrapperSingle.contains(SingleLineItem)).toBe(true)
  })

  it('renders a list item with a specific style when no items are found', () => {
    expect(wrapperNoItems.contains('li.myvic-search-results__item--no-results')).toBe(true)
  })
})
