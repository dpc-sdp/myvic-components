import { mount } from '@vue/test-utils'
import YourVicToggleList from './../ToggleList.vue'

describe('YourVicToggleList', () => {
  const wrapper = mount(YourVicToggleList, {
    propsData: {
      items: [
        { id: 'item1', title: 'Item 1', icon: 'map_marker', color: 'primary' },
        { id: 'item2', title: 'Item 2', icon: 'alert_smoke', color: 'danger' },
        { id: 'item3', title: 'Item 3', icon: 'home', color: 'success' },
        { id: 'item4', title: 'Item 4', icon: 'lock', color: 'secondary' },
        { id: 'item5', title: 'Item 5', icon: 'document_transparent', color: 'warning' }
      ],
      selectedItems: {
        'item1': true,
        'item2': false,
        'item3': false,
        'item4': true,
        'item5': false
      }
    }
  })

  it('renders a div', () => {
    expect(wrapper.contains('div')).toBe(true)
  })

  it('renders all items', () => {
    let itemArray = wrapper.findAll('.toggle-item__title')
    expect(itemArray).toHaveLength(5)
    expect(itemArray.at(0).text()).toBe('Item 1')
    expect(itemArray.at(1).text()).toBe('Item 2')
    expect(itemArray.at(2).text()).toBe('Item 3')
    expect(itemArray.at(3).text()).toBe('Item 4')
    expect(itemArray.at(4).text()).toBe('Item 5')
  })

  it('renders the correct active items', () => {
    let itemArray = wrapper.findAll('.is-active')
    expect(itemArray).toHaveLength(2)
  })
})
