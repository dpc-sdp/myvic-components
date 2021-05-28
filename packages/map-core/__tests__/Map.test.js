import { mount } from '@vue/test-utils'
import MyvicMapCore from './../index.vue'

describe('MyvicMapCore', () => {
  const wrapper = mount(MyvicMapCore, {
    propsData: {
      baseMapUrl: 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}'
    }
  })

  it('renders a div', () => {
    expect(wrapper.find('div').exists()).toBe(true)
  })
})
